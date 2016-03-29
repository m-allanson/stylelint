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
    code: "@import url(x.com?a=b,c=d)"
  }, {
    code: "@media (max-width: 600px) {}"
  }, {
    code: "@media screen and (color) , projection and (color) {}"
  }, {
    code: "@media screen and (color) ,  projection and (color) {}"
  }, {
    code: "@media screen and (color) ,\nprojection and (color) {}"
  }, {
    code: "@media screen and (color) ,\r\nprojection and (color) {}",
    description: "CRLF"
  }],

  reject: [{
    code: "@media screen and (color), projection and (color)",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 26
  }, {
    code: "@media screen and (color)  , projection and (color)",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 28
  }, {
    code: "@media screen and (color)\n, projection and (color)",
    message: _.messages.expectedBefore(),
    line: 2,
    column: 1
  }, {
    code: "@media screen and (color)\r\n, projection and (color)",
    description: "CRLF",
    message: _.messages.expectedBefore(),
    line: 2,
    column: 1
  }, {
    code: "@media screen and (color)\t, projection and (color)",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 27
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never"],

  accept: [{
    code: "@import url(x.com?a=b ,c=d)"
  }, {
    code: "@media (max-width: 600px) {}"
  }, {
    code: "@media screen and (color),projection and (color) {}"
  }, {
    code: "@media screen and (color), projection and (color) {}"
  }, {
    code: "@media screen and (color),\nprojection and (color) {}"
  }, {
    code: "@media screen and (color),\r\nprojection and (color) {}",
    description: "CRLF"
  }],

  reject: [{
    code: "@media screen and (color) , projection and (color)",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 27
  }, {
    code: "@media screen and (color)  , projection and (color)",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 28
  }, {
    code: "@media screen and (color)\n, projection and (color)",
    message: _.messages.rejectedBefore(),
    line: 2,
    column: 1
  }, {
    code: "@media screen and (color)\r\n, projection and (color)",
    description: "CRLF",
    message: _.messages.rejectedBefore(),
    line: 2,
    column: 1
  }, {
    code: "@media screen and (color)\t, projection and (color)",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 27
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-single-line"],

  accept: [{
    code: "@media screen and (color) ,projection and (color) {}"
  }, {
    code: "@media screen and (color) ,projection and (color) {\n}",
    description: "single-line list, multi-line block"
  }, {
    code: "@media screen and (color) ,projection and (color) {\r\n}",
    description: "single-line list, multi-line block and CRLF"
  }, {
    code: "@media screen and (color),\nprojection and (color) {}",
    description: "ignore multi-line"
  }, {
    code: "@media screen and (color),\r\nprojection and (color) {}",
    description: "ignore multi-line"
  }],

  reject: [{
    code: "@media screen and (color), projection and (color) {}",
    message: _.messages.expectedBeforeSingleLine(),
    line: 1,
    column: 26
  }, {
    code: "@media screen and (color), projection and (color) {\n}",
    description: "single-line list, multi-line block",
    message: _.messages.expectedBeforeSingleLine(),
    line: 1,
    column: 26
  }, {
    code: "@media screen and (color), projection and (color) {\r\n}",
    description: "single-line list, multi-line block and CRLF",
    message: _.messages.expectedBeforeSingleLine(),
    line: 1,
    column: 26
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-single-line"],

  accept: [{
    code: "@media screen and (color), projection and (color) {}"
  }, {
    code: "@media screen and (color), projection and (color) {\n}",
    description: "single-line list, multi-line block"
  }, {
    code: "@media screen and (color), projection and (color) {\r\n}",
    description: "single-line list, multi-line block and CRLF"
  }, {
    code: "@media screen and (color)\n,projection and (color) {}",
    description: "ignore multi-line"
  }, {
    code: "@media screen and (color)\r\n,projection and (color) {}",
    description: "ignore multi-line and CRLF"
  }],

  reject: [{
    code: "@media screen and (color) ,projection and (color) {}",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 27
  }, {
    code: "@media screen and (color) ,projection and (color) {\n}",
    description: "single-line list, multi-line block",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 27
  }, {
    code: "@media screen and (color) ,projection and (color) {\r\n}",
    description: "single-line list, multi-line block and CRLF",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 27
  }]
});