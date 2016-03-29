"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (expectation) {

  var checker = (0, _utils.whitespaceChecker)("space", expectation, messages);

  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, {
      actual: expectation,
      possible: ["always", "never", "always-single-line", "never-single-line"]
    });
    if (!validOptions) {
      return;
    }

    root.walkDecls(function (decl) {
      // Ignore last declaration if there's no trailing semicolon
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

var ruleName = exports.ruleName = "declaration-block-semicolon-space-before";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedBefore: function expectedBefore() {
    return "Expected single space before \";\"";
  },
  rejectedBefore: function rejectedBefore() {
    return "Unexpected whitespace before \";\"";
  },
  expectedBeforeSingleLine: function expectedBeforeSingleLine() {
    return "Expected single space before \";\" in a single-line rule";
  },
  rejectedBeforeSingleLine: function rejectedBeforeSingleLine() {
    return "Unexpected whitespace before \";\" in a single-line rule";
  }
});