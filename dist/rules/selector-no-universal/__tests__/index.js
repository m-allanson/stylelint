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
    code: "foo {}"
  }, {
    code: "#foo {}"
  }, {
    code: ".foo {}"
  }, {
    code: "[foo] {}"
  }, {
    code: ":root { --custom-property-set: {} }"
  }],

  reject: [{
    code: "* {}",
    message: _.messages.rejected,
    line: 1,
    column: 1
  }, {
    code: ".bar * {}",
    message: _.messages.rejected,
    line: 1,
    column: 6
  }, {
    code: "*.bar {}",
    message: _.messages.rejected,
    line: 1,
    column: 1
  }, {
    code: ".foo, .bar, *.baz {}",
    message: _.messages.rejected,
    line: 1,
    column: 13
  }]
});