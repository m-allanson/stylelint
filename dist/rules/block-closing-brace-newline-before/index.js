"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (expectation) {
  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, {
      actual: expectation,
      possible: ["always", "always-multi-line", "never-multi-line"]
    });
    if (!validOptions) {
      return;
    }

    // Check both kinds of statements: rules and at-rules
    root.walkRules(check);
    root.walkAtRules(check);

    function check(statement) {

      // Return early if blockless or has empty block
      if (!(0, _utils.cssStatementHasBlock)(statement) || (0, _utils.cssStatementHasEmptyBlock)(statement)) {
        return;
      }

      var blockIsMultiLine = !(0, _utils.isSingleLineString)((0, _utils.cssStatementBlockString)(statement));
      var after = statement.raw("after");

      if (after === undefined) {
        return;
      }

      // We're really just checking whether a
      // newline *starts* the block's final space -- between
      // the last declaration and the closing brace. We can
      // ignore any other whitespace between them, because that
      // will be checked by the indentation rule.
      if (!(0, _lodash.startsWith)(after, "\n") && !(0, _lodash.startsWith)(after, "\r\n")) {
        if (expectation === "always") {
          complain(messages.expectedBefore);
        } else if (blockIsMultiLine && expectation === "always-multi-line") {
          complain(messages.expectedBeforeMultiLine);
        }
      }
      if (after !== "" && blockIsMultiLine && expectation === "never-multi-line") {
        complain(messages.rejectedBeforeMultiLine);
      }

      function complain(message) {
        (0, _utils.report)({
          message: message,
          result: result,
          ruleName: ruleName,
          node: statement,
          index: statement.toString().length - 2
        });
      }
    }
  };
};

var _lodash = require("lodash");

var _utils = require("../../utils");

var ruleName = exports.ruleName = "block-closing-brace-newline-before";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedBefore: "Expected newline before \"}\"",
  expectedBeforeMultiLine: "Expected newline before \"}\" of a multi-line block",
  rejectedBeforeMultiLine: "Unexpected whitespace before \"}\" of a multi-line block"
});