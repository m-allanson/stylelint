"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (expectation) {
  var checker = (0, _utils.whitespaceChecker)("newline", expectation, messages);
  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, {
      actual: expectation,
      possible: ["always", "always-multi-line", "never-multi-line"]
    });
    if (!validOptions) {
      return;
    }

    root.walkRules(function (rule) {
      // Get raw selector so we can allow end-of-line comments, e.g.
      // a, /* comment */
      // b {}
      var selector = rule.raws.selector ? rule.raws.selector.raw : rule.selector;
      (0, _utils.styleSearch)({ source: selector, target: ",", outsideFunctionalNotation: true }, function (match) {
        var nextThreeChars = selector.substr(match.endIndex, 3);

        // If there's a // comment, that means there has to be a newline
        // ending the comment so we're fine
        if (nextThreeChars === " //") {
          return;
        }

        // If there is a space and then a comment begins, look for the newline
        // after that comment
        var indextoCheckAfter = nextThreeChars === " /*" ? selector.indexOf("*/", match.endIndex) + 1 : match.startIndex;
        checker.afterOneOnly({
          source: selector,
          index: indextoCheckAfter,
          err: function err(m) {
            return (0, _utils.report)({
              message: m,
              node: rule,
              index: match.startIndex,
              result: result,
              ruleName: ruleName
            });
          }
        });
      });
    });
  };
};

var _utils = require("../../utils");

var ruleName = exports.ruleName = "selector-list-comma-newline-after";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedAfter: function expectedAfter() {
    return "Expected newline after \",\"";
  },
  expectedAfterMultiLine: function expectedAfterMultiLine() {
    return "Expected newline after \",\" in a multi-line list";
  },
  rejectedAfterMultiLine: function rejectedAfterMultiLine() {
    return "Unexpected whitespace after \",\" in a multi-line list";
  }
});