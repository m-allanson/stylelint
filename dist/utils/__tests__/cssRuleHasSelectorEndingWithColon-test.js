"use strict";

var _cssRuleHasSelectorEndingWithColon = require("../cssRuleHasSelectorEndingWithColon");

var _cssRuleHasSelectorEndingWithColon2 = _interopRequireDefault(_cssRuleHasSelectorEndingWithColon);

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("cssRuleHasSelectorEndingWithColon", function (t) {
  t.ok(postcssCheck("--custom-property-set: {}"));
  t.notOk(postcssCheck("a {}"));
  t.notOk(postcssCheck("a:last-child {}"));
  t.notOk(postcssCheck("a::after {}"));
  t.notOk(postcssCheck(":--custom-selector {}"));
  t.notOk(postcssCheck(":--custom-selector:--custom-selector {}"));
  t.end();
});

function postcssCheck(cssString) {
  var root = _postcss2.default.parse(cssString);
  return (0, _cssRuleHasSelectorEndingWithColon2.default)(root.first);
}