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
    code: "a ,b {}"
  }, {
    code: "a ,b ,c {}"
  }, {
    code: "a , b {}"
  }, {
    code: "a ,\nb {}"
  }, {
    code: "a ,\r\nb {}",
    description: "CRLF"
  }, {
    code: "a ,b[data-foo=\"tr,tr\"] {}",
    description: "string"
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
    code: "a  ,b {}",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 4
  }, {
    code: "a\n,b {}",
    message: _.messages.expectedBefore(),
    line: 2,
    column: 1
  }, {
    code: "a\r\n,b {}",
    description: "CRLF",
    message: _.messages.expectedBefore(),
    line: 2,
    column: 1
  }, {
    code: "a\t,b {}",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 3
  }, {
    code: "a ,b,c {}",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 5
  }, {
    code: "a ,b  ,c {}",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 7
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
    code: "a, b {}"
  }, {
    code: "a,\nb {}"
  }, {
    code: "a,\r\nb {}",
    description: "CRLF"
  }, {
    code: "a,b[data-foo=\"tr ,tr\"] {}",
    description: "string"
  }, {
    code: "a:matches(:hover , :focus) {}",
    description: "comma inside :matches()"
  }, {
    code: ":not(:hover , :focus) {}",
    description: "comma inside :not()"
  }],

  reject: [{
    code: "a ,b {}",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 3
  }, {
    code: "a  ,b {}",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 4
  }, {
    code: "a\n,b {}",
    message: _.messages.rejectedBefore(),
    line: 2,
    column: 1
  }, {
    code: "a\r\n,b {}",
    description: "CRLF",
    message: _.messages.rejectedBefore(),
    line: 2,
    column: 1
  }, {
    code: "a\t,b {}",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 3
  }, {
    code: "a,b ,c {}",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 5
  }, {
    code: "a,b  ,c {}",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 6
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-single-line"],

  accept: [{
    code: "a ,b {}"
  }, {
    code: "a ,b {\n}",
    description: "single-line selector list, multi-line block"
  }, {
    code: "a ,b {\r\n}",
    description: "single-line selector list, multi-line block with CRLF"
  }],

  reject: [{
    code: "a,b {}",
    message: _.messages.expectedBeforeSingleLine(),
    line: 1,
    column: 2
  }, {
    code: "a,b {\n}",
    message: _.messages.expectedBeforeSingleLine(),
    line: 1,
    column: 2
  }, {
    code: "a,b {\r\n}",
    description: "CRLF",
    message: _.messages.expectedBeforeSingleLine(),
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
    code: "a ,b {}",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 3
  }, {
    code: "a ,b {\n}",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 3
  }, {
    code: "a ,b {\r\n}",
    description: "CRLF",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 3
  }]
});