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
    code: "a { color :pink }",
    description: "space only before"
  }, {
    code: "a { color : pink }",
    description: "space before and after"
  }, {
    code: "a { color :\npink }",
    description: "space before and newline after"
  }, {
    code: "a { color :\r\npink }",
    description: "space before and CRLF after"
  }, {
    code: "$map:(key:value)",
    description: "SCSS map with no newlines"
  }, {
    code: "a { background : url(data:application/font-woff;...); }",
    description: "data URI"
  }],

  reject: [{
    code: "a { color: pink; }",
    description: "no space before",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 11
  }, {
    code: "a { color  : pink; }",
    description: "two spaces before",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 11
  }, {
    code: "a { color\t: pink; }",
    description: "tab before",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 11
  }, {
    code: "a { color\n: pink; }",
    description: "newline before",
    message: _.messages.expectedBefore(),
    line: 2,
    column: 1
  }, {
    code: "a { color\r\n: pink; }",
    description: "CRLF before",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 11
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never"],

  accept: [{
    code: "a { color:pink }",
    description: "no space before and after"
  }, {
    code: "a { color: pink }",
    description: "no space before and space after"
  }, {
    code: "a { color:\npink }",
    description: "no space before and newline after"
  }, {
    code: "a { color:\r\npink }",
    description: "no space before and CRLF after"
  }, {
    code: "$map :(key :value)",
    description: "SCSS map with no newlines"
  }],

  reject: [{
    code: "a { color : pink; }",
    description: "space before",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 11
  }, {
    code: "a { color  : pink; }",
    description: "two spaces before",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 11
  }, {
    code: "a { color\t: pink; }",
    description: "tab before",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 11
  }, {
    code: "a { color\n: pink; }",
    description: "newline before",
    message: _.messages.rejectedBefore(),
    line: 2,
    column: 1
  }, {
    code: "a { color\r\n: pink; }",
    description: "CRLF before",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 11
  }]
});