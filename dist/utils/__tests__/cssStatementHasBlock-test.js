"use strict";

var _cssStatementHasBlock = require("../cssStatementHasBlock");

var _cssStatementHasBlock2 = _interopRequireDefault(_cssStatementHasBlock);

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("cssStatementHasBlock", function (t) {
  t.ok(postcssCheck("a {}"), "empty rule");
  t.ok(postcssCheck("a { }"), "emtpy rule with space");
  t.ok(postcssCheck("a {\n}"), "emtpy rule with newline");
  t.ok(postcssCheck("@media print {}"), "empty @media");
  t.ok(postcssCheck("@supports (animation-name: test) {}"), "empty @supports");
  t.ok(postcssCheck("@document url(http://www.w3.org/) {}"), "empty @document");
  t.ok(postcssCheck("@page :pseudo-class {}"), "empty page");
  t.ok(postcssCheck("@font-face {}"), "empty font-face");
  t.ok(postcssCheck("@keyframes identifier {}"), "empty keyframes");

  t.ok(postcssCheck("a { color: pink; }"), "not empty rule");
  t.ok(postcssCheck("@media print { a { color: pink; } }"), "not empty @media");
  t.ok(postcssCheck("@supports (animation-name: test) { a { color: pink; } }"), "not empty @supports");
  t.ok(postcssCheck("@document url(http://www.w3.org/) { a { color: pink; } }"), "not empty @document");
  t.ok(postcssCheck("@page :pseudo-class { a { color: pink; } }"), "not empty @page");
  t.ok(postcssCheck("@font-face { font-family: sans; }"), "not empty @font-face");
  t.ok(postcssCheck("@keyframes identifier { 0% { top: 0; left:} }"), "not empty @keyframes");

  t.notOk(postcssCheck("@import url(x.css)"), "@import url");
  t.notOk(postcssCheck("@import 'x.css'"), "@import single quoted string");
  t.notOk(postcssCheck("@import \"x.css\""), "@import double quoted string");
  t.notOk(postcssCheck("@charset \"UTF-8\""), "@charset");
  t.notOk(postcssCheck("@namespace url(http://www.w3.org/1999/xhtml)"), "@namespace");
  t.notOk(postcssCheck("@namespace svg url(http://www.w3.org/2000/svg)"), "@namespace with prefix");

  t.end();
});

function postcssCheck(cssString) {
  var root = _postcss2.default.parse(cssString);
  return (0, _cssStatementHasBlock2.default)(root.first);
}