"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["single"],
  skipBasicChecks: true,

  accept: [{
    code: ""
  }, {
    code: "a {}"
  }, {
    code: "@import url(foo.css);"
  }, {
    code: "a { color: pink; }"
  }, {
    code: "a::before { content: 'foo'; }"
  }, {
    code: "a { background: url('foo'); }"
  }, {
    code: "a[id='foo'] {}"
  }, {
    code: "a::before { content: 'foo\"horse\"\'cow\''; }",
    description: "string in strings"
  }, {
    code: "a { /* \"horse\" */ }",
    description: "ignores comment"
  }],

  reject: [{
    code: "a::before { content: \"foo\"; }",
    message: _.messages.expected("single"),
    line: 1,
    column: 22
  }, {
    code: "a::before\n{\n  content: \"foo\";\n}",
    message: _.messages.expected("single"),
    line: 3,
    column: 12
  }, {
    code: "a[id=\"foo\"] {}",
    message: _.messages.expected("single"),
    line: 1,
    column: 6
  }, {
    code: "a\n{ background: url(\"foo\"); }",
    message: _.messages.expected("single"),
    line: 2,
    column: 19
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["double"],
  skipBasicChecks: true,

  accept: [{
    code: ""
  }, {
    code: "a {}"
  }, {
    code: "@import url(foo.css);"
  }, {
    code: "a { color: pink; }"
  }, {
    code: "a::before { content: \"foo\"; }"
  }, {
    code: "a { background: url(\"foo\"); }"
  }, {
    code: "a[id=\"foo\"] {}"
  }, {
    code: "a::before { content: \"foo\"horse\"'cow'\"; }",
    description: "string in strings"
  }, {
    code: "a { /* 'horse' */ }",
    description: "ignores comment"
  }],

  reject: [{
    code: "a::before { content: 'foo'; }",
    message: _.messages.expected("double"),
    line: 1,
    column: 22
  }, {
    code: "a::before\n{\n  content: 'foo';\n}",
    message: _.messages.expected("double"),
    line: 3,
    column: 12
  }, {
    code: "a[id='foo'] {}",
    message: _.messages.expected("double"),
    line: 1,
    column: 6
  }, {
    code: "a { background: url('foo'); }",
    message: _.messages.expected("double"),
    line: 1,
    column: 21
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["double"],
  skipBasicChecks: true,
  syntax: "scss",

  accept: [{
    code: "a {\n  // 'horse'\n}",
    description: "ignores single-line SCSS comment"
  }],

  reject: [{
    code: "a::before {\n  // 'horse'\n  content: 'thing'; }",
    description: "pays attention when single-line SCSS comment ends",
    message: _.messages.expected("double"),
    line: 3,
    column: 12
  }, {
    code: "a::before {\n// one\n// two\n// three\n  content: 'thing'; }",
    description: "accurate position after // comments",
    message: _.messages.expected("double"),
    line: 5,
    column: 12
  }]
});