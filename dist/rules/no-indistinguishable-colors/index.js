"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (on, options) {
  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, { actual: on }, {
      optional: true,
      actual: options,
      possible: {
        ignore: _utils.isValidHex,
        threshold: function threshold(x) {
          return (0, _lodash.isNumber)(x) && x >= 0 && x <= 100;
        },
        whitelist: function whitelist(x) {
          return (0, _lodash.isArray)(x) && x.every(_utils.isValidHex);
        }
      }
    });
    if (!validOptions) {
      return;
    }

    var colorguardResult = new _result2.default();
    (0, _colorguard2.default)(options)(root, colorguardResult);
    colorguardResult.warnings().forEach(function (colorguardWarning) {
      var message = messages.rejected(colorguardWarning.secondColor, colorguardWarning.firstColor);
      (0, _utils.report)({
        ruleName: ruleName,
        result: result,
        message: message,
        node: colorguardWarning.node,
        index: colorguardWarning.node.toString().indexOf(colorguardWarning.secondColor)
      });
    });
  };
};

var _colorguard = require("colorguard");

var _colorguard2 = _interopRequireDefault(_colorguard);

var _lodash = require("lodash");

var _result = require("postcss/lib/result");

var _result2 = _interopRequireDefault(_result);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleName = exports.ruleName = "no-indistinguishable-colors";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  rejected: function rejected(a, b) {
    return "Unexpected almost identical colors: \"" + a + "\" and \"" + b + "\"";
  }
});