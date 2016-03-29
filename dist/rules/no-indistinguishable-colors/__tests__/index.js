"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [true],

  accept: [{
    code: "a { color: #fff; } b { color: #000; }"
  }],

  reject: [{
    code: "h1 {\n  color: black;\n  color: #010101;\n}",
    message: _.messages.rejected("#010101", "black"),
    line: 3,
    column: 10
  }, {
    code: "h1 {\n  color: rgb(0, 0, 0);\n  color: #010101;\n}",
    message: _.messages.rejected("#010101", "rgb(0, 0, 0)"),
    line: 3,
    column: 10
  }, {
    code: "h1 {\n  color: black;\n  color: rgb(0, 0, 0);\n}",
    message: _.messages.rejected("rgb(0, 0, 0)", "black"),
    line: 3,
    column: 10
  }, {
    code: "@-webkit-keyframes spin {\n      /* This comment used to break things */\n      0% {\n        -webkit-transform: rotate(0deg);\n        color: #010101;\n      }\n      100% {\n        -webkit-transform: rotate(360deg);\n        /* It should still pick this one up */\n        background: #000000;\n      }\n    }",

    message: _.messages.rejected("#000000", "#010101"),
    line: 10,
    column: 21
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [true, { whitelist: [["#000000", "#020202"]] }],
  skipBasicChecks: true,

  reject: [{
    code: ".classname {\n  background-image: -webkit-linear-gradient(rgba(0,0,0,1), #020202);\n  color: #000000;\n}",
    message: _.messages.rejected("#000000", "rgba(0,0,0,1)"),
    line: 3,
    column: 10
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [true, { ignore: ["#000000"] }],
  skipBasicChecks: true,

  accept: [{
    code: "h1 {\n  color: black;\n  color: #010101;\n}"
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [true, { threshold: 0 }],
  skipBasicChecks: true,

  accept: [{
    code: "h1 {\n  color: black;\n  color: #010101;\n}"
  }]
});