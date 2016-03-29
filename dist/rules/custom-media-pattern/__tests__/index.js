"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [/foo-.+/],

  accept: [{
    code: "@keyframes foofoo {}"
  }, {
    code: "@custom-media --foo-bar (min-width: 0);"
  }, {
    code: "@custom-media --foo-foofoo (min-width: 0);"
  }],

  reject: [{
    code: "@custom-media --foa-bar (min-width: 0);",
    message: _.messages.expected,
    line: 1,
    column: 15
  }, {
    code: "@custom-media --foa (min-width: 0);",
    message: _.messages.expected,
    line: 1,
    column: 15
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["foo-.+"],

  accept: [{
    code: "@keyframes foofoo {}"
  }, {
    code: "@custom-media --foo-bar (min-width: 0);"
  }, {
    code: "@custom-media --foo-foofoo (min-width: 0);"
  }],

  reject: [{
    code: "@custom-media --foa-bar (min-width: 0);",
    message: _.messages.expected,
    line: 1,
    column: 15
  }, {
    code: "@custom-media --foa (min-width: 0);",
    message: _.messages.expected,
    line: 1,
    column: 15
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [/^[A-Z][a-z]+-[a-z][a-zA-Z]+$/],

  accept: [{
    code: "@custom-media --Ape-ageLess"
  }, {
    code: "@custom-media --Purr-piratePlant"
  }],

  reject: [{
    code: "@custom-media --ape-ageLess",
    message: _.messages.expected,
    line: 1,
    column: 15
  }, {
    code: "@custom-media --Ape-AgeLess",
    message: _.messages.expected,
    line: 1,
    column: 15
  }]
});