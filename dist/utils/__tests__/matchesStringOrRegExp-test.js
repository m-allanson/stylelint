"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _matchesStringOrRegExp = require("../matchesStringOrRegExp");

var _matchesStringOrRegExp2 = _interopRequireDefault(_matchesStringOrRegExp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("matchesStringOrRegExp comparing with string comparisonValues", function (t) {
  t.ok((0, _matchesStringOrRegExp2.default)("bar", "bar"));
  t.notOk((0, _matchesStringOrRegExp2.default)("bar", "/bar something"));
  t.ok((0, _matchesStringOrRegExp2.default)("/bar something", "/bar something"));
  t.ok((0, _matchesStringOrRegExp2.default)("bar something/", "bar something/"));
  t.notOk((0, _matchesStringOrRegExp2.default)("bar something/", "bar something//"));

  t.ok((0, _matchesStringOrRegExp2.default)(["foo", "bar"], "bar"));
  t.notOk((0, _matchesStringOrRegExp2.default)(["foo", "baz"], "bar"));

  t.ok((0, _matchesStringOrRegExp2.default)("bar", ["foo", "bar"]));
  t.notOk((0, _matchesStringOrRegExp2.default)("bar", ["foo", "baz"]));

  t.ok((0, _matchesStringOrRegExp2.default)(["foo", "baz"], ["foo", "bar"]));
  t.notOk((0, _matchesStringOrRegExp2.default)(["bar", "hooha"], ["foo", "baz"]));

  t.end();
});

(0, _tape2.default)("matchesStringOrRegExp comparing with a RegExp comparisonValue", function (t) {
  var comparisonValue = "/\\.foo$/";
  var anotherComparisonValue = "/^bar/";

  t.ok((0, _matchesStringOrRegExp2.default)(".foo", comparisonValue));
  t.ok((0, _matchesStringOrRegExp2.default)("bar .foo", comparisonValue));
  t.notOk((0, _matchesStringOrRegExp2.default)("bar .foo bar", comparisonValue));
  t.notOk((0, _matchesStringOrRegExp2.default)("foo", comparisonValue));

  t.ok((0, _matchesStringOrRegExp2.default)([".foo", "bar"], comparisonValue));
  t.notOk((0, _matchesStringOrRegExp2.default)(["foo", "baz"], comparisonValue));

  t.ok((0, _matchesStringOrRegExp2.default)(".foo", [comparisonValue, anotherComparisonValue]));
  t.ok((0, _matchesStringOrRegExp2.default)("bar", [comparisonValue, anotherComparisonValue]));
  t.notOk((0, _matchesStringOrRegExp2.default)("ebarz", [comparisonValue, anotherComparisonValue]));

  t.ok((0, _matchesStringOrRegExp2.default)([".foo", "ebarz"], [comparisonValue, anotherComparisonValue]));
  t.ok((0, _matchesStringOrRegExp2.default)(["bar", "foo"], [comparisonValue, anotherComparisonValue]));
  t.notOk((0, _matchesStringOrRegExp2.default)(["ebarz", "foo"], [comparisonValue, anotherComparisonValue]));

  t.end();
});