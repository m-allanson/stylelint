"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (actual) {
  var checker = (0, _utils.whitespaceChecker)("space", "always", messages);

  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, { actual: actual });
    if (!validOptions) {
      return;
    }

    root.walkDecls(function (decl) {
      (0, _postcssValueParser2.default)(decl.value).walk(function (node) {
        if (node.type !== "function" || node.value !== "calc") {
          return;
        }

        var parensMatch = (0, _balancedMatch2.default)("(", ")", _postcssValueParser2.default.stringify(node));
        var rawExpression = parensMatch.body;
        var expressionIndex = decl.source.start.column + decl.prop.length + decl.raws.between.length + node.sourceIndex;
        var expression = blurVariables(rawExpression);

        checkSymbol("+");
        checkSymbol("-");
        checkSymbol("*");
        checkSymbol("/");

        function checkSymbol(symbol) {
          (0, _utils.styleSearch)({ source: expression, target: symbol, outsideFunctionalNotation: true }, function (match) {
            var index = match.startIndex;

            // Deal with signs.
            // (@ and $ are considered "digits" here to allow for variable syntaxes
            // that permit signs in front of variables, e.g. `-$number`)
            if ((symbol === "+" || symbol === "-") && /[\d@\$]/.test(expression[index + 1])) {
              var expressionBeforeSign = expression.substr(0, index);
              // Ignore signs at the beginning of the expression
              if (/^\s*$/.test(expressionBeforeSign)) {
                return;
              }

              // Otherwise, ensure that there is a real operator preceeding them
              if (/[\*/+-]\s*$/.test(expressionBeforeSign)) {
                return;
              }

              (0, _utils.report)({
                message: messages.expectedOperatorBeforeSign(symbol),
                node: decl,
                index: expressionIndex + index,
                result: result,
                ruleName: ruleName
              });

              return;
            }

            checker.after({
              index: index,
              source: expression,
              err: function err(m) {
                (0, _utils.report)({
                  message: m,
                  node: decl,
                  index: expressionIndex + index,
                  result: result,
                  ruleName: ruleName
                });
              }
            });
            checker.before({
              index: index,
              source: expression,
              err: function err(m) {
                (0, _utils.report)({
                  message: m,
                  node: decl,
                  index: expressionIndex + index,
                  result: result,
                  ruleName: ruleName
                });
              }
            });
          });
        }
      });
    });
  };
};

var _utils = require("../../utils");

var _postcssValueParser = require("postcss-value-parser");

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _balancedMatch = require("balanced-match");

var _balancedMatch2 = _interopRequireDefault(_balancedMatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleName = exports.ruleName = "function-calc-no-unspaced-operator";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedBefore: function expectedBefore(o) {
    return "Expected single space before \"" + o + "\" operator";
  },
  expectedAfter: function expectedAfter(o) {
    return "Expected single space after \"" + o + "\" operator";
  },
  expectedOperatorBeforeSign: function expectedOperatorBeforeSign(o) {
    return "Expected an operator before sign \"" + o + "\"";
  }
});

function blurVariables(source) {
  return source.replace(/[\$@][^\)\s]+/g, "0");
}