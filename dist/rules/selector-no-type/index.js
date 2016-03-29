"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (on, options) {
  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, { actual: on }, {
      actual: options,
      possible: {
        ignore: ["descendant", "compounded"]
      },
      optional: true
    });
    if (!validOptions) {
      return;
    }

    root.walkRules(function (rule) {
      // Ignore keyframe selectors
      if (rule.parent.type === "atrule" && rule.parent.name === "keyframes") {
        return;
      }

      if ((0, _utils.cssRuleHasSelectorEndingWithColon)(rule)) {
        return;
      }

      (0, _postcssSelectorParser2.default)(checkSelector).process(rule.selector);

      function checkSelector(selectorAST) {
        selectorAST.eachTag(function (tag) {
          // postcss-selector-parser includes the arguments to nth-child() functions
          // as "tags", so we need to ignore them ourselves.
          // The fake-tag's "parent" is actually a selector node, whose parent
          // should be the :nth-child pseudo node.
          if (tag.parent.parent.type === "pseudo" && tag.parent.parent.value === ":nth-child") {
            return;
          }

          // & is not a type selector: it's used for nesting
          if (tag.value[0] === "&") {
            return;
          }

          if ((0, _utils.optionsHaveIgnored)(options, "descendant") && isCombinator(tag.prev())) {
            return;
          }

          if ((0, _utils.optionsHaveIgnored)(options, "compounded") && (0, _lodash.get)(tag, "parent.nodes.length") > 1 && !isCombinator(tag.prev()) && !isCombinator(tag.next())) {
            return;
          }

          (0, _utils.report)({
            message: messages.rejected,
            node: rule,
            index: tag.sourceIndex,
            ruleName: ruleName,
            result: result
          });
        });
      }
    });
  };
};

var _postcssSelectorParser = require("postcss-selector-parser");

var _postcssSelectorParser2 = _interopRequireDefault(_postcssSelectorParser);

var _lodash = require("lodash");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleName = exports.ruleName = "selector-no-type";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  rejected: "Unexpected type selector"
});

function isCombinator(node) {
  return (0, _lodash.get)(node, "type") === "combinator";
}