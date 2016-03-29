"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (blacklist) {
  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, {
      actual: blacklist,
      possible: [_lodash.isObject]
    });
    if (!validOptions) {
      return;
    }

    root.walkDecls(function (decl) {
      var prop = decl.prop;
      var value = decl.value;

      var unprefixedProp = _postcss.vendor.unprefixed(prop);
      var propBlacklist = (0, _lodash.find)(blacklist, function (list, propIdentifier) {
        return (0, _utils.matchesStringOrRegExp)(unprefixedProp, propIdentifier);
      });

      if ((0, _lodash.isEmpty)(propBlacklist)) {
        return;
      }

      if ((0, _utils.matchesStringOrRegExp)(value, propBlacklist)) {
        (0, _utils.report)({
          message: messages.rejected(prop, value),
          node: decl,
          result: result,
          ruleName: ruleName
        });
      }
    });
  };
};

var _postcss = require("postcss");

var _lodash = require("lodash");

var _utils = require("../../utils");

var ruleName = exports.ruleName = "property-value-blacklist";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  rejected: function rejected(p, u) {
    return "Unexpected value \"" + u + "\" for property \"" + p + "\"";
  }
});