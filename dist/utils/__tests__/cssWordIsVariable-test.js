"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _cssWordIsVariable = require("../cssWordIsVariable");

var _cssWordIsVariable2 = _interopRequireDefault(_cssWordIsVariable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("cssWordIsVariable", function (t) {
  t.notOk((0, _cssWordIsVariable2.default)("border-top-left-radius"));
  t.notOk((0, _cssWordIsVariable2.default)("-webkit-appearance"));
  t.ok((0, _cssWordIsVariable2.default)("--custom-property"));
  t.ok((0, _cssWordIsVariable2.default)("$sass-variable"));
  t.ok((0, _cssWordIsVariable2.default)("@less-variable"));
  t.ok((0, _cssWordIsVariable2.default)("var(--something)"));
  t.ok((0, _cssWordIsVariable2.default)("var(  --something  )"));
  t.end();
});