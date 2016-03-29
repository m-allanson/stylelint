"use strict";

var _postcssPlugin = require("./postcssPlugin");

var _postcssPlugin2 = _interopRequireDefault(_postcssPlugin);

var _standalone = require("./standalone");

var _standalone2 = _interopRequireDefault(_standalone);

var _createPlugin = require("./createPlugin");

var _createPlugin2 = _interopRequireDefault(_createPlugin);

var _rules = require("./rules");

var _rules2 = _interopRequireDefault(_rules);

var _utils = require("./utils");

var _testUtils = require("./testUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stylelint = _postcssPlugin2.default;

stylelint.utils = {
  report: _utils.report,
  ruleMessages: _utils.ruleMessages,
  styleSearch: _utils.styleSearch,
  validateOptions: _utils.validateOptions
};

stylelint.lint = _standalone2.default;
stylelint.rules = _rules2.default;
stylelint.createPlugin = _createPlugin2.default;
stylelint.createRuleTester = _testUtils.createRuleTester;

module.exports = stylelint;