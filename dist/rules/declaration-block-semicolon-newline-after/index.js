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
      // Ignore last declaration if there's no trailing semicolon
      var parentRule = decl.parent;
      if (!parentRule.raw("semicolon") && parentRule.last === decl) {
        return;
      }

      var nextNode = decl.next();
      if (!nextNode) {
        return;
      }

      // Allow an end-of-line comment x spaces after the semicolon
      var nextNodeIsAcceptableComment = nextNode.type === "comment" && !/[^ ]/.test(nextNode.raw("before")) && nextNode.toString().indexOf("\n") === -1;
      var nodeToCheck = nextNodeIsAcceptableComment ? nextNode.next() : nextNode;
      if (!nodeToCheck) {
        return;
      }

      checker.afterOneOnly({
        source: (0, _utils.rawNodeString)(nodeToCheck),
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

var ruleName = exports.ruleName = "declaration-block-semicolon-newline-after";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedAfter: function expectedAfter() {
    return "Expected newline after \";\"";
  },
  expectedAfterMultiLine: function expectedAfterMultiLine() {
    return "Expected newline after \";\" in a multi-line rule";
  },
  rejectedAfterMultiLine: function rejectedAfterMultiLine() {
    return "Unexpected newline after \";\" in a multi-line rule";
  }
});