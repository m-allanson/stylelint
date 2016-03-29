"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _ruleMessages = require("../ruleMessages");

var _ruleMessages2 = _interopRequireDefault(_ruleMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("ruleMessages with simple messages", function (t) {
  t.deepEqual((0, _ruleMessages2.default)("foo", {
    good: "GOOD",
    bad: "BAD"
  }), {
    good: "GOOD (foo)",
    bad: "BAD (foo)"
  });
  t.end();
});

(0, _tape2.default)("ruleMessages with message functions", function (t) {
  var fooOriginal = {
    good: function good(x) {
      return "GOOD " + x;
    },
    bad: function bad(x, y, z) {
      return "GOOD " + x + " [" + y + " and " + z + "]";
    }
  };
  var fooWithRuleName = (0, _ruleMessages2.default)("bar", fooOriginal);

  t.equal(fooWithRuleName.good("baz"), fooOriginal.good("baz") + " (bar)");
  t.equal(fooWithRuleName.bad("baz", 2, "hoohah"), fooOriginal.bad("baz", 2, "hoohah") + " (bar)");

  t.end();
});