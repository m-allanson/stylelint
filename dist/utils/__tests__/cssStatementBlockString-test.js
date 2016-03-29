"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _cssStatementBlockString = require("../cssStatementBlockString");

var _cssStatementBlockString2 = _interopRequireDefault(_cssStatementBlockString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("cssStatementBlockString rules", function (t) {
  t.equal(postcssCheck("a { color: pink; }"), "{ color: pink; }");
  t.equal(postcssCheck("a {\n\tcolor: pink;\n\ttop: 0;\n}"), "{\n\tcolor: pink;\n\ttop: 0;\n}");
  t.end();
});

(0, _tape2.default)("cssStatementBlockString at-rules", function (t) {
  t.equal(postcssCheck("@media print { a { color: pink; } }"), "{ a { color: pink; } }");
  t.equal(postcssCheck("@keyframes foo {\n  0% {\n  top: 0;\n}\n\n  100% {\n  top: 10px;\n}\n}\n"), "{\n  0% {\n  top: 0;\n}\n\n  100% {\n  top: 10px;\n}\n}");
  t.end();
});

function postcssCheck(cssString) {
  var root = _postcss2.default.parse(cssString);
  return (0, _cssStatementBlockString2.default)(root.first);
}