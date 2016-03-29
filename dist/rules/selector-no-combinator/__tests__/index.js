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
    code: "a {}"
  }, {
    code: ".foo, #bar {}"
  }, {
    code: "a.foo {}"
  }, {
    code: ":root { --custom-property-set: {} }"
  }],

  reject: [{
    code: "a b {}",
    message: _.messages.rejected,
    line: 1,
    column: 2
  }, {
    code: "a + a {}",
    message: _.messages.rejected,
    line: 1,
    column: 3
  }, {
    code: "a > a {}",
    message: _.messages.rejected,
    line: 1,
    column: 3
  }, {
    code: "a ~ a {}",
    message: _.messages.rejected,
    line: 1,
    column: 3
  }, {
    code: "a b, .foo {}",
    message: _.messages.rejected,
    line: 1,
    column: 2
  }, {
    code: ".foo, a b {}",
    message: _.messages.rejected,
    line: 1,
    column: 8
  }, {
    code: "\t.foo,\n\ta b {}",
    message: _.messages.rejected,
    line: 2,
    column: 3
  }, {
    code: "a#foo ~ b {}",
    message: _.messages.rejected,
    line: 1,
    column: 7
  }]
});