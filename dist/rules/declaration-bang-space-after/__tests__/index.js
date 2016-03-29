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
    description: "no !important"
  }, {
    code: "a { color: pink! important; }",
    description: "space only after"
  }, {
    code: "a { color: pink ! default; }",
    description: "space before and after"
  }, {
    code: "a { color: pink\n! important; }",
    description: "newline before and space after"
  }, {
    code: "a { color: pink\r\n! optional; }",
    description: "CRLF before and space after"
  }, {
    code: "a::before { content: \"!!!\" ! important; }",
    description: "ignores string"
  }, {
    code: "a { color: pink /* !important */;}",
    description: "violating comment"
  }],

  reject: [{
    code: "a { color: pink!important; }",
    description: "no space after",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 16
  }, {
    code: "a { color: pink!  global; }",
    description: "two spaces after",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 16
  }, {
    code: "a { color: pink!\nimportant; }",
    description: "newline after",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 16
  }, {
    code: "a { color: pink!\r\nexciting; }",
    description: "CRLF after",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 16
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never"],

  accept: [{
    code: "a { color: pink; }",
    description: "no !important"
  }, {
    code: "a { color: pink!important; }",
    description: "no space before or after"
  }, {
    code: "a { color: pink !important; }",
    description: "space before and none after"
  }, {
    code: "a { color: pink\n!important; }",
    description: "newline before and none after"
  }, {
    code: "a { color: pink\r\n!important; }",
    description: "CRLF before and none after"
  }],

  reject: [{
    code: "a { color: pink! important; }",
    description: "space after",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 16
  }, {
    code: "a { color: pink!\nimportant; }",
    description: "newline after",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 16
  }, {
    code: "a { color: pink!\r\nimportant; }",
    description: "CRLF after",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 16
  }]
});