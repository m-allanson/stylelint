"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [true],

  accept: [{
    code: "a {} b a {}"
  }, {
    code: "a {} a b {}"
  }, {
    code: "a {} a + a {}"
  }, {
    code: "a {} a[foo] {}"
  }, {
    code: "a[foo] {} a {}",
    description: "only checks matching last compound selectors"
  }, {
    code: "a { b {} } c + b {}"
  }, {
    code: "b a {} @media print { a {} }"
  }, {
    code: "a {} a::after {}",
    description: "pseudo-element last"
  }, {
    code: "a {} a:hover {}",
    description: "pseudo-class last"
  }, {
    code: "a:hover {} a:hover::before {}"
  }, {
    code: ".m:hover {} .b {}"
  }, {
    code: ".menu:hover {} .burger {}"
  }],

  reject: [{
    code: "b a {} a {}",
    message: _.messages.rejected("a", "b a"),
    line: 1,
    column: 8
  }, {
    code: "a + a {} a {}",
    message: _.messages.rejected("a", "a + a"),
    line: 1,
    column: 10
  }, {
    code: "b > a[foo] {} a[foo] {}",
    message: _.messages.rejected("a[foo]", "b > a[foo]"),
    line: 1,
    column: 15
  }, {
    code: "e > f, b + e + a {} c {} a d {} z, f + a, y {}",
    message: _.messages.rejected("f + a", "b + e + a"),
    line: 1,
    column: 36
  }, {
    code: "e > f, b + e + a {} c {} a d {} z, f + a, y {}",
    message: _.messages.rejected("f + a", "b + e + a"),
    line: 1,
    column: 36
  }, {
    code: "a { & > b {} } b {}",
    message: _.messages.rejected("b", "a > b"),
    line: 1,
    column: 16
  }, {
    code: "b a {} @media print { #c a {} a {} }",
    message: _.messages.rejected("a", "#c a"),
    line: 1,
    column: 31
  }, {
    code: "a::before {} a {} ",
    description: "pseudo-element first",
    message: _.messages.rejected("a", "a::before"),
    line: 1,
    column: 14
  }, {
    code: "a:hover {} a {} ",
    description: "pseudo-class first",
    message: _.messages.rejected("a", "a:hover"),
    line: 1,
    column: 12
  }, {
    code: "a:hover::before {} a:hover {} ",
    message: _.messages.rejected("a:hover", "a:hover::before"),
    line: 1,
    column: 20
  }]
});