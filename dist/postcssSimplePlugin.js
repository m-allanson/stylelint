"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _lodash = require("lodash");

var _utils = require("./utils");

var _rules = require("./rules");

var _rules2 = _interopRequireDefault(_rules);

var _disableRanges = require("./disableRanges");

var _disableRanges2 = _interopRequireDefault(_disableRanges);

var _normalizeRuleSettings = require("./normalizeRuleSettings");

var _normalizeRuleSettings2 = _interopRequireDefault(_normalizeRuleSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _postcss2.default.plugin("stylelint", function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return function (root, result) {
    var config = options.config;

    // result.stylelint is the namespace for passing stylelint-related
    // configuration and data across sub-plugins via the PostCSS Result
    result.stylelint = result.stylelint || {};
    result.stylelint.ruleSeverities = {};
    result.stylelint.customMessages = {};

    if (!config) {
      throw (0, _utils.configurationError)("No configuration provided");
    }

    if (!config.rules) {
      throw (0, _utils.configurationError)("No rules found within configuration. Have you provided a \"rules\" property?");
    }

    // Register details about the configuration
    result.stylelint.quiet = config.quiet;

    // First check for disabled ranges, adding them to the result object
    (0, _disableRanges2.default)(root, result);

    Object.keys(config.rules).forEach(function (ruleName) {
      if (!_rules2.default[ruleName]) {
        throw (0, _utils.configurationError)("Undefined rule \"" + ruleName + "\"");
      }

      var rawRuleSettings = config.rules[ruleName];
      var ruleSettings = (0, _normalizeRuleSettings2.default)(rawRuleSettings, ruleName);
      var primaryOption = ruleSettings[0];
      var secondaryOptions = ruleSettings[1];

      // Ignore the rule
      if (primaryOption === null) {
        return;
      }

      // Log the rule's severity in the PostCSS result
      result.stylelint.ruleSeverities[ruleName] = (0, _lodash.get)(secondaryOptions, "severity", "error");
      result.stylelint.customMessages[ruleName] = secondaryOptions && secondaryOptions.message;

      // Run the rule with the primary and secondary options
      _rules2.default[ruleName](primaryOption, secondaryOptions)(root, result);
    });
  };
});