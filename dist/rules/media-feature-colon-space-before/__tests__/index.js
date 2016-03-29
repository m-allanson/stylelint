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
    code: "@media (max-width :600px) {}"
  }, {
    code: "@media (max-width : 600px) {}"
  }, {
    code: "@media (max-width :600px) and (min-width :3em) {}"
  }, {
    code: "@custom-selector:--enter :hover;"
  }],

  reject: [{
    code: "@media (max-width:600px) {}",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 18
  }, {
    code: "@media (max-width  :600px) {}",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 20
  }, {
    code: "@media (max-width\t:600px) {}",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 19
  }, {
    code: "@media (max-width\n:600px) {}",
    message: _.messages.expectedBefore(),
    line: 2,
    column: 1
  }, {
    code: "@media (max-width\r\n:600px) {}",
    description: "CRLF",
    message: _.messages.expectedBefore(),
    line: 2,
    column: 1
  }, {
    code: "@media (max-width:600px) and (min-width :3em) {}",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 18
  }, {
    code: "@media (max-width :600px) and (min-width:3em) {}",
    message: _.messages.expectedBefore(),
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
    code: "@media (max-width: 600px) {}"
  }, {
    code: "@media (max-width:600px) and (min-width:3em) {}"
  }, {
    code: "@custom-selector :--enter :hover;"
  }],

  reject: [{
    code: "@media (max-width :600px) {}",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 19
  }, {
    code: "@media (max-width  :600px) {}",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 20
  }, {
    code: "@media (max-width\t:600px) {}",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 19
  }, {
    code: "@media (max-width\n:600px) {}",
    message: _.messages.rejectedBefore(),
    line: 2,
    column: 1
  }, {
    code: "@media (max-width\r\n:600px) {}",
    description: "CRLF",
    message: _.messages.rejectedBefore(),
    line: 2,
    column: 1
  }, {
    code: "@media (max-width:600px) and (min-width :3em) {}",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 41
  }, {
    code: "@media (max-width :600px) and (min-width:3em) {}",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 19
  }]
});