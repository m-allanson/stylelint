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

    (0, _declarationBangSpaceAfter.declarationBangSpaceChecker)({
      root: root,
      result: result,
      locationChecker: checker.before,
      checkedRuleName: ruleName
    });
  };
};

var _utils = require("../../utils");

var _declarationBangSpaceAfter = require("../declaration-bang-space-after");

var ruleName = exports.ruleName = "declaration-bang-space-before";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedBefore: function expectedBefore() {
    return "Expected single space before \"!\"";
  },
  rejectedBefore: function rejectedBefore() {
    return "Unexpected whitespace before \"!\"";
  }
});