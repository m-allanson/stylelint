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
    code: "a { background-size: 0, 0; }"
  }, {
    code: "a::before { content: \"foo,bar,baz\"; }",
    description: "strings"
  }, {
    code: "a { transform: translate(1,1); }",
    description: "function arguments"
  }],

  reject: [{
    code: "a { background-size: 0,0; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 23
  }, {
    code: "a { background-size:\n\t0,  0; }",
    message: _.messages.expectedAfter(),
    line: 2,
    column: 3
  }, {
    code: "a { background-size: 0,\n0; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 23
  }, {
    code: "a { background-size: 0,\r\n0; }",
    description: "CRLF",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 23
  }, {
    code: "a { background-size: 0,\t0; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 23
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never"],

  accept: [{
    code: "a { background-size: 0 ,0; }"
  }, {
    code: "a { background-size: 0,0; }"
  }, {
    code: "a::before { content: \"foo, bar, baz\"; }",
    description: "strings"
  }, {
    code: "a { transform: translate(1, 1); }",
    description: "function arguments"
  }],

  reject: [{
    code: "a { background-size: 0, 0; }",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 23
  }, {
    code: "a { background-size: 0,  0; }",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 23
  }, {
    code: "a { background-size: 0,\n0; }",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 23
  }, {
    code: "a { background-size: 0,\r\n0; }",
    description: "CRLF",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 23
  }, {
    code: "a { background-size: 0,\t0; }",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 23
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-single-line"],

  accept: [{
    code: "a { background-size: 0 , 0; }"
  }, {
    code: "a { background-size: 0, 0; }"
  }, {
    code: "a { background-size: 0, 0;\n}",
    description: "single-line list, multi-line block"
  }, {
    code: "a { background-size: 0, 0;\r\n}",
    description: "single-line list, multi-line block with CRLF"
  }, {
    code: "a { background-size: 0\n,0}",
    description: "ignores multi-line"
  }, {
    code: "a { background-size: 0\r\n,0}",
    description: "ignores multi-line with CRLF"
  }, {
    code: "a::before { content: \"foo,bar,baz\"; }",
    description: "strings"
  }, {
    code: "a { transform: translate(1,1); }",
    description: "function arguments"
  }],

  reject: [{
    code: "a { background-size: 0,0; }",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 23
  }, {
    code: "a { background-size: 0,0;\n}",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 23
  }, {
    code: "a { background-size: 0,0;\r\n}",
    description: "CRLF",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 23
  }, {
    code: "a { background-size: 0,  0; }",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 23
  }, {
    code: "a { background-size: 0,\t0; }",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 23
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-single-line"],

  accept: [{
    code: "a { background-size: 0 ,0; }"
  }, {
    code: "a { background-size: 0,0; }"
  }, {
    code: "a { background-size: 0,0;\n}",
    description: "single-line list, multi-line block"
  }, {
    code: "a { background-size: 0,0;\r\n}",
    description: "single-line list, multi-line block with CRLF"
  }, {
    code: "a { background-size: 0\n,  0}",
    description: "ignores multi-line values"
  }, {
    code: "a { background-size: 0\r\n,  0}",
    description: "ignores multi-line values with CRLF"
  }, {
    code: "a::before { content: \"foo, bar, baz\"; }",
    description: "strings"
  }, {
    code: "a { transform: translate(1, 1); }",
    description: "function arguments"
  }],

  reject: [{
    code: "a { background-size: 0, 0; }",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 23
  }, {
    code: "a { background-size: 0, 0;\n}",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 23
  }, {
    code: "a { background-size: 0, 0;\r\n}",
    description: "CRLF",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 23
  }, {
    code: "a { background-size: 0,  0; }",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 23
  }, {
    code: "a { background-size: 0,\t0; }",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 23
  }]
});