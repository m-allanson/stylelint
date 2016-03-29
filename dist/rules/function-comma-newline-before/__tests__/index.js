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
    code: "a::before { content: \"func(foo ,bar ,baz)\"; }"
  }, {
    code: "a::before { background: url('func(foo,bar,baz)'); }"
  }, {
    code: "a { background-size: 0\n, 0\n, 0; }"
  }, {
    code: "a { transform: translate(1\n,1); }"
  }, {
    code: "a { transform: translate(1\r\n, 1); }",
    description: "CRLF"
  }, {
    code: "a { transform: color(rgb(0\n\t, 0\n\t,0) lightness(50%)); }"
  }, {
    code: "a { transform: color(rgb(0\n  , 0\n  ,0) lightness(50%)); }"
  }, {
    code: "$map: (key: value, key2: value2)",
    description: "SCSS map"
  }],

  reject: [{
    code: "a { transform: translate(1,1); }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 27
  }, {
    code: "a { transform: translate(1  ,1); }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 29
  }, {
    code: "a { transform: translate(1 ,1); }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 28
  }, {
    code: "a { transform: translate(1\t,1); }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 28
  }, {
    code: "a { transform: color(rgb(0 , 0 \n,0) lightness(50%)); }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 28
  }, {
    code: "a { transform: color(lightness(50%) rgb(0\n, 0,0)); }",
    message: _.messages.expectedBefore(),
    line: 2,
    column: 4
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-multi-line"],

  accept: [{
    code: "a::before { content: \"func(foo ,bar ,baz)\"; }"
  }, {
    code: "a::before { background: url('func(foo,bar,baz)'); }"
  }, {
    code: "a { background-size: 0\n, 0\n, 0; }"
  }, {
    code: "a { transform: translate(1\n,1); }"
  }, {
    code: "a { transform: translate(1\r\n, 1); }",
    description: "CRLF"
  }, {
    code: "a { transform: color(rgb(0\n\t, 0\n\t,0) lightness(50%)); }"
  }, {
    code: "a { transform: color(rgb(0\n  , 0\n  ,0) lightness(50%)); }"
  }, {
    code: "a { transform: translate(1,1); }"
  }, {
    code: "a { transform: translate(1  ,1); }"
  }, {
    code: "a { transform: translate(1 , 1); }"
  }, {
    code: "a { transform: translate(1\t,1); }"
  }, {
    code: "a { background: linear-gradient(45deg\n, rgba(0, 0, 0, 1)\n, red); }"
  }, {
    code: "$map: (key: value,\nkey2: value2)",
    description: "SCSS map"
  }],

  reject: [{
    code: "a { transform: color(rgb(0\n, 0, 0) lightness(50%)); }",
    message: _.messages.expectedBeforeMultiLine(),
    line: 2,
    column: 4
  }, {
    code: "a { transform: color(lightness(50%) rgb(0,0\n,0)); }",
    message: _.messages.expectedBeforeMultiLine(),
    line: 1,
    column: 42
  }, {
    code: "a { background: linear-gradient(45deg\n, rgba(0\n, 0, 0\n, 1)\n, red); }",
    message: _.messages.expectedBeforeMultiLine(),
    line: 3,
    column: 4
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-multi-line"],

  accept: [{
    code: "a::before { content: \"func(foo\n,bar\n,baz)\"; }"
  }, {
    code: "a::before { background: url('func(foo\n,bar,baz)'); }"
  }, {
    code: "a { transform: translate(1,1); }"
  }, {
    code: "a { transform: translate(1  ,1); }"
  }, {
    code: "a { transform: translate(1 , 1); }"
  }, {
    code: "a { transform: translate(1\t,1); }"
  }, {
    code: "$map: (key: value\n,key2: value2)",
    description: "SCSS map"
  }],

  reject: [{
    code: "a { transform: color(rgb(0,0\n,0) lightness(50%)); }",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 1
  }, {
    code: "a { transform: color(lightness(50%) rgb(0\n, 0, 0)); }",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 1
  }, {
    code: "a { transform: color(rgb(0\n,0,\n0) lightness(50%)); }",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 1
  }, {
    code: "a { transform: color(lightness(50%) rgb(0,\n 0\n,0)); }",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 3,
    column: 1
  }]
});