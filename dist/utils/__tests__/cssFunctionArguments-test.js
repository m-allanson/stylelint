"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _cssFunctionArguments = require("../cssFunctionArguments");

var _cssFunctionArguments2 = _interopRequireDefault(_cssFunctionArguments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("passes function arguments to callback", function (t) {
  (0, _cssFunctionArguments2.default)("calc(1 + 3)", "calc", function (expression, expressionIndex) {
    t.equal(expression, "1 + 3");
    t.equal(expressionIndex, 5);
  });
  (0, _cssFunctionArguments2.default)("4px 5px calc(1px + 3px)", "calc", function (expression, expressionIndex) {
    t.equal(expression, "1px + 3px");
    t.equal(expressionIndex, 13);
  });
  t.end();
});

(0, _tape2.default)("works with nested functions", function (t) {
  var calcExpressions = [];
  var calcExpressionIndexes = [];
  (0, _cssFunctionArguments2.default)("4px 5px calc(calc(1px + 2px) + 3px)", "calc", function (expression, expressionIndex) {
    calcExpressions.push(expression);
    calcExpressionIndexes.push(expressionIndex);
  });
  t.deepEqual(calcExpressions, ["calc(1px + 2px) + 3px", "1px + 2px"]);
  t.deepEqual(calcExpressionIndexes, [13, 18]);

  var colorFuncValue = "color(red s(- 10%) s( - 10%))";
  (0, _cssFunctionArguments2.default)(colorFuncValue, "color", function (expression, expressionIndex) {
    t.equal(expression, "red s(- 10%) s( - 10%)");
    t.equal(expressionIndex, 6);
  });
  var sExpressions = [];
  var sExpressionIndexes = [];
  (0, _cssFunctionArguments2.default)(colorFuncValue, "s", function (expression, expressionIndex) {
    sExpressions.push(expression);
    sExpressionIndexes.push(expressionIndex);
  });
  t.deepEqual(sExpressions, ["- 10%", " - 10%"]);
  t.deepEqual(sExpressionIndexes, [12, 21]);
  t.end();
});

(0, _tape2.default)("ignores strings", function (t) {
  (0, _cssFunctionArguments2.default)("calc(1px)", "calc", function (expression, expressionIndex) {
    t.equal(expression, "1px");
    t.equal(expressionIndex, 5);
  });
  (0, _cssFunctionArguments2.default)("\"calc(1px)\"", "calc", function (expression, expressionIndex) {
    t.equal(expression, null);
    t.equal(expressionIndex, null);
  });
  t.end();
});