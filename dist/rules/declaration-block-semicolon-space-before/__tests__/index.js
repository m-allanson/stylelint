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
    code: "color: pink ;",
    description: "declaration on root"
  }, {
    code: "a { color: pink ; }"
  }, {
    code: "a::before { content: \";a\" ; }"
  }, {
    code: "a { color: pink ; top: 0 ; }"
  }, {
    code: "a { color: pink ; top: 0}"
  }],

  reject: [{
    code: "a { color: pink; }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 15
  }, {
    code: "a { color: pink  ; }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 17
  }, {
    code: "a { color: pink\t; }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 16
  }, {
    code: "a { color: pink\n; }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 16
  }, {
    code: "a { color: pink\r\n; }",
    description: "CRLF",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 17
  }, {
    code: "a { color: pink ; top: 0; }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 24
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never"],

  accept: [{
    code: "color: pink;",
    description: "declaration on root"
  }, {
    code: "a { color: pink; }"
  }, {
    code: "a::before { content: \";a\"; }"
  }, {
    code: "a { color: pink; top: 0; }"
  }],

  reject: [{
    code: "a { color: pink ; }",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 16
  }, {
    code: "a { color: pink  ; }",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 17
  }, {
    code: "a { color: pink\t; }",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 16
  }, {
    code: "a { color: pink\n; }",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 16
  }, {
    code: "a { color: pink\r\n; }",
    description: "CRLF",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 17
  }, {
    code: "a { color: pink; top: 0 ; }",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 24
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-single-line"],

  accept: [{
    code: "color: pink ;",
    description: "declaration on root"
  }, {
    code: "a { color: pink ; }"
  }, {
    code: "a::before { content: \";a\" ; }"
  }, {
    code: "a { color: pink ; top: 0 ; }"
  }, {
    code: "a,\nb { color: pink ; top: 0 ; }",
    description: "multi-line rule, single-line declaration-block"
  }, {
    code: "a {\n  color: pink;\n  top: 0;\n}"
  }, {
    code: "a {\r\n  color: pink;\r\n  top: 0;\r\n}",
    description: "CRLF"
  }],

  reject: [{
    code: "a { color: pink; }",
    message: _.messages.expectedBeforeSingleLine(),
    line: 1,
    column: 15
  }, {
    code: "a,\nb { color: pink; }",
    message: _.messages.expectedBeforeSingleLine(),
    line: 2,
    column: 15
  }, {
    code: "a,\r\nb { color: pink; }",
    description: "CRLF",
    message: _.messages.expectedBeforeSingleLine(),
    line: 2,
    column: 15
  }, {
    code: "a { color: pink  ; }",
    message: _.messages.expectedBeforeSingleLine(),
    line: 1,
    column: 17
  }, {
    code: "a { color: pink\t; }",
    message: _.messages.expectedBeforeSingleLine(),
    line: 1,
    column: 16
  }, {
    code: "a { color: pink ; top: 0; }",
    message: _.messages.expectedBeforeSingleLine(),
    line: 1,
    column: 24
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-single-line"],

  accept: [{
    code: "color: pink;",
    description: "declaration on root"
  }, {
    code: "a { color: pink; }"
  }, {
    code: "a::before { content: \";a\"; }"
  }, {
    code: "a { color: pink; top: 0; }"
  }, {
    code: "a,\nb { color: pink; top: 0; }",
    description: "multi-line rule, single-line declaration-block"
  }, {
    code: "a {\n  color: pink ;\n  top: 0 ;\n}"
  }],

  reject: [{
    code: "a { color: pink ; }",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 16
  }, {
    code: "a,\nb { color: pink ; }",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 2,
    column: 16
  }, {
    code: "a,\r\nb { color: pink ; }",
    description: "CRLF",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 2,
    column: 16
  }, {
    code: "a { color: pink  ; }",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 17
  }, {
    code: "a { color: pink\t; }",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 16
  }, {
    code: "a { color: pink; top: 0 ; }",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 24
  }]
});