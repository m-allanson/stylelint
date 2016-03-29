"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,

  config: [{
    "transform": ["/scale/"],
    "whitespace": ["nowrap"],
    "/color/": ["/^green/"]
  }],

  accept: [{
    code: "div { whitespace: nowrap; }"
  }, {
    code: "a { transform: scale(1, 1); }"
  }, {
    code: "a { -webkit-transform: scale(1, 1); }"
  }, {
    code: "a { color: green; }"
  }, {
    code: "a { background-color: green; }"
  }],

  reject: [{
    code: "div { whitespace: pre; }",
    message: _.messages.rejected("whitespace", "pre"),
    line: 1,
    column: 7
  }, {
    code: "a { transform: translate(1, 1); }",
    message: _.messages.rejected("transform", "translate(1, 1)"),
    line: 1,
    column: 5
  }, {
    code: "a { -webkit-transform: translate(1, 1); }",
    message: _.messages.rejected("-webkit-transform", "translate(1, 1)"),
    line: 1,
    column: 5
  }, {
    code: "a { color: pink; }",
    message: _.messages.rejected("color", "pink"),
    line: 1,
    column: 5
  }, {
    code: "a { background-color: pink; }",
    message: _.messages.rejected("background-color", "pink"),
    line: 1,
    column: 5
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: { position: ["static"] },
  skipBasicChecks: true,
  accept: [{
    code: "a { font-size: 1em; }",
    description: "irrelevant CSS"
  }]
});