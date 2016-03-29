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

    mediaFeatureColonSpaceChecker({
      root: root,
      result: result,
      locationChecker: checker.after,
      checkedRuleName: ruleName
    });
  };
};

exports.mediaFeatureColonSpaceChecker = mediaFeatureColonSpaceChecker;

var _utils = require("../../utils");

var ruleName = exports.ruleName = "media-feature-colon-space-after";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedAfter: function expectedAfter() {
    return "Expected single space after \":\"";
  },
  rejectedAfter: function rejectedAfter() {
    return "Unexpected whitespace after \":\"";
  }
});

function mediaFeatureColonSpaceChecker(_ref) {
  var locationChecker = _ref.locationChecker;
  var root = _ref.root;
  var result = _ref.result;
  var checkedRuleName = _ref.checkedRuleName;

  root.walkAtRules(function (atRule) {
    var name = atRule.name;
    var params = atRule.params;

    // Only deal with @media at-rules

    if (name !== "media") {
      return;
    }

    (0, _utils.styleSearch)({ source: params, target: ":" }, function (match) {
      checkColon(params, match.startIndex, atRule);
    });
  });

  function checkColon(source, index, node) {
    locationChecker({ source: source, index: index, err: function err(m) {
        return (0, _utils.report)({
          message: m,
          node: node,
          index: index + (0, _utils.mediaQueryParamIndexOffset)(node),
          result: result,
          ruleName: checkedRuleName
        });
      }
    });
  }
}