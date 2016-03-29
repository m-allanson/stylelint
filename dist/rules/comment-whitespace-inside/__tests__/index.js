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
    code: "/* comment */"
  }, {
    code: "/* comment comment */"
  }, {
    code: "/* comment\ncomment */"
  }, {
    code: "/* comment\n\ncomment */"
  }, {
    code: "/** comment */"
  }, {
    code: "/**** comment ***/"
  }, {
    code: "/*\ncomment\n*/"
  }, {
    code: "/*\tcomment   */"
  }, {
    code: "/*! copyright */"
  }, {
    code: "/*# sourcemap */"
  }],

  reject: [{
    code: "/*comment */",
    message: _.messages.expectedOpening,
    line: 1,
    column: 3
  }, {
    code: "/**comment **/",
    message: _.messages.expectedOpening,
    line: 1,
    column: 4
  }, {
    code: "/* comment*/",
    message: _.messages.expectedClosing,
    line: 1,
    column: 10
  }, {
    code: "/*comment comment */",
    message: _.messages.expectedOpening,
    line: 1,
    column: 3
  }, {
    code: "/* comment comment*/",
    message: _.messages.expectedClosing,
    line: 1,
    column: 18
  }, {
    code: "/*comment\n\ncomment */",
    message: _.messages.expectedOpening,
    line: 1,
    column: 3
  }, {
    code: "/* comment\n\ncomment*/",
    message: _.messages.expectedClosing,
    line: 3,
    column: 7
  }, {
    code: "/*!copyright */",
    message: _.messages.expectedOpening,
    line: 1,
    column: 3
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never"],

  accept: [{
    code: "/*comment*/"
  }, {
    code: "/*comment comment*/"
  }, {
    code: "/*comment\ncomment*/"
  }, {
    code: "/*comment\n\ncomment*/"
  }, {
    code: "/**comment*/"
  }, {
    code: "/****comment***/"
  }, {
    code: "/*! copyright */"
  }, {
    code: "/*# sourcemap */"
  }],

  reject: [{
    code: "/* comment*/",
    message: _.messages.rejectedOpening,
    line: 1,
    column: 3
  }, {
    code: "/** comment*/",
    message: _.messages.rejectedOpening,
    line: 1,
    column: 4
  }, {
    code: "/*comment */",
    message: _.messages.rejectedClosing,
    line: 1,
    column: 10
  }, {
    code: "/*  comment*/",
    message: _.messages.rejectedOpening,
    line: 1,
    column: 3
  }, {
    code: "/*comment  */",
    message: _.messages.rejectedClosing,
    line: 1,
    column: 11
  }, {
    code: "/*\ncomment*/",
    message: _.messages.rejectedOpening,
    line: 1,
    column: 3
  }, {
    code: "/*comment\n*/",
    message: _.messages.rejectedClosing,
    line: 1,
    column: 10
  }, {
    code: "/* comment comment*/",
    message: _.messages.rejectedOpening,
    line: 1,
    column: 3
  }, {
    code: "/*comment comment */",
    message: _.messages.rejectedClosing,
    line: 1,
    column: 18
  }, {
    code: "/* comment\n\ncomment*/",
    message: _.messages.rejectedOpening,
    line: 1,
    column: 3
  }, {
    code: "/*comment\n\ncomment */",
    message: _.messages.rejectedClosing,
    line: 3,
    column: 8
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always"],
  skipBasicChecks: true,
  syntax: "scss",

  accept: [{
    code: "//comment",
    description: "single-line comment ignored"
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never"],
  skipBasicChecks: true,
  syntax: "scss",

  accept: [{
    code: "// comment",
    description: "single-line comment ignored"
  }]
});