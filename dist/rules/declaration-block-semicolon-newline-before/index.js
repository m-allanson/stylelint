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

    root.walkDecls(function (decl) {
      var parentRule = decl.parent;
      if (!parentRule.raw("semicolon") && parentRule.last === decl) {
        return;
      }

      var declString = decl.toString();

      checker.before({
        source: declString,
        index: declString.length,
        lineCheckStr: (0, _utils.cssStatementBlockString)(parentRule),
        err: function err(m) {
          (0, _utils.report)({
            message: m,
            node: decl,
            index: decl.toString().length - 1,
            result: result,
            ruleName: ruleName
          });
        }
      });
    });
  };
};

var _utils = require("../../utils");

var ruleName = exports.ruleName = "declaration-block-semicolon-newline-before";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedBefore: function expectedBefore() {
    return "Expected newline before \";\"";
  },
  expectedBeforeMultiLine: function expectedBeforeMultiLine() {
    return "Expected newline before \";\" in a multi-line rule";
  },
  rejectedBeforeMultiLine: function rejectedBeforeMultiLine() {
    return "Unexpected whitespace before \";\" in a multi-line rule";
  }
});