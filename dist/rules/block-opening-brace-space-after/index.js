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

    // Check both kinds of statements: rules and at-rules
    root.walkRules(check);
    root.walkAtRules(check);

    function check(statement) {
      // Return early if blockless or has an empty block
      if (!(0, _utils.cssStatementHasBlock)(statement) || (0, _utils.cssStatementHasEmptyBlock)(statement)) {
        return;
      }

      checker.after({
        source: (0, _utils.cssStatementBlockString)(statement),
        index: 0,
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

var ruleName = exports.ruleName = "block-opening-brace-space-after";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedAfter: function expectedAfter() {
    return "Expected single space after \"{\"";
  },
  rejectedAfter: function rejectedAfter() {
    return "Unexpected whitespace after \"{\"";
  },
  expectedAfterSingleLine: function expectedAfterSingleLine() {
    return "Expected single space after \"{\" of a single-line block";
  },
  rejectedAfterSingleLine: function rejectedAfterSingleLine() {
    return "Unexpected whitespace after \"{\" of a single-line block";
  },
  expectedAfterMultiLine: function expectedAfterMultiLine() {
    return "Expected single space after \"{\" of a multi-line block";
  },
  rejectedAfterMultiLine: function rejectedAfterMultiLine() {
    return "Unexpected whitespace after \"{\" of a multi-line block";
  }
});