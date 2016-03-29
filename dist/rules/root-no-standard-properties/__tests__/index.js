"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [undefined],

  accept: [{
    code: ":root { --foo: 0; }"
  }, {
    code: "a, :root { --foo: 0; }"
  }, {
    code: "a { color: pink; } :root { --foo: 0; }"
  }, {
    code: ":root { $scss: 0; }"
  }, {
    code: ":root { @less: 0; }"
  }, {
    code: ":not(:root) { color: pink; }",
    description: "negation pseudo-class"
  }, {
    code: "svg:not(:root) { color: pink; }",
    description: "negation pseudo-class"
  }, {
    code: "a, :not(:root) { color: pink; }",
    description: "negation pseudo-class"
  }, {
    code: ":not(:root) { --foo: pink; }",
    description: "negation pseudo-class"
  }, {
    code: "div, a:not(div a:root) { --foo: pink; }",
    description: "negation pseudo-class"
  }],

  reject: [{
    code: ":root { top: 0; }",
    message: _.messages.rejected("top"),
    line: 1,
    column: 9
  }, {
    code: ":root { -webkit-transform: scale(0); }",
    message: _.messages.rejected("-webkit-transform"),
    line: 1,
    column: 9
  }, {
    code: "a, :root { color: pink; }",
    message: _.messages.rejected("color"),
    line: 1,
    column: 12
  }, {
    code: "a { color: pink; } :root { margin: 0; }",
    message: _.messages.rejected("margin"),
    line: 1,
    column: 28
  }, {
    code: ":root, :not(a) { color: pink; }",
    message: _.messages.rejected("color"),
    line: 1,
    column: 18
  }, {
    code: ":root:not(a) { color: pink; }",
    message: _.messages.rejected("color"),
    line: 1,
    column: 16
  }, {
    code: ".foo, :root, .bar:not(:hover) { color: pink; }",
    message: _.messages.rejected("color"),
    line: 1,
    column: 33
  }]
});