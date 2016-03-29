"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (pattern) {
  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, {
      actual: pattern,
      possible: [_lodash.isRegExp, _lodash.isString]
    });
    if (!validOptions) {
      return;
    }

    var regexpPattern = (0, _lodash.isString)(pattern) ? new RegExp(pattern) : pattern;

    root.walkDecls(function (decl) {
      var prop = decl.prop;
      if (prop.slice(0, 2) !== "--") {
        return;
      }

      if (!regexpPattern.test(prop.slice(2))) {
        (0, _utils.report)({
          message: messages.expected,
          node: decl,
          result: result,
          ruleName: ruleName
        });
      }
    });
  };
};

var _lodash = require("lodash");

var _utils = require("../../utils");

var ruleName = exports.ruleName = "custom-property-pattern";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expected: "Expected custom property name to match specified pattern"
});