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

      var nextDecl = decl.next();
      if (!nextDecl) {
        return;
      }

      checker.after({
        source: (0, _utils.rawNodeString)(nextDecl),
        index: -1,
        lineCheckStr: (0, _utils.cssStatementBlockString)(parentRule),
        err: function err(m) {
          (0, _utils.report)({
            message: m,
            node: decl,
            index: decl.toString().length + 1,
            result: result,
            ruleName: ruleName
          });
        }
      });
    });
  };
};

var _utils = require("../../utils");

var ruleName = exports.ruleName = "declaration-block-semicolon-space-after";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedAfter: function expectedAfter() {
    return "Expected single space after \";\"";
  },
  rejectedAfter: function rejectedAfter() {
    return "Unexpected whitespace after \";\"";
  },
  expectedAfterSingleLine: function expectedAfterSingleLine() {
    return "Expected single space after \";\" in a single-line rule";
  },
  rejectedAfterSingleLine: function rejectedAfterSingleLine() {
    return "Unexpected whitespace after \";\" in a single-line rule";
  }
});