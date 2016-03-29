"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (max, options) {
  var ignoreAtRulesWithoutDeclarationBlocks = (0, _utils.optionsHaveIgnored)(options, "at-rules-without-declaration-blocks");

  return function (root, result) {
    (0, _utils.validateOptions)(result, ruleName, {
      actual: max,
      possible: [_lodash2.default.isNumber]
    }, {
      optional: true,
      actual: options,
      possible: {
        ignore: ["at-rules-without-declaration-blocks"]
      }
    });

    root.walkRules(checkStatement);
    root.walkAtRules(checkStatement);

    function checkStatement(statement) {
      if (!(0, _utils.cssStatementHasBlock)(statement)) {
        return;
      }
      var depth = nestingDepth(statement);
      if (depth > max) {
        (0, _utils.report)({
          ruleName: ruleName,
          result: result,
          node: statement,
          message: messages.rejected(max)
        });
      }
    }
  };

  function nestingDepth(node, level) {
    level = level || 0;
    var parent = node.parent;

    // The nesting depth level's computation has finished
    // when this function, recursively called, receives
    // a node that is not nested -- a direct child of the
    // root node

    if (parent.type === "root" || parent.type === "atrule" && parent.parent.type === "root") {
      return level;
    }

    if (ignoreAtRulesWithoutDeclarationBlocks && node.type === "atrule" && node.every(function (child) {
      return child.type !== "decl";
    })) {
      return nestingDepth(parent, level);
    }

    // Unless any of the conditions above apply, we want to
    // add 1 to the nesting depth level and then check the parent,
    // continuing to add and move up the hierarchy
    // until we hit the root node
    return nestingDepth(parent, level + 1);
  }
};

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleName = exports.ruleName = "max-nesting-depth";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  rejected: function rejected(depth) {
    return "Unexpected nesting depth greater than " + depth;
  }
});