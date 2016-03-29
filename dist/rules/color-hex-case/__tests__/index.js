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
  config: ["lower"],

  accept: [{
    code: "a { color: pink; }"
  }, {
    code: "a { color: #000; }"
  }, {
    code: "a { something: #000, #fff, #ababab; }"
  }, {
    code: "a { color: #0000ffcc; }",
    description: "eight digits"
  }, {
    code: "a { color: #00fc; }",
    description: "four digits"
  }, {
    code: "a { padding: 000; }"
  }, {
    code: "a::before { content: \"#ABABA\"; }"
  }, {
    code: "a { color: white /* #FFF */; }"
  }],

  reject: [{
    code: "a { color: #Ababa; }",
    message: _.messages.expected("#Ababa", "#ababa"),
    line: 1,
    column: 12
  }, {
    code: "a { something: #000F, #fff, #ababab; }",
    message: _.messages.expected("#000F", "#000f"),
    line: 1,
    column: 16
  }, {
    code: "a { something: #000, #FFFFAZ, #ababab; }",
    message: _.messages.expected("#FFFFAZ", "#ffffaz"),
    line: 1,
    column: 22
  }, {
    code: "a { something: #000, #fff, #12345AA; }",
    message: _.messages.expected("#12345AA", "#12345aa"),
    line: 1,
    column: 28
  }]
}));

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(sharedTests, {
  ruleName: _.ruleName,
  config: ["upper"],

  accept: [{
    code: "a { color: pink; }"
  }, {
    code: "a { color: #000; }"
  }, {
    code: "a { something: #000, #FFF, #ABABAB; }"
  }, {
    code: "a { color: #0000FFCC; }",
    description: "eight digits"
  }, {
    code: "a { color: #00FC; }",
    description: "four digits"
  }, {
    code: "a { padding: 000; }"
  }, {
    code: "a::before { content: \"#ababa\"; }"
  }, {
    code: "a { color: white /* #fff */; }"
  }],

  reject: [{
    code: "a { color: #aBABA; }",
    message: _.messages.expected("#aBABA", "#ABABA"),
    line: 1,
    column: 12
  }, {
    code: "a { something: #000f, #FFF, #ABABAB; }",
    message: _.messages.expected("#000f", "#000F"),
    line: 1,
    column: 16
  }, {
    code: "a { something: #000, #ffffaz, #ABABAB; }",
    message: _.messages.expected("#ffffaz", "#FFFFAZ"),
    line: 1,
    column: 22
  }, {
    code: "a { something: #000, #FFF, #12345aa; }",
    message: _.messages.expected("#12345aa", "#12345AA"),
    line: 1,
    column: 28
  }]
}));