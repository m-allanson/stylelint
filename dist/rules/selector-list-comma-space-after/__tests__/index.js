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
    code: "a, b {}"
  }, {
    code: "a, b, c {}"
  }, {
    code: "a , b {}"
  }, {
    code: "a\n, b {}"
  }, {
    code: "a\r\n, b {}",
    description: "CRLF"
  }, {
    code: "a, b[data-foo=\"tr,tr\"] {}",
    description: "string"
  }, {
    code: "a:matches(:hover,:focus) {}",
    description: "comma inside :matches()"
  }, {
    code: ":not(:hover,:focus) {}",
    description: "comma inside :not()"
  }],

  reject: [{
    code: "a,b {}",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 2
  }, {
    code: "a,  b {}",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 2
  }, {
    code: "a,\nb {}",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 2
  }, {
    code: "a,\r\nb {}",
    description: "CRLF",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 2
  }, {
    code: "a,\tb {}",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 2
  }, {
    code: "a, b,c {}",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 5
  }, {
    code: "a, b,  c {}",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 5
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never"],

  accept: [{
    code: "a,b {}"
  }, {
    code: "a,b,c {}"
  }, {
    code: "a ,b {}"
  }, {
    code: "a\n,b {}"
  }, {
    code: "a\r\n,b {}",
    description: "CRLF"
  }, {
    code: "a,b[data-foo=\"tr, tr\"] {}",
    description: "string"
  }, {
    code: "a:matches(:hover, :focus) {}",
    description: "comma inside :matches()"
  }, {
    code: ":not(:hover, :focus) {}",
    description: "comma inside :not()"
  }],

  reject: [{
    code: "a, b {}",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 2
  }, {
    code: "a,  b {}",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 2
  }, {
    code: "a,\nb {}",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 2
  }, {
    code: "a,\r\nb {}",
    description: "CRLF",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 2
  }, {
    code: "a,\tb {}",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 2
  }, {
    code: "a,b, c {}",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 4
  }, {
    code: "a,b,  c {}",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 4
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-single-line"],

  accept: [{
    code: "a, b {}"
  }, {
    code: "a, b {\n}",
    description: "single-line selector list, multi-line block"
  }, {
    code: "a, b {\r\n}",
    description: "single-line selector list, multi-line block with CRLF"
  }],

  reject: [{
    code: "a,b {}",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 2
  }, {
    code: "a,b {\n}",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 2
  }, {
    code: "a,b {\r\n}",
    description: "CRLF",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 2
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-single-line"],

  accept: [{
    code: "a,b {}"
  }, {
    code: "a,b {\n}",
    description: "single-line selector list, multi-line block"
  }, {
    code: "a,b {\r\n}",
    description: "single-line selector list, multi-line block with CRLF"
  }],

  reject: [{
    code: "a, b {}",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 2
  }, {
    code: "a, b {\n}",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 2
  }, {
    code: "a, b {\r\n}",
    description: "CRLF",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 2
  }]
});