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
    code: "a { color: pink; }"
  }, {
    code: "a { background: red; }"
  }, {
    code: "a { top: 0; color: pink; }"
  }],

  reject: [{
    code: "a { transform: scale(1); }",
    message: _.messages.rejected("transform"),
    line: 1,
    column: 5
  }, {
    code: "a { color: pink; background-size: cover; }",
    message: _.messages.rejected("background-size"),
    line: 1,
    column: 18
  }, {
    code: "a { color: pink; -webkit-transform: scale(1); }",
    message: _.messages.rejected("-webkit-transform"),
    line: 1,
    column: 18
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,

  config: [["/^background/"]],

  accept: [{
    code: "a { color: pink; }"
  }, {
    code: "a { no-background: sure; }"
  }],

  reject: [{
    code: "a { background: pink; }",
    message: _.messages.rejected("background"),
    line: 1,
    column: 5
  }, {
    code: "a { background-size: cover; }",
    message: _.messages.rejected("background-size"),
    line: 1,
    column: 5
  }, {
    code: "a { background-image: none; }",
    message: _.messages.rejected("background-image"),
    line: 1,
    column: 5
  }]
});