"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _testUtils = require("../../../testUtils");

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alwaysTests = {
  accept: [{
    code: "/** comment */",
    description: "first node ignored"
  }, {
    code: "a { color: pink; /** comment */\ntop: 0; }",
    description: "inline comment ignored"
  }, {
    code: "a {} /** comment */",
    description: "inline comment ignored"
  }, {
    code: "a {}\n\n/** comment */"
  }, {
    code: "a {}\r\n\r\n/** comment */",
    description: "CRLF"
  }, {
    code: "a {}\n\r\n/** comment */",
    description: "Mixed"
  }, {
    code: "a { color: pink;\n\n/** comment */\ntop: 0; }"
  }],

  reject: [{
    code: "/** comment */\n/** comment */",
    message: _.messages.expected
  }, {
    code: "/** comment */\r\n/** comment */",
    description: "CRLF",
    message: _.messages.expected
  }, {
    code: "a { color: pink;\n/** comment */\ntop: 0; }",
    message: _.messages.expected
  }, {
    code: "a { color: pink;\r\n/** comment */\r\ntop: 0; }",
    description: "CRLF",
    message: _.messages.expected
  }]
};

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(alwaysTests, {
  ruleName: _.ruleName,
  config: ["always"],

  accept: [{
    code: "a {\n\n  /* comment */\n  color: pink;\n}",
    description: "first-nested with empty line before"
  }],

  reject: [{
    code: "a {\n  /* comment */\n  color: pink;\n}",
    description: "first-nested without empty line before",
    message: _.messages.expected,
    line: 2,
    column: 3
  }]
}));

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(alwaysTests, {
  ruleName: _.ruleName,
  config: ["always", { except: ["first-nested"] }],

  accept: [{
    code: "a {\n  /* comment */\n  color: pink;\n}",
    description: "first-nested without empty line before"
  }],

  reject: [{
    code: "a {\n\n  /* comment */\n  color: pink;\n}",
    description: "first-nested with empty line before",
    message: _.messages.rejected,
    line: 3,
    column: 3
  }]
}));

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(alwaysTests, {
  ruleName: _.ruleName,
  config: ["always", { ignore: ["stylelint-commands"] }],

  accept: [{
    code: "a {\ncolor: pink;\n/* stylelint-disable something */\ntop: 0;\n}",
    description: "no newline before a stylelint command comment"
  }]
}));

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always", { ignore: ["between-comments"] }],

  accept: [{
    code: "/* a */\n/* b */\n/* c */\nbody {\n}",
    description: "no newline between comments"
  }, {
    code: "a { color: pink;\n\n/** comment */\n/** comment */\ntop: 0; }",
    description: "no newline between comments"
  }],

  reject: [{
    code: "a { color: pink;\n/** comment */\n/** comment */\ntop: 0; }",
    message: _.messages.expected
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never"],

  accept: [{
    code: "\n\n/** comment */",
    description: "first node ignored"
  }, {
    code: "\r\n\r\n/** comment */",
    description: "first node ignored and CRLF"
  }, {
    code: "a { color: pink; /** comment */\ntop: 0; }",
    description: "inline comment ignored"
  }, {
    code: "a {} /** comment */"
  }, {
    code: "a { color: pink;\n/** comment */\n\ntop: 0; }"
  }, {
    code: "a { color: pink;\r\n/** comment */\r\n\r\ntop: 0; }",
    description: "CRLF"
  }],

  reject: [{
    code: "/** comment */\n\n/** comment */",
    message: _.messages.rejected
  }, {
    code: "a {}\n\n\n/** comment */",
    message: _.messages.rejected
  }, {
    code: "a {}\r\n\r\n\r\n/** comment */",
    description: "CRLF",
    message: _.messages.rejected
  }, {
    code: "a { color: pink;\n\n/** comment */\ntop: 0; }",
    message: _.messages.rejected
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always"],
  syntax: "scss",

  accept: [{
    code: "a { color: pink;\n// comment\ntop: 0; }",
    description: "single-line comment ignored"
  }, {
    code: "// first line\n// second line\na { color: pink; }",
    description: "subsequent single-line comments ingnored"
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never"],
  syntax: "scss",

  accept: [{
    code: "a { color: pink;\n\n// comment\ntop: 0; }",
    description: "single-line comment ignored"
  }]
});