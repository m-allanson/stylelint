"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _cssStatementStringBeforeBlock = require("../cssStatementStringBeforeBlock");

var _cssStatementStringBeforeBlock2 = _interopRequireDefault(_cssStatementStringBeforeBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("cssStatementStringBeforeBlock rules", function (t) {
  t.equal(postcssCheck("a {}"), "a ");
  t.equal(postcssCheck("\na\n{}"), "\na\n");
  t.equal(postcssCheck("\n\na,\nb,\n\tspan > .foo\n{}"), "\n\na,\nb,\n\tspan > .foo\n");
  t.end();
});

(0, _tape2.default)("cssStatementStringBeforeBlock at-rules", function (t) {
  t.equal(postcssCheck("@media print {}"), "@media print ");
  t.equal(postcssCheck("\n@media print, screen\n\t{}"), "\n@media print, screen\n\t");
  t.equal(postcssCheck("@supports (animation-name: test) {}"), "@supports (animation-name: test) ");
  t.equal(postcssCheck("@document url(http://www.w3.org/),\n " + "url-prefix(http://www.w3.org/Style/),\n" + "domain(mozilla.org),\n" + "regexp(\"https:.*\") {}"), "@document url(http://www.w3.org/),\n " + "url-prefix(http://www.w3.org/Style/),\n" + "domain(mozilla.org),\n" + "regexp(\"https:.*\") ");
  t.end();
});

(0, _tape2.default)("cssStatementStringBeforeBlock with noBefore", function (t) {
  t.equal(postcssCheck({ noBefore: true }, "\na {}"), "a ");
  t.equal(postcssCheck({ noBefore: true }, "\n@media print {}"), "@media print ");
  t.end();
});

(0, _tape2.default)("cssStatementStringBeforeBlock with declaration directly at root", function (t) {
  t.equal(postcssCheck("foo: bar;"), "");
  t.end();
});

function postcssCheck() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var cssString = arguments[1];

  if (typeof options === "string") {
    cssString = options;
  }
  var root = _postcss2.default.parse(cssString);
  return (0, _cssStatementStringBeforeBlock2.default)(root.first, options);
}