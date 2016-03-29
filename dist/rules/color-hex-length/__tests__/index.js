"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _testUtils = require("../../../testUtils");

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sharedTests = {
  accept: [{
    code: "a { border-#$side: 0; }",
    description: "ignore sass-like interpolation"
  }, {
    code: "a { box-sizing: #$type-box; }",
    description: "ignore sass-like interpolation"
  }]
};

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(sharedTests, {
  ruleName: _.ruleName,
  config: ["short"],

  accept: [{
    code: "a { color: pink; }"
  }, {
    code: "a { color: #000; }"
  }, {
    code: "a { color: #FFF; }"
  }, {
    code: "a { color: #fFf; }",
    description: "mixed case"
  }, {
    code: "a { color: #fffa; }"
  }, {
    code: "a { something: #000, #fff, #aba; }"
  }, {
    code: "a { color: #ff; }",
    description: "invalid short"
  }, {
    code: "a { color: #ffffffa; }",
    description: "invalid long"
  }, {
    code: "a { color: #fffffffffff; }",
    description: "invalid extra long"
  }, {
    code: "a { padding: 000000; }"
  }, {
    code: "a::before { content: \"#ABABAB\"; }"
  }, {
    code: "a { color: white /* #FFFFFF */; }"
  }],

  reject: [{
    code: "a { color: #FFFFFF; }",
    message: _.messages.expected("#FFFFFF", "#FFF"),
    line: 1,
    column: 12
  }, {
    code: "a { color: #FfaAFF; }",
    message: _.messages.expected("#FfaAFF", "#FaF"),
    line: 1,
    column: 12
  }, {
    code: "a { color: #00aa00aa; }",
    message: _.messages.expected("#00aa00aa", "#0a0a"),
    line: 1,
    column: 12
  }, {
    code: "a { something: #fff, #aba, #00ffAAaa; }",
    message: _.messages.expected("#00ffAAaa", "#0fAa"),
    line: 1,
    column: 28
  }]
}));

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(sharedTests, {
  ruleName: _.ruleName,
  config: ["long"],

  accept: [{
    code: "a { color: pink; }"
  }, {
    code: "a { color: #000000; }"
  }, {
    code: "a { color: #FFFFFF; }"
  }, {
    code: "a { color: #fFfFfF; }",
    description: "mixed case"
  }, {
    code: "a { color: #ffffffaa; }"
  }, {
    code: "a { something: #000000, #ffffff, #ababab; }"
  }, {
    code: "a { color: #ff; }",
    description: "invalid short"
  }, {
    code: "a { color: #ffffffa; }",
    description: "invalid long"
  }, {
    code: "a { color: #fffffffffff; }",
    description: "invalid extra long"
  }, {
    code: "a { padding: 000; }"
  }, {
    code: "a::before { content: \"#ABA\"; }"
  }, {
    code: "a { color: white /* #FFF */; }"
  }],

  reject: [{
    code: "a { color: #FFF; }",
    message: _.messages.expected("#FFF", "#FFFFFF"),
    line: 1,
    clumn: 12
  }, {
    code: "a { color: #Ffa; }",
    message: _.messages.expected("#Ffa", "#FFffaa"),
    line: 1,
    clumn: 12
  }, {
    code: "a { color: #0a0a; }",
    message: _.messages.expected("#0a0a", "#00aa00aa"),
    line: 1,
    clumn: 12
  }, {
    code: "a { something: #ffffff, #aabbaa, #0fAa; }",
    message: _.messages.expected("#0fAa", "#00ffAAaa"),
    line: 1,
    clumn: 34
  }]
}));