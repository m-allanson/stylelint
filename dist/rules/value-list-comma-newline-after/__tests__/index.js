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
    code: "a { background-size: 0,\n0; }"
  }, {
    code: "a { background-size: 0 ,\n  0; }"
  }, {
    code: "a { background-size: 0 ,\r\n  0; }",
    description: "CRLF"
  }, {
    code: "a::before { content: \"foo,bar,baz\"; }",
    description: "string"
  }, {
    code: "a { transform: translate(1,1); }",
    description: "ignores function"
  }],

  reject: [{
    code: "a { background-size: 0, 0; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 23
  }, {
    code: "a { background-size: 0,  0; }",
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
  config: ["always-multi-line"],

  accept: [{
    code: "a { background-size: 0,\n0,\n0; }"
  }, {
    code: "a { background-size: 0 ,\n  0,\n0; }"
  }, {
    code: "a { background-size: 0 ,\r\n  0,\r\n0; }",
    description: "CRLF"
  }, {
    code: "a { background-size: 0, 0; }",
    description: "ignores single-line"
  }, {
    code: "a { background-size: 0, 0;\n}",
    description: "ignores single-line list, multi-line block"
  }, {
    code: "a { background-size: 0, 0;\r\n}",
    description: "ignores single-line list, multi-line block with CRLF"
  }],

  reject: [{
    code: "a { background-size: 0,\n0, 0; }",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 2
  }, {
    code: "a { background-size: 0,\n0,  0; }",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 2
  }, {
    code: "a { background-size: 0,\n0,\t0; }",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 2
  }, {
    code: "a { background-size: 0,\r\n0,\t0; }",
    description: "CRLF",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 2
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-multi-line"],

  accept: [{
    code: "a { background-size: 0\n,0\n,0; }"
  }, {
    code: "a { background-size: 0\r\n,0\r\n,0; }",
    description: "CRLF"
  }, {
    code: "a { background-size: 0, 0; }",
    description: "ignores single-line"
  }, {
    code: "a { background-size: 0, 0;\n}",
    description: "ignores single-line list, multi-line block"
  }, {
    code: "a { background-size: 0, 0;\r\n}",
    description: "ignores single-line list, multi-line block with CRLF"
  }],

  reject: [{
    code: "a { background-size: 0\n,0\n, 0; }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 3,
    column: 1
  }, {
    code: "a { background-size: 0\n,0\n,  0; }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 3,
    column: 1
  }, {
    code: "a { background-size: 0\r\n,0\r\n,  0; }",
    description: "CRLF",
    message: _.messages.rejectedAfterMultiLine(),
    line: 3,
    column: 1
  }, {
    code: "a { background-size: 0\n,0\n,\t0; }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 3,
    column: 1
  }]
});