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
    code: "a { color: #000; }"
  }, {
    code: "a { something: #000, #fff, #ababab; }"
  }, {
    code: "a { color: #0000ffcc; }",
    description: "eight digits"
  }, {
    code: "a { color:#00fc; }",
    description: "four digits"
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
    code: "a { color: #ababa; }",
    message: _.messages.rejected("#ababa"),
    line: 1,
    column: 12
  }, {
    code: "a { something: #00, #fff, #ababab; }",
    message: _.messages.rejected("#00"),
    line: 1,
    column: 16
  }, {
    code: "a { something: #000, #fff1az, #ababab; }",
    message: _.messages.rejected("#fff1az"),
    line: 1,
    column: 22
  }, {
    code: "a { something:#000,#fff,#12345aa; }",
    message: _.messages.rejected("#12345aa"),
    line: 1,
    column: 25
  }]
});