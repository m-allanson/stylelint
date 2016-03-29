"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [undefined],

  accept: [{
    code: "a { padding: 0 /* calc(1px+2px) */ 0; }"
  }, {
    code: "a { color: color(red s(-10%)); }"
  }, {
    code: "a { color: color(red s( -10%)); }"
  }, {
    code: "a { top: calc(1px + 2px); }"
  }, {
    code: "a { top: calc(1px - 2px); }"
  }, {
    code: "a { top: calc(1px * 2); }"
  }, {
    code: "a { top: calc(1px / 2); }"
  }, {
    code: "a { top: calc(calc(1em * 2) / 3); }"
  }, {
    code: "a { padding: calc(1px + 2px) calc(1px + 2px); }"
  }, {
    code: "a { padding: calc(1px - 2px) calc(1px - 2px); }"
  }, {
    code: "a { padding: calc(1px * 2) calc(1px * 2); }"
  }, {
    code: "a { padding: calc(1px / 2) calc(1px / 2); }"
  }, {
    code: "a { padding: calc(calc(1em * 2) / 3) calc(calc(1em * 2) / 3); }"
  }, {
    code: "a { top: calc(+1px)}",
    description: "sign"
  }, {
    code: "a { top: calc(1px + -1px)}",
    description: "sign after operator"
  }, {
    code: "a { top: calc(-1px * -1)}",
    description: "sign after operator and at start"
  }, {
    code: "a { top: calc(    +1px)}",
    description: "multiple spaces before sign at start"
  }, {
    code: "a { top: calc(\t+1px)}",
    description: "tab before sign at start"
  }, {
    code: "a { top: calc(-$x - 2rem); }",
    description: "postcss-simple-vars and SCSS variable syntax"
  }, {
    code: "a { top: calc(-@x - 2rem); }",
    description: "Less variable syntax"
  }, {
    code: "a { top: calc($x-y-z - 2rem); }",
    description: "postcss-simple-vars and SCSS variable with hyphens"
  }, {
    code: "a { top: calc(2rem + @fh+d*sf-as); }",
    description: "Less variable with symbols"
  }, {
    code: "a { top: rem-calc(10px+ 10px); }",
    description: "ignore function have calc in name"
  }, {
    code: "a { padding: rem-calc(10px+ 10px) rem-calc(10px+ 10px); }",
    description: "ignore function have calc in name"
  }],

  reject: [{
    code: "a { top: calc(1px +\t-1px)}",
    description: "tab before sign after operator",
    message: _.messages.expectedAfter("+"),
    line: 1,
    column: 19
  }, {
    code: "a { top: calc(1px +  -1px)}",
    description: "multiple spaces before sign after operator",
    message: _.messages.expectedAfter("+"),
    line: 1,
    column: 19
  }, {
    code: "a { top: calc(1px+ 2px); }",
    message: _.messages.expectedBefore("+"),
    line: 1,
    column: 18
  }, {
    code: "a { top: calc(1px  + 2px); }",
    message: _.messages.expectedBefore("+"),
    line: 1,
    column: 20
  }, {
    code: "a { top: calc(1px\t+ 2px); }",
    message: _.messages.expectedBefore("+"),
    line: 1,
    column: 19
  }, {
    code: "a { top: calc(1px +  2px); }",
    message: _.messages.expectedAfter("+"),
    line: 1,
    column: 19
  }, {
    code: "a { top: calc(1px +\t2px); }",
    message: _.messages.expectedAfter("+"),
    line: 1,
    column: 19
  }, {
    code: "a { top: calc(1px- 2px); }",
    message: _.messages.expectedBefore("-"),
    line: 1,
    column: 18
  }, {
    code: "a { top: calc(1px* 2); }",
    message: _.messages.expectedBefore("*"),
    line: 1,
    column: 18
  }, {
    code: "a { top: calc(1px *2); }",
    message: _.messages.expectedAfter("*"),
    line: 1,
    column: 19
  }, {
    code: "a { top: calc(1px/ 2); }",
    message: _.messages.expectedBefore("/"),
    line: 1,
    column: 18
  }, {
    code: "a { top: calc(1px /2); }",
    message: _.messages.expectedAfter("/"),
    line: 1,
    column: 19
  }, {
    code: "a { top: calc(calc(1px* 2px) + 3px); }",
    message: _.messages.expectedBefore("*"),
    line: 1,
    column: 23
  }, {
    code: "a { top: calc(calc(1px + 2px)* 3px); }",
    message: _.messages.expectedBefore("*"),
    line: 1,
    column: 30
  }, {
    code: "a { top: calc(1px +2px); }",
    message: _.messages.expectedOperatorBeforeSign("+"),
    line: 1,
    column: 19
  }, {
    code: "a { top: calc(1px -2px); }",
    message: _.messages.expectedOperatorBeforeSign("-"),
    line: 1,
    column: 19
  }, {
    code: "a { padding: 10px calc(1px +\t-1px)}",
    description: "tab before sign after operator",
    message: _.messages.expectedAfter("+"),
    line: 1,
    column: 28
  }, {
    code: "a { padding: 10px calc(1px +  -1px)}",
    description: "multiple spaces before sign after operator",
    message: _.messages.expectedAfter("+"),
    line: 1,
    column: 28
  }, {
    code: "a { padding: 10px calc(1px+ 2px); }",
    message: _.messages.expectedBefore("+"),
    line: 1,
    column: 27
  }, {
    code: "a { padding: 10px calc(1px  + 2px); }",
    message: _.messages.expectedBefore("+"),
    line: 1,
    column: 29
  }, {
    code: "a { padding: 10px calc(1px\t+ 2px); }",
    message: _.messages.expectedBefore("+"),
    line: 1,
    column: 28
  }, {
    code: "a { padding: 10px calc(1px +  2px); }",
    message: _.messages.expectedAfter("+"),
    line: 1,
    column: 28
  }, {
    code: "a { padding: 10px calc(1px +\t2px); }",
    message: _.messages.expectedAfter("+"),
    line: 1,
    column: 28
  }, {
    code: "a { padding: 10px calc(1px- 2px); }",
    message: _.messages.expectedBefore("-"),
    line: 1,
    column: 27
  }, {
    code: "a { padding: 10px calc(1px* 2); }",
    message: _.messages.expectedBefore("*"),
    line: 1,
    column: 27
  }, {
    code: "a { padding: 10px calc(1px *2); }",
    message: _.messages.expectedAfter("*"),
    line: 1,
    column: 28
  }, {
    code: "a { padding: 10px calc(1px/ 2); }",
    message: _.messages.expectedBefore("/"),
    line: 1,
    column: 27
  }, {
    code: "a { padding: 10px calc(1px /2); }",
    message: _.messages.expectedAfter("/"),
    line: 1,
    column: 28
  }, {
    code: "a { padding: 10px calc(calc(1px* 2px) + 3px); }",
    message: _.messages.expectedBefore("*"),
    line: 1,
    column: 32
  }, {
    code: "a { padding: 10px calc(calc(1px + 2px)* 3px); }",
    message: _.messages.expectedBefore("*"),
    line: 1,
    column: 39
  }, {
    code: "a { padding: 10px calc(1px +2px); }",
    message: _.messages.expectedOperatorBeforeSign("+"),
    line: 1,
    column: 28
  }, {
    code: "a { padding: 10px calc(1px -2px); }",
    message: _.messages.expectedOperatorBeforeSign("-"),
    line: 1,
    column: 28
  }]
});