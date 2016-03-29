"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (expectation) {
  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, {
      actual: expectation,
      possible: ["always", "always-multi-line", "never-multi-line"]
    });
    if (!validOptions) {
      return;
    }

    root.walkDecls(function (decl) {
      if ((0, _utils.cssDeclarationIsMap)(decl)) {
        return;
      }

      if (decl.value.indexOf("(") === -1) {
        return;
      }

      (0, _postcssValueParser2.default)(decl.value).walk(function (valueNode) {
        if (valueNode.type !== "function") {
          return;
        }

        var functionString = _postcssValueParser2.default.stringify(valueNode);
        var isMultiLine = !(0, _utils.isSingleLineString)(functionString);
        function containsNewline(str) {
          return str.indexOf("\n") !== -1;
        }

        // Check opening ...

        var openingIndex = valueNode.sourceIndex + valueNode.value.length + 1;

        if (expectation === "always" && !containsNewline(valueNode.before)) {
          complain(messages.expectedOpening, openingIndex);
        }

        if (isMultiLine && expectation === "always-multi-line" && !containsNewline(valueNode.before)) {
          complain(messages.expectedOpeningMultiLine, openingIndex);
        }

        if (isMultiLine && expectation === "never-multi-line" && valueNode.before !== "") {
          complain(messages.rejectedOpeningMultiLine, openingIndex);
        }

        // Check closing ...

        var closingIndex = valueNode.sourceIndex + functionString.length - 2;

        if (expectation === "always" && !containsNewline(valueNode.after)) {
          complain(messages.expectedClosing, closingIndex);
        }

        if (isMultiLine && expectation === "always-multi-line" && !containsNewline(valueNode.after)) {
          complain(messages.expectedClosingMultiLine, closingIndex);
        }

        if (isMultiLine && expectation === "never-multi-line" && valueNode.after !== "") {
          complain(messages.rejectedClosingMultiLine, closingIndex);
        }
      });

      function complain(message, offset) {
        (0, _utils.report)({
          ruleName: ruleName,
          result: result,
          message: message,
          node: decl,
          index: (0, _utils.declarationValueIndexOffset)(decl) + offset
        });
      }
    });
  };
};

var _postcssValueParser = require("postcss-value-parser");

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleName = exports.ruleName = "function-parentheses-newline-inside";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedOpening: "Expected newline after \"(\"",
  expectedClosing: "Expected newline before \")\"",
  expectedOpeningMultiLine: "Expected newline after \"(\" in a multi-line function",
  rejectedOpeningMultiLine: "Unexpected whitespace after \"(\" in a multi-line function",
  expectedClosingMultiLine: "Expected newline before \")\" in a multi-line function",
  rejectedClosingMultiLine: "Unexpected whitespace before \")\" in a multi-line function"
});