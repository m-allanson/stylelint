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
      possible: ["always", "never", "always-single-line", "never-single-line", "always-multi-line", "never-multi-line"]
    });
    if (!validOptions) {
      return;
    }

    // Check both kinds of statement: rules and at-rules
    root.walkRules(check);
    root.walkAtRules(check);

    function check(statement) {

      // Return early if blockless or has empty block
      if (!(0, _utils.cssStatementHasBlock)(statement) || (0, _utils.cssStatementHasEmptyBlock)(statement)) {
        return;
      }

      var source = (0, _utils.cssStatementBlockString)(statement);

      checker.before({
        source: source,
        index: source.length - 1,
        err: function err(msg) {
          (0, _utils.report)({
            message: msg,
            node: statement,
            index: statement.toString().length - 2,
            result: result,
            ruleName: ruleName
          });
        }
      });
    }
  };
};

var _utils = require("../../utils");

var ruleName = exports.ruleName = "block-closing-brace-space-before";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedBefore: function expectedBefore() {
    return "Expected single space before \"}\"";
  },
  rejectedBefore: function rejectedBefore() {
    return "Unexpected whitespace before \"}\"";
  },
  expectedBeforeSingleLine: function expectedBeforeSingleLine() {
    return "Expected single space before \"}\" of a single-line block";
  },
  rejectedBeforeSingleLine: function rejectedBeforeSingleLine() {
    return "Unexpected whitespace before \"}\" of a single-line block";
  },
  expectedBeforeMultiLine: function expectedBeforeMultiLine() {
    return "Expected single space before \"}\" of a multi-line block";
  },
  rejectedBeforeMultiLine: function rejectedBeforeMultiLine() {
    return "Unexpected whitespace before \"}\" of a multi-line block";
  }
});