"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [0],

  accept: [{
    code: "a { transform: translate(1, 1); }"
  }, {
    code: "a { transform: translate(\n1\n,\n1\n); }"
  }, {
    code: "a { transform: translate(\r\n1\r\n,\r\n1\r\n); }"
  }, {
    code: "a { transform: translate\n\n(1, 1); }"
  }, {
    code: "a { transform: translate\r\n\r\n(1, 1); }"
  }, {
    code: "a { transform: translate(1, 1)\n\n; }"
  }, {
    code: "a { transform: translate(1, 1)\r\n\r\n; }"
  }, {
    code: "a { transform:\n\ntranslate(1, 1); }"
  }, {
    code: "a { transform:\r\n\r\ntranslate(1, 1); }"
  }, {
    code: "a { background: blah,\n\nfoo; }"
  }, {
    code: "a { background: blah,\r\n\r\nfoo; }"
  }],

  reject: [{
    code: "a { transform: translate(\n\n1\n,\n1\n); }",
    message: _.messages.rejected,
    line: 1,
    column: 26
  }, {
    code: "a { transform: translate(\r\n\r\n1\r\n,\r\n1\r\n); }",
    message: _.messages.rejected,
    line: 1,
    column: 27
  }, {
    code: "a { transform: translate(\n1\n\n,\n1\n); }",
    message: _.messages.rejected,
    line: 2,
    column: 2
  }, {
    code: "a { transform: translate(\r\n1\r\n\r\n,\r\n1\r\n); }",
    message: _.messages.rejected,
    line: 2,
    column: 3
  }, {
    code: "a { transform: translate(\n1\n,\n\n1\n); }",
    message: _.messages.rejected,
    line: 3,
    column: 2
  }, {
    code: "a { transform: translate(\r\n1\r\n,\r\n\r\n1\r\n); }",
    message: _.messages.rejected,
    line: 3,
    column: 3
  }, {
    code: "a { transform: translate(\n1\n,\n1\n\n); }",
    message: _.messages.rejected,
    line: 4,
    column: 2
  }, {
    code: "a { transform: translate(\r\n1\r\n,\r\n1\r\n\r\n); }",
    message: _.messages.rejected,
    line: 4,
    column: 3
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [1],

  accept: [{
    code: "a { transform: translate(\n1\n,\n1\n); }"
  }, {
    code: "a { transform: translate(\r\n1\r\n,\r\n1\r\n); }"
  }, {
    code: "a { transform: translate(\n\n1\n,\n1\n); }"
  }, {
    code: "a { transform: translate(\r\n\r\n1\r\n,\r\n1\r\n); }"
  }, {
    code: "a { transform: translate(\n1\n\n,\n1\n); }"
  }, {
    code: "a { transform: translate(\r\n1\r\n\r\n,\r\n1\r\n); }"
  }, {
    code: "a { transform: translate(\n1\n,\n\n1\n); }"
  }, {
    code: "a { transform: translate(\r\n1\r\n,\r\n\r\n1\r\n); }"
  }, {
    code: "a { transform: translate(\n1\n,\n1\n\n); }"
  }, {
    code: "a { transform: translate(\r\n1\r\n,\r\n1\r\n\r\n); }"
  }],

  reject: [{
    code: "a { transform: translate(\n\n\n1\n,\n1\n); }",
    message: _.messages.rejected,
    line: 1,
    column: 26
  }, {
    code: "a { transform: translate(\r\n\r\n\r\n1\r\n,\r\n1\r\n); }",
    message: _.messages.rejected,
    line: 1,
    column: 27
  }, {
    code: "a { transform: translate(\n1\n\n\n,\n1\n); }",
    message: _.messages.rejected,
    line: 2,
    column: 2
  }, {
    code: "a { transform: translate(\r\n1\r\n\r\n\r\n,\r\n1\r\n); }",
    message: _.messages.rejected,
    line: 2,
    column: 3
  }, {
    code: "a { transform: translate(\n1\n,\n\n\n1\n); }",
    message: _.messages.rejected,
    line: 3,
    column: 2
  }, {
    code: "a { transform: translate(\r\n1\r\n,\r\n\r\n\r\n1\r\n); }",
    message: _.messages.rejected,
    line: 3,
    column: 3
  }, {
    code: "a { transform: translate(\n1\n,\n1\n\n\n); }",
    message: _.messages.rejected,
    line: 4,
    column: 2
  }, {
    code: "a { transform: translate(\r\n1\r\n,\r\n1\r\n\r\n\r\n); }",
    message: _.messages.rejected,
    line: 4,
    column: 3
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [2],

  accept: [{
    code: "a { transform: translate(\n1\n,\n1\n); }"
  }, {
    code: "a { transform: translate(\r\n1\r\n,\r\n1\r\n); }"
  }, {
    code: "a { transform: translate(\n\n1\n,\n1\n); }"
  }, {
    code: "a { transform: translate(\r\n\r\n1\r\n,\r\n1\r\n); }"
  }, {
    code: "a { transform: translate(\n1\n\n,\n1\n); }"
  }, {
    code: "a { transform: translate(\r\n1\r\n\r\n,\r\n1\r\n); }"
  }, {
    code: "a { transform: translate(\n1\n,\n\n1\n); }"
  }, {
    code: "a { transform: translate(\r\n1\r\n,\r\n\r\n1\r\n); }"
  }, {
    code: "a { transform: translate(\n1\n,\n1\n\n); }"
  }, {
    code: "a { transform: translate(\r\n1\r\n,\r\n1\r\n\r\n); }"
  }, {
    code: "a { transform: translate(\n\n\n1\n,\n1\n); }"
  }, {
    code: "a { transform: translate(\r\n\r\n\r\n1\r\n,\r\n1\r\n); }"
  }, {
    code: "a { transform: translate(\n1\n\n\n,\n1\n); }"
  }, {
    code: "a { transform: translate(\r\n1\r\n\r\n\r\n,\r\n1\r\n); }"
  }, {
    code: "a { transform: translate(\n1\n,\n\n\n1\n); }"
  }, {
    code: "a { transform: translate(\r\n1\r\n,\r\n\r\n\r\n1\r\n); }"
  }, {
    code: "a { transform: translate(\n1\n,\n1\n\n\n); }"
  }, {
    code: "a { transform: translate(\r\n1\r\n,\r\n1\r\n\r\n\r\n); }"
  }],

  reject: [{
    code: "a { transform: translate(\n\n\n\n1\n,\n1\n); }",
    message: _.messages.rejected,
    line: 1,
    column: 26
  }, {
    code: "a { transform: translate(\r\n\r\n\r\n\r\n1\r\n,\r\n1\r\n); }",
    message: _.messages.rejected,
    line: 1,
    column: 27
  }, {
    code: "a { transform: translate(\n1\n\n\n\n,\n1\n); }",
    message: _.messages.rejected,
    line: 2,
    column: 2
  }, {
    code: "a { transform: translate(\r\n1\r\n\r\n\r\n\r\n,\r\n1\r\n); }",
    message: _.messages.rejected,
    line: 2,
    column: 3
  }, {
    code: "a { transform: translate(\n1\n,\n\n\n\n1\n); }",
    message: _.messages.rejected,
    line: 3,
    column: 2
  }, {
    code: "a { transform: translate(\r\n1\r\n,\r\n\r\n\r\n\r\n1\r\n); }",
    message: _.messages.rejected,
    line: 3,
    column: 3
  }, {
    code: "a { transform: translate(\n1\n,\n1\n\n\n\n); }",
    message: _.messages.rejected,
    line: 4,
    column: 2
  }, {
    code: "a { transform: translate(\r\n1\r\n,\r\n1\r\n\r\n\r\n\r\n); }",
    message: _.messages.rejected,
    line: 4,
    column: 3
  }]
});