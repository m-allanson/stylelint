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
    code: "color: pink\n;",
    description: "declaration on root"
  }, {
    code: "a { color: pink\n; }"
  }, {
    code: "a::before { content: \";a\"\n; }"
  }, {
    code: "a { color: pink\n;top: 0 }"
  }, {
    code: "a { color: pink\n;top: 0}"
  }, {
    code: "a { color: pink\r\n;top: 0}",
    description: "CRLF"
  }, {
    code: "a,\nb { color: pink\n;top: 0}",
    description: "multi-line rule, multi-line declaration-block"
  }],

  reject: [{
    code: "a { color: pink;top: 0 }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 15
  }, {
    code: "a { color: pink ;top: 0 }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 16
  }, {
    code: "a { color: pink  ;top: 0 }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 17
  }, {
    code: "a { color: pink\t;top: 0 }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 16
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-multi-line"],

  accept: [{
    code: "color: pink\n;",
    description: "declaration on root"
  }, {
    code: "a {\ncolor: pink\n; }"
  }, {
    code: "a::before {\ncontent: \";a\"\n; }"
  }, {
    code: "a::before {\r\ncontent: \";a\"\r\n; }",
    description: "CRLF"
  }, {
    code: "a {\ncolor: pink\n;top: 0 }"
  }, {
    code: "a {\ncolor: pink\n;top: 0}"
  }, {
    code: "a {\r\ncolor: pink\r\n;top: 0}",
    description: "CRLF"
  }, {
    code: "a { color: pink;top: 0; }"
  }, {
    code: "a,\nb { color: pink; top: 0}",
    description: "multi-line rule, single-line declaration-block"
  }, {
    code: "a,\r\nb { color: pink; top: 0}",
    description: "multi-line rule, single-line declaration-block and CRLF"
  }],

  reject: [{
    code: "a {\ncolor: pink;top: 0\n}",
    message: _.messages.expectedBeforeMultiLine(),
    line: 2,
    column: 11
  }, {
    code: "a {\ncolor: pink ;top: 0\n}",
    message: _.messages.expectedBeforeMultiLine(),
    line: 2,
    column: 12
  }, {
    code: "a {\ncolor: pink  ;top: 0\n}",
    message: _.messages.expectedBeforeMultiLine(),
    line: 2,
    column: 13
  }, {
    code: "a {\r\ncolor: pink  ;top: 0\r\n}",
    description: "CRLF",
    message: _.messages.expectedBeforeMultiLine(),
    line: 2,
    column: 13
  }, {
    code: "a {\ncolor: pink\t;top: 0\n}",
    message: _.messages.expectedBeforeMultiLine(),
    line: 2,
    column: 12
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-multi-line"],

  accept: [{
    code: "color: pink;",
    description: "declaration on root"
  }, {
    code: "a {\ncolor: pink;\n}"
  }, {
    code: "a {\r\ncolor: pink;\r\n}",
    description: "CRLF"
  }, {
    code: "a::before {\ncontent: \";a\";\n}"
  }, {
    code: "a {\ncolor: pink;\ntop: 0 }"
  }, {
    code: "a {\ncolor: pink;\ntop: 0}"
  }, {
    code: "a {\r\ncolor: pink;\r\ntop: 0}",
    description: "CRLF"
  }, {
    code: "a { color: pink; top: 0; }"
  }, {
    code: "a,\nb { color: pink ;top: 0}",
    description: "multi-line rule, single-line declaration-block"
  }],

  reject: [{
    code: "a {\ncolor: pink\n;top: 0\n}",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 12
  }, {
    code: "a {\ncolor: pink ;top: 0\n}",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 12
  }, {
    code: "a {\r\ncolor: pink ;top: 0\r\n}",
    description: "CRLF",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 12
  }, {
    code: "a {\ncolor: pink  ;top: 0\n}",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 13
  }, {
    code: "a {\ncolor: pink\t;top: 0\n}",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 12
  }, {
    code: "a {\r\ncolor: pink\t;top: 0\r\n}",
    description: "CRLF",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 12
  }]
});