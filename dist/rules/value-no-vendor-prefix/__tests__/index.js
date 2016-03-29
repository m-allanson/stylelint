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
    code: ".foo { display: flex; }"
  }, {
    code: ".foo { background: linear-gradient(to top, #000, #fff); }"
  }, {
    code: ".foo { max-width: max-content; }"
  }, {
    code: ".foo { -webkit-transform: translate(0, 0); }",
    description: "ignores property vendor prefixes"
  }],

  reject: [{
    code: ".foo { display: -webkit-flex; }",
    message: _.messages.rejected("-webkit-flex"),
    line: 1,
    column: 17
  }, {
    code: ".foo { color: pink; display: -webkit-flex; }",
    message: _.messages.rejected("-webkit-flex"),
    line: 1,
    column: 30
  }, {
    code: ".foo { display: -webkit-box; }",
    message: _.messages.rejected("-webkit-box"),
    line: 1,
    column: 17
  }, {
    code: ".foo { background: -webkit-linear-gradient(bottom, #000, #fff); }",
    message: _.messages.rejected("-webkit-linear-gradient"),
    line: 1,
    column: 20
  }, {
    code: ".foo { max-width: -moz-max-content; }",
    message: _.messages.rejected("-moz-max-content"),
    line: 1,
    column: 19
  }]
});