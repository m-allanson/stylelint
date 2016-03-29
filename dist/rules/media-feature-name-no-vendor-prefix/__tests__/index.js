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
    code: "@media (min-resolution: 96dpi) {}"
  }],

  reject: [{
    code: "@media (-webkit-min-device-pixel-ratio: 1) {}",
    message: _.messages.rejected,
    line: 1,
    column: 9
  }, {
    code: "@media\n\t(min--moz-device-pixel-ratio: 1) {}",
    message: _.messages.rejected,
    line: 2,
    column: 3
  }, {
    code: "@media   (-o-max-device-pixel-ratio: 1/1) {}",
    message: _.messages.rejected,
    line: 1,
    column: 11
  }]
});