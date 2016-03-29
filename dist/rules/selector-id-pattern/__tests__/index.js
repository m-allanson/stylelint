"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _testUtils = require("../../../testUtils");

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var basicAZTests = {
  accept: [{
    code: "a {}"
  }, {
    code: ".foo {}"
  }, {
    code: "[foo='bar'] {}"
  }, {
    code: "#FOO {}"
  }, {
    code: "a .foo > [foo='bar'], #FOO {}"
  }, {
    code: "a /* #foo */ {}"
  }, {
    code: ":root { --custom-property-set: {} }"
  }],

  reject: [{
    code: "a #foo {}",
    message: _.messages.expected("foo"),
    line: 1,
    column: 3
  }, {
    code: "#ABABA > #bar {}",
    message: _.messages.expected("bar"),
    line: 1,
    column: 10
  }]
};

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(basicAZTests, {
  ruleName: _.ruleName,
  config: [/^[A-Z]+$/]
}));

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(basicAZTests, {
  ruleName: _.ruleName,
  config: ["^[A-Z]+$"]
}));