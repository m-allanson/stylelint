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
      var name = atRule.name;


      if (name[0] !== "-") {
        return;
      }

      if (_utils.isAutoprefixable.atRuleName(name)) {
        (0, _utils.report)({
          message: messages.rejected(name),
          node: atRule,
          result: result,
          ruleName: ruleName
        });
      }
    });
  };
};

var _utils = require("../../utils");

var ruleName = exports.ruleName = "at-rule-no-vendor-prefix";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  rejected: function rejected(p) {
    return "Unexpected vendor-prefixed at-rule \"@" + p + "\"";
  }
});