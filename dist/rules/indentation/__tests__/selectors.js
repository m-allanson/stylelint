"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [2],
  skipBasicChecks: true,

  accept: [{
    code: "a { color: pink; }"
  }, {
    code: "a,\n" + "b { color: pink; }"
  }, {
    code: "a,\n" + "b,\n" + "c { color: pink; }"
  }, {
    code: "@media print {\n" + "  a,\n" + "  b { color: pink;}\n" + "}"
  }, {
    code: "a {\n" + "  @nest b & ,\n" + "  &.foo {\n" + "    color: pink;\n" + "  }\n" + "}"
  }],

  reject: [{
    code: "a,\n" + "  b { color: pink; }",

    message: _.messages.expected("0 spaces"),
    line: 2,
    column: 1
  }, {
    code: "a,\n" + "b,\n" + " c { color: pink; }",

    message: _.messages.expected("0 spaces"),
    line: 3,
    column: 1
  }, {
    code: "@media print {\n" + "  a,\n" + "b { color: pink;}\n" + "}",

    message: _.messages.expected("2 spaces"),
    line: 3,
    column: 1
  }, {
    code: "@media print {\n" + "  a,\n" + "   b { color: pink;}\n" + "}",

    message: _.messages.expected("2 spaces"),
    line: 3,
    column: 1
  }, {
    code: "@media print {\n" + "   a,\n" + "  b { color: pink;}\n" + "}",

    message: _.messages.expected("2 spaces"),
    line: 2,
    column: 4
  }]
});