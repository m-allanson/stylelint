"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (expectation) {
  return function (root, result) {
    result.stylelint = result.stylelint || {};
    result.stylelint.disabledRanges = false;

    var validOptions = (0, _utils.validateOptions)(result, ruleName, {
      actual: expectation,
      possible: ["always-before", "always-after"]
    });
    if (!validOptions) {
      return;
    }

    root.walkComments(function (comment) {
      if (comment.text.indexOf(stylelintDisableCommand) !== 0) {
        return;
      }

      if (expectation === "always-before") {
        var prev = comment.prev();
        var prevIsCommentAndValid = prev && prev.type === "comment" && !isDisableCommand(prev.text);

        var prevDisableLineIsCommentAndValid = false;

        if (comment.text.indexOf(stylelintDisableLineCommand) === 0 && !prevIsCommentAndValid && prev) {
          var friendlyPrev = prev.prev();

          prevDisableLineIsCommentAndValid = friendlyPrev && friendlyPrev.type === "comment" && !isDisableCommand(friendlyPrev.text);
        }

        if (!prevIsCommentAndValid && !prevDisableLineIsCommentAndValid) {
          (0, _utils.report)({
            message: messages.expectedBefore,
            node: comment,
            result: result,
            ruleName: ruleName
          });
        }
      } else if (expectation === "always-after") {
        var next = comment.next();
        var nextIsCommentAndValid = next && next.type === "comment" && !isDisableCommand(next.text);

        if (!nextIsCommentAndValid) {
          (0, _utils.report)({
            message: messages.expectedAfter,
            node: comment,
            result: result,
            ruleName: ruleName
          });
        }
      }
    });

    function isDisableCommand(text) {
      return text.indexOf(stylelintDisableCommand) === 0;
    }
  };
};

var _utils = require("../../utils");

var ruleName = exports.ruleName = "stylelint-disable-reason";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedBefore: "Expected comment reason before `stylelint-disable` comment",
  expectedAfter: "Expected comment reason after `stylelint-disable` comment"
});

var stylelintDisableCommand = "stylelint-disable";
var stylelintDisableLineCommand = "stylelint-disable-line";