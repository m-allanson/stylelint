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
    code: "@media screen and (color)\n, projection and (color) {}"
  }, {
    code: "@media screen and (color)\r\n, projection and (color) {}",
    description: "CRLF"
  }, {
    code: "@media screen and (color)\n     ,  projection and (color) {}"
  }, {
    code: "@media screen and (color)\n\t\t,\nprojection and (color) {}",
    description: "indentation after the newline before the comma"
  }, {
    code: "@media screen and (color)\r\n\t\t,\r\nprojection and (color) {}",
    description: "indentation after the CRLF before the comma"
  }, {
    code: "@media screen and (color)\n\n, projection and (color)"
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
    code: "@media screen and (color)\t, projection and (color)",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 27
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-multi-line"],

  accept: [{
    code: "@media screen and (color)\n, projection and (color) {}",
    description: "multi-line list, single-line block"
  }, {
    code: "@media screen and (color)\r\n, projection and (color) {}",
    description: "multi-line list, single-line block and CRLF"
  }, {
    code: "@media screen and (color)\n, projection and (color) {\n}",
    description: "multi-line list, multi-line block"
  }, {
    code: "@media screen and (color),projection and (color) {}",
    description: "ignore single line list, single-lint block"
  }, {
    code: "@media screen and (color),projection and (color) {\n}",
    description: "ignore single line list, multi-line block"
  }],

  reject: [{
    code: "@media screen and (color),projection and (color)\n, print {}",
    message: _.messages.expectedBeforeMultiLine(),
    line: 1,
    column: 26
  }, {
    code: "@media screen and (color),projection and (color)\r\n, print {}",
    description: "CRLF",
    message: _.messages.expectedBeforeMultiLine(),
    line: 1,
    column: 26
  }, {
    code: "@media screen and (color),projection and (color)\n, print {\n}",
    message: _.messages.expectedBeforeMultiLine(),
    line: 1,
    column: 26
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-multi-line"],

  accept: [{
    code: "@media screen and (color),\nprojection and (color) {}",
    description: "multi-line list, single-line block"
  }, {
    code: "@media screen and (color),\nprojection and (color) {\n}",
    description: "multi-line list, multi-line block"
  }, {
    code: "@media screen and (color),\r\nprojection and (color) {\r\n}",
    description: "multi-line list, multi-line block and CRLF"
  }, {
    code: "@media screen and (color) ,projection and (color) {}",
    description: "ignore single line list, single-lint block"
  }, {
    code: "@media screen and (color) ,projection and (color) {\n}",
    description: "ignore single line list, multi-line block"
  }],

  reject: [{
    code: "@media screen and (color) ,projection and (color),\nprint {}",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 1,
    column: 27
  }, {
    code: "@media screen and (color) ,projection and (color),\nprint {\n}",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 1,
    column: 27
  }, {
    code: "@media screen and (color) ,projection and (color),\r\nprint {\r\n}",
    description: "CRLF",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 1,
    column: 27
  }]
});