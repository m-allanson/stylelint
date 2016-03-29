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
    code: "@media ( max-width: 300px ) {}"
  }, {
    code: "@media screen and ( color ), projection and ( color ) {}"
  }, {
    code: "@media ( grid ) and ( max-width: 15em ) {}"
  }],

  reject: [{
    code: "@media (max-width: 300px ) {}",
    message: _.messages.expectedOpening,
    line: 1,
    column: 9
  }, {
    code: "@media ( max-width: 300px) {}",
    message: _.messages.expectedClosing,
    line: 1,
    column: 25
  }, {
    code: "@media screen and (color ), projection and ( color ) {}",
    message: _.messages.expectedOpening,
    line: 1,
    column: 20
  }, {
    code: "@media screen and ( color), projection and ( color ) {}",
    message: _.messages.expectedClosing,
    line: 1,
    column: 25
  }, {
    code: "@media screen and ( color ), projection and (color ) {}",
    message: _.messages.expectedOpening,
    line: 1,
    column: 46
  }, {
    code: "@media screen and ( color ), projection and ( color) {}",
    message: _.messages.expectedClosing,
    line: 1,
    column: 51
  }, {
    code: "@media ( grid ) and (max-width: 15em ) {}",
    message: _.messages.expectedOpening,
    line: 1,
    column: 22
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never"],

  accept: [{
    code: "@media (max-width: 300px) {}"
  }, {
    code: "@media screen and (color), projection and (color) {}"
  }, {
    code: "@media (grid) and (max-width: 15em) {}"
  }],

  reject: [{
    code: "@media (max-width: 300px ) {}",
    message: _.messages.rejectedClosing,
    line: 1,
    column: 25
  }, {
    code: "@media ( max-width: 300px) {}",
    message: _.messages.rejectedOpening,
    line: 1,
    column: 9
  }, {
    code: "@media screen and (color ), projection and (color) {}",
    message: _.messages.rejectedClosing,
    line: 1,
    column: 25
  }, {
    code: "@media screen and ( color), projection and (color) {}",
    message: _.messages.rejectedOpening,
    line: 1,
    column: 20
  }, {
    code: "@media screen and (color), projection and (color ) {}",
    message: _.messages.rejectedClosing,
    line: 1,
    column: 49
  }, {
    code: "@media screen and (color), projection and ( color) {}",
    message: _.messages.rejectedOpening,
    line: 1,
    column: 44
  }, {
    code: "@media (grid) and (max-width: 15em ) {}",
    message: _.messages.rejectedClosing,
    line: 1,
    column: 35
  }]
});