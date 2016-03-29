"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssImport = require("postcss-import");

var _postcssImport2 = _interopRequireDefault(_postcssImport);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [null],

  accept: [{
    code: "a {} b {} c {} d, e, f {}",
    description: "no duplicates"
  }, {
    code: "a {}\n@media print { a {} }",
    description: "duplicate inside media query"
  }, {
    code: "@keyframes a { 0% {} } @keyframes b { 0% {} }",
    description: "duplicate inside keyframes"
  }, {
    code: "a { a { a {} } }",
    description: "duplicates inside nested rules"
  }, {
    code: ".foo .bar {}\n .foo {}\n.bar {}\n.bar .foo {}",
    description: "selectors using parts of other selectors"
  }, {
    code: "a {} a, b {}",
    description: "selectors reused in other non-equivalent selector lists"
  }, {
    code: "a b { top: 0; } a { b, c { color: pink; } }",
    description: "nested resolution"
  }, {
    code: "@mixin foo { &:hover {} } @mixin bar { &:hover {} }"
  }, {
    code: "ul, ol {} ul {}"
  }, {
    code: "[disabled].foo, [disabled] .foo {}"
  }],

  reject: [{
    code: "a, a {}",
    description: "duplicate within one rule's selector list",
    message: _.messages.rejected("a"),
    line: 1,
    column: 1
  }, {
    code: "a {} b {} a {}",
    description: "duplicate simple selectors with another rule between",
    message: _.messages.rejected("a"),
    line: 1,
    column: 11
  }, {
    code: "a, b {} b, a {}",
    description: "essentially duplicate selector lists",
    message: _.messages.rejected("b, a"),
    line: 1,
    column: 9
  }, {
    code: ".foo   a, b\t> .bar,\n#baz {}\n  #baz,\n\n  .foo     a,b>.bar {}",
    description: "essentially duplicate selector lists with varied spacing",
    message: _.messages.rejected("#baz,\n\n  .foo     a,b>.bar"),
    line: 3,
    column: 3
  }, {
    code: "a {}\n@media print { a, a {} }",
    description: "duplicate within a media query, in the same rule",
    message: _.messages.rejected("a"),
    line: 2,
    column: 16
  }, {
    code: "a {}\n@media print { a {} a {} }",
    description: "duplicate within a media query, in different rules",
    message: _.messages.rejected("a"),
    line: 2,
    column: 21
  }, {
    code: "a b {} a { b {} }",
    description: "duplicate caused by nesting",
    message: _.messages.rejected("a b"),
    line: 1,
    column: 12
  }]
});

(0, _tape2.default)("with postcss-import and duplicates within a file", function (t) {
  t.plan(1);
  (0, _postcss2.default)([(0, _postcssImport2.default)(), (0, _2.default)()]).process("@import 'fixtures/using-foo-twice.css';", {
    from: _path2.default.join(__dirname, "test.css")
  }).then(function (result) {
    var warnings = result.warnings();
    t.equal(warnings.length, 1, "a warning strikes");
  });
});

(0, _tape2.default)("with postcss-import and duplicates across files", function (t) {
  t.plan(1);
  (0, _postcss2.default)([(0, _postcssImport2.default)(), (0, _2.default)()]).process("@import 'fixtures/using-foo.css'; @import 'fixtures/also-using-foo.css';", {
    from: _path2.default.join(__dirname, "test.css")
  }).then(function (result) {
    var warnings = result.warnings();
    t.equal(warnings.length, 0, "no warnings");
  });
});