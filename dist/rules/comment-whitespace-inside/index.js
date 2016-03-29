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

    root.walkComments(function (comment) {

      if (comment.raws.inline) {
        return;
      }

      var rawComment = comment.toString();
      var firstFourChars = rawComment.substr(0, 4);

      // Return early if sourcemap or copyright comment
      if (firstFourChars === "/*# " || firstFourChars === "/*! ") {
        return;
      }

      var leftMatches = rawComment.match(/(^\/\*+)(\s)?/);
      var rightMatches = rawComment.match(/(\s)?(\*+\/)$/);
      var opener = leftMatches[1];
      var leftSpace = leftMatches[2] || "";
      var rightSpace = rightMatches[1] || "";
      var closer = rightMatches[2];

      if (expectation === "never" && leftSpace !== "") {
        complain(messages.rejectedOpening, opener.length);
      }
      if (expectation === "always" && !(0, _utils.isWhitespace)(leftSpace)) {
        complain(messages.expectedOpening, opener.length);
      }

      if (expectation === "never" && rightSpace !== "") {
        complain(messages.rejectedClosing, comment.toString().length - closer.length - 1);
      }
      if (expectation === "always" && !(0, _utils.isWhitespace)(rightSpace)) {
        complain(messages.expectedClosing, comment.toString().length - closer.length - 1);
      }

      function complain(message, index) {
        (0, _utils.report)({
          message: message,
          index: index,
          result: result,
          ruleName: ruleName,
          node: comment
        });
      }
    });
  };
};

var _utils = require("../../utils");

var ruleName = exports.ruleName = "comment-whitespace-inside";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedOpening: "Expected whitespace after \"/*\"",
  rejectedOpening: "Unexpected whitespace after \"/*\"",
  expectedClosing: "Expected whitespace before \"*/\"",
  rejectedClosing: "Unexpected whitespace before \"*/\""
});