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
    code: ":root {}"
  }, {
    code: "   :root\n {}"
  }],

  reject: [{
    code: "a, :root {}",
    message: _.messages.rejected
  }, {
    code: ":root, a {}",
    message: _.messages.rejected
  }, {
    code: ":root + a {}",
    message: _.messages.rejected
  }, {
    code: "body, .foo, :root + a {}",
    message: _.messages.rejected
  }, {
    code: "html:root {}",
    message: _.messages.rejected
  }, {
    code: "html :root {}",
    message: _.messages.rejected
  }]
});