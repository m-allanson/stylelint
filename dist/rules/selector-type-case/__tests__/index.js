"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["lower"],

  accept: [{
    code: "a {}"
  }, {
    code: "a::before {}"
  }, {
    code: "&a {}"
  }, {
    code: ".foo {}"
  }, {
    code: "#bar {}"
  }, {
    code: ".FOO {}"
  }, {
    code: "#BAR {}"
  }, {
    code: "a.FOO {}"
  }, {
    code: "a b {}"
  }, {
    code: "a { & b {}}"
  }, {
    code: "a, b, * {}"
  }, {
    code: "a:nth-child(3n + 1) {}"
  }, {
    code: "a:nth-child(n) {}"
  }, {
    code: "a:nth-child(odd) {}"
  }, {
    code: "a:nth-child(even) {}"
  }, {
    code: "a:nth-child(-n) {}"
  }, {
    code: "a { &:nth-child(3n + 1) {} }"
  }, {
    code: "@keyframes spin { 0% {} }"
  }, {
    code: "@keyframes spin { to {} from {} }"
  }, {
    code: ":root { --custom-property-set: {} }"
  }],

  reject: [{
    code: "A {}",
    message: _.messages.expected("A", "a")
  }, {
    code: "DIV::before {}",
    message: _.messages.expected("DIV", "div")
  }, {
    code: "a B {}",
    message: _.messages.expected("B", "b")
  }, {
    code: "a { & B {}}",
    message: _.messages.expected("B", "b")
  }, {
    code: "A:nth-child(even) {}",
    message: _.messages.expected("A", "a")
  }, {
    code: "A:nth-child(-n) {}",
    message: _.messages.expected("A", "a")
  }, {
    code: "A { &:nth-child(3n + 1) {} }",
    message: _.messages.expected("A", "a")
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["upper"],
  skipBasicChecks: true,

  accept: [{
    code: "A {}"
  }, {
    code: "A::before {}"
  }, {
    code: "&A {}"
  }, {
    code: "&LI {}"
  }, {
    code: ".foo {}"
  }, {
    code: "#bar {}"
  }, {
    code: ".FOO {}"
  }, {
    code: "#BAR {}"
  }, {
    code: "A.FOO {}"
  }, {
    code: "A B {}"
  }, {
    code: "A { & B {}}"
  }, {
    code: "A, B, * {}"
  }, {
    code: "A:nth-child(3n + 1) {}"
  }, {
    code: "A:nth-child(n) {}"
  }, {
    code: "A:nth-child(odd) {}"
  }, {
    code: "A:nth-child(even) {}"
  }, {
    code: "A:nth-child(-n) {}"
  }, {
    code: "A { &:nth-child(3n + 1) {} }"
  }, {
    code: "@keyframes spin { 0% {} }"
  }, {
    code: "@keyframes spin { to {} from {} }"
  }, {
    code: ":root { --custom-property-set: {} }"
  }],

  reject: [{
    code: "a {}",
    message: _.messages.expected("a", "A")
  }, {
    code: "div::before {}",
    message: _.messages.expected("div", "DIV")
  }, {
    code: "a B {}",
    message: _.messages.expected("a", "A")
  }, {
    code: "a { & B {}}",
    message: _.messages.expected("a", "A")
  }, {
    code: "a:nth-child(even) {}",
    message: _.messages.expected("a", "A")
  }, {
    code: "a:nth-child(-n) {}",
    message: _.messages.expected("a", "A")
  }, {
    code: "a { &:nth-child(3n + 1) {} }",
    message: _.messages.expected("a", "A")
  }]
});