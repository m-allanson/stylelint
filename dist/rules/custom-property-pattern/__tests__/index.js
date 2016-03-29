"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [/foo-.+/],

  accept: [{
    code: ":root { --foo-bar: 0; }"
  }, {
    code: ":root { --boo-foo-bar: 0; }"
  }],

  reject: [{
    code: ":root { --boo-bar: 0; }",
    message: _.messages.expected
  }, {
    code: ":root { --foo-: 0; }",
    message: _.messages.expected
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["foo-.+"],

  accept: [{
    code: ":root { --foo-bar: 0; }"
  }, {
    code: ":root { --boo-foo-bar: 0; }"
  }],

  reject: [{
    code: ":root { --boo-bar: 0; }",
    message: _.messages.expected
  }, {
    code: ":root { --foo-: 0; }",
    message: _.messages.expected
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [/^[A-Z][a-z]+-[a-z][a-zA-Z]+$/],

  accept: [{
    code: ":root { --Foo-bar: 0; }"
  }, {
    code: ":root { --Foo-barBaz: 0; }"
  }],

  reject: [{
    code: ":root { --boo-Foo-bar: 0; }",
    message: _.messages.expected
  }, {
    code: ":root { --foo-bar: 0; }",
    message: _.messages.expected
  }, {
    code: ":root { --Foo-Bar: 0; }",
    message: _.messages.expected
  }]
});