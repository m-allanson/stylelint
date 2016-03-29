"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [1],

  accept: [{
    code: "a { b { top: 0; }}"
  }, {
    code: "@media print { a { b { top: 0; }}}"
  }, {
    code: "a { top: 0; b { top: 0; }}"
  }, {
    code: "a { @nest b { top: 0; }}"
  }, {
    code: "a { b { @include foo; } }",
    description: "at-rule without block"
  }],

  reject: [{
    code: "a { b { c { top: 0; }}}",
    message: _.messages.rejected(1)
  }, {
    code: "@media print { a { b { c { top: 0; }}}}",
    message: _.messages.rejected(1)
  }, {
    code: "a { top: 0; b { top: 0; c { top: 0; }}}",
    message: _.messages.rejected(1)
  }, {
    code: "a { b { top: 0; c { top: 0; }} top: 0; }",
    message: _.messages.rejected(1)
  }, {
    code: "a { @nest b { c { top: 0; }}}",
    message: _.messages.rejected(1)
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [3],

  accept: [{
    code: "a { b { c { d { top: 0; }}}}"
  }, {
    code: "@media print { a { b { c { d { top: 0; }}}}}"
  }, {
    code: "a { & > b { @media print { color: pink; }}}"
  }, {
    code: "a { & > b { & > c { @media print { color: pink; }}}}",
    description: _.messages.rejected(3)
  }],

  reject: [{
    code: "a { b { c { d { e { top: 0; }}}}}",
    message: _.messages.rejected(3)
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [1, { ignore: ["at-rules-without-declaration-blocks"] }],

  accept: [{
    code: "a { b { top: 0; }}"
  }, {
    code: "a { @media print { b { top: 0; }}}"
  }, {
    code: "a { @nest b { c { top: 0; }}}"
  }],

  reject: [{
    code: "a { b { c { top: 0; }}}",
    message: _.messages.rejected(1)
  }, {
    code: "a { @media print { b { c { top: 0; }}}}",
    message: _.messages.rejected(1)
  }, {
    code: "a { @nest b { @nest c { top: 0; @nest d { bottom: 0; }}}}",
    message: _.messages.rejected(1)
  }]
});