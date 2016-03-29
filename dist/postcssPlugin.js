"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _multimatch = require("multimatch");

var _multimatch2 = _interopRequireDefault(_multimatch);

var _globjoin = require("globjoin");

var _globjoin2 = _interopRequireDefault(_globjoin);

var _lodash = require("lodash");

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _utils = require("./utils");

var _rules = require("./rules");

var _rules2 = _interopRequireDefault(_rules);

var _disableRanges = require("./disableRanges");

var _disableRanges2 = _interopRequireDefault(_disableRanges);

var _buildConfig = require("./buildConfig");

var _buildConfig2 = _interopRequireDefault(_buildConfig);

var _normalizeRuleSettings = require("./normalizeRuleSettings");

var _normalizeRuleSettings2 = _interopRequireDefault(_normalizeRuleSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _postcss2.default.plugin("stylelint", function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return function (root, result) {
    var configPromise = (0, _buildConfig2.default)(options);

    // result.stylelint is the namespace for passing stylelint-related
    // configuration and data across sub-plugins via the PostCSS Result
    result.stylelint = result.stylelint || {};
    result.stylelint.ruleSeverities = {};
    result.stylelint.customMessages = {};

    return configPromise.then(function (_ref) {
      var config = _ref.config;
      var configDir = _ref.configDir;

      if (!config) {
        throw (0, _utils.configurationError)("No configuration provided");
      }

      if (!config.rules) {
        throw (0, _utils.configurationError)("No rules found within configuration. Have you provided a \"rules\" property?");
      }

      if (config.ignoreFiles) {
        var absoluteIgnoreFiles = [].concat(config.ignoreFiles).map(function (glob) {
          if (_path2.default.isAbsolute(glob)) return glob;
          return (0, _globjoin2.default)(configDir, glob);
        });
        var sourcePath = (0, _lodash.get)(root, "source.input.file", "");
        if ((0, _multimatch2.default)(sourcePath, absoluteIgnoreFiles).length) {
          return;
        }
      }

      if (config.plugins) {
        config.plugins.forEach(function (pluginPath) {
          var pluginImport = require(pluginPath);
          // Handle either ES6 or CommonJS modules
          var plugin = pluginImport.default || pluginImport;
          if (!plugin.ruleName) {
            throw (0, _utils.configurationError)("stylelint v3+ requires plugins to expose a ruleName. " + ("The plugin \"" + pluginPath + "\" is not doing this, so will not work ") + "with stylelint v3+. Please file an issue with the plugin.");
          }
          _rules2.default[plugin.ruleName] = plugin.rule;
        });
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
    });
  };
});