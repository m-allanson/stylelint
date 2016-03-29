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
    code: "a { color: pink; }"
  }, {
    code: "a { color: rgba(0, 0, 0, 0); }"
  }, {
    code: "a { something: black, white, gray; }"
  }, {
    code: "a { padding: 000; }"
  }, {
    code: "a::before { content: \"#ababa\"; }"
  }, {
    code: "a { border-#$side: 0; }",
    description: "ignore sass-like interpolation"
  }, {
    code: "a { box-sizing: #$type-box; }",
    description: "ignore sass-like interpolation"
  }, {
    code: "@font-face {\n" + "font-family: dashicons;\n" + "src: url(data:application/font-woff;charset=utf-8;base64, ABCDEF==) format(\"woff\"),\n" + "url(../fonts/dashicons.ttf) format(\"truetype\"),\n" + "url(../fonts/dashicons.svg#dashicons) format(\"svg\");\n" + "font-weight: normal;\n" + "font-style: normal;\n" + "}"
  }],

  reject: [{
    code: "a { color: #12345; }",
    message: _.messages.rejected("#12345"),
    line: 1,
    column: 12
  }, {
    code: "a { color: #123456a; }",
    message: _.messages.rejected("#123456a"),
    line: 1,
    column: 12
  }, {
    code: "a { color: #cccccc; }",
    message: _.messages.rejected("#cccccc"),
    line: 1,
    column: 12
  }, {
    code: "a { something: #00c, red, white; }",
    message: _.messages.rejected("#00c"),
    line: 1,
    column: 16
  }, {
    code: "a { something: black, #fff1a1, rgb(250, 250, 0); }",
    message: _.messages.rejected("#fff1a1"),
    line: 1,
    column: 23
  }, {
    code: "a { something:black,white,#12345a; }",
    message: _.messages.rejected("#12345a"),
    line: 1,
    column: 27
  }, {
    code: "a { color: #ffff; }",
    message: _.messages.rejected("#ffff"),
    line: 1,
    column: 12
  }, {
    code: "a { color: #ffffffaa; }",
    message: _.messages.rejected("#ffffffaa"),
    line: 1,
    column: 12
  }]
});