"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,

  config: [["px", "vmin"]],

  accept: [{
    code: "a { line-height: 1; }"
  }, {
    code: "a { color: #000; }"
  }, {
    code: "a { top: 0; left: 0; }"
  }, {
    code: "a { font-size: 100%; }"
  }, {
    code: "a { line-height: 1.2rem; }"
  }, {
    code: "a { margin: 0 10em 5rem 2in; }"
  }, {
    code: "a { background-position: top right, 1em 5vh; }"
  }, {
    code: "a { top: calc(10em - 3em); }"
  }, {
    code: "a { background-image: linear-gradient(to right, white calc(100% - 50em), silver); }"
  }, {
    code: "a { width: /* 100px */ 1em; }",
    description: "ignore unit within comments"
  }, {
    code: "a::before { content: \"10px\"}",
    description: "ignore unit within quotes"
  }, {
    code: "a { font-size: $fs10px; }",
    description: "ignore preprocessor variable includes unit"
  }, {
    code: "a { font-size: --some-fs-10px; }",
    description: "ignore css variable includes unit"
  }],

  reject: [{
    code: "a { font-size: 13px; }",
    message: _.messages.rejected("px"),
    line: 1,
    column: 16
  }, {
    code: "a { width: 100vmin; }",
    message: _.messages.rejected("vmin"),
    line: 1,
    column: 12
  }, {
    code: "a { border-left: 1px solid #ccc; }",
    message: _.messages.rejected("px"),
    line: 1,
    column: 18
  }, {
    code: "a { margin: 0 20px; }",
    message: _.messages.rejected("px"),
    line: 1,
    column: 15
  }, {
    code: "a { margin: 0 0 0 20px; }",
    message: _.messages.rejected("px"),
    line: 1,
    column: 19
  }, {
    code: "a { background-position: top right, 1em 5px; }",
    message: _.messages.rejected("px"),
    line: 1,
    column: 41
  }, {
    code: "a { top: calc(100px - 30vh); }",
    message: _.messages.rejected("px"),
    line: 1,
    column: 15
  }, {
    code: "a { background-image: linear-gradient(to right, white calc(100vh - 5vmin), silver); }",
    message: _.messages.rejected("vmin"),
    line: 1,
    column: 68
  }]
});