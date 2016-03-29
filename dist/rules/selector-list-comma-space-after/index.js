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
      possible: ["always", "never", "always-single-line", "never-single-line"]
    });
    if (!validOptions) {
      return;
    }

    selectorListCommaWhitespaceChecker({
      root: root,
      result: result,
      locationChecker: checker.after,
      checkedRuleName: ruleName
    });
  };
};

exports.selectorListCommaWhitespaceChecker = selectorListCommaWhitespaceChecker;

var _utils = require("../../utils");

var ruleName = exports.ruleName = "selector-list-comma-space-after";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedAfter: function expectedAfter() {
    return "Expected single space after \",\"";
  },
  rejectedAfter: function rejectedAfter() {
    return "Unexpected whitespace after \",\"";
  },
  expectedAfterSingleLine: function expectedAfterSingleLine() {
    return "Expected single space after \",\" in a single-line list";
  },
  rejectedAfterSingleLine: function rejectedAfterSingleLine() {
    return "Unexpected whitespace after \",\" in a single-line list";
  }
});

function selectorListCommaWhitespaceChecker(_ref) {
  var locationChecker = _ref.locationChecker;
  var root = _ref.root;
  var result = _ref.result;
  var checkedRuleName = _ref.checkedRuleName;

  root.walkRules(function (rule) {
    var selector = rule.selector;
    (0, _utils.styleSearch)({ source: selector, target: ",", outsideFunctionalNotation: true }, function (match) {
      checkDelimiter(selector, match.startIndex, rule);
    });
  });

  function checkDelimiter(source, index, node) {
    locationChecker({ source: source, index: index, err: function err(m) {
        return (0, _utils.report)({
          message: m,
          node: node,
          index: index,
          result: result,
          ruleName: checkedRuleName
        });
      }
    });
  }
}