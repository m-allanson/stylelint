"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [undefined],

  accept: [{
    code: "a { /* color: pink; */ }",
    description: "regular comment around declaration"
  }, {
    code: "/* a { color: pink; } */",
    description: "regular comment around rule"
  }, {
    code: "a { background: url(//foo.com/bar.png) }",
    description: "url with double slash"
  }],

  reject: [{
    code: "a { // color: pink; }",
    description: "before declaration",
    message: _.messages.rejected,
    line: 1,
    column: 5
  }, {
    code: "// a { color: pink; }",
    description: "before rule",
    message: _.messages.rejected,
    line: 1,
    column: 1
  }, {
    code: "a, // div { color: pink; }",
    description: "between rules",
    message: _.messages.rejected,
    line: 1,
    column: 1
  }, {
    code: "// @media { }",
    description: "before media rule",
    message: _.messages.rejected,
    line: 1,
    column: 1
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [undefined],
  skipBasicChecks: true,
  syntax: "scss",

  accept: [{
    code: "// a { color: pink }",
    description: "single-line comment ignored"
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [undefined],
  skipBasicChecks: true,
  syntax: "scss",

  accept: [{
    code: "a { \n// color: pink;\n }",
    description: "single-line comment ignored"
  }]
});