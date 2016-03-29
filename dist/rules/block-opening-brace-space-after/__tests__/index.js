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
    code: "@import url(x.css)"
  }, {
    code: "a { color: pink; }"
  }, {
    code: "@media print { a { color: pink; } }"
  }],

  reject: [{
    code: "a {color: pink; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 4
  }, {
    code: "a {  color: pink; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 4
  }, {
    code: "a {\tcolor: pink; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 4
  }, {
    code: "a {\ncolor: pink; }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 4
  }, {
    code: "a {\r\ncolor: pink; }",
    description: "CRLF",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 4
  }, {
    code: "@media print {\na { color: pink; } }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 15
  }, {
    code: "@media print { a {\ncolor: pink; } }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 19
  }, {
    code: "@media print { a {\r\ncolor: pink; } }",
    description: "CRLF",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 19
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never"],

  accept: [{
    code: "a {color: pink; }"
  }, {
    code: "@media print {a {color: pink; } }"
  }],

  reject: [{
    code: "a { color: pink; }",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 4
  }, {
    code: "a {  color: pink; }",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 4
  }, {
    code: "a {\tcolor: pink; }",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 4
  }, {
    code: "a {\ncolor: pink; }",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 4
  }, {
    code: "a {\r\ncolor: pink; }",
    description: "CRLF",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 4
  }, {
    code: "@media print {\na {color: pink; } }",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 15
  }, {
    code: "@media print {a {\ncolor: pink; } }",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 18
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-single-line"],

  accept: [{
    code: "a { color: pink; }"
  }, {
    code: "@media print { a { color: pink; } }"
  }, {
    code: "a {\ncolor: pink; }"
  }, {
    code: "a {\r\ncolor: pink; }",
    description: "CRLF"
  }, {
    code: "a {color:\npink; }"
  }, {
    code: "@media print {a {color:\npink; } }"
  }, {
    code: "@media print{a {color:\npink; } }"
  }],

  reject: [{
    code: "a {color: pink; }",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 4
  }, {
    code: "a {  color: pink; }",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 4
  }, {
    code: "a {\tcolor: pink; }",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 4
  }, {
    code: "@media print {\ta { color: pink; } }",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 15
  }, {
    code: "@media print { a {\tcolor: pink; } }",
    message: _.messages.expectedAfterSingleLine(),
    line: 1,
    column: 19
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-single-line"],

  accept: [{
    code: "a {color: pink; }"
  }, {
    code: "@media print {a {color: pink; } }"
  }, {
    code: "a { color:\npink; }"
  }, {
    code: "@media print { a { color:\npink; } }"
  }, {
    code: "@media print { a\n{color: pink; } }"
  }, {
    code: "@media print { a\r\n{color: pink; } }",
    description: "CRLF"
  }],

  reject: [{
    code: "a { color: pink; }",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 4
  }, {
    code: "a {  color: pink; }",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 4
  }, {
    code: "a {\tcolor: pink; }",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 4
  }, {
    code: "@media print { a {color: pink; } }",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 15
  }, {
    code: "@media print {a { color: pink; } }",
    message: _.messages.rejectedAfterSingleLine(),
    line: 1,
    column: 18
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-multi-line"],

  accept: [{
    code: "a { color: pink;\nbackground: orange; }"
  }, {
    code: "@media print { a { color: pink;\nbackground: orange } }"
  }, {
    code: "a {color: pink; }"
  }, {
    code: "@media print {a {color: pink; } }"
  }, {
    code: "a { color: pink; }"
  }, {
    code: "a {  color: pink; }"
  }, {
    code: "a {\tcolor: pink; }"
  }],

  reject: [{
    code: "a {color: pink;\nbackground: orange; }",
    message: _.messages.expectedAfterMultiLine(),
    line: 1,
    column: 4
  }, {
    code: "a {  color: pink;\nbackground: orange; }",
    message: _.messages.expectedAfterMultiLine(),
    line: 1,
    column: 4
  }, {
    code: "a {\tcolor: pink;\nbackground: orange; }",
    message: _.messages.expectedAfterMultiLine(),
    line: 1,
    column: 4
  }, {
    code: "a {\ncolor: pink;\nbackground: orange; }",
    message: _.messages.expectedAfterMultiLine(),
    line: 1,
    column: 4
  }, {
    code: "a {\r\ncolor: pink;\r\nbackground: orange; }",
    description: "CRLF",
    message: _.messages.expectedAfterMultiLine(),
    line: 1,
    column: 4
  }, {
    code: "@media print\n{a { color: pink;\nbackground: orange; } }",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 2
  }, {
    code: "@media print { a\n{color: pink;\nbackground: orange; } }",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 2
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-multi-line"],

  accept: [{
    code: "a {color: pink;\nbackground: orange; }"
  }, {
    code: "@media print {a\n{color: pink;\nbackground: orange } }"
  }, {
    code: "@media print {a\r\n{color: pink;\r\nbackground: orange } }",
    description: "CRLF"
  }, {
    code: "a { color: pink; }"
  }, {
    code: "@media print { a { color: pink; } }"
  }, {
    code: "a { color: pink; }"
  }, {
    code: "a {  color: pink; }"
  }, {
    code: "a {\tcolor: pink; }"
  }],

  reject: [{
    code: "a { color: pink;\nbackground: orange; }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 1,
    column: 4
  }, {
    code: "a {  color: pink;\nbackground: orange; }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 1,
    column: 4
  }, {
    code: "a {\tcolor: pink;\nbackground: orange; }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 1,
    column: 4
  }, {
    code: "a {\tcolor: pink;\r\nbackground: orange; }",
    description: "CRLF",
    message: _.messages.rejectedAfterMultiLine(),
    line: 1,
    column: 4
  }, {
    code: "a {\ncolor: pink;\nbackground: orange; }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 1,
    column: 4
  }, {
    code: "@media print\n{ a {color: pink;\nbackground: orange; } }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 2,
    column: 2
  }, {
    code: "@media print{a\n{ color: pink;\nbackground: orange; } }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 2,
    column: 2
  }]
});