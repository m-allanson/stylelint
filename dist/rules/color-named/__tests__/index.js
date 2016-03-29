"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never"],

  accept: [{
    code: "a { color: #000; }"
  }, {
    code: "a { color: #ababab; }"
  }, {
    code: "a { color: rgba(0, 0, 0, 0); }"
  }, {
    code: "a { something: #000, #fff, #333; }"
  }, {
    code: "/** color: black; */",
    description: "ignore color names within comments"
  }, {
    code: "a::before { content: \"orange\" }",
    description: "ignore color names within doubl quotes"
  }, {
    code: "a::before { content: 'orange' }",
    description: "ignore color names within single quotes"
  }, {
    code: "a { background-image: url(./black.png); }",
    description: "ignore color names within urls"
  }, {
    code: "a { padding: 000; }"
  }, {
    code: "a::before { content: \"#ababa\"; }"
  }, {
    code: "a { color: $black; }",
    description: "ignore sass variable named with color"
  }, {
    code: "a { color: var(--some-color-blue); }",
    description: "ignore css variable named with color"
  }, {
    code: "a { animation: spin-blue 2s linear; }",
    description: "ignore keyframe animation name that includes colors"
  }],

  reject: [{
    code: "a { color: red; }",
    message: _.messages.rejected("red"),
    line: 1,
    column: 12
  }, {
    code: "a { color: rebeccapurple; }",
    message: _.messages.rejected("rebeccapurple"),
    line: 1,
    column: 12
  }, {
    code: "a { something: #00c, red, #fff; }",
    message: _.messages.rejected("red"),
    line: 1,
    column: 22
  }, {
    code: "a { something: #fff1a1, rgb(250, 250, 0), black; }",
    message: _.messages.rejected("black"),
    line: 1,
    column: 43
  }, {
    code: "a { something:#cccccc,white,#12345a; }",
    message: _.messages.rejected("white"),
    line: 1,
    column: 23
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-where-possible"],

  accept: [{
    code: "a { color: black; }"
  }, {
    code: "a { color: rgb(0,0,1); }"
  }, {
    code: "a { color: rgba(0,0,0,0.5); }"
  }, {
    code: "a { color: rgb(0,0,0,50%); }"
  }, {
    code: "a { color: color(black, a(50%)) }"
  }, {
    code: "a { color: rgb(0, calc(0 + 0), 0, 0) }"
  }, {
    code: "/** color: #000; */",
    description: "ignore representations within comments"
  }, {
    code: "a::before { content: \"#000\" }",
    description: "ignore representations within doubl quotes"
  }, {
    code: "a::before { content: '#000' }",
    description: "ignore representations within single quotes"
  }, {
    code: "a { background-image: url(./thing.png#000); }",
    description: "ignore representations within urls"
  }],

  reject: [{
    code: "a { color: #000 }",
    message: _.messages.expected("black", "#000"),
    line: 1,
    column: 12
  }, {
    code: "a { background: #f000 }",
    message: _.messages.expected("black", "#f000"),
    line: 1,
    column: 17
  }, {
    code: "a { color: #ff000000 }",
    message: _.messages.expected("black", "#ff000000"),
    line: 1,
    column: 12
  }, {
    code: "a { color: rgb(0, 0, 0) }",
    message: _.messages.expected("black", "rgb(0,0,0)"),
    line: 1,
    column: 12
  }, {
    code: "a { color: rgba(0, 0, 0, 1) }",
    message: _.messages.expected("black", "rgba(0,0,0,1)"),
    line: 1,
    column: 12
  }, {
    code: "a { color: rgba(0, 0, 0, 100%) }",
    message: _.messages.expected("black", "rgba(0,0,0,100%)"),
    line: 1,
    column: 12
  }, {
    code: "a { color: rgb(0%,0%, 0%) }",
    message: _.messages.expected("black", "rgb(0%,0%,0%)"),
    line: 1,
    column: 12
  }, {
    code: "a { color: rgba(0%,0%, 0%  ,1) }",
    message: _.messages.expected("black", "rgba(0%,0%,0%,1)"),
    line: 1,
    column: 12
  }, {
    code: "a { color: rgba(0%,0%, 0%\n,100%) }",
    message: _.messages.expected("black", "rgba(0%,0%,0%,100%)"),
    line: 1,
    column: 12
  }, {
    code: "a { color: hsl(0,0%, 0%) }",
    message: _.messages.expected("black", "hsl(0,0%,0%)"),
    line: 1,
    column: 12
  }, {
    code: "a { color: hsla(0,0%, 0%  ,1) }",
    message: _.messages.expected("black", "hsla(0,0%,0%,1)"),
    line: 1,
    column: 12
  }, {
    code: "a { color: hsla(0,0%, 0%\n,100%) }",
    message: _.messages.expected("black", "hsla(0,0%,0%,100%)"),
    line: 1,
    column: 12
  }, {
    code: "a { color: hwb(0,0%, 0%) }",
    message: _.messages.expected("red", "hwb(0,0%,0%)"),
    line: 1,
    column: 12
  }, {
    code: "a { color: hwb(0,0%, 0%  ,1) }",
    message: _.messages.expected("red", "hwb(0,0%,0%,1)"),
    line: 1,
    column: 12
  }, {
    code: "a { color: hwb(0,0%, 0%\n,100%) }",
    message: _.messages.expected("red", "hwb(0,0%,0%,100%)"),
    line: 1,
    column: 12
  }, {
    code: "a { color: gray(0) }",
    message: _.messages.expected("black", "gray(0)"),
    line: 1,
    column: 12
  }, {
    code: "a { color: gray(0%) }",
    message: _.messages.expected("black", "gray(0%)"),
    line: 1,
    column: 12
  }, {
    code: "a { color: gray(0, 1) }",
    message: _.messages.expected("black", "gray(0,1)"),
    line: 1,
    column: 12
  }, {
    code: "a { color: gray(0, 100%) }",
    message: _.messages.expected("black", "gray(0,100%)"),
    line: 1,
    column: 12
  }, {
    code: "a { color: rgb(\n0 ,\n 0 ,\r\n 0) }",
    message: _.messages.expected("black", "rgb(0,0,0)"),
    line: 1,
    column: 12
  }, {
    code: "a { something: #302, rgb(\n0 ,\n 0 ,\r\n 0) }",
    message: _.messages.expected("black", "rgb(0,0,0)"),
    line: 1,
    column: 22
  }]
});