"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require("../../");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleName = "warn-about-foo";

var warnAboutFooMessages = _2.default.utils.ruleMessages("warn-about-foo", {
  found: "found .foo",
  notFound: "never found .foo"
});

exports.default = _2.default.createPlugin(ruleName, function (expectation) {
  return function (root, result) {
    var foundFoo = void 0;
    root.walkRules(function (rule) {
      if (rule.selector === ".foo") {
        if (expectation === "always") {
          _2.default.utils.report({
            result: result,
            ruleName: ruleName,
            message: warnAboutFooMessages.found,
            node: rule
          });
          foundFoo = true;
        }
      }
    });
    if (!foundFoo) {
      _2.default.utils.report({
        result: result,
        line: 1,
        ruleName: ruleName,
        message: warnAboutFooMessages.notFound
      });
    }
  };
});