"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["tab"],

  accept: [{
    code: "/* blergh */"
  }, {
    code: ".foo {\n" + "\t/* blergh */\n" + "\ttop: 0;\n" + "}"
  }, {
    code: "@media print {\n" + "\t.foo {\n" + "\t\t/* blergh */\n" + "\t\ttop: 0;\n" + "\t}\n" + "}"
  }],

  reject: [{
    code: " /* blergh */",
    message: _.messages.expected("0 tabs"),
    line: 1,
    column: 2
  }, {
    code: ".foo {\n" + "\t\t/* blergh */\n" + "\ttop: 0;\n" + "}",

    message: _.messages.expected("1 tab"),
    line: 2,
    column: 3
  }, {
    code: "@media print {\n" + "\t.foo {\n" + "\t/* blergh */\n" + "\t\ttop: 0;\n" + "\t}\n" + "}",

    message: _.messages.expected("2 tabs"),
    line: 3,
    column: 2
  }]
});