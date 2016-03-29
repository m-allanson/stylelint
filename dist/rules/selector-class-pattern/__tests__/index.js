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
    code: "#foo {}"
  }, {
    code: "[foo='bar'] {}"
  }, {
    code: ".FOO {}"
  }, {
    code: "a #foo > [foo='bar'], .FOO {}"
  }, {
    code: "a /* .foo */ {}"
  }, {
    code: ":root { --custom-property-set: {} }"
  }],

  reject: [{
    code: "a .foo {}",
    message: _.messages.expected("foo"),
    line: 1,
    column: 3
  }, {
    code: ".ABABA > .bar {}",
    message: _.messages.expected("bar"),
    line: 1,
    column: 10
  }]
};

var nestedAZTestsDefault = {
  accept: [{
    code: ".AB { }"
  }, {
    code: ".A { &__B { }}"
  }]
};

var nestedAZTests = {
  accept: [{
    code: ".AB { }"
  }, {
    code: ".A { &B {}}"
  }, {
    code: ".A { & > B {}}"
  }, {
    code: ".A { &B {}, .C {}, &D {} }"
  }, {
    code: ".A, .B { &C {} &D, &E {} }"
  }],

  reject: [{
    code: ".A { &__B { }}",
    message: _.messages.expected("A__B"),
    line: 0,
    column: 6
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

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(nestedAZTestsDefault, {
  ruleName: _.ruleName,
  config: [/^[A-Z]+$/]
}));

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(nestedAZTestsDefault, {
  ruleName: _.ruleName,
  config: ["^[A-Z]+$"]
}));

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(nestedAZTests, {
  ruleName: _.ruleName,
  config: [/^[A-Z]+$/, { resolveNestedSelectors: true }]
}));

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(nestedAZTests, {
  ruleName: _.ruleName,
  config: ["^[A-Z]+$", { resolveNestedSelectors: true }]
}));

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [/^B+$/, { resolveNestedSelectors: true }],

  reject: [{
    code: ".A { .B { } }",
    message: _.messages.expected("A")
  }, {
    code: ".A { & .B { } }",
    message: _.messages.expected("A")
  }, {
    code: ".A { &>.B { } }",
    message: _.messages.expected("A")
  }]
});