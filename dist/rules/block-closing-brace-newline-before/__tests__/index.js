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
    code: "a { color: pink;\n}"
  }, {
    code: "a { color: pink;\r\n}",
    description: "CRLF"
  }, {
    code: "a { color: pink;\n\t\t}"
  }, {
    code: "a { color: pink;\n} b { color: red;\n}"
  }, {
    code: "a { color: pink;\n}b { color: red;\n}"
  }, {
    code: "@media print {\n  a {\n     color: pink;\n  }\n}",
    description: "indentation after the newline before the closing braces"
  }, {
    code: "@media print {\n\ta {\n\t\tcolor: pink;\n\t\t{\n\t\t\t&:hover;\n\t\t\t}\n\t\t}\n}",
    description: "3 level deep nesting with indentation after the newline before the closing braces"
  }],

  reject: [{
    code: "a { color: pink;}",
    message: _.messages.expectedBefore,
    line: 1,
    column: 16
  }, {
    code: "a { color: pink; }",
    message: _.messages.expectedBefore,
    line: 1,
    column: 17
  }, {
    code: "a { color: pink; \n}",
    message: _.messages.expectedBefore,
    line: 1,
    column: 18
  }, {
    code: "a { color: pink; \r\n}",
    description: "CRLF",
    message: _.messages.expectedBefore,
    line: 1,
    column: 19
  }, {
    code: "a { color: pink;  }",
    message: _.messages.expectedBefore,
    line: 1,
    column: 18
  }, {
    code: "a { color: pink;\t}",
    message: _.messages.expectedBefore,
    line: 1,
    column: 17
  }, {
    code: "a { color: pink;\n} b { color: red; }",
    message: _.messages.expectedBefore,
    line: 2,
    column: 18
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-multi-line"],

  accept: [{
    code: "a { color: pink;\ntop: 0;\n}"
  }, {
    code: "a { color: pink;\ntop: 0;\n\t\t}"
  }, {
    code: "a { color: pink;\r\ntop: 0;\r\n\t\t}",
    description: "CRLF"
  }, {
    code: "a { color: pink;\ntop: 0;\n} b { color: red;\n}"
  }, {
    code: "a { color: pink;\ntop: 0;\n}b { color: red;\n}"
  }, {
    code: "a { color: pink;}"
  }, {
    code: "a { color: pink;} b { color: red;}"
  }, {
    code: "a { color: pink;}b { color: red;}"
  }],

  reject: [{
    code: "a { color: pink;\ntop: 0;}",
    message: _.messages.expectedBeforeMultiLine,
    line: 2,
    column: 7
  }, {
    code: "a { color: pink;\r\ntop: 0;}",
    description: "CRLF",
    message: _.messages.expectedBeforeMultiLine,
    line: 2,
    column: 7
  }, {
    code: "a { color: pink;\ntop: 0; }",
    message: _.messages.expectedBeforeMultiLine,
    line: 2,
    column: 8
  }, {
    code: "a { color: pink;\ntop: 0; \n}",
    message: _.messages.expectedBeforeMultiLine,
    line: 2,
    column: 9
  }, {
    code: "a { color: pink;\ntop: 0;  }",
    message: _.messages.expectedBeforeMultiLine,
    line: 2,
    column: 9
  }, {
    code: "a { color: pink;\ntop: 0;\t}",
    message: _.messages.expectedBeforeMultiLine,
    line: 2,
    column: 8
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-multi-line"],

  accept: [{
    code: "a { color: pink;\ntop: 0;}"
  }, {
    code: "a { color: pink;\r\ntop: 0;}",
    description: "CRLF"
  }, {
    code: "a { color: pink;\ntop: 0;} b { color: red;\ntop: 0;}"
  }, {
    code: "a { color: pink;\ntop: 0;}b { color: red;\ntop: 0;}"
  }, {
    code: "a { color: pink; }"
  }, {
    code: "a { color: pink;\t}"
  }, {
    code: "a { color: pink;  }"
  }],

  reject: [{
    code: "a { color: pink;\ntop: 0; }",
    message: _.messages.rejectedBeforeMultiLine,
    line: 2,
    column: 8
  }, {
    code: "a { color: pink;\r\ntop: 0; }",
    description: "CRLF",
    message: _.messages.rejectedBeforeMultiLine,
    line: 2,
    column: 8
  }, {
    code: "a { color: pink;\ntop: 0;\n}",
    message: _.messages.rejectedBeforeMultiLine,
    line: 2,
    column: 8
  }, {
    code: "a { color: pink;\ntop: 0;  }",
    message: _.messages.rejectedBeforeMultiLine,
    line: 2,
    column: 9
  }, {
    code: "a { color: pink;\ntop: 0;\t}",
    message: _.messages.rejectedBeforeMultiLine,
    line: 2,
    column: 8
  }, {
    code: "a { color: pink;\ntop: 0;} b { color: red;\ntop: 0;\n}",
    message: _.messages.rejectedBeforeMultiLine,
    line: 3,
    column: 8
  }]
});