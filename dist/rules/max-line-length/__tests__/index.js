"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["20"],

  accept: [{
    code: "a { color: 0; }"
  }, {
    code: "a {  color   : 0 ; }"
  }, {
    code: "a { color: 0;\n  top: 0; }"
  }, {
    code: "@media print {\n  a {\n    color: pink;\n }\n}"
  }, {
    code: "a {\n background: url(somethingsomethingsomethingsomething);\n}"
  }, {
    code: "a {\n  background: url(\n  somethingsomethingsomethingsomething\n  );\n}"
  }],

  reject: [{
    code: "a {   color   : 0  ;}",
    message: _.messages.expected(20),
    line: 1,
    column: 21
  }, {
    code: "a { color: 0; top: 0; }",
    message: _.messages.expected(20),
    line: 1,
    column: 23
  }, {
    code: "a { color: 0;\n  top: 0; bottom: 0; right: 0; \n  left: 0; }",
    message: _.messages.expected(20),
    line: 2,
    column: 31
  }, {
    code: "a { color: 0;\n  top: 0;\n  left: 0; bottom: 0; right: 0; }",
    message: _.messages.expected(20),
    line: 3,
    column: 33
  }, {
    code: "@media print {\n  a {\n    color: pink; background: orange;\n }\n}",
    message: _.messages.expected(20),
    line: 3,
    column: 36
  }, {
    code: "@media (min-width: 30px) and screen {}",
    message: _.messages.expected(20),
    line: 1,
    column: 38
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["30"],

  accept: [{
    code: "a { color: 0;\n  top: 0; left: 0; right: 0; \n  bottom: 0; }"
  }],

  reject: [{
    code: "a { color: 0;\n  top: 0; left: 0; right: 0; background: pink; \n  bottom: 0; }",
    message: _.messages.expected(30),
    line: 2,
    column: 47
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["20", { ignore: "non-comments" }],

  accept: [{
    code: "a { color: 0; top: 0; bottom: 0; }"
  }, {
    code: "a { color: 0; top: 0; /* too long comment here */ bottom: 0; }"
  }, {
    code: "/* short nuff */"
  }, {
    code: "/* short\nnuff */"
  }, {
    code: "/**\n * each line\n * short nuff\n */"
  }, {
    code: "a { color: 0; }\n/* short nuff */\nb {}"
  }, {
    code: "a {}\n/**\n * each line\n * short nuff\n */\nb {}"
  }, {
    code: "a { /* this comment is too long for the max length */ }"
  }],

  reject: [{
    code: "/* comment that is too long */",
    message: _.messages.expected(20),
    line: 1,
    column: 30
  }, {
    code: "a {}\n  /* comment that is too long */\nb {}",
    message: _.messages.expected(20),
    line: 2,
    column: 32
  }, {
    code: "/* this comment is too long for the max length */",
    message: _.messages.expected(20),
    line: 1,
    column: 49
  }, {
    code: "a {}\n/**\n * each line\n * short nuff\n * except this one which is too long\n */\nb {}",
    message: _.messages.expected(20),
    line: 5,
    column: 36
  }]
});