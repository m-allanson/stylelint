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
    code: "@import url(x.css)"
  }, {
    code: "a {\ncolor: pink; }"
  }, {
    code: "a {\r\ncolor: pink; }",
    description: "CRLF"
  }, {
    code: "a{\ncolor: pink; }"
  }, {
    code: "a{\n\tcolor: pink; }"
  }, {
    code: "a{\n  color: pink; }"
  }, {
    code: "a{\r\n  color: pink; }",
    description: "CRLF"
  }, {
    code: "@media print {\na {\ncolor: pink; } }"
  }, {
    code: "@media print{\na{\ncolor: pink; } }"
  }, {
    code: "@media print{\r\na{\r\ncolor: pink; } }",
    description: "CRLF"
  }, {
    code: "@media print{\n\ta{\n  color: pink; } }"
  }, {
    code: "a { /* 1 */\n  color: pink;\n}",
    description: "end-of-line comment"
  }, {
    code: "a {    /* 1 */\n  color: pink;\n}",
    description: "end-of-line comment with multiple spaces before"
  }, {
    code: "a {\n  /* 1 */\n  color: pink;\n}",
    description: "next-line comment"
  }, {
    code: "a {\r\n  /* 1 */\r\n  color: pink;\r\n}",
    description: "next-line comment and CRLF"
  }],

  reject: [{
    code: "a { color: pink; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 4
  }, {
    code: "a {color: pink; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 4
  }, {
    code: "a {  color: pink; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 4
  }, {
    code: "a {\tcolor: pink; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 4
  }, {
    code: "@media print { a {\ncolor: pink; } }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 15
  }, {
    code: "@media print {\na { color: pink; } }",
    message: _.messages.expectedAfter(),
    line: 2,
    column: 4
  }, {
    code: "@media print {\r\na { color: pink; } }",
    description: "CRLF",
    message: _.messages.expectedAfter(),
    line: 2,
    column: 4
  }, {
    code: "a { /* 1 */ color: pink; }",
    description: "next node is comment without newline after",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 4
  }, {
    code: "a {\t/* 1 */ color: pink; }",
    description: "next node is comment with tab before",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 4
  }, {
    code: "a { /* 1\n2 */ color: pink; }",
    description: "next node is end-of-line comment containing newlines",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 4
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-multi-line"],

  accept: [{
    code: "a {\ncolor: pink; }"
  }, {
    code: "a {\n  color: pink;\n  background: orange; }"
  }, {
    code: "a {\r\n  color: pink;\r\n  background: orange; }",
    description: "CRLF"
  }, {
    code: "a{\ncolor: pink; }"
  }, {
    code: "a{\n\tcolor: pink; }"
  }, {
    code: "a{\n  color: pink; }"
  }, {
    code: "@media print {\na {\ncolor: pink; } }"
  }, {
    code: "@media print {\r\na {\r\ncolor: pink; } }",
    description: "CRLF"
  }, {
    code: "@media print{\na{\ncolor: pink; } }"
  }, {
    code: "@media print{\n\ta{\n  color: pink; } }"
  }, {
    code: "@media print{\r\n\ta{\r\n  color: pink; } }",
    description: "CRLF"
  }, {
    code: "a { color: pink; }"
  }, {
    code: "a {\tcolor: pink; }"
  }, {
    code: "a {  color: pink;  background: orange; }"
  }, {
    code: "a { /* 1 */ color: pink; }"
  }],

  reject: [{
    code: "a { color: pink;\nbackground: orange; }",
    message: _.messages.expectedAfterMultiLine(),
    line: 1,
    column: 4
  }, {
    code: "a {color: pink;\nbackground: orange; }",
    message: _.messages.expectedAfterMultiLine(),
    line: 1,
    column: 4
  }, {
    code: "a {  color: pink;\nbackground: orange; }",
    message: _.messages.expectedAfterMultiLine(),
    line: 1,
    column: 4
  }, {
    code: "a {\tcolor: pink;\nbackground: orange; }",
    message: _.messages.expectedAfterMultiLine(),
    line: 1,
    column: 4
  }, {
    code: "a {\tcolor: pink;\r\nbackground: orange; }",
    description: "CRLF",
    message: _.messages.expectedAfterMultiLine(),
    line: 1,
    column: 4
  }, {
    code: "@media print { a {\ncolor:\npink; } }",
    message: _.messages.expectedAfterMultiLine(),
    line: 1,
    column: 15
  }, {
    code: "@media print {\na { color:\npink; } }",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 4
  }, {
    code: "@media print {\r\na { color:\r\npink; } }",
    description: "CRLF",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 4
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-multi-line"],

  accept: [{
    code: "a {color: pink;\nbackground: orange; }"
  }, {
    code: "a {color: pink;\r\nbackground: orange; }",
    description: "CRLF"
  }, {
    code: "a{color: pink;\nbackground: orange; }"
  }, {
    code: "@media print {a {color: pink;\nbackground: orange; } }"
  }, {
    code: "@media print{a{color: pink;\nbackground: orange; } }"
  }, {
    code: "a { color: pink; }"
  }, {
    code: "a {  color: pink; }"
  }, {
    code: "a {\tcolor: pink; }"
  }, {
    code: "@media print { a { color: pink; } }"
  }, {
    code: "@media print {\ta {\tcolor: pink; } }"
  }],

  reject: [{
    code: "a { color: pink;\nbackground: orange; }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 1,
    column: 4
  }, {
    code: "a {\ncolor: pink;\nbackground: orange; }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 1,
    column: 4
  }, {
    code: "a {\r\ncolor: pink;\r\nbackground: orange; }",
    description: "CRLF",
    message: _.messages.rejectedAfterMultiLine(),
    line: 1,
    column: 4
  }, {
    code: "a {  color: pink;\nbackground: orange; }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 1,
    column: 4
  }, {
    code: "a {\tcolor: pink;\nbackground: orange; }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 1,
    column: 4
  }, {
    code: "@media print {\na {color: pink;\nbackground: orange; } }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 1,
    column: 15
  }, {
    code: "@media print {a {\ncolor: pink;\nbackground: orange; } }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 1,
    column: 18
  }]
});