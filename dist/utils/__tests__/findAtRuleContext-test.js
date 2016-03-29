"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _findAtRuleContext = require("../findAtRuleContext");

var _findAtRuleContext2 = _interopRequireDefault(_findAtRuleContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("findAtRuleContext", function (t) {
  var css = "\n    a {}\n    @media print {\n      b {}\n    }\n    @media (min-width: 900px) {\n      c {}\n    }\n    d {}\n  ";

  t.plan(4);
  (0, _postcss2.default)().process(css).then(function (result) {
    result.root.walkRules(function (rule) {
      switch (rule.selector) {
        case "a":
          t.equal((0, _findAtRuleContext2.default)(rule), null);
          break;
        case "b":
          t.equal((0, _findAtRuleContext2.default)(rule).params, "print");
          break;
        case "c":
          t.equal((0, _findAtRuleContext2.default)(rule).params, "(min-width: 900px)");
          break;
        case "d":
          t.equal((0, _findAtRuleContext2.default)(rule), null);
          break;
        default:
      }
    });
  });
});