"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (actual) {
  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, { actual: actual });
    if (!validOptions) {
      return;
    }

    root.walkAtRules(function (atRule) {
      var params = atRule.params;

      if (_utils.isAutoprefixable.mediaFeatureName(params)) {
        var matches = atRule.toString().match(/[a-z-]+device-pixel-ratio/g);
        matches.forEach(function (match) {
          (0, _utils.report)({
            message: messages.rejected,
            node: atRule,
            word: match,
            result: result,
            ruleName: ruleName
          });
        });
      }
    });
  };
};

var _utils = require("../../utils");

var ruleName = exports.ruleName = "media-feature-name-no-vendor-prefix";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  rejected: "Unexpected vendor-prefixed media feature name"
});