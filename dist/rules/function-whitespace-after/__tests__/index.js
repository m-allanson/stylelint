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
    code: "a::before { content: \"var(--hoot)color(blue)\"; }"
  }, {
    code: "a::before { background: url('var(--hoot)color(blue)'); }"
  }, {
    code: "a::before { content: attr(data-foo); }"
  }, {
    code: "a { transform: translate(1, 1); }"
  }, {
    code: "a { transform: translate(1, 1) }"
  }, {
    code: "a { transform: translate(1, 1)}"
  }, {
    code: "a { transform: translate(1, 1) scale(3); }"
  }, {
    code: "a { color: color(rgb(0,0,0) lightness(50%)) };"
  }, {
    code: "a { background-image: linear-gradient(#f3c, #4ec), linear-gradient(#f3c, #4ec); }",
    description: "multiple comma-separated functions "
  }, {
    code: "a { border-color: color(rgb(0,0,0) lightness(50%)) red pink orange; }",
    description: "function within a function as one of multiple space-separated values"
  }, {
    code: "a { transform: translate(1, 1)  scale(3); }"
  }, {
    code: "a { transform: translate(1, 1)\nscale(3); }"
  }, {
    code: "a { transform: translate(1, 1)\r\nscale(3); }"
  }, {
    code: "a { color: color(rgb(0,0,0)  lightness(50%)) };"
  }, {
    code: "a { color: color(rgb(0,0,0)\nlightness(50%)) };"
  }, {
    code: "a { color: color(rgb(0,0,0)\r\nlightness(50%)) };"
  }],

  reject: [{
    code: "a { transform: translate(1, 1)scale(3); }",
    message: _.messages.expected,
    line: 1,
    column: 31
  }, {
    code: "a { color: color(rgb(0,0,0)lightness(50%)) };",
    message: _.messages.expected,
    line: 1,
    column: 28
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never"],

  accept: [{
    code: "a::before { content: \"var(--hoot) color(blue)\"; }"
  }, {
    code: "a::before { background: url('var(--hoot) color(blue)'); }"
  }, {
    code: "a::before { content: attr(data-foo); }"
  }, {
    code: "a { transform: translate(1, 1); }"
  }, {
    code: "a { transform: translate(1, 1) }"
  }, {
    code: "a { transform: translate(1, 1)}"
  }, {
    code: "a { transform: translate(1, 1)scale(3); }"
  }, {
    code: "a { color: color(rgb(0,0,0)lightness(50%)) };"
  }],

  reject: [{
    code: "a { transform: translate(1, 1) scale(3); }",
    message: _.messages.rejected,
    line: 1,
    column: 31
  }, {
    code: "a { transform: translate(1, 1)  scale(3); }",
    message: _.messages.rejected,
    line: 1,
    column: 31
  }, {
    code: "a { transform: translate(1, 1)\nscale(3); }",
    message: _.messages.rejected,
    line: 1,
    column: 31
  }, {
    code: "a { transform: translate(1, 1)\r\nscale(3); }",
    description: "CRLF",
    message: _.messages.rejected,
    line: 1,
    column: 31
  }, {
    code: "a { color: color(rgb(0,0,0) lightness(50%)) };",
    message: _.messages.rejected,
    line: 1,
    column: 28
  }, {
    code: "a { color: color(rgb(0,0,0)  lightness(50%)) };",
    message: _.messages.rejected,
    line: 1,
    column: 28
  }, {
    code: "a { color: color(rgb(0,0,0)\nlightness(50%)) };",
    message: _.messages.rejected,
    line: 1,
    column: 28
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always"],
  skipBasicChecks: true,
  syntax: "scss",

  accept: [{
    code: "h1 { max-height: #{($line-height) * ($lines-to-show)}em; }",
    description: "Sass-style interpolation with curly braces"
  }],

  reject: [{
    code: "a { padding:\n  10px\n  // comment one\n  // comment two\n  var(--boo)orange}",
    message: _.messages.expected,
    line: 5,
    column: 13
  }]
});