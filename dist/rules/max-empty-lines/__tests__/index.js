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
    code: "a {}\nb {}"
  }, {
    code: "a {}\r\nb {}"
  }, {
    code: "a {}\n\nb{}"
  }, {
    code: "a {}\r\n\r\nb{}"
  }, {
    code: "/** horse */\n\nb{}"
  }, {
    code: "/** horse */\r\n\r\nb{}"
  }, {
    code: "a{}\n\n/** horse */\n\nb{}"
  }, {
    code: "a{}\r\n\r\n/** horse */\r\n\r\nb{}"
  }],

  reject: [{
    code: "a {}\n\n\nb{}",
    message: _.messages.rejected,
    line: 1,
    column: 5
  }, {
    code: "a {}\r\n\r\n\r\nb{}",
    message: _.messages.rejected,
    line: 1,
    column: 6
  }, {
    code: "a {}\n\n/** horse */\n\n\nb{}",
    message: _.messages.rejected,
    line: 3,
    column: 13
  }, {
    code: "a {}\r\n\r\n/** horse */\r\n\r\n\r\nb{}",
    message: _.messages.rejected,
    line: 3,
    column: 14
  }, {
    code: "/* horse\n\n\n */\na{}",
    message: _.messages.rejected,
    line: 1,
    column: 9
  }, {
    code: "/* horse\r\n\r\n\r\n */\r\na{}",
    message: _.messages.rejected,
    line: 1,
    column: 10
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [2],

  accept: [{
    code: "a {}\nb {}"
  }, {
    code: "a {}\n\nb {}"
  }, {
    code: "a {}\n\n\nb {}"
  }, {
    code: "a {}\r\n\r\n\r\nb{}"
  }, {
    code: "a{}\n\n\n/** horse */\n\n\nb{}"
  }, {
    code: "a{}\r\n\r\n\r\n/** horse */\r\n\r\n\r\nb{}"
  }],

  reject: [{
    code: "a {}\n\n\n\nb{}",
    message: _.messages.rejected,
    line: 1,
    column: 5
  }, {
    code: "a {}\r\n\r\n\r\n\r\nb{}",
    message: _.messages.rejected,
    line: 1,
    column: 6
  }, {
    code: "a {}\n\n/** horse */\n\n\n\nb{}",
    message: _.messages.rejected,
    line: 3,
    column: 13
  }, {
    code: "a {}\r\n\r\n/** horse */\r\n\r\n\r\n\r\nb{}",
    message: _.messages.rejected,
    line: 3,
    column: 14
  }, {
    code: "/* horse\n\n\n\n */\na{}",
    message: _.messages.rejected,
    line: 1,
    column: 9
  }, {
    code: "/* horse\r\n\r\n\r\n\r\n */\r\na{}",
    message: _.messages.rejected,
    line: 1,
    column: 10
  }]
});