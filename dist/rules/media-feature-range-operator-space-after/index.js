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
      findMediaOperator(atRule, checkAfterOperator);
    });

    function checkAfterOperator(match, params, node) {
      var endIndex = match.index + match[1].length;

      checker.after({
        source: params,
        index: endIndex,
        err: function err(m) {
          (0, _utils.report)({
            message: m,
            node: node,
            index: endIndex + (0, _utils.mediaQueryParamIndexOffset)(node) + 1,
            result: result,
            ruleName: ruleName
          });
        }
      });
    }
  };
};

exports.findMediaOperator = findMediaOperator;

var _utils = require("../../utils");

var ruleName = exports.ruleName = "media-feature-range-operator-space-after";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedAfter: function expectedAfter() {
    return "Expected single space after range operator";
  },
  rejectedAfter: function rejectedAfter() {
    return "Unexpected whitespace after range operator";
  }
});

var rangeOperatorRegex = /[^><](>=?|<=?|=)/g;

function findMediaOperator(atRule, cb) {
  if (atRule.name !== "media") {
    return;
  }

  var params = atRule.params;
  var match = void 0;
  while ((match = rangeOperatorRegex.exec(params)) !== null) {
    cb(match, params, atRule);
  }
}