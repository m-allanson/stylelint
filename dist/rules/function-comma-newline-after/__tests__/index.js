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
    code: "a::before { content: \"func(foo, bar, baz)\"; }"
  }, {
    code: "a::before { background: url('func(foo,bar,baz)'); }"
  }, {
    code: "a { background-size: 0,\n  0,\n  0; }"
  }, {
    code: "a { transform: translate(1 ,\n1); }"
  }, {
    code: "a { transform: translate(\n  1,\n  1\n); }"
  }, {
    code: "a { transform: translate(1,\r\n1); }",
    description: "CRLF"
  }, {
    code: "a { transform: color(rgb(0 ,\n\t0,\n\t0) lightness(50%)); }"
  }, {
    code: "a { background: linear-gradient(45deg,\n rgba(0,\n 0,\n 0,\n 1),\n red); }"
  }, {
    code: "$map: (key: value, key2: value2)",
    description: "SCSS map"
  }],

  reject: [{
    code: "a { transform: translate(1,1); }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 27
  }, {
    code: "a { transform: translate(1,  1); }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 27
  }, {
    code: "a { transform: translate(1, 1); }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 27
  }, {
    code: "a { transform: translate(1,\t1); }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 27
  }, {
    code: "a { transform: color(rgb(0 , 0 ,\n0) lightness(50%)); }",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 28
  }, {
    code: "a { transform: color(lightness(50%) rgb(0 ,\n 0 ,0)); }",
    message: _.messages.expectedAfter(),
    line: 2,
    column: 4
  }, {
    code: "a { background: linear-gradient(45deg,\n rgba(0,\n 0, 0,\n 1),\n red); }",
    message: _.messages.expectedAfter(),
    line: 3,
    column: 3
  }, {
    code: "a { transform: translate(\n  1,1\n); }",
    message: _.messages.expectedAfter(),
    line: 2,
    column: 4
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-multi-line"],

  accept: [{
    code: "a::before { content: \"func(foo, bar, baz)\"; }"
  }, {
    code: "a::before { background: url('func(foo,bar,baz)'); }"
  }, {
    code: "a { background-size: 0,\n  0,\n  0; }"
  }, {
    code: "a { transform: translate(1 ,\n1); }"
  }, {
    code: "a { transform: translate(1,\r\n1); }",
    description: "CRLF"
  }, {
    code: "a { transform: color(rgb(0 ,\n\t0,\n\t0) lightness(50%)); }"
  }, {
    code: "a { transform: translate(1,1); }"
  }, {
    code: "a { transform: translate(1,  1); }"
  }, {
    code: "a { transform: translate(1, 1); }"
  }, {
    code: "a { transform: translate(1,\t1); }"
  }, {
    code: "a {\r\n  transform:\r\n    translate(1,1)\r\n  scale(3);\r\n}",
    description: "CRLF"
  }, {
    code: "\n      .foo {\n        box-shadow:\n          inset 0 8px 8px -8px rgba(0, 0, 0, 1)\n          inset 0 -10px 12px 0 #f00;\n      }\n    "
  }, {
    code: "\n      .foo {\n        background-image:\n          repeating-linear-gradient(\n            -45deg,\n            transparent,\n            rgba(0, 0, 0, 1) 5px\n          );\n        }\n    "
  }, {
    code: "$map: (key: value\n, key2: value2)",
    description: "SCSS map"
  }],

  reject: [{
    code: "a { transform: color(rgb(0 , 0 ,\n0) lightness(50%)); }",
    message: _.messages.expectedAfterMultiLine(),
    line: 1,
    column: 28
  }, {
    code: "a { transform: color(lightness(50%) rgb(0 ,\n 0 ,0)); }",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 4
  }, {
    code: "a { background-image: repeating-linear-gradient(\n-45deg,\ntransparent, rgba(0, 0, 0, 1) 5px\n);}",
    message: _.messages.expectedAfterMultiLine(),
    line: 3,
    column: 12
  }, {
    code: "a { background: linear-gradient(45deg,rgba(0,\n0 ,\n 0 ,\n 1)); }",
    message: _.messages.expectedAfterMultiLine(),
    line: 1,
    column: 38
  }, {
    code: "a { transform: translate(\n  1,1\n); }",
    message: _.messages.expectedAfterMultiLine(),
    line: 2,
    column: 4
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-multi-line"],

  accept: [{
    code: "a::before { content: \"func(foo,\n bar,\n baz)\"; }"
  }, {
    code: "a::before { background: url('func(foo,\nbar,\nbaz)'); }"
  }, {
    code: "a { background-size: 0\n, 0\n, 0; }"
  }, {
    code: "a { transform: translate(1\r\n,1); }",
    description: "CRLF"
  }, {
    code: "a { transform: color(rgb(0\n\t,0\n\t,0) lightness(50%)); }"
  }, {
    code: "a { transform: translate(1,1); }"
  }, {
    code: "a { transform: translate(1,  1); }"
  }, {
    code: "a { transform: translate(1, 1); }"
  }, {
    code: "a { transform: translate(1,\t1); }"
  }, {
    code: "a { background: linear-gradient(45deg\n,rgba(0, 0, 0, 1),red); }"
  }, {
    code: "$map: (key: value,\nkey2: value2)",
    description: "SCSS map"
  }],

  reject: [{
    code: "a { transform: color(rgb(0 ,0 ,\n0) lightness(50%)); }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 1,
    column: 31
  }, {
    code: "a { transform: color(lightness(50%) rgb(0 ,\n 0 ,0)); }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 1,
    column: 43
  }, {
    code: "a { transform: color(rgb(0\n,0 ,\n0) lightness(50%)); }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 2,
    column: 4
  }, {
    code: "a { transform: color(lightness(50%) rgb(0 ,\n 0\n,0)); }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 1,
    column: 43
  }, {
    code: "a { background: linear-gradient(45deg\n,rgba(0,0 , 0, 1), red); }",
    message: _.messages.rejectedAfterMultiLine(),
    line: 2,
    column: 18
  }]
});