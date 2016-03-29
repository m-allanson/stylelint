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

    root.walkDecls(function (decl) {
      var prop = decl.prop;

      // Make sure there's a vendor prefix,
      // but this isn't a custom property
      if (prop[0] !== "-" || prop[1] === "-") {
        return;
      }

      if (_utils.isAutoprefixable.property(prop)) {
        (0, _utils.report)({
          message: messages.rejected(prop),
          node: decl,
          result: result,
          ruleName: ruleName
        });
      }
    });
  };
};

var _utils = require("../../utils");

var ruleName = exports.ruleName = "property-no-vendor-prefix";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  rejected: function rejected(p) {
    return "Unexpected vendor-prefixed property \"" + p + "\"";
  }
});