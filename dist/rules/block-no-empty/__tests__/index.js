"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [undefined],
  skipBasicChecks: true,

  accept: [{
    code: ""
  }, {
    code: "@import \"foo.css\";"
  }, {
    code: "a { color: pink; }"
  }, {
    code: "@media print { a { color: pink; } }"
  }, {
    code: "@import url(x.css)"
  }],

  reject: [{
    code: "a {}",
    message: _.messages.rejected,
    line: 1,
    column: 3
  }, {
    code: "a { }",
    message: _.messages.rejected,
    line: 1,
    column: 3
  }, {
    code: "a {\n}",
    message: _.messages.rejected,
    line: 1,
    column: 3
  }, {
    code: "@media print {}",
    message: _.messages.rejected,
    line: 1,
    column: 14
  }, {
    code: "@media print { a {} }",
    message: _.messages.rejected,
    line: 1,
    column: 18
  }]
});