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
      possible: ["always", "never"]
    });
    if (!validOptions) {
      return;
    }

    (0, _selectorCombinatorSpaceAfter.selectorCombinatorSpaceChecker)({
      root: root,
      result: result,
      locationChecker: checker.before,
      checkedRuleName: ruleName
    });
  };
};

var _utils = require("../../utils");

var _selectorCombinatorSpaceAfter = require("../selector-combinator-space-after");

var ruleName = exports.ruleName = "selector-combinator-space-before";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedBefore: function expectedBefore(c) {
    return "Expected single space before \"" + c + "\" combinator";
  },
  rejectedBefore: function rejectedBefore(c) {
    return "Unexpected whitespace before \"" + c + "\" combinator";
  }
});