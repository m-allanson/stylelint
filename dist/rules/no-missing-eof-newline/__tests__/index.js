"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [undefined],
  skipBasicChecks: true,

  accept: [{
    code: ""
  }, {
    code: "\n"
  }, {
    code: "a { color: pink; }\n"
  }, {
    code: "a { color: pink; }\n\n\n"
  }],

  reject: [{
    code: "a { color: pink; }",
    message: _.messages.rejected,
    line: 1,
    column: 18
  }, {
    code: "a { color: pink; }\n\n\nb{ color: orange; }",
    message: _.messages.rejected,
    line: 4,
    column: 19
  }]
});