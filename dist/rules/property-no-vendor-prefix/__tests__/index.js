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
    code: ":root { --foo-bar: 1px; }"
  }, {
    code: "a { color: pink; --webkit-transform: 1px; }"
  }, {
    code: "a { transform: scale(1); }"
  }, {
    code: "a { box-sizing: border-box; }"
  }, {
    code: "a { -webkit-font-smoothing: antialiased; }",
    description: "non-standard prefixed property"
  }, {
    code: "a { -webkit-touch-callout: none; }",
    description: "another non-standard prefixed property"
  }],

  reject: [{
    code: "a { -webkit-transform: scale(1); }",
    message: _.messages.rejected("-webkit-transform"),
    line: 1,
    column: 5
  }, {
    code: "a { -webkit-transform: scale(1); transform: scale(1); }",
    message: _.messages.rejected("-webkit-transform"),
    line: 1,
    column: 5
  }, {
    code: "a { transform: scale(1); -webkit-transform: scale(1); }",
    message: _.messages.rejected("-webkit-transform"),
    line: 1,
    column: 26
  }, {
    code: "a { -moz-transition: all 3s; }",
    message: _.messages.rejected("-moz-transition"),
    line: 1,
    column: 5
  }, {
    code: "a { -moz-columns: 2; }",
    message: _.messages.rejected("-moz-columns"),
    line: 1,
    column: 5
  }, {
    code: "a { -o-columns: 2; }",
    description: "mistaken prefix",
    message: _.messages.rejected("-o-columns"),
    line: 1,
    column: 5
  }, {
    code: "a { -ms-interpolation-mode: nearest-neighbor; }",
    description: "\"hack\" prefix",
    message: _.messages.rejected("-ms-interpolation-mode"),
    line: 1,
    column: 5
  }]
});