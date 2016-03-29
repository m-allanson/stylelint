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
    code: "a { background-size: 0 , 0; }"
  }, {
    code: "a { background-size: 0 ,0; }"
  }, {
    code: "a::before { content: \"foo,bar,baz\"; }",
    description: "strings"
  }, {
    code: "a { transform: translate(1,1); }",
    description: "function arguments"
  }],

  reject: [{
    code: "a { background-size: 0, 0; }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 23
  }, {
    code: "a { background-size: 0  , 0; }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 25
  }, {
    code: "a { background-size: 0\n, 0; }",
    message: _.messages.expectedBefore(),
    line: 2,
    column: 1
  }, {
    code: "a { background-size: 0\r\n, 0; }",
    description: "CRLF",
    message: _.messages.expectedBefore(),
    line: 2,
    column: 1
  }, {
    code: "a { background-size: 0\t, 0; }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 24
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never"],

  accept: [{
    code: "a { background-size: 0, 0; }"
  }, {
    code: "a { background-size: 0,0; }"
  }, {
    code: "a::before { content: \"foo ,bar ,baz\"; }",
    description: "strings"
  }, {
    code: "a { transform: translate(1 ,1); }",
    description: "function arguments"
  }],

  reject: [{
    code: "a { background-size: 0 , 0; }",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 24
  }, {
    code: "a { background-size: 0  , 0; }",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 25
  }, {
    code: "a { background-size: 0\n, 0; }",
    message: _.messages.rejectedBefore(),
    line: 2,
    column: 1
  }, {
    code: "a { background-size: 0\r\n, 0; }",
    description: "CRLF",
    message: _.messages.rejectedBefore(),
    line: 2,
    column: 1
  }, {
    code: "a { background-size: 0\t, 0; }",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 24
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-single-line"],

  accept: [{
    code: "a { background-size: 0 , 0; }"
  }, {
    code: "a { background-size: 0 ,0; }"
  }, {
    code: "a { background-size: 0 ,0;\n}",
    description: "single-line list, multi-line block"
  }, {
    code: "a { background-size: 0 ,0;\r\n}",
    description: "single-line list, multi-line block with CRLF"
  }, {
    code: "a { background-size: 0,\n0; }",
    description: "ignores multi-line list"
  }, {
    code: "a { background-size: 0,\r\n0; }",
    description: "ignores multi-line list with CRLF"
  }, {
    code: "a::before { content: \"foo,bar,baz\"; }",
    description: "strings"
  }, {
    code: "a { transform: translate(1,1); }",
    description: "function arguments"
  }],

  reject: [{
    code: "a { background-size: 0, 0; }",
    message: _.messages.expectedBeforeSingleLine(),
    line: 1,
    column: 23
  }, {
    code: "a { background-size: 0, 0;\n}",
    message: _.messages.expectedBeforeSingleLine(),
    line: 1,
    column: 23
  }, {
    code: "a { background-size: 0, 0;\r\n}",
    description: "CRLF",
    message: _.messages.expectedBeforeSingleLine(),
    line: 1,
    column: 23
  }, {
    code: "a { background-size: 0  , 0; }",
    message: _.messages.expectedBeforeSingleLine(),
    line: 1,
    column: 25
  }, {
    code: "a { background-size: 0\t, 0; }",
    message: _.messages.expectedBeforeSingleLine(),
    line: 1,
    column: 24
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-single-line"],

  accept: [{
    code: "a { background-size: 0, 0; }"
  }, {
    code: "a { background-size: 0,0; }"
  }, {
    code: "a { background-size: 0,0;\n}",
    description: "single-line list, multi-line block"
  }, {
    code: "a { background-size: 0,0;\r\n}",
    description: "single-line list, multi-line block with CRLF"
  }, {
    code: "a { background-size: 0 ,\n0; }",
    description: "ignores multi-line list"
  }, {
    code: "a { background-size: 0 ,\r\n0; }",
    description: "ignores multi-line list with CRLF"
  }, {
    code: "a::before { content: \"foo ,bar ,baz\"; }",
    description: "strings"
  }, {
    code: "a { transform: translate(1 ,1); }",
    description: "function arguments"
  }],

  reject: [{
    code: "a { background-size: 0 , 0; }",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 24
  }, {
    code: "a { background-size: 0 , 0;\n}",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 24
  }, {
    code: "a { background-size: 0 , 0;\r\n}",
    description: "CRLF",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 24
  }, {
    code: "a { background-size: 0  , 0; }",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 25
  }, {
    code: "a { background-size: 0\t, 0; }",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 24
  }]
});