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
    code: "a { color: pink !important; }",
    description: "space only before"
  }, {
    code: "a { color: pink ! important; }",
    description: "space before and after"
  }, {
    code: "a { color: pink !\optional; }",
    description: "space before and newline after"
  }, {
    code: "a { color: pink !\r\nimportant; }",
    description: "space before and CRLF after"
  }, {
    code: "a::before { content: \"!!!\" !default; }",
    description: "ignores string"
  }, {
    code: "a { color: pink/*!important */;}",
    description: "violating comment"
  }],

  reject: [{
    code: "a { color: pink  !important; }",
    description: "two spaces before",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 18
  }, {
    code: "a { color: pink!default; }",
    description: "no space before",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 16
  }, {
    code: "a { color: pink\n!important; }",
    description: "newline before",
    message: _.messages.expectedBefore(),
    line: 2,
    column: 1
  }, {
    code: "a { color: pink\r\n!something; }",
    description: "CRLF before",
    message: _.messages.expectedBefore(),
    line: 2,
    column: 1
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
    description: "no spaces"
  }, {
    code: "a { color: pink! important; }",
    description: "no space before and after"
  }, {
    code: "a { color: pink!\nimportant; }",
    description: "no space before and newline after"
  }, {
    code: "a { color: pink!\r\nimportant; }",
    description: "no space before and CRLF after"
  }],

  reject: [{
    code: "a { color: pink !important; }",
    description: "space before",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 17
  }, {
    code: "a { color: pink\n!important; }",
    description: "newline before",
    message: _.messages.rejectedBefore(),
    line: 2,
    column: 1
  }, {
    code: "a { color: pink\r\n!important; }",
    description: "CRLF before",
    message: _.messages.rejectedBefore(),
    line: 2,
    column: 1
  }]
});