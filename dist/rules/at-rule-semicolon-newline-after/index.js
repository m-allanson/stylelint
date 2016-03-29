"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (actual) {
  var checker = (0, _utils.whitespaceChecker)("newline", actual, messages);

  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, {
      actual: actual,
      possible: ["always"]
    });
    if (!validOptions) {
      return;
    }

    root.walkAtRules(function (atRule) {

      var nextNode = atRule.next();
      if (!nextNode) {
        return;
      }
      if ((0, _utils.cssStatementHasBlock)(atRule)) {
        return;
      }

      // Allow an end-of-line comment x spaces after the semicolon
      var nextNodeIsAcceptableComment = nextNode.type === "comment" && !/[^ \t]/.test(nextNode.raw("before")) && nextNode.toString().indexOf("\n") === -1;
      var nodeToCheck = nextNodeIsAcceptableComment ? nextNode.next() : nextNode;
      if (!nodeToCheck) {
        return;
      }

      checker.afterOneOnly({
        source: (0, _utils.rawNodeString)(nodeToCheck),
        index: -1,
        err: function err(msg) {
          (0, _utils.report)({
            message: msg,
            node: atRule,
            index: atRule.toString().length + 1,
            result: result,
            ruleName: ruleName
          });
        }
      });
    });
  };
};

var _utils = require("../../utils");

var ruleName = exports.ruleName = "at-rule-semicolon-newline-after";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedAfter: function expectedAfter() {
    return "Expected newline after \";\"";
  }
});