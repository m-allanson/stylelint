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
    code: ":fullscreen a {}"
  }, {
    code: ":root { --custom-property: {} }"
  }, {
    code: "input::placeholder { color: pink; }"
  }, {
    code: "a::before {}",
    description: "handles pseudo-element"
  }, {
    code: "a:hover {}",
    description: "handles pseudo-class"
  }, {
    code: "a[data-foo=\":-webkit-full-screen\"] {}",
    description: "string"
  }],

  reject: [{
    code: ":-webkit-full-screen a {}",
    message: _.messages.rejected(":-webkit-full-screen"),
    line: 1,
    column: 1
  }, {
    code: "body, :-ms-fullscreen a {}",
    message: _.messages.rejected(":-ms-fullscreen"),
    line: 1,
    column: 7
  }, {
    code: "input:-moz-placeholder, input::placeholder { color: pink; }",
    message: _.messages.rejected(":-moz-placeholder"),
    line: 1,
    column: 6
  }, {
    code: "input::-moz-placeholder { color: pink; }",
    message: _.messages.rejected("::-moz-placeholder"),
    line: 1,
    column: 6
  }, {
    code: "input::-webkit-input-placeholder { color: pink; }",
    message: _.messages.rejected("::-webkit-input-placeholder")
  }]
});