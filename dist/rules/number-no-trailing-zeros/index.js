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
      check(decl.toString(), decl);
    });

    root.walkAtRules(function (atRule) {

      // Ignore @imports
      if (atRule.name === "import") {
        return;
      }

      var source = (0, _utils.cssStatementHasBlock)(atRule) ? (0, _utils.cssStatementStringBeforeBlock)(atRule, { noBefore: true }) : atRule.toString();
      check(source, atRule);
    });

    function check(source, node) {
      // Get out quickly if there are no periods
      if (source.indexOf(".") === -1) {
        return;
      }

      var sanitizedSource = (0, _utils.blurComments)((0, _utils.blurFunctionArguments)(source, "url"));
      var errors = (0, _execall2.default)(/\.\d*0+(?:\D|$)/g, sanitizedSource);
      if (!errors.length) {
        return;
      }

      errors.forEach(function (error) {
        (0, _utils.report)({
          message: messages.rejected,
          node: node,
          index: error.index + error.match.length - 2,
          result: result,
          ruleName: ruleName
        });
      });
    }
  };
};

var _execall = require("execall");

var _execall2 = _interopRequireDefault(_execall);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleName = exports.ruleName = "number-no-trailing-zeros";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  rejected: "Unexpected trailing zero(s)"
});