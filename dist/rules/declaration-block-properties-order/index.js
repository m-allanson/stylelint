"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (expectation, options) {
  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, {
      actual: expectation,
      possible: validatePrimaryOption
    }, {
      actual: options,
      possible: {
        unspecified: ["top", "bottom", "ignore", "bottomAlphabetical"]
      },
      optional: true
    });
    if (!validOptions) {
      return;
    }

    var alphabetical = expectation === "alphabetical";
    var expectedOrder = alphabetical ? null : createExpectedOrder(expectation);
    // By default, ignore unspecified properties
    var unspecified = _lodash2.default.get(options, ["unspecified"], "ignore");

    // Shallow loop
    root.each(function (node) {
      if (node.type === "rule" || node.type === "atrule") {
        checkNode(node);
      }
    });

    function checkNode(node) {
      var allPropData = [];
      var lastKnownSeparatedGroup = 1;

      node.each(function (child) {
        // If the child has nested nodes with child
        // (e.g. a rule nested within a rule), make
        // sure to check the children
        if (child.nodes && child.nodes.length) {
          checkNode(child);
        }

        if (child.type !== "decl") {
          return;
        }

        if ((0, _utils.cssWordIsVariable)(child.prop)) {
          return;
        }

        var unprefixedPropName = _postcss.vendor.unprefixed(child.prop);

        // Hack to allow -moz-osx-font-smoothing to be understood
        // just like -webkit-font-smoothing
        if (unprefixedPropName.indexOf("osx-") === 0) {
          unprefixedPropName = unprefixedPropName.slice(4);
        }

        var propData = {
          name: child.prop,
          unprefixedName: unprefixedPropName,
          orderData: alphabetical ? null : getOrderData(expectedOrder, unprefixedPropName),
          before: child.raw("before"),
          index: allPropData.length,
          node: child
        };

        var previousPropData = _lodash2.default.last(allPropData);
        allPropData.push(propData);

        // Skip first decl
        if (!previousPropData) {
          return;
        }

        var isCorrectOrder = alphabetical ? checkAlpabeticalOrder(previousPropData, propData) : checkOrder(previousPropData, propData);

        if (isCorrectOrder) {
          return;
        }

        complain({
          message: messages.expected(propData.name, previousPropData.name),
          node: child
        });
      });

      function checkOrder(firstPropData, secondPropData) {
        // If the unprefixed property names are the same, resort to alphabetical ordering
        if (firstPropData.unprefixedName === secondPropData.unprefixedName) {
          return firstPropData.name <= secondPropData.name;
        }

        var firstPropIsUnspecified = !firstPropData.orderData;
        var secondPropIsUnspecified = !secondPropData.orderData;

        // Now check newlines between ...
        var firstPropSeparatedGroup = !firstPropIsUnspecified ? firstPropData.orderData.separatedGroup : lastKnownSeparatedGroup;
        var secondPropSeparatedGroup = !secondPropIsUnspecified ? secondPropData.orderData.separatedGroup : lastKnownSeparatedGroup;

        if (firstPropSeparatedGroup !== secondPropSeparatedGroup && !secondPropIsUnspecified) {
          // Get an array of just the property groups, remove any solo properties
          var groups = _lodash2.default.reject(expectation, _lodash2.default.isString);

          // secondProp seperatedGroups start at 2 so we minus 2 to get the 1st item
          // from our groups array
          var emptyLineBefore = _lodash2.default.get(groups[secondPropSeparatedGroup - 2], "emptyLineBefore");
          if (!hasEmptyLineBefore(secondPropData.node) && emptyLineBefore === "always") {
            complain({
              message: messages.expectedEmptyLineBetween(secondPropData.name, firstPropData.name),
              node: secondPropData.node
            });
          } else if (hasEmptyLineBefore(secondPropData.node) && emptyLineBefore === "never") {
            complain({
              message: messages.rejectedEmptyLineBetween(secondPropData.name, firstPropData.name),
              node: secondPropData.node
            });
          }
        }
        lastKnownSeparatedGroup = secondPropSeparatedGroup;

        // Now check actual known properties ...
        if (!firstPropIsUnspecified && !secondPropIsUnspecified) {
          return firstPropData.orderData.expectedPosition <= secondPropData.orderData.expectedPosition;
        }

        if (firstPropIsUnspecified && !secondPropIsUnspecified) {
          // If first prop is unspecified, look for a specified prop before it to
          // compare to the current prop
          var priorSpecifiedPropData = _lodash2.default.findLast(allPropData.slice(0, -1), function (d) {
            return !!d.orderData;
          });
          if (priorSpecifiedPropData && priorSpecifiedPropData.orderData && priorSpecifiedPropData.orderData.expectedPosition > secondPropData.orderData.expectedPosition) {
            complain({
              message: messages.expected(secondPropData.name, priorSpecifiedPropData.name),
              node: secondPropData.node
            });
            return true; // avoid logging another warning
          }
        }

        // Now deal with unspecified props ...
        // Starting with bottomAlphabetical as it requires more specific conditionals
        if (unspecified === "bottomAlphabetical" && !firstPropIsUnspecified && secondPropIsUnspecified) {
          return true;
        }

        if (unspecified === "bottomAlphabetical" && secondPropIsUnspecified && firstPropIsUnspecified) {
          if (checkAlpabeticalOrder(firstPropData, secondPropData)) {
            return true;
          } else {
            return false;
          }
        }
        if (unspecified === "bottomAlphabetical" && firstPropIsUnspecified) {
          return false;
        }

        if (firstPropIsUnspecified && secondPropIsUnspecified) {
          return true;
        }

        if (unspecified === "ignore" && (firstPropIsUnspecified || secondPropIsUnspecified)) {
          return true;
        }

        if (unspecified === "top" && firstPropIsUnspecified) {
          return true;
        }
        if (unspecified === "top" && secondPropIsUnspecified) {
          return false;
        }

        if (unspecified === "bottom" && secondPropIsUnspecified) {
          return true;
        }
        if (unspecified === "bottom" && firstPropIsUnspecified) {
          return false;
        }
      }
    }

    function complain(_ref) {
      var message = _ref.message;
      var node = _ref.node;

      (0, _utils.report)({
        message: message,
        node: node,
        result: result,
        ruleName: ruleName
      });
    }
  };
};

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _postcss = require("postcss");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleName = exports.ruleName = "declaration-block-properties-order";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expected: function expected(first, second) {
    return "Expected property \"" + first + "\" to come before property \"" + second + "\"";
  },
  expectedEmptyLineBetween: function expectedEmptyLineBetween(first, second) {
    return "Expected an empty line between property \"" + first + "\" and property \"" + second + "\"";
  },
  rejectedEmptyLineBetween: function rejectedEmptyLineBetween(first, second) {
    return "Unexpected empty line between property \"" + first + " and property \"" + second + "\"";
  }
});

