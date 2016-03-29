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
    code: "a::before { content: 'one'; }",
    description: "without newline"
  }, {
    code: "a::before { content: 'one\\ntwo'; }",
    description: "with escaped slash-slash-n newline"
  }, {
    code: "a::before { content: 'one\\Atwo'; }",
    description: "with escaped slash-A newline"
  }, {
    code: "a::before {\n      content: 'one      two';\n    }",

    description: "with escaped slash at end of real line"
  }, {
    code: "p[href^=\"https://\"]:before {\n      top: 0;\n    }",

    description: "attribute containing double-slash"
  }],

  reject: [{
    code: "a::before { content: 'one\ntwo'; }",
    message: _.messages.rejected,
    line: 1,
    column: 26
  }, {
    code: "a::before { content: 'one\r\ntwo'; }",
    description: "CRLF",
    message: _.messages.rejected,
    line: 1,
    column: 27
  }]
});