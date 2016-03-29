"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,

  config: [["rgba", "scale", "linear-gradient"]],

  accept: [{
    code: "a { color: pink; }"
  }, {
    code: "a { transform: rotate(7deg) }"
  }, {
    code: "a { background: -webkit-radial-gradient(red, green, blue); }"
  }, {
    code: "a { color: color(rgb(0, 0, 0) lightness(50%)); }"
  }, {
    code: "@media (max-width: 10px) { a { color: color(rgb(0, 0, 0) lightness(50%)); } }"
  }],

  reject: [{
    code: "a { transform: scale(1); }",
    message: _.messages.rejected("scale"),
    line: 1,
    column: 16
  }, {
    code: "a { transform : scale(1); }",
    message: _.messages.rejected("scale"),
    line: 1,
    column: 17
  }, {
    code: "a\n{ transform: scale(1); }",
    message: _.messages.rejected("scale"),
    line: 2,
    column: 14
  }, {
    code: "a { transform:    scale(1); }",
    message: _.messages.rejected("scale"),
    line: 1,
    column: 19
  }, {
    code: "  a { transform: scale(1); }",
    message: _.messages.rejected("scale"),
    line: 1,
    column: 18
  }, {
    code: "a { color: rgba(0, 0, 0, 0) }",
    message: _.messages.rejected("rgba"),
    line: 1,
    column: 12
  }, {
    code: "a { color: color(rgba(0, 0, 0, 0) lightness(50%)); }",
    message: _.messages.rejected("rgba"),
    line: 1,
    column: 18
  }, {
    code: "a { background: red, -moz-linear-gradient(45deg, blue, red); }",
    message: _.messages.rejected("-moz-linear-gradient"),
    line: 1,
    column: 22
  }, {
    code: "@media (max-width: 10px) { a { color: color(rgba(0, 0, 0) lightness(50%)); } }",
    message: _.messages.rejected("rgba"),
    line: 1,
    column: 45
  }]
});