function createExpectedOrder(input) {
  var order = {};
  var separatedGroup = 1;
  var expectedPosition = 0;

  appendGroup(input, 1);

  function appendGroup(items) {
    items.forEach(function (item) {
      return appendItem(item, false);
    });
  }

  function appendItem(item, inFlexibleGroup) {
    if (_lodash2.default.isString(item)) {
      // In flexible groups, the expectedPosition does not ascend
      // to make that flexibility work;
      // otherwise, it will always ascend
      if (!inFlexibleGroup) {
        expectedPosition += 1;
      }
      order[item] = { separatedGroup: separatedGroup, expectedPosition: expectedPosition };
      return;
    }

    // If item is not a string, it's a group ...
    if (item.emptyLineBefore) {
      separatedGroup += 1;
    }

    if (!item.order || item.order === "strict") {
      appendGroup(item.properties);
      return;
    } else if (item.order === "flexible") {
      expectedPosition += 1;
      item.properties.forEach(function (property) {
        appendItem(property, true);
      });
    }
  }

  return order;
}

function getOrderData(expectedOrder, propName) {
  var orderData = expectedOrder[propName];
  // If prop was not specified but has a hyphen
  // (e.g. `padding-top`), try looking for the segment preceding the hyphen
  // and use that index
  if (!orderData && propName.lastIndexOf("-") !== -1) {
    var propNamePreHyphen = propName.slice(0, propName.lastIndexOf("-"));
    orderData = getOrderData(expectedOrder, propNamePreHyphen);
  }
  return orderData;
}

function hasEmptyLineBefore(decl) {
  if (/\r?\n\s*\r?\n/.test(decl.raw("before"))) {
    return true;
  }
  var prevNode = decl.prev();
  if (!prevNode) {
    return false;
  }
  if (prevNode.type !== "comment") {
    return false;
  }
  if (/\r?\n\s*\r?\n/.test(prevNode.raw("before"))) {
    return true;
  }
  return false;
}

function checkAlpabeticalOrder(firstPropData, secondPropData) {
  // If unprefixed prop names are the same, compare the prefixed versions
  if (firstPropData.unprefixedName === secondPropData.unprefixedName) {
    return firstPropData.name <= secondPropData.name;
  }

  return firstPropData.unprefixedName < secondPropData.unprefixedName;
}

function validatePrimaryOption(actualOptions) {

  if (actualOptions === "alphabetical") {
    return true;
  }

  if (!Array.isArray(actualOptions)) {
    return false;
  }

  // Every item in the array must be a string or an object
  // with a "properties" property
  if (actualOptions.every(function (item) {
    if (_lodash2.default.isString(item)) {
      return true;
    }
    return _lodash2.default.isPlainObject(item) && !_lodash2.default.isUndefined(item.properties);
  })) {
    return true;
  }

  var objectItems = actualOptions.filter(_lodash2.default.isPlainObject);

  // Every object-item's "emptyLineBefore" must be "always" or "never"
  if (objectItems.every(function (item) {
    if (_lodash2.default.isUndefined(item.emptyLineBefore)) {
      return true;
    }
    return _lodash2.default.includes(["always", "never"], item.emptyLineBefore);
  })) {
    return true;
  }

  // Every object-item's "type" property must be "strict" or "flexible"
  if (objectItems.every(function (item) {
    if (_lodash2.default.isUndefined(item.type)) {
      return true;
    }
    return _lodash2.default.includes(["string", "flexible"], item.type);
  })) {
    return true;
  }

  return false;
}