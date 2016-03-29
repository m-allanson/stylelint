"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (actual) {
  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, { actual: actual });
    if (!validOptions) {
      return;
    }

    root.walkRules(function (rule) {
      if ((0, _utils.cssRuleHasSelectorEndingWithColon)(rule)) {
        return;
      }
      (0, _postcssSelectorParser2.default)(function (selectorAST) {
        selectorAST.eachId(function (idNode) {
          // Ignore Sass intepolation possibilities
          if (/#{.+}/.test(idNode.toString())) {
            return;
          }
          if (idNode.parent.parent.type === "pseudo") {
            return;
          }

          (0, _utils.report)({
            message: messages.rejected,
            node: rule,
            index: idNode.sourceIndex,
            ruleName: ruleName,
            result: result
          });
        });
      }).process(rule.selector);
    });
  };
};

var _postcssSelectorParser = require("postcss-selector-parser");

var _postcssSelectorParser2 = _interopRequireDefault(_postcssSelectorParser);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleName = exports.ruleName = "selector-no-id";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  rejected: "Unexpected id selector"
});