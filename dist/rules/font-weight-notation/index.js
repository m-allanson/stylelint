"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (expectation, options) {
  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, {
      actual: expectation,
      possible: ["numeric", "named-where-possible"]
    }, {
      actual: options,
      possible: {
        ignore: ["relative"]
      },
      optional: true
    });
    if (!validOptions) {
      return;
    }

    root.walkDecls(function (decl) {
      if (decl.prop === "font-weight") {
        checkWeight(decl.value, decl);
      }

      if (decl.prop === "font") {
        checkFont(decl);
      }
    });

    function checkFont(decl) {
      var valueList = _postcss2.default.list.space(decl.value);
      // We do not need to more carefully distinguish font-weight
      // numbers from unitless line-heights because line-heights in
      // `font` values need to be part of a font-size/line-height pair
      var hasNumericFontWeight = valueList.some(isNumbery);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _postcss2.default.list.space(decl.value)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var value = _step.value;

          if (value === NORMAL_KEYWORD && !hasNumericFontWeight || isNumbery(value) || (0, _lodash.includes)(WEIGHT_SPECIFIC_KEYWORDS, value)) {
            checkWeight(value, decl);
            return;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    function checkWeight(weightValue, decl) {
      if ((0, _utils.cssWordIsVariable)(weightValue)) {
        return;
      }
      if (weightValue === INHERIT_KEYWORD || weightValue === INITIAL_KEYWORD) {
        return;
      }

      if ((0, _utils.optionsHaveIgnored)(options, "relative") && (0, _lodash.includes)(RELATIVE_NAMED_WEIGHTS, weightValue)) {
        return;
      }

      var weightValueOffset = decl.value.indexOf(weightValue);

      if (expectation === "numeric") {
        if (!isNumbery(weightValue)) {
          return complain(messages.expected("numeric"));
        }
      }

      if (expectation === "named-where-possible") {
        if (isNumbery(weightValue)) {
          if ((0, _lodash.includes)(WEIGHTS_WITH_KEYWORD_EQUIVALENTS, weightValue)) {
            complain(messages.expected("named"));
          }
          return;
        }
        if (!(0, _lodash.includes)(WEIGHT_SPECIFIC_KEYWORDS, weightValue) && weightValue !== NORMAL_KEYWORD) {
          return complain(messages.invalidNamed(weightValue));
        }
        return;
      }

      function complain(message) {
        (0, _utils.report)({
          ruleName: ruleName,
          result: result,
          message: message,
          node: decl,
          index: (0, _utils.declarationValueIndexOffset)(decl) + weightValueOffset
        });
      }
    }
  };
};

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _lodash = require("lodash");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleName = exports.ruleName = "font-weight-notation";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expected: function expected(type) {
    return "Expected " + type + " font-weight notation";
  },
  invalidNamed: function invalidNamed(name) {
    return "Unexpected invalid font-weight name \"" + name + "\"";
  }
});

var WEIGHT_SPECIFIC_KEYWORDS = ["bold", "bolder", "lighter"];
var INHERIT_KEYWORD = "inherit";
var INITIAL_KEYWORD = "initial";
var NORMAL_KEYWORD = "normal";
var RELATIVE_NAMED_WEIGHTS = ["bolder", "lighter"];
var WEIGHTS_WITH_KEYWORD_EQUIVALENTS = ["400", "700"];

function isNumbery(x) {
  return Number(x) == x;
}