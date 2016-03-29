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
    code: "a { color: pink; }",
    description: "without !important"
  }],

  reject: [{
    code: "a { color: pink !important; }",
    description: "with !important",
    message: _.messages.rejected,
    line: 1,
    column: 18
  }, {
    code: "a { color: pink ! important; }",
    description: "with ! important",
    message: _.messages.rejected,
    line: 1,
    column: 19
  }, {
    code: "a { color: pink!important; }",
    description: "with value!important",
    message: _.messages.rejected,
    line: 1,
    column: 17
  }]
});