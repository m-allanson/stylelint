"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,

  config: [["px", "em"]],

  accept: [{
    code: "a { line-height: 1; }"
  }, {
    code: "a { color: #000; }"
  }, {
    code: "a { font-size: 14px; }"
  }, {
    code: "a { font-size: 1.2em; }"
  }, {
    code: "a { margin: 0 10em 5em 2px; }"
  }, {
    code: "a { background-position: top right, 10px 20px; }"
  }, {
    code: "a { top: calc(10em - 3em); }"
  }, {
    code: "a { background-image: linear-gradient(to right, white calc(100px - 50em), silver); }"
  }, {
    code: "a { width: /* 100pc */ 1em; }",
    description: "ignore unit within comments"
  }, {
    code: "a::before { content: \"10%\"}",
    description: "ignore unit within quotes"
  }, {
    code: "a { font-size: $fs10%; }",
    description: "ignore preprocessor variable includes unit"
  }, {
    code: "a { font-size: --some-fs-10rem; }",
    description: "ignore css variable includes unit"
  }],

  reject: [{
    code: "a { font-size: 80%; }",
    message: _.messages.rejected("%"),
    line: 1,
    column: 16
  }, {
    code: "a { width: 100vmin; }",
    message: _.messages.rejected("vmin"),
    line: 1,
    column: 12
  }, {
    code: "a { border-left: 1rem solid #ccc; }",
    message: _.messages.rejected("rem"),
    line: 1,
    column: 18
  }, {
    code: "a { margin: 0 20%; }",
    message: _.messages.rejected("%"),
    line: 1,
    column: 15
  }, {
    code: "a { margin: 0 0 0 20rem; }",
    message: _.messages.rejected("rem"),
    line: 1,
    column: 19
  }, {
    code: "a { background-position: top right, 1em 5rem; }",
    message: _.messages.rejected("rem"),
    line: 1,
    column: 41
  }, {
    code: "a { top: calc(100px - 30vh); }",
    message: _.messages.rejected("vh"),
    line: 1,
    column: 23
  }, {
    code: "a { background-image: linear-gradient(to right, white calc(100px - 5vmin), silver); }",
    message: _.messages.rejected("vmin"),
    line: 1,
    column: 68
  }]
});