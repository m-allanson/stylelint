"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,

  config: [["transform", "background-size"]],

  accept: [{
    code: "a { background-size: cover; }"
  }, {
    code: "a { transform: scale(1); }"
  }, {
    code: "a { -webkit-transform: scale(1); }"
  }, {
    code: "a { transform: scale(1); background-size: cover; }"
  }, {
    code: "a { transform: scale(1); -webkit-transform: scale(1); background-size: cover; }"
  }, {
    code: "a { $scss: 0; }"
  }, {
    code: "a { @less: 0; }"
  }, {
    code: "a { --custom-property: 0; }"
  }],

  reject: [{
    code: "a { background: pink; }",
    message: _.messages.rejected("background"),
    line: 1,
    column: 5
  }, {
    code: "a { color: pink; }",
    message: _.messages.rejected("color"),
    line: 1,
    column: 5
  }, {
    code: "a { overflow: hidden; background-size: cover; }",
    message: _.messages.rejected("overflow"),
    line: 1,
    column: 5
  }, {
    code: "a { color: orange; -webkit-transform: scale(1); }",
    message: _.messages.rejected("color"),
    line: 1,
    column: 5
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,

  config: [["/^background/"]],

  accept: [{
    code: "a { background: pink; }"
  }, {
    code: "a { background-color: pink; }"
  }, {
    code: "a { background-image: none; }"
  }],

  reject: [{
    code: "a { color: pink; }",
    message: _.messages.rejected("color"),
    line: 1,
    column: 5
  }]
});