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
    code: "a\n,b {}"
  }, {
    code: "a\n,b\n,c {}"
  }, {
    code: "a\r\n,b\r\n,c {}",
    description: "CRLF"
  }, {
    code: "a\n, b {}"
  }, {
    code: "a\n,\nb {}"
  }, {
    code: "a\r\n,\r\nb {}",
    description: "CRLF"
  }, {
    code: "a\n,b[data-foo=\"tr,tr\"] {}"
  }, {
    code: "a\n    ,b {}",
    description: "indentation after the newline before the comma"
  }, {
    code: "a\r\n    ,b {}",
    description: "indentation after the CRLF before the comma"
  }, {
    code: "a\n\t\t,b {}",
    description: "indentation after the newline before the comma"
  }, {
    code: "\ta\n\t, b {}",
    description: "indented statement"
  }, {
    code: "a:matches(:hover, :focus) {}",
    description: "comma inside :matches()"
  }, {
    code: ":not(:hover, :focus) {}",
    description: "comma inside :not()"
  }],

  reject: [{
    code: "a,b {}",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 2
  }, {
    code: "a ,b {}",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 3
  }, {
    code: "a  ,b {}",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 4
  }, {
    code: "a\t,b {}",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 3
  }, {
    code: "a\n,b,c {}",
    message: _.messages.expectedBefore(),
    line: 2,
    column: 3
  }, {
    code: "a\r\n,b,c {}",
    description: "CRLF",
    message: _.messages.expectedBefore(),
    line: 2,
    column: 3
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-multi-line"],

  accept: [{
    code: "a\n,b {}"
  }, {
    code: "a\r\n,b {}",
    description: "CRLF"
  }, {
    code: "a, b {}",
    description: "ignores single-line"
  }, {
    code: "a, b {\n}",
    description: "ignores single-line selector list, multi-line block"
  }, {
    code: "\ta\n\t, b {\n}",
    description: "indented statement"
  }],

  reject: [{
    code: "a\n,b, c {}",
    message: _.messages.expectedBeforeMultiLine(),
    line: 2,
    column: 3
  }, {
    code: "a\r\n,b, c {}",
    description: "CRLF",
    message: _.messages.expectedBeforeMultiLine(),
    line: 2,
    column: 3
  }, {
    code: "a\n,b, c {\n}",
    message: _.messages.expectedBeforeMultiLine(),
    line: 2,
    column: 3
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-multi-line"],

  accept: [{
    code: "a,\nb {}"
  }, {
    code: "a ,b {}",
    description: "ignores single-line"
  }, {
    code: "a ,b {\n}",
    description: "ignores single-line selector list, multi-line block"
  }, {
    code: "a ,b {\r\n}",
    description: "ignores single-line selector list, multi-line block with CRLF"
  }, {
    code: "a:matches(:hover, :focus) {}",
    description: "comma inside :matches()"
  }, {
    code: ":not(:hover, :focus) {}",
    description: "comma inside :not()"
  }],

  reject: [{
    code: "a,\nb , c {}",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 3
  }, {
    code: "a,\nb , c {\n}",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 3
  }, {
    code: "a,\r\nb , c {\r\n}",
    description: "CRLF",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 3
  }]
});