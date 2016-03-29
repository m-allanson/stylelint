"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (expectation) {
  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, {
      actual: expectation,
      possible: ["always", "never", "always-single-line", "never-single-line"]
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
        var isSingleLine = (0, _utils.isSingleLineString)(functionString);

        // Check opening ...

        var openingIndex = valueNode.sourceIndex + valueNode.value.length + 1;

        if (expectation === "always" && valueNode.before !== " ") {
          complain(messages.expectedOpening, openingIndex);
        }

        if (expectation === "never" && valueNode.before !== "") {
          complain(messages.rejectedOpening, openingIndex);
        }

        if (isSingleLine && expectation === "always-single-line" && valueNode.before !== " ") {
          complain(messages.expectedOpeningSingleLine, openingIndex);
        }

        if (isSingleLine && expectation === "never-single-line" && valueNode.before !== "") {
          complain(messages.rejectedOpeningSingleLine, openingIndex);
        }

        // Check closing ...

        var closingIndex = valueNode.sourceIndex + functionString.length - 2;

        if (expectation === "always" && valueNode.after !== " ") {
          complain(messages.expectedClosing, closingIndex);
        }

        if (expectation === "never" && valueNode.after !== "") {
          complain(messages.rejectedClosing, closingIndex);
        }

        if (isSingleLine && expectation === "always-single-line" && valueNode.after !== " ") {
          complain(messages.expectedClosingSingleLine, closingIndex);
        }

        if (isSingleLine && expectation === "never-single-line" && valueNode.after !== "") {
          complain(messages.rejectedClosingSingleLine, closingIndex);
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

var ruleName = exports.ruleName = "function-parentheses-space-inside";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedOpening: "Expected single space after \"(\"",
  rejectedOpening: "Unexpected whitespace after \"(\"",
  expectedClosing: "Expected single space before \")\"",
  rejectedClosing: "Unexpected whitespace before \")\"",
  expectedOpeningSingleLine: "Expected single space after \"(\" in a single-line function",
  rejectedOpeningSingleLine: "Unexpected whitespace after \"(\" in a single-line function",
  expectedClosingSingleLine: "Expected single space before \")\" in a single-line function",
  rejectedClosingSingleLine: "Unexpected whitespace before \")\" in a single-line function"
});