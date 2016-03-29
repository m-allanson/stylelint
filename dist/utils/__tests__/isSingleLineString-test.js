"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _isSingleLineString = require("../isSingleLineString");

var _isSingleLineString2 = _interopRequireDefault(_isSingleLineString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var multiLineTemplate = "foo\nbar";

(0, _tape2.default)("isSingleLineString", function (t) {
  t.ok((0, _isSingleLineString2.default)("foo"));
  t.ok((0, _isSingleLineString2.default)("foo bar"));
  t.notOk((0, _isSingleLineString2.default)("foo\nbar"));
  t.notOk((0, _isSingleLineString2.default)("foo\rbar"));
  t.notOk((0, _isSingleLineString2.default)(multiLineTemplate));
  t.end();
});