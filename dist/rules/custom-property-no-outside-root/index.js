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

    root.walkRules(function (rule) {
      // Ignore rules whose selector is just `:root`
      if (rule.selector.trim() === ":root") {
        return;
      }

      rule.walkDecls(function (decl) {
        if (decl.prop.substr(0, 2) === "--") {
          (0, _utils.report)({
            message: messages.rejected,
            node: decl,
            result: result,
            ruleName: ruleName
          });
        }
      });
    });
  };
};

var _utils = require("../../utils");

var ruleName = exports.ruleName = "custom-property-no-outside-root";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  rejected: "Unexpected custom property outside root"
});