"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always"],

  accept: [{
    code: "@media (max-width: 600px) {}"
  }, {
    code: "@media (max-width : 600px) {}"
  }, {
    code: "@media (max-width: 600px) and (min-width: 3em) {}"
  }, {
    code: "@custom-selector :--enter :hover;"
  }],

  reject: [{
    code: "@media (max-width:600px) {}",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 18
  }, {
    code: "@media (max-width:  600px) {}",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 18
  }, {
    code: "@media (max-width:\t600px) {}",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 18
  }, {
    code: "@media (max-width:\n600px) {}",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 18
  }, {
    code: "@media (max-width:\r\n600px) {}",
    description: "CRLF",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 18
  }, {
    code: "@media (max-width:600px) and (min-width: 3em) {}",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 18
  }, {
    code: "@media (max-width: 600px) and (min-width:3em) {}",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 41
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never"],

  accept: [{
    code: "@media (max-width:600px) {}"
  }, {
    code: "@media (max-width:600px) and (min-width:3em) {}"
  }, {
    code: "@custom-selector : --enter :hover;"
  }],

  reject: [{
    code: "@media (max-width: 600px) {}",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 18
  }, {
    code: "@media (max-width:  600px) {}",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 18
  }, {
    code: "@media (max-width:\t600px) {}",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 18
  }, {
    code: "@media (max-width:\n600px) {}",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 18
  }, {
    code: "@media (max-width:\r\n600px) {}",
    description: "CRLF",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 18
  }, {
    code: "@media (max-width:600px) and (min-width: 3em) {}",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 40
  }, {
    code: "@media (max-width: 600px) and (min-width:3em) {}",
    message: _.messages.rejectedAfter(),
    line: 1,
    column: 18
  }]
});