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
    code: "a { color: pink; }"
  }, {
    code: "a { color: pink; }"
  }, {
    code: "a::before { content: \";a\"; }"
  }, {
    code: "a { color: pink; top: 0;}",
    description: "no space between trailing semicolon and closing brace"
  }, {
    code: "a { color: pink; top: 0}"
  }],

  reject: [{
    code: "a { color: pink;top: 0; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 17
  }, {
    code: "a { color: pink;  top: 0; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 17
  }, {
    code: "a { color: pink;\ntop: 0; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 17
  }, {
    code: "a { color: pink;\r\ntop: 0; }",
    description: "CRLF",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 17
  }, {
    code: "a { color: pink;\ttop: 0; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 17
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-single-line"],

  accept: [{
    code: "a { color: pink; }"
  }, {
    code: "a::before { content: \";a\"; }"
  }, {
    code: "a { color: pink; top: 0;}",
    description: "no space between trailing semicolon and closing brace"
  }, {
    code: "a,\nb { color: pink; top: 0; }",
    description: "multi-line rule, single-line declaration-block"
  }, {
    code: "a,\r\nb { color: pink; top: 0; }",
    description: "multi-line rule, single-line declaration-block and CRLF"
  }, {
    code: "a {\n  color: pink;\n  top: 0;\n}"
  }, {
    code: "a {\r\n  color: pink;\r\n  top: 0;\r\n}",
    description: "CRLF"
  }],

  reject: [{
    code: "a { color: pink;top: 0; }",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 17
  }, {
    code: "a,\nb { color: pink;top: 0; }",
    message: _.messages.expectedAfterSingleLine(),
    line: 2,
    column: 17
  }, {
    code: "a,\r\nb { color: pink;top: 0; }",
    description: "CRLF",
    message: _.messages.expectedAfterSingleLine(),
    line: 2,
    column: 17
  }, {
    code: "a { color: pink;  top: 0; }",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 17
  }, {
    code: "a { color: pink;\ttop: 0; }",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 17
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-single-line"],

  accept: [{
    code: "a { color: pink; }"
  }, {
    code: "a::before { content: \"; a\"; }"
  }, {
    code: "a { color: pink;top: 0; }",
    description: "space between trailing semicolon and closing brace"
  }, {
    code: "a,\nb { color: pink;top: 0; }",
    description: "multi-line rule, single-line declaration-block"
  }, {
    code: "a {\n  color: pink; top: 0;\n}"
  }, {
    code: "a {\r\n  color: pink; top: 0;\r\n}",
    description: "CRLF"
  }],

  reject: [{
    code: "a { color: pink; top: 0; }",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 17
  }, {
    code: "a,\nb { color: pink; top: 0; }",
    message: _.messages.rejectedAfterSingleLine(),
    line: 2,
    column: 17
  }, {
    code: "a,\r\nb { color: pink; top: 0; }",
    description: "CRLF",
    message: _.messages.rejectedAfterSingleLine(),
    line: 2,
    column: 17
  }, {
    code: "a { color: pink;  top: 0; }",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 17
  }, {
    code: "a { color: pink;\ttop: 0; }",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 17
  }]
});