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
    code: "a { color: pink; }"
  }, {
    code: "a { -webkit-transform: 1px; }"
  }],

  reject: [{
    code: "a { --foo-bar: 1px; }",
    message: _.messages.rejected
  }, {
    code: "a { color: pink; -webkit-transform: 1px; --foo-bar: 1px; }",
    message: _.messages.rejected
  }, {
    code: ":root, a { --foo-bar: 1px; }",
    message: _.messages.rejected
  }, {
    code: ":root a { --foo-bar: 1px; }",
    message: _.messages.rejected
  }]
});