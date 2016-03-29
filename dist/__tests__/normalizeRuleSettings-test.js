"use strict";

var _normalizeRuleSettings = require("../normalizeRuleSettings");

var _normalizeRuleSettings2 = _interopRequireDefault(_normalizeRuleSettings);

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("rules whose primary option IS NOT an array", function (t) {
  t.deepEqual((0, _normalizeRuleSettings2.default)(null, "foo"), [null], "solo null returns arrayed null");
  t.deepEqual((0, _normalizeRuleSettings2.default)(2, "foo"), [2], "solo number returns arrayed number");
  t.deepEqual((0, _normalizeRuleSettings2.default)([2], "foo"), [2], "arrayed number returns arrayed number if rule is not special");
  t.deepEqual((0, _normalizeRuleSettings2.default)([2, { "severity": "warning" }]), [2, { "severity": "warning" }], "arrayed number with secondary options returns same");
  t.deepEqual((0, _normalizeRuleSettings2.default)("always", "foo"), ["always"], "solo string returns arrayed string");
  t.deepEqual((0, _normalizeRuleSettings2.default)(["always"], "foo"), ["always"], "arrayed string returns arrayed string");
  t.deepEqual((0, _normalizeRuleSettings2.default)(["always", { "severity": "warning" }], "foo"), ["always", { "severity": "warning" }], "arrayed string with secondary options returns same");
  t.deepEqual((0, _normalizeRuleSettings2.default)(true, "foo"), [true], "solo boolean returns arrayed boolean");
  t.deepEqual((0, _normalizeRuleSettings2.default)([false], "foo"), [false], "arrayed boolean returns arrayed boolean if rule is not special");
  t.deepEqual((0, _normalizeRuleSettings2.default)([true, { "severity": "warning" }]), [true, { "severity": "warning" }], "arrayed boolean with secondary options returns same");
  t.end();
});

(0, _tape2.default)("rules whose primary option CAN BE an array", function (t) {
  t.deepEqual((0, _normalizeRuleSettings2.default)(["calc", "rgba"], "function-whitelist"), [["calc", "rgba"]], "solo primary option array is nested within an array");
  t.deepEqual((0, _normalizeRuleSettings2.default)([["calc", "rgba"], { "severity": "warning" }], "function-whitelist"), [["calc", "rgba"], { "severity": "warning" }], "nested primary option array returns same");
  t.deepEqual((0, _normalizeRuleSettings2.default)(["alphabetical", { "severity": "warning" }], "declaration-block-properties-order"), ["alphabetical", { "severity": "warning" }], "string as first primary option returns same");
  t.deepEqual((0, _normalizeRuleSettings2.default)([{ foo: 1 }, { foo: 2 }], "declaration-block-properties-order"), [[{ foo: 1 }, { foo: 2 }]], "primary option array with length of 2");
  t.deepEqual((0, _normalizeRuleSettings2.default)([[{ foo: 1 }, { foo: 2 }], { "severity": "warning" }], "declaration-block-properties-order"), [[{ foo: 1 }, { foo: 2 }], { "severity": "warning" }], "primary option array with length of 2 and secondary options");
  t.end();
});