"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [true],
  skipBasicChecks: true,

  accept: [{
    code: ""
  }, {
    code: "@import \"foo.css\";"
  }, {
    code: "#foo {}"
  }, {
    code: ".foo {}"
  }, {
    code: "[foo] {}"
  }, {
    code: ".foo { & {} }"
  }, {
    code: ".foo { &.bar {} }"
  }, {
    code: ".foo { &-bar {} }"
  }, {
    code: ".foo { &__bar {} }"
  }, {
    code: ".foo { [&] {} }"
  }, {
    code: ".foo { & [class*=bar] {} }"
  }, {
    code: ".foo { @nest & {} }"
  }, {
    code: ".foo:nth-child(3n + 1) {}"
  }, {
    code: ".foo:nth-child(n) {}"
  }, {
    code: ".foo:nth-child(odd) {}"
  }, {
    code: ".foo:nth-child(even) {}"
  }, {
    code: ".foo:nth-child(-n) {}"
  }, {
    code: ".foo { &:nth-child(3n + 1) {} }"
  }, {
    code: "@keyframes spin { 0% {} }"
  }, {
    code: "@keyframes spin { to {} from {} }"
  }, {
    code: ":root { --custom-property-set: {} }"
  }],

  reject: [{
    code: "foo {}",
    message: _.messages.rejected,
    line: 1,
    column: 1
  }, {
    code: ".bar > foo {}",
    message: _.messages.rejected,
    line: 1,
    column: 8
  }, {
    code: "foo.bar {}",
    message: _.messages.rejected,
    line: 1,
    column: 1
  }, {
    code: ".foo, .bar, foo.baz {}",
    message: _.messages.rejected,
    line: 1,
    column: 13
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [true, { ignore: ["descendant"] }],
  skipBasicChecks: true,

  accept: [{
    code: ".foo div {}"
  }, {
    code: ".foo > div {}"
  }, {
    code: ".foo + div {}"
  }, {
    code: "#bar div.foo {}",
    description: "descendant and compounded"
  }],

  reject: [{
    code: "div {}",
    message: _.messages.rejected
  }, {
    code: ".foo, div {}",
    message: _.messages.rejected
  }, {
    code: "div.foo {}",
    message: _.messages.rejected
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [true, { ignore: ["compounded"] }],
  skipBasicChecks: true,

  accept: [{
    code: "div.foo {}"
  }, {
    code: "div#foo {}"
  }, {
    code: "div[something] {}"
  }],

  reject: [{
    code: "div {}",
    message: _.messages.rejected
  }, {
    code: ".foo, div {}",
    message: _.messages.rejected
  }, {
    code: ".foo div {}",
    message: _.messages.rejected
  }, {
    code: "#bar div.foo {}",
    description: "compounded and descendant",
    message: _.messages.rejected
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [true],
  skipBasicChecks: true,
  syntax: "scss",

  accept: [{ code: "// Comment\n.c {}" }]
});