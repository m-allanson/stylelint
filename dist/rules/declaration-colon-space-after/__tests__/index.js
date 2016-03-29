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
    code: "a { color: pink }",
    description: "space only after"
  }, {
    code: "a { color : pink }",
    description: "space before and after"
  }, {
    code: "a { color\n: pink }",
    description: "newline before and space after"
  }, {
    code: "a { color\r\n: pink }",
    description: "CRLF before and space after"
  }, {
    code: "$map:(key:value)",
    description: "SCSS map with no newlines"
  }, {
    code: "a { background: url(data:application/font-woff;...); }",
    description: "data URI"
  }],

  reject: [{
    code: "a { color :pink; }",
    description: "no space after",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 11
  }, {
    code: "a { color :  pink; }",
    description: "two spaces after",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 11
  }, {
    code: "a { color :\tpink; }",
    description: "tab after",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 11
  }, {
    code: "a { color :\npink; }",
    description: "newline after",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 11
  }, {
    code: "a { color :\r\npink; }",
    description: "CRLF after",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 11
  }, {
    code: "a { color:pink; }",
    description: "no space after",
    message: _.messages.expectedAfter(),
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
    code: "a { color :pink }",
    description: "space before and no space after"
  }, {
    code: "a { color\n:pink }",
    description: "newline before and no space after"
  }, {
    code: "a { color\r\n:pink }",
    description: "CRLF before and no space after"
  }, {
    code: "$map: (key: value)",
    description: "SCSS map with no newlines"
  }],

  reject: [{
    code: "a { color : pink; }",
    description: "space after",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 11
  }, {
    code: "a { color:  pink; }",
    description: "two spaces after",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 11
  }, {
    code: "a { color :\tpink; }",
    description: "tab after",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 11
  }, {
    code: "a { color :\npink; }",
    description: "newline after",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 11
  }, {
    code: "a { color :\r\npink; }",
    description: "CRLF after",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 11
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-single-line"],

  accept: [{
    code: "a { color: pink }",
    description: "space only after single-line"
  }, {
    code: "a { transition: color 1s,\n\twidth 2s; }",
    description: "space after mult-line"
  }, {
    code: "a { transition:color 1s,\n\twidth 2s; }",
    description: "no space after mult-line"
  }, {
    code: "a { transition:color 1s,\r\n\twidth 2s; }",
    description: "no space after mult-line CRLF"
  }, {
    code: "a { transition:\tcolor 1s,\n\twidth 2s; }",
    description: "tab after mult-line"
  }],

  reject: [{
    code: "a { color :pink; }",
    description: "no space after single-line",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 11
  }, {
    code: "a { color :  pink; }",
    description: "two spaces after single-line",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 11
  }, {
    code: "a { color :\tpink; }",
    description: "tab after single-line",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 11
  }, {
    code: "a { color :\npink; }",
    description: "newline after single-line",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 11
  }, {
    code: "a { color :\r\npink; }",
    description: "CRLF after single-line",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 11
  }, {
    code: "a { color:pink; }",
    description: "no space after",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 11
  }]
});