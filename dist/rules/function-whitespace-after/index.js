"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (expectation) {
  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, {
      actual: expectation,
      possible: ["always", "never"]
    });
    if (!validOptions) {
      return;
    }

    root.walkDecls(function (decl) {
      var declString = decl.toString();

      (0, _utils.styleSearch)({ source: declString, target: ")" }, function (match) {
        checkClosingParen(declString, match.startIndex, decl);
      });
    });

    function checkClosingParen(source, index, node) {
      var nextChar = source[index + 1];
      if (expectation === "always") {
        // Allow for the next character to be a single empty space,
        // another closing parenthesis, a comma, or the end of the value
        if (nextChar === " ") {
          return;
        }
        if (nextChar === "\n") {
          return;
        }
        if (source.substr(index + 1, 2) === "\r\n") {
          return;
        }
        if ([")", ",", "}", undefined].indexOf(nextChar) !== -1) {
          return;
        }
        (0, _utils.report)({
          message: messages.expected,
          node: node,
          index: index + 1,
          result: result,
          ruleName: ruleName
        });
      } else if (expectation === "never") {
        if ((0, _utils.isWhitespace)(nextChar)) {
          (0, _utils.report)({
            message: messages.rejected,
            node: node,
            index: index + 1,
            result: result,
            ruleName: ruleName
          });
        }
      }
    }
  };
};

var _utils = require("../../utils");

var ruleName = exports.ruleName = "function-whitespace-after";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expected: "Expected whitespace after \")\"",
  rejected: "Unexpected whitespace after \")\""
});