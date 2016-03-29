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

    root.walkAtRules(function (atRule) {
      (0, _mediaFeatureRangeOperatorSpaceAfter.findMediaOperator)(atRule, checkBeforeOperator);
    });

    function checkBeforeOperator(match, params, node) {
      // The extra `+ 1` is because the match itself contains
      // the character before the operator
      checker.before({
        source: params,
        index: match.index + 1,
        err: function err(m) {
          (0, _utils.report)({
            message: m,
            node: node,
            index: match.index + (0, _utils.mediaQueryParamIndexOffset)(node),
            result: result,
            ruleName: ruleName
          });
        }
      });
    }
  };
};

var _utils = require("../../utils");

var _mediaFeatureRangeOperatorSpaceAfter = require("../media-feature-range-operator-space-after");

var ruleName = exports.ruleName = "media-feature-range-operator-space-before";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedBefore: function expectedBefore() {
    return "Expected single space before range operator";
  },
  rejectedBefore: function rejectedBefore() {
    return "Unexpected whitespace before range operator";
  }
});