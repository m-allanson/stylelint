"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always"],

  accept: [{
    code: "a { color: pink; }",
    description: "single-line declaration block with trailing semicolon"
  }, {
    code: "a { background: orange; color: pink; }",
    description: "multi-line declaration block with trailing semicolon"
  }, {
    code: "a {{ &:hover { color: pink; }}}",
    description: "nesting without first-level decl"
  }, {
    code: "a { color: red; { &:hover { color: pink; }}}",
    description: "nesting with first-level decl"
  }, {
    code: "a { &:hover { color: pink; }}",
    description: "nested"
  }],

  reject: [{
    code: "a { color: pink }",
    description: "single-line declaration block without trailing semicolon",
    message: _.messages.expected,
    line: 1,
    column: 16
  }, {
    code: "a { background: orange; color: pink }",
    description: "multi-line declaration block without trailing semicolon",
    message: _.messages.expected,
    line: 1,
    column: 36
  }, {
    code: "a {{ &:hover { color: pink }}}",
    description: "nesting without first-level decl",
    message: _.messages.expected,
    line: 1,
    column: 27
  }, {
    code: "a { color: red; { &:hover { color: pink }}}",
    description: "nesting with first-level decl",
    message: _.messages.expected,
    line: 1,
    column: 40
  }, {
    code: "a { &:hover { color: pink }}",
    description: "nested",
    message: _.messages.expected,
    line: 1,
    column: 26
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never"],

  accept: [{
    code: "a { color: pink }",
    description: "single-line declaration block without trailing semicolon"
  }, {
    code: "a { background: orange; color: pink }",
    description: "multi-line declaration block without trailing semicolon"
  }],

  reject: [{
    code: "a { color: pink; }",
    description: "single-line declaration block with trailing semicolon",
    message: _.messages.rejected,
    line: 1,
    column: 16
  }, {
    code: "a { background: orange; color: pink; }",
    description: "multi-line declaration block with trailing semicolon",
    message: _.messages.rejected,
    line: 1,
    column: 36
  }]
});