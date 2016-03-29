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
    code: "a\n{ color: pink; }"
  }, {
    code: "a\r\n{ color: pink; }",
    description: "CRLF"
  }, {
    code: "a\n{color: pink; }"
  }, {
    code: "@media print\n{ a\n{ color: pink; } }"
  }, {
    code: "@media print\r\n{ a\r\n{ color: pink; } }",
    description: "CRLF"
  }, {
    code: "@media print\n{a\n{color: pink; } }"
  }, {
    code: "@media print\n\t{a\n\t\t{color: pink; } }",
    description: "indentation after the newline before the opening braces"
  }, {
    code: "@media print\n\t{a\n\t\t{color: pink;\n\t\t&:hover\n\t\t\t{\n\t\t\t\tcolor:black;} } }",
    description: "3 level deep indentation after the newline before the opening braces"
  }, {
    code: "@media print\r\n\t{a\r\n\t\t{color: pink;\r\n\t\t&:hover\r\n\t\t\t{\r\n\t\t\t\tcolor:black;} } }",
    description: "3 level deep indentation after the newline before the opening braces and CRLF"
  }, {
    code: "a\n{ &:hover\n{ color: pink; }}"
  }, {
    code: "a\n{ color: red; &:hover\n{ color: pink; }}"
  }],

  reject: [{
    code: "a { color: pink; }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 2
  }, {
    code: "a{ color: pink; }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 1
  }, {
    code: "a  { color: pink; }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 3
  }, {
    code: "a\t{ color: pink; }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 2
  }, {
    code: "@media print { a\n{ color: pink; } }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 13
  }, {
    code: "@media print { a\r\n{ color: pink; } }",
    description: "CRLF",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 13
  }, {
    code: "@media print\n{ a { color: pink; } }",
    message: _.messages.expectedBefore(),
    line: 2,
    column: 4
  }, {
    code: "@media print{ a\n{ color: pink; } }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 12
  }, {
    code: "@media print{ a\r\n{ color: pink; } }",
    description: "CRLF",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 12
  }, {
    code: "@media print\n{ a{ color: pink; } }",
    message: _.messages.expectedBefore(),
    line: 2,
    column: 3
  }, {
    code: "a\n/* foo */{ a{ color: pink; } }",
    message: _.messages.expectedBefore(),
    line: 2,
    column: 12
  }, {
    code: "a\r\n/* foo */{ a{ color: pink; } }",
    description: "CRLF",
    message: _.messages.expectedBefore(),
    line: 2,
    column: 12
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-single-line"],

  accept: [{
    code: "a\n{ color: pink; }"
  }, {
    code: "a\n{color: pink; }"
  }, {
    code: "@media print\n{ a\n{ color: pink; } }"
  }, {
    code: "@media print\r\n{ a\r\n{ color: pink; } }",
    description: "CRLF"
  }, {
    code: "@media print\n{a\n{color: pink; } }"
  }, {
    code: "a{ color: pink;\nbackground:orange; }"
  }, {
    code: "@media print { a{ color: pink;\nbackground:orange; } }"
  }, {
    code: "@media print{ a { color: pink;\nbackground:orange; } }"
  }, {
    code: "@media print{\na\n{ color: pink; } }"
  }, {
    code: "@media print{\r\na\r\n{ color: pink; } }",
    description: "CRLF"
  }],

  reject: [{
    code: "a { color: pink; }",
    message: _.messages.expectedBeforeSingleLine(),
    line: 1,
    column: 2
  }, {
    code: "a{ color: pink; }",
    message: _.messages.expectedBeforeSingleLine(),
    line: 1,
    column: 1
  }, {
    code: "a  { color: pink; }",
    message: _.messages.expectedBeforeSingleLine(),
    line: 1,
    column: 3
  }, {
    code: "a\t{ color: pink; }",
    message: _.messages.expectedBeforeSingleLine(),
    line: 1,
    column: 2
  }, {
    code: "@media print\n{ a { color: pink; } }",
    message: _.messages.expectedBeforeSingleLine(),
    line: 2,
    column: 4
  }, {
    code: "@media print\n{ a{ color: pink; } }",
    message: _.messages.expectedBeforeSingleLine(),
    line: 2,
    column: 3
  }, {
    code: "@media print\r\n{ a{ color: pink; } }",
    description: "CRLF",
    message: _.messages.expectedBeforeSingleLine(),
    line: 2,
    column: 3
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-single-line"],

  accept: [{
    code: "a{ color: pink; }"
  }, {
    code: "a{color: pink; }"
  }, {
    code: "@media print{ a{ color: pink; } }"
  }, {
    code: "@media print{a{color: pink; } }"
  }, {
    code: "a\n{ color: pink;\nbackground:orange; }"
  }, {
    code: "a\r\n{ color: pink;\r\nbackground:orange; }",
    description: "CRLF"
  }, {
    code: "@media print { a\n{ color: pink;\nbackground:orange; } }"
  }, {
    code: "@media print{ a\n{ color: pink;\nbackground:orange; } }"
  }, {
    code: "@media print{\na{ color: pink; } }"
  }, {
    code: "@media print{\r\na{ color: pink; } }",
    description: "CRLF"
  }],

  reject: [{
    code: "a\n{ color: pink; }",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 2
  }, {
    code: "a\r\n{ color: pink; }",
    description: "CRLF",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 3
  }, {
    code: "a { color: pink; }",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 2
  }, {
    code: "a  { color: pink; }",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 3
  }, {
    code: "a\t{ color: pink; }",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 2
  }, {
    code: "@media print\n{ a\n{ color: pink; } }",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 2,
    column: 4
  }, {
    code: "@media print\r\n{ a\r\n{ color: pink; } }",
    description: "CRLF",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 2,
    column: 5
  }, {
    code: "@media print { a\n{ color: pink; } }",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 17
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-multi-line"],

  accept: [{
    code: "a\n{ color: pink;\nbackground: orange; }"
  }, {
    code: "a\r\n{ color: pink;\nbackground: orange; }",
    description: "CRLF"
  }, {
    code: "@media print\n{\na\n{ color: pink;\nbackground: orange } }"
  }, {
    code: "a { color: pink; }"
  }, {
    code: "@media print { a { color: pink; } }"
  }, {
    code: "a{ color: pink; }"
  }, {
    code: "a  { color: pink; }"
  }, {
    code: "a\t{ color: pink; }"
  }],

  reject: [{
    code: "a{ color: pink;\nbackground: orange; }",
    message: _.messages.expectedBeforeMultiLine(),
    line: 1,
    column: 1
  }, {
    code: "a  { color: pink;\nbackground: orange; }",
    message: _.messages.expectedBeforeMultiLine(),
    line: 1,
    column: 3
  }, {
    code: "a\t{ color: pink;\nbackground: orange; }",
    message: _.messages.expectedBeforeMultiLine(),
    line: 1,
    column: 2
  }, {
    code: "a { color: pink;\nbackground: orange; }",
    message: _.messages.expectedBeforeMultiLine(),
    line: 1,
    column: 2
  }, {
    code: "a { color: pink;\r\nbackground: orange; }",
    description: "CRLF",
    message: _.messages.expectedBeforeMultiLine(),
    line: 1,
    column: 2
  }, {
    code: "@media print\n{\na { color: pink;\nbackground: orange; } }",
    message: _.messages.expectedBeforeMultiLine(),
    line: 3,
    column: 2
  }, {
    code: "@media print { a\n{ color: pink;\nbackground: orange; } }",
    message: _.messages.expectedBeforeMultiLine(),
    line: 1,
    column: 13
  }, {
    code: "@media print { a\r\n{ color: pink;\r\nbackground: orange; } }",
    description: "CRLF",
    message: _.messages.expectedBeforeMultiLine(),
    line: 1,
    column: 13
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-multi-line"],

  accept: [{
    code: "a{ color: pink;\nbackground: orange; }"
  }, {
    code: "a{ color: pink;\r\nbackground: orange; }",
    description: "CRLF"
  }, {
    code: "@media print{\na{ color: pink;\nbackground: orange } }"
  }, {
    code: "a { color: pink; }"
  }, {
    code: "@media print { a { color: pink; } }"
  }, {
    code: "a{ color: pink; }"
  }, {
    code: "a  { color: pink; }"
  }, {
    code: "a\t{ color: pink; }"
  }],

  reject: [{
    code: "a { color: pink;\nbackground: orange; }",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 1,
    column: 2
  }, {
    code: "a { color: pink;\r\nbackground: orange; }",
    description: "CRLF",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 1,
    column: 2
  }, {
    code: "a  { color: pink;\nbackground: orange; }",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 1,
    column: 3
  }, {
    code: "a\t{ color: pink;\nbackground: orange; }",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 1,
    column: 2
  }, {
    code: "a\n{ color: pink;\nbackground: orange; }",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 1,
    column: 2
  }, {
    code: "@media print\n{\na{ color: pink;\nbackground: orange; } }",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 1,
    column: 13
  }, {
    code: "@media print{ a\n{ color: pink;\nbackground: orange; } }",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 1,
    column: 16
  }, {
    code: "@media print{ a\r\n{ color: pink;\r\nbackground: orange; } }",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 1,
    column: 17
  }]
});