"use strict";

var _cssDeclarationIsMap = require("../cssDeclarationIsMap");

var _cssDeclarationIsMap2 = _interopRequireDefault(_cssDeclarationIsMap);

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("cssDeclarationIsMap", function (t) {
  t.notOk(postcssCheck("a: b"));
  t.notOk(postcssCheck(".a: $b"));
  t.notOk(postcssCheck("$a: (b)"));
  t.notOk(postcssCheck("$a: calc(b + c)"));
  t.ok(postcssCheck("$map: (key:value)"));
  t.ok(postcssCheck("$var: (\nkey: value)"));
  t.ok(postcssCheck("$var :\n(key: value, key2: value2)"));
  t.end();
});

function postcssCheck(cssString) {
  var root = _postcss2.default.parse(cssString);
  return (0, _cssDeclarationIsMap2.default)(root.first);
}