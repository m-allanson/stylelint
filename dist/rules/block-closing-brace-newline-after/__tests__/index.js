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
    code: "a { color: pink; }"
  }, {
    code: "a { color: pink; }\nb { color: red; }"
  }, {
    code: "a { color: pink; }\r\nb { color: red; }",
    description: "CRLF"
  }, {
    code: "a { color: pink;}\n\t\tb { color: red;}"
  }, {
    code: "a { color: pink;}\r\n\t\tb { color: red;}",
    description: "CRLF"
  }, {
    code: "a { @extend foo; color: pink; }"
  }, {
    code: "a { @extend foo; /* comment */\ncolor: pink;  }"
  }, {
    code: "@media print { a { color: pink; }\nb { color: red; }}"
  }, {
    code: "@media print { a { color: pink; }}\n@media screen { b { color: red; }}"
  }],

  reject: [{
    code: "a { color: pink; }b { color: red; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 19
  }, {
    code: "a { color: pink; } b { color: red; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 19
  }, {
    code: "a { color: pink; }  b { color: red; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 19
  }, {
    code: "a { color: pink; }\tb { color: red; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 19
  }, {
    code: "@media print { a { color: pink; } b { color: red; }}",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 34
  }, {
    code: "@media print { a { color: pink; }} @media screen { b { color: red; }}",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 35
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always", { ignoreAtRules: ["if", "else"] }],

  accept: [{
    code: "a { color: pink; }\nb {}"
  }, {
    code: "@if ... { color: pink; } @else {}"
  }, {
    code: "@if ... { color: pink; } @else if {} else {}"
  }, {
    code: "@if ... {\r\n  color: pink; \n} @else if {\n  color: pink;\n} else {}"
  }],

  reject: [{
    code: "a { color: pink; }b{}",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 19
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always", { ignoreAtRules: "/if/" }],

  accept: [{
    code: "a { color: pink; }\nb {}"
  }, {
    code: "@if ... { color: pink; } @else {}"
  }],

  reject: [{
    code: "a { color: pink; }b{}",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 19
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-single-line"],

  accept: [{
    code: "a { color: pink; }"
  }, {
    code: "a { color: pink; }\nb { color: red; }"
  }, {
    code: "a { color: pink; }\r\nb { color: red; }",
    description: "CRLF"
  }, {
    code: "a { color: pink;}\n\t\tb { color: red;}"
  }, {
    code: "a { color: pink;}\r\n\t\tb { color: red;}",
    description: "CRLF"
  }, {
    code: "@media print { a { color: pink; }\nb { color: red; }}"
  }, {
    code: "@media print { a { color: pink; }}\n@media screen { b { color: red; }}"
  }, {
    code: "a { color: pink;\ntop: 0; }b { color: red; }"
  }, {
    code: "a { color: pink;\ntop: 0;}b { color: red;}"
  }, {
    code: "a { color: pink;\r\ntop: 0;}b { color: red;}",
    description: "CRLF"
  }],

  reject: [{
    code: "a { color: pink; }b { color: red; }",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 19
  }, {
    code: "a { color: pink; } b { color: red; }",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 19
  }, {
    code: "a { color: pink; }  b { color: red; }",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 19
  }, {
    code: "a { color: pink; }\tb { color: red; }",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 19
  }, {
    code: "@media print { a { color: pink; } b { color: red; }}",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 34
  }, {
    code: "@media print { a { color: pink; }} @media screen { b { color: red; }}",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 35
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-single-line"],

  accept: [{
    code: "a { color: pink; }"
  }, {
    code: "a { color: pink; }b { color: red; }"
  }, {
    code: "a { color: pink;}b { color: red;}"
  }, {
    code: "@media print { a { color: pink; }b { color: red; }}"
  }, {
    code: "@media print { a { color: pink; }}@media screen { b { color: red; }}"
  }, {
    code: "a { color: pink;\ntop: 0; }\nb { color: red; }"
  }, {
    code: "a { color: pink;\ntop: 0;} b { color: red;}"
  }],

  reject: [{
    code: "a { color: pink; }\nb { color: red; }",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 19
  }, {
    code: "a { color: pink; } b { color: red; }",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 19
  }, {
    code: "a { color: pink; }  b { color: red; }",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 19
  }, {
    code: "a { color: pink; }\tb { color: red; }",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 19
  }, {
    code: "@media print { a { color: pink; }\nb { color: red; }}",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 34
  }, {
    code: "@media print { a { color: pink; }}\n @media screen { b { color: red; }}",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 35
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-multi-line"],

  accept: [{
    code: "a { color: pink;\ntop: 0; }"
  }, {
    code: "a { color: pink;\ntop: 0; }\nb { color: red; }"
  }, {
    code: "a { color: pink;\r\ntop: 0; }\r\nb { color: red; }",
    description: "CRLF"
  }, {
    code: "a { color: pink;\ntop: 0;}\n\t\tb { color: red;}"
  }, {
    code: "@media print { a {\ncolor: pink; }\nb { color: red; }}"
  }, {
    code: "@media print { a {\ncolor: pink; }}\n@media screen { b { color: red; }}"
  }, {
    code: "a { color: pink; }\nb { color: red; }"
  }, {
    code: "a { color: pink; }b { color: red;}"
  }],

  reject: [{
    code: "a { color: pink;\ntop: 0; }b { color: red; }",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 10
  }, {
    code: "a { color: pink;\r\ntop: 0; }b { color: red; }",
    description: "CRLF",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 10
  }, {
    code: "a { color: pink;\ntop: 0; } b { color: red; }",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 10
  }, {
    code: "a { color: pink;\ntop: 0; }  b { color: red; }",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 10
  }, {
    code: "a { color: pink;\ntop: 0; }\tb { color: red; }",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 10
  }, {
    code: "@media print { a {\ncolor: pink; } b { color: red; }}",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 15
  }, {
    code: "@media print { a {\ncolor: pink; }} @media screen { b {\ncolor: red; }}",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 16
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-multi-line"],

  accept: [{
    code: "a { color: pink;\ntop: 0; }"
  }, {
    code: "a { color: pink;\ntop: 0; }b { color: red; }"
  }, {
    code: "a { color: pink;\ntop: 0;}b { color: red;}"
  }, {
    code: "a { color: pink;\r\ntop: 0;}b { color: red;}",
    description: "CRLF"
  }, {
    code: "@media print { a {\ncolor: pink; }b { color: red; }}"
  }, {
    code: "@media print { a {\ncolor: pink; }}@media screen { b { color: red; }}"
  }, {
    code: "@media print { a {\r\ncolor: pink; }}@media screen { b { color: red; }}",
    description: "CRLF"
  }, {
    code: "a { color: pink; }\nb { color: red; }"
  }, {
    code: "a { color: pink; }\r\nb { color: red; }",
    description: "CRLF"
  }, {
    code: "a { color: pink;} b { color: red;}"
  }],

  reject: [{
    code: "a { color: pink;\ntop: 0; }\nb { color: red; }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 2,
    column: 10
  }, {
    code: "a { color: pink;\r\ntop: 0; }\r\nb { color: red; }",
    description: "CRLF",
    message: _.messages.rejectedAfterMultiLine(),
    line: 2,
    column: 10
  }, {
    code: "a { color: pink;\ntop: 0; } b { color: red; }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 2,
    column: 10
  }, {
    code: "a { color: pink;\ntop: 0; }  b { color: red; }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 2,
    column: 10
  }, {
    code: "a { color: pink;\ntop: 0; }\tb { color: red; }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 2,
    column: 10
  }, {
    code: "@media print { a {\ncolor: pink; }\nb { color: red; }}",
    message: _.messages.rejectedAfterMultiLine(),
    line: 2,
    column: 15
  }, {
    code: "@media print { a {\ncolor: pink; }}\n@media screen { b {\ncolor: red; }}",
    message: _.messages.rejectedAfterMultiLine(),
    line: 2,
    column: 16
  }]
});