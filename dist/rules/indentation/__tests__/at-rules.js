"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [2],

  accept: [{
    code: "@media print {\n" + "  a {\n" + "    color: pink;\n" + "  }\n" + "}"
  }, {
    code: "@media print {\n" + "  a {\n" + "    color: pink;\n" + "  }\n" + "}\n" + "\n" + "@media screen {\n" + "  b { color: orange; }\n" + "}"
  }],

  reject: [{
    code: "\n" + "  @media print {\n" + "  a {\n" + "    color: pink;\n" + "  }\n" + "}",

    message: _.messages.expected("0 spaces"),
    line: 2,
    column: 3
  }, {
    code: "@media print {\n" + "a {\n" + "    color: pink;\n" + "  }\n" + "}",

    message: _.messages.expected("2 spaces"),
    line: 2,
    column: 1
  }, {
    code: "@media print {\n" + "  a {\n" + "  color: pink;\n" + "  }\n" + "}",

    message: _.messages.expected("4 spaces"),
    line: 3,
    column: 3
  }, {
    code: "@media print {\n" + "  a {\n" + "    color: pink;\n" + "}\n" + "}",

    message: _.messages.expected("2 spaces"),
    line: 4,
    column: 1
  }, {
    code: "@media print {\n" + "  a {\n" + "    color: pink;\n" + "  }\n" + "\t}",

    message: _.messages.expected("0 spaces"),
    line: 5,
    column: 2
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["tab", { except: ["block"] }],

  accept: [{
    code: "@media print {\n" + "\n" + "a {\n" + "\tcolor: pink;\n" + "}\n" + "\n" + "}"
  }, {
    code: "@media print,\n" + "\t(-webkit-min-device-pixel-ratio: 1.25),\n" + "\t(min-resolution: 120dpi) {}"
  }],

  reject: [{
    code: "@media print {\n" + "\n" + "\ta {\n" + "\tcolor: pink;\n" + "}\n" + "\n" + "}",

    message: _.messages.expected("0 tabs"),
    line: 3,
    column: 2
  }, {
    code: "@media print {\n" + "\n" + "a {\n" + "color: pink;\n" + "}\n" + "\n" + "}",

    message: _.messages.expected("1 tab"),
    line: 4,
    column: 1
  }, {
    code: "@media print,\n" + "  (-webkit-min-device-pixel-ratio: 1.25),\n" + "\t(min-resolution: 120dpi) {}",

    description: "multi-line at-rule params",
    message: _.messages.expected("1 tab"),
    line: 2,
    column: 1
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [4, { except: ["param"] }],

  accept: [{
    code: "@media print,\n" + "(-webkit-min-device-pixel-ratio: 1.25),\n" + "(min-resolution: 120dpi) {}"
  }],

  reject: [{
    code: "@media print,\n" + "  (-webkit-min-device-pixel-ratio: 1.25),\n" + "(min-resolution: 120dpi) {}",

    message: _.messages.expected("0 spaces"),
    line: 2,
    column: 1
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [2, { ignore: ["param"] }],

  accept: [{
    code: "@media print,\n" + "(-webkit-min-device-pixel-ratio: 1.25),\n" + "(min-resolution: 120dpi) {}"
  }, {
    code: "@media print,\n" + "  (-webkit-min-device-pixel-ratio: 1.25),\n" + "(min-resolution: 120dpi) {}"
  }],

  reject: [{
    code: "\n" + "  @media print {\n" + "  a {\n" + "    color: pink;\n" + "  }\n" + "}",

    message: _.messages.expected("0 spaces"),
    line: 2,
    column: 3
  }]
});