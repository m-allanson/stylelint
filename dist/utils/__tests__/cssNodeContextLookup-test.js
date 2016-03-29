"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssImport = require("postcss-import");

var _postcssImport2 = _interopRequireDefault(_postcssImport);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _cssNodeContextLookup = require("../cssNodeContextLookup");

var _cssNodeContextLookup2 = _interopRequireDefault(_cssNodeContextLookup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("cssNodeContextLookup checking media context", function (t) {
  var testLookup = (0, _cssNodeContextLookup2.default)();

  t.plan(8);
  (0, _postcss2.default)([(0, _postcssImport2.default)()]).process("@import 'fixtures/one.css'; @import 'fixtures/two.css';", {
    from: _path2.default.join(__dirname, "fake.css")
  }).then(function (result) {
    var rulesBySelector = {};
    result.root.walkRules(function (rule) {
      rulesBySelector[rule.selector] = rule;
    });

    // a-d are in one file; e-h in another
    t.equal(testLookup.getContext(rulesBySelector.a, rulesBySelector.a.parent), testLookup.getContext(rulesBySelector.b, rulesBySelector.b.parent));
    t.notEqual(testLookup.getContext(rulesBySelector.a, rulesBySelector.a.parent), testLookup.getContext(rulesBySelector.c, rulesBySelector.c.parent));
    t.notEqual(testLookup.getContext(rulesBySelector.a, rulesBySelector.a.parent), testLookup.getContext(rulesBySelector.e, rulesBySelector.e.parent));
    t.equal(testLookup.getContext(rulesBySelector.c, rulesBySelector.c.parent), testLookup.getContext(rulesBySelector.d, rulesBySelector.d.parent));
    t.notEqual(testLookup.getContext(rulesBySelector.c, rulesBySelector.c.parent), testLookup.getContext(rulesBySelector.g, rulesBySelector.g.parent));
    t.equal(testLookup.getContext(rulesBySelector.e, rulesBySelector.e.parent), testLookup.getContext(rulesBySelector.f, rulesBySelector.f.parent));
    t.notEqual(testLookup.getContext(rulesBySelector.f, rulesBySelector.f.parent), testLookup.getContext(rulesBySelector.g, rulesBySelector.g.parent));
    t.equal(testLookup.getContext(rulesBySelector.g, rulesBySelector.g.parent), testLookup.getContext(rulesBySelector.h, rulesBySelector.h.parent));
  }).catch(function (err) {
    return console.log(err.stack);
  }); // eslint-disable-line
});