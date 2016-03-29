"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [2, { hierarchicalSelectors: true }],

  accept: [{
    code: ".foo {}\n" + ".foo {}"
  }, {
    code: "@media print {\n" + "  a {\n" + "    color: pink;\n" + "  }\n" + "}"
  }, {
    code: ".foo {}\n" + ".bar {}\n" + ".baz {}"
  }, {
    code: ".foo {}\n" + "  .foo-one {}\n" + ".bar {}\n" + "  .bar-one {}"
  }, {
    code: ".foo {\n" + "  top: 0;\n" + "}\n" + "  .foo-one {\n" + "    top: 1px;\n" + "  }"
  }, {
    code: ".foo {}\n" + "  .foo-one {}\n" + "    .foo-one-sub {}"
  }, {
    code: ".foo {}\n" + "  .foo-one {}\n" + "  .foo-two {}\n" + "    .foo-two-sub {}\n" + "  .foo-three {}\n" + ".bar {}"
  }, {
    code: "#foo {\n" + "  top: 3px;\n" + "}\n" + "  #foo ul {}\n" + "    #foo ul > li {}\n" + "      #foo ul > li span {\n" + "        top: 4px;\n" + "      }\n" + "    #foo ul a {}\n" + "  #foo div {\n" + "    top: 6px;\n" + "  }\n" + "    #foo div span {}\n" + "#bar {}"
  }, {
    code: "#bar {}\n" + "#baz {}\n" + "#bar a {}\n" + "#baz b {}"
  }, {
    code: "@media print {\n" + "  .foo {\n" + "    top: 0;\n" + "  }\n" + "    .foo-bar {\n" + "      top: 10px;\n" + "    }\n" + "  .bar {\n" + "    top: 1px;\n" + "  }\n" + "}"
  }, {
    code: ".foo {}\n" + "  @media print {\n" + "    .foo-one {\n" + "      color: pink;\n" + "    }\n" + "  }"
  }, {
    code: ".foo {}\n" + "  @media print {\n" + "    .foo-one {}\n" + "  }"
  }, {
    code: ":root {\n" + "  --Grid: #fff;\n" + "}\n" + "\n" + ".r-Grid {\n" + "  color: red;\n" + "}\n" + "\n" + "  .r-Grid-cell {\n" + "    text-align: center;\n" + "  }"
  }],

  reject: [{
    code: ".foo {}\n" + "  .bar {}\n" + ".baz {}",

    message: _.messages.expected("0 spaces"),
    line: 2,
    column: 3
  }, {
    code: ".foo {}\n" + "    .foo-one {}\n" + ".bar {}\n" + "  .bar-one {}",

    message: _.messages.expected("2 spaces"),
    line: 2,
    column: 5
  }, {
    code: ".foo {}\n" + "  .foo-one {}\n" + ".bar {}\n" + "   .bar-one {}",

    message: _.messages.expected("2 spaces"),
    line: 4,
    column: 4
  }, {
    code: ".foo {}\n" + "  .foo-one {}\n" + ".bar {}\n" + "  .bar-one {\n" + "  top: 0;\n" + "  }",

    message: _.messages.expected("4 spaces"),
    line: 5,
    column: 3
  }, {
    code: ".foo {}\n" + "  .foo-one {}\n" + "  .bar {}\n" + "  .bar-one {}",

    message: _.messages.expected("0 spaces"),
    line: 3,
    column: 3
  }, {
    code: ".foo {}\n" + "  .foo-one {\n" + "    color: pink;\n" + "     top: 0;\n" + "  }",

    message: _.messages.expected("4 spaces"),
    line: 4,
    column: 6
  }, {
    code: ".foo {}\n" + "  .foo-one {}\n" + "  .foo-one-sub {}",

    message: _.messages.expected("4 spaces"),
    line: 3,
    column: 3
  }, {
    code: ".foo {}\n" + "  .foo-one {}\n" + "  .foo-two {}\n" + "  .foo-two-sub {}\n" + "  .foo-three {}\n" + ".bar {}",

    message: _.messages.expected("4 spaces"),
    line: 4,
    column: 3
  }, {
    code: ".foo {}\n" + "  .foo-one {\n" + "    top: 0;\n" + "  }\n" + "  .foo-two {}\n" + "    .foo-two-sub {\n" + "      top: 10px;\n" + "    }\n" + "  .foo-three {}\n" + "  .bar {}",

    message: _.messages.expected("0 spaces"),
    line: 10,
    column: 3
  }, {
    code: "#foo {}\n" + "  #foo ul {}\n" + "    #foo ul > li {}\n" + "      #foo ul li span {}\n" + "    #foo ul a {}\n" + "  #foo div {}\n" + "    #foo div span {}\n" + "#bar {}",

    message: _.messages.expected("4 spaces"),
    line: 4,
    column: 7
  }, {
    code: "#foo {}\n" + "  #foo ul {}\n" + "    #foo ul > li {}\n" + "      #foo ul > li span {}\n" + "  #foo ul a {}\n" + "  #foo div {}\n" + "    #foo div span {}\n" + "#bar {}",

    message: _.messages.expected("4 spaces"),
    line: 5,
    column: 3
  }, {
    code: "#bar {}\n" + "#baz {}\n" + "  #bar a {}\n" + "#baz b {}",

    message: _.messages.expected("0 spaces"),
    line: 3,
    column: 3
  }, {
    code: "@media print {\n" + "  .foo {\n" + "    top: 0;\n" + "  }\n" + "    .foo-bar {\n" + "      top: 10px;\n" + "       bottom: 0;\n" + "    }\n" + "  .bar {\n" + "    top: 1px;\n" + "  }\n" + "}",

    message: _.messages.expected("6 spaces"),
    line: 7,
    column: 8
  }, {
    code: ".foo {}\n" + "  @media print {\n" + "  .foo-one {\n" + "      color: pink;\n" + "    }\n" + "  }",

    message: _.messages.expected("4 spaces"),
    line: 3,
    column: 3
  }, {
    code: ".foo {}\n" + "  @media print {\n" + "      .foo-one {}\n" + "  }",

    message: _.messages.expected("4 spaces"),
    line: 3,
    column: 7
  }]
});