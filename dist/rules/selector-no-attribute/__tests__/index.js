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
    code: ".bar {}"
  }, {
    code: "foo .bar {}"
  }, {
    code: ":root { --custom-property-set: {} }"
  }],

  reject: [{
    code: "[foo] {}",
    message: _.messages.rejected,
    line: 1,
    column: 1
  }, {
    code: "a[rel=\"external\"] {}",
    message: _.messages.rejected,
    line: 1,
    column: 2
  }, {
    code: "a, .foo[type=\"text\"] {}",
    message: _.messages.rejected,
    line: 1,
    column: 8
  }, {
    code: "a > [foo] {}",
    message: _.messages.rejected,
    line: 1,
    column: 5
  }, {
    code: "a[rel='external'] {}",
    message: _.messages.rejected,
    line: 1,
    column: 2
  }]
});