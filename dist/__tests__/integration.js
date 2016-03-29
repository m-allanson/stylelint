"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _ = require("../");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  rules: {
    "block-opening-brace-newline-after": "always",
    "declaration-block-properties-order": [{
      emptyLineBefore: "always",
      properties: ["content"]
    }, {
      emptyLineBefore: "always",
      properties: ["position", "top", "right", "bottom", "left", "z-index"]
    }],
    "color-no-invalid-hex": [true, {
      severity: "warning",
      message: "You made a mistake"
    }],
    "function-blacklist": ["calc"],
    "function-whitelist": null,
    "no-duplicate-selectors": true
  }
};

var css = "a {\n  color: #zzz;\n}\n\nb { background: pink; }\n\n/* stylelint-disable color-no-invalid-hex */\n.foo {\n  color: #yyy;\n}\n/* stylelint-enable */\n\n.bar:before {\n  color: #mmm;\n}\n";

(0, _tape2.default)("integration test expecting warnings", function (t) {
  t.plan(9);

  (0, _postcss2.default)().use((0, _2.default)(config)).process(css).then(checkResult).catch(logError);

  function checkResult(result) {
    var messages = result.messages;

    t.equal(messages.length, 3);
    t.ok(messages.every(function (m) {
      return m.type === "warning";
    }));
    t.ok(messages.every(function (m) {
      return m.plugin === "stylelint";
    }));
    t.equal(messages[0].text, "Expected newline after \"{\" (block-opening-brace-newline-after)");
    t.equal(messages[0].severity, "error");
    t.equal(messages[1].text, "You made a mistake");
    t.equal(messages[1].severity, "warning");
    t.equal(messages[2].text, "You made a mistake");
    t.equal(messages[2].severity, "warning");
  }
});

function logError(err) {
  console.log(err.stack); // eslint-disable-line no-console
}