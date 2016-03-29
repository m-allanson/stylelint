"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["single"],

  accept: [{
    code: "a { color: pink; }"
  }, {
    code: "a:before { color: pink; }"
  }, {
    code: "a:after { color: pink; }"
  }, {
    code: "a:first-letter { color: pink; }"
  }, {
    code: "a:first-line { color: pink; }"
  }, {
    code: "a:before, a[data-before='before'] { color: pink; }"
  }, {
    code: "::selection { color: pink; }"
  }, {
    code: "a::spelling-error { color: pink; }"
  }, {
    code: "a::grammar-error { color: pink; }"
  }, {
    code: "li::marker { font-variant-numeric: tabular-nums; }"
  }, {
    code: "input::placeholder { color: pink; }"
  }],

  reject: [{
    code: "a::before { color: pink; }",
    message: _.messages.expected("single"),
    line: 1,
    column: 3
  }, {
    code: "a::after { color: pink; }",
    message: _.messages.expected("single"),
    line: 1,
    column: 3
  }, {
    code: "a::first-line { color: pink; }",
    message: _.messages.expected("single"),
    line: 1,
    column: 3
  }, {
    code: "a::first-letter { color: pink; }",
    message: _.messages.expected("single"),
    line: 1,
    column: 3
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["double"],

  accept: [{
    code: "a { color: pink; }"
  }, {
    code: "a::before { color: pink; }"
  }, {
    code: "a::after { color: pink; }"
  }, {
    code: "a::first-letter { color: pink; }"
  }, {
    code: "a::first-line { color: pink; }"
  }, {
    code: "a::before, a[data-before='before'] { color: pink; }"
  }, {
    code: "::selection { color: pink; }"
  }, {
    code: "a::spelling-error { color: pink; }"
  }, {
    code: "a::grammar-error { color: pink; }"
  }, {
    code: "li::marker { font-variant-numeric: tabular-nums; }"
  }, {
    code: "input::placeholder { color: pink; }"
  }],

  reject: [{
    code: "a:before { color: pink; }",
    message: _.messages.expected("double"),
    line: 1,
    column: 2
  }, {
    code: "a:after { color: pink; }",
    message: _.messages.expected("double"),
    line: 1,
    column: 2
  }, {
    code: "a:first-line { color: pink; }",
    message: _.messages.expected("double"),
    line: 1,
    column: 2
  }, {
    code: "a:first-letter { color: pink; }",
    message: _.messages.expected("double"),
    line: 1,
    column: 2
  }]
});