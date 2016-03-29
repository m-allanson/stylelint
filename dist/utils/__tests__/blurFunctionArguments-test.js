"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _blurFunctionArguments = require("../blurFunctionArguments");

var _blurFunctionArguments2 = _interopRequireDefault(_blurFunctionArguments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("blurFunctionArguments", function (t) {
  t.equal((0, _blurFunctionArguments2.default)("abc abc", "url"), "abc abc");
  t.equal((0, _blurFunctionArguments2.default)("abc url(abc) abc", "url"), "abc url(```) abc");
  t.equal((0, _blurFunctionArguments2.default)("abc url(abc) url(xx)", "url", "#"), "abc url(###) url(##)");
  t.end();
});