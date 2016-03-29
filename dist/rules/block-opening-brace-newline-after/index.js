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

    // Check both kinds of statement: rules and at-rules
    root.walkRules(check);
    root.walkAtRules(check);

    function check(statement) {

      // Return early if blockless or has an empty block
      if (!(0, _utils.cssStatementHasBlock)(statement) || (0, _utils.cssStatementHasEmptyBlock)(statement)) {
        return;
      }

      // Allow an end-of-line comment x spaces after the semicolon
      var firstNode = statement.first;
      var firstNodeIsAcceptableComment = firstNode.type === "comment" && !/[^ ]/.test(firstNode.raw("before")) && firstNode.toString().indexOf("\n") === -1;
      var nodeToCheck = firstNodeIsAcceptableComment ? firstNode.next() : firstNode;
      if (!nodeToCheck) {
        return;
      }

      checker.afterOneOnly({
        source: (0, _utils.rawNodeString)(nodeToCheck),
        index: -1,
        lineCheckStr: (0, _utils.cssStatementBlockString)(statement),
        err: function err(m) {
          (0, _utils.report)({
            message: m,
            node: statement,
            index: (0, _utils.cssStatementStringBeforeBlock)(statement, { noBefore: true }).length + 1,
            result: result,
            ruleName: ruleName
          });
        }
      });
    }
  };
};

var _utils = require("../../utils");

var ruleName = exports.ruleName = "block-opening-brace-newline-after";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedAfter: function expectedAfter() {
    return "Expected newline after \"{\"";
  },
  expectedAfterMultiLine: function expectedAfterMultiLine() {
    return "Expected newline after \"{\" of a multi-line block";
  },
  rejectedAfterMultiLine: function rejectedAfterMultiLine() {
    return "Unexpected whitespace after \"{\" of a multi-line block";
  }
});