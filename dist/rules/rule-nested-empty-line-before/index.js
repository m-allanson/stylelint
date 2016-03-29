"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (expectation, options) {
  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, {
      actual: expectation,
      possible: ["always", "never", "always-multi-line", "never-multi-line"]
    }, {
      actual: options,
      possible: {
        ignore: ["after-comment"],
        except: ["first-nested", "after-comment"]
      },
      optional: true
    });
    if (!validOptions) {
      return;
    }

    root.walkRules(function (rule) {

      // Only attend to nested rule sets
      if (rule.parent === root) {
        return;
      }

      (0, _ruleNonNestedEmptyLineBefore.checkRuleEmptyLineBefore)({ rule: rule, expectation: expectation, options: options, result: result, messages: messages, checkedRuleName: ruleName });
    });
  };
};

var _utils = require("../../utils");

var _ruleNonNestedEmptyLineBefore = require("../rule-non-nested-empty-line-before");

var ruleName = exports.ruleName = "rule-nested-empty-line-before";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expected: "Expected empty line before nested rule",
  rejected: "Unexpected empty line before nested rule"
});