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
    code: "@keyframes { 0% { top: 0; } }"
  }, {
    code: "@viewport { orientation: landscape; }"
  }],

  reject: [{
    code: "@-webkit-keyframes { 0% { top: 0; } }",
    message: _.messages.rejected("-webkit-keyframes")
  }, {
    code: "@-moz-keyframes { 0% { top: 0; } }",
    message: _.messages.rejected("-moz-keyframes")
  }, {
    code: "@-ms-viewport { orientation: landscape; }",
    message: _.messages.rejected("-ms-viewport")
  }]
});