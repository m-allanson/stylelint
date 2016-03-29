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
    code: "a { color: pink; } b { color: red; }"
  }, {
    code: "a { color: pink;} b { color: red;}"
  }, {
    code: "@media print { a { color: pink; } b { color: red; } }"
  }, {
    code: "@media print { a { color: pink; } } @media screen { b { color: red; } }"
  }, {
    code: "@import 'foo.css';\n@import 'bar.css';",
    description: "two blockless statements"
  }, {
    code: "@media print { a { color: pink; } b { color: red; }}"
  }, {
    code: "@media print { a { color: pink; }} @media screen { b { color: red; }}"
  }],

  reject: [{
    code: "a { color: pink; }b { color: red; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 19
  }, {
    code: "a { color: pink; }  b { color: red; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 19
  }, {
    code: "a { color: pink; }\nb { color: red; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 19
  }, {
    code: "a { color: pink; }\r\nb { color: red; }",
    description: "CRLF",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 19
  }, {
    code: "a { color: pink; }\tb { color: red; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 19
  }, {
    code: "@media print { a { color: pink; }b { color: red; }}",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 34
  }, {
    code: "@media print { a { color: pink; }}@media screen { b { color: red; }}",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 35
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never"],

  accept: [{
    code: "a { color: pink; }"
  }, {
    code: "a { color: pink; }b { color: red; }"
  }, {
    code: "a { color: pink;}b { color: red;}"
  }, {
    code: "@media print { a { color: pink; }b { color: red; } }"
  }, {
    code: "@media print { a { color: pink; } }@media screen { b { color: red; } }"
  }],

  reject: [{
    code: "a { color: pink; } b { color: red; }",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 19
  }, {
    code: "a { color: pink; }  b { color: red; }",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 19
  }, {
    code: "a { color: pink; }\nb { color: red; }",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 19
  }, {
    code: "a { color: pink; }\r\nb { color: red; }",
    description: "CRLF",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 19
  }, {
    code: "a { color: pink; }\tb { color: red; }",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 19
  }, {
    code: "@media print { a { color: pink; } b { color: red; }}",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 34
  }, {
    code: "@media print { a { color: pink; }} @media screen { b { color: red; }}",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 35
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-single-line"],

  accept: [{
    code: "a { color: pink; background: orange; }"
  }, {
    code: "a { color: pink; background: orange; } b { color: red; }"
  }, {
    code: "a { color: pink; background: orange;} b { color: red;}"
  }, {
    code: "a { color:\npink;}"
  }, {
    code: "a { color:\r\npink;}",
    description: "CRLF"
  }, {
    code: "a { color:\npink;}b { color: red; }"
  }, {
    code: "a { color:\npink;}b { color:\nred;}"
  }, {
    code: "@media print { a {\ncolor: pink; } b { color: red;}}"
  }, {
    code: "@media print { a {\ncolor: pink; }} @media screen { b { color: red;}}"
  }, {
    code: "@media print { a {\r\ncolor: pink; }} @media screen { b { color: red;}}",
    description: "CRLF"
  }],

  reject: [{
    code: "a { color: pink; background: orange;}b { color: red; }",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 38
  }, {
    code: "a { color: pink; background: orange;}  b { color: red; }",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 38
  }, {
    code: "a { color: pink; background: orange;}\tb { color: red; }",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 38
  }, {
    code: "@media print { a { color: pink; }b { color: red; }}",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 34
  }, {
    code: "@media print { a { color: pink; }}@media screen { b { color: red; }}",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 35
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-single-line"],

  accept: [{
    code: "a { color: pink; background: orange; }"
  }, {
    code: "a { color: pink; background: orange; }b { color: red; }"
  }, {
    code: "a { color: pink; background: orange;}b { color: red;}"
  }, {
    code: "a { color:\npink;}"
  }, {
    code: "a { color:\r\npink;}",
    description: "CRLF"
  }, {
    code: "a { color:\npink;} b { color: red; }"
  }, {
    code: "a { color:\npink;} b { color:\nred;}"
  }, {
    code: "@media print { a {\ncolor: pink;} b { color: red;} }"
  }, {
    code: "@media print { a {\r\ncolor: pink;} b { color: red;} }",
    description: "CRLF"
  }, {
    code: "@media print { a {\ncolor: pink;} } @media screen { b { color: red;} }"
  }],

  reject: [{
    code: "a { color: pink; background: orange;} b { color: red; }",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 38
  }, {
    code: "a { color: pink; background: orange;}  b { color: red; }",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 38
  }, {
    code: "a { color: pink; background: orange;}\tb { color: red; }",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 38
  }, {
    code: "@media print { a { color: pink; } b { color: red; }}",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 34
  }, {
    code: "@media print { a { color: pink; }} @media screen { b { color: red; }}",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 35
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-multi-line"],

  accept: [{
    code: "a { color: pink;\nbackground: orange; }"
  }, {
    code: "a { color: pink;\r\nbackground: orange; }",
    description: "CRLF"
  }, {
    code: "a { color: pink;\nbackground: orange; } b { color: red; }"
  }, {
    code: "a { color: pink;\nbackground: orange;} b { color: red;}"
  }, {
    code: "a { color: pink; }"
  }, {
    code: "a { color: pink; }b { color: red; }"
  }, {
    code: "a { color: pink;}b { color: red;}"
  }, {
    code: "@media print { a {\ncolor: pink; } b { color: red; }}"
  }, {
    code: "@media print { a {\r\ncolor: pink; } b { color: red; }}",
    description: "CRLF"
  }, {
    code: "@media print { a {\ncolor: pink; }} @media screen { b { color: red; }}"
  }],

  reject: [{
    code: "a { color: pink;\nbackground: orange;}b { color: red; }",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 21
  }, {
    code: "a { color: pink;\nbackground: orange;}  b { color: red; }",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 21
  }, {
    code: "a { color: pink;\nbackground: orange;}\nb { color: red; }",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 21
  }, {
    code: "a { color: pink;\r\nbackground: orange;}\r\nb { color: red; }",
    description: "CRLF",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 21
  }, {
    code: "a { color: pink;\nbackground: orange;}\tb { color: red; }",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 21
  }, {
    code: "@media print { a {\ncolor: pink; }b { color: red; }}",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 15
  }, {
    code: "@media print { a {\ncolor: pink; }}@media screen { b {\ncolor: red; }}",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 16
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-multi-line"],

  accept: [{
    code: "a { color: pink;\nbackground: orange; }"
  }, {
    code: "a { color: pink;\r\nbackground: orange; }",
    description: "CRLF"
  }, {
    code: "a { color: pink;\nbackground: orange; }b { color: red; }"
  }, {
    code: "a { color: pink;\nbackground: orange;}b { color: red;}"
  }, {
    code: "a { color: pink; }"
  }, {
    code: "a { color: pink; } b { color: red; }"
  }, {
    code: "a { color: pink;} b { color: red;}"
  }, {
    code: "@media print { a {\ncolor: pink; }b { color: red; } }"
  }, {
    code: "@media print { a {\r\ncolor: pink; }b { color: red; } }",
    description: "CRLF"
  }, {
    code: "@media print { a {\ncolor: pink; }}@media screen { b { color: red; } }"
  }],

  reject: [{
    code: "a { color: pink;\nbackground: orange;} b { color: red; }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 2,
    column: 21
  }, {
    code: "a { color: pink;\nbackground: orange;}  b { color: red; }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 2,
    column: 21
  }, {
    code: "a { color: pink;\nbackground: orange;}\nb { color: red; }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 2,
    column: 21
  }, {
    code: "a { color: pink;\nbackground: orange;}\tb { color: red; }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 2,
    column: 21
  }, {
    code: "@media print { a {\ncolor: pink; } b { color: red; }}",
    message: _.messages.rejectedAfterMultiLine(),
    line: 2,
    column: 15
  }, {
    code: "@media print { a {\ncolor: pink; }} @media screen { b {\ncolor: red; }}",
    message: _.messages.rejectedAfterMultiLine(),
    line: 2,
    column: 16
  }, {
    code: "@media print { a {\r\ncolor: pink; }} @media screen { b {\r\ncolor: red; }}",
    description: "CRLF",
    message: _.messages.rejectedAfterMultiLine(),
    line: 2,
    column: 16
  }]
});