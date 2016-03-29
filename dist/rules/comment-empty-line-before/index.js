"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (expectation, options) {
  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, {
      actual: expectation,
      possible: ["always", "never"]
    }, {
      actual: options,
      possible: {
        except: ["first-nested"],
        ignore: ["stylelint-commands", "between-comments"]
      },
      optional: true
    });
    if (!validOptions) {
      return;
    }

    root.walkComments(function (comment) {

      // Ignore the first node
      if (comment === root.first) {
        return;
      }

      // Optionally ignore stylelint commands
      if (comment.text.indexOf(stylelintCommandPrefix) === 0 && (0, _utils.optionsHaveIgnored)(options, "stylelint-commands")) {
        return;
      }

      // Optionally ignore newlines between comments
      var prev = comment.prev();
      if (prev && prev.type === "comment" && (0, _utils.optionsHaveIgnored)(options, "between-comments")) {
        return;
      }

      if (comment.raws.inline) {
        return;
      }

      var before = comment.raw("before");

      // Ignore inline comments
      if (before.indexOf("\n") === -1) {
        return;
      }

      var expectEmptyLineBefore = function () {
        if ((0, _utils.optionsHaveException)(options, "first-nested") && comment.parent !== root && comment === comment.parent.first) {
          return false;
        }
        return expectation === "always";
      }();

      var hasEmptyLineBefore = before.indexOf("\n\n") !== -1 || before.indexOf("\r\n\r\n") !== -1 || before.indexOf("\n\r\n") !== -1;

      // Return if the exceptation is met
      if (expectEmptyLineBefore === hasEmptyLineBefore) {
        return;
      }

      var message = expectEmptyLineBefore ? messages.expected : messages.rejected;

      (0, _utils.report)({
        message: message,
        node: comment,
        result: result,
        ruleName: ruleName
      });
    });
  };
};

var _utils = require("../../utils");

var ruleName = exports.ruleName = "comment-empty-line-before";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expected: "Expected empty line before comment",
  rejected: "Unexpected empty line before comment"
});

var stylelintCommandPrefix = "stylelint-";