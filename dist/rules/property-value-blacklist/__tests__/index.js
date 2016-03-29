"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,

  config: [{
    // regular string
    "text-transform": ["uppercase"],
    // regexes
    "transform": ["/scale3d/", "/rotate3d/", "/translate3d/"],
    // mixed string and regex
    "color": ["red", "green", "blue", "/^sea/"]
  }],

  accept: [{
    code: "a { color: pink; }"
  }, {
    code: "a { color: lightgreen; }"
  }, {
    code: "a { text-transform: lowercase; }"
  }, {
    code: "a { transform: matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0) translate(12px, 50%); }"
  }, {
    code: "a { -webkit-transform: matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0) translate(12px, 50%); }"
  }, {
    code: "a { color: /* red */ pink; }",
    description: "ignore value within comments"
  }, {
    code: "a::before { color: \"red\"}",
    description: "ignore value within quotes"
  }, {
    code: "a { color: $red; }",
    description: "ignore preprocessor variable includes value"
  }, {
    code: "a { color: --some-red; }",
    description: "ignore css variable includes value"
  }, {
    code: "a { color: darkseagreen }",

    description: {
      message: _.messages.rejected("color", "darkseagreen"),
      column: 5
    }
  }],

  reject: [{
    code: "a { color: red; }",
    message: _.messages.rejected("color", "red"),
    line: 1,
    column: 5
  }, {
    code: "a { color: green }",
    message: _.messages.rejected("color", "green"),
    line: 1,
    column: 5
  }, {
    code: "a { text-transform: uppercase; }",
    message: _.messages.rejected("text-transform", "uppercase"),
    line: 1,
    column: 5
  }, {
    code: "a { transform: scale3d(1, 2, 3) }",
    message: _.messages.rejected("transform", "scale3d(1, 2, 3)"),
    line: 1,
    column: 5
  }, {
    code: "a { -webkit-transform: scale3d(1, 2, 3) }",
    message: _.messages.rejected("-webkit-transform", "scale3d(1, 2, 3)"),
    column: 5
  }, {
    code: "a { color: seagreen }",
    message: _.messages.rejected("color", "seagreen"),
    column: 5
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,

  config: [{
    "/^animation/": ["/ease/"]
  }],

  skipBasicChecks: true,

  accept: [{
    code: "a { animation: foo 1s linear; }"
  }, {
    code: "a { -webkit-animation: foo 1s linear; }"
  }, {
    code: "a { animation-timing-function: linear; }"
  }, {
    code: "a { -webkit-animation-timing-function: linear; }"
  }],

  reject: [{
    code: "a { animation: foo 1s ease-in-out; }",
    message: _.messages.rejected("animation", "foo 1s ease-in-out")
  }, {
    code: "a { -webkit-animation: foo 1s ease-in-out; }",
    message: _.messages.rejected("-webkit-animation", "foo 1s ease-in-out")
  }, {
    code: "a { animation-timing-function: ease-in-out; }",
    message: _.messages.rejected("animation-timing-function", "ease-in-out")
  }, {
    code: "a { -webkit-animation-timing-function: ease-in-out; }",
    message: _.messages.rejected("-webkit-animation-timing-function", "ease-in-out")
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: { position: ["fixed"] },
  skipBasicChecks: true,
  accept: [{
    code: "a { font-size: 1em; }",
    description: "irrelevant CSS"
  }]
});