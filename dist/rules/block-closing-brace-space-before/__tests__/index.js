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
    code: "a { color: pink; }"
  }, {
    code: "a { color: pink; } b { color: red; }"
  }, {
    code: "a { color: pink; }b { color: red; }"
  }],

  reject: [{
    code: "a { color: pink;}",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 16
  }, {
    code: "a { color: pink;  }",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 18
  }, {
    code: "a { color: pink;\n}",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 17
  }, {
    code: "a { color: pink;\r\n}",
    description: "CRLF",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 18
  }, {
    code: "a { color: pink;\t}",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 17
  }, {
    code: "a { color: pink; } b { color: red;}",
    message: _.messages.expectedBefore(),
    line: 1,
    column: 34
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never"],

  accept: [{
    code: "a { color: pink;}"
  }, {
    code: "a { color: pink;} b { color: red;}"
  }, {
    code: "a { color: pink;}b { color: red;}"
  }],

  reject: [{
    code: "a { color: pink; }",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 17
  }, {
    code: "a { color: pink;  }",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 18
  }, {
    code: "a { color: pink;\n}",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 17
  }, {
    code: "a { color: pink;\r\n}",
    description: "CRLF",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 18
  }, {
    code: "a { color: pink;\t}",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 17
  }, {
    code: "a { color: pink;} b { color: red; }",
    message: _.messages.rejectedBefore(),
    line: 1,
    column: 34
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-single-line"],

  accept: [{
    code: "a { color: pink; }"
  }, {
    code: "a { color: pink; } b { color: red; }"
  }, {
    code: "a { color: pink; }b { color: red; }"
  }, {
    code: "a,\nb { color: pink; } c { color: red; }",
    description: "multi-line rule, single-line block"
  }, {
    code: "a { color: pink;\ntop: 0;}"
  }, {
    code: "a { color: pink;\n\ntop: 0;}",
    description: "CRLF"
  }, {
    code: "a { color: pink;\ntop: 0;  } b { color: red; }"
  }, {
    code: "a { color: pink;\ntop: 0;\n}b { color: red; }"
  }],

  reject: [{
    code: "a { color: pink;}",
    message: _.messages.expectedBeforeSingleLine(),
    line: 1,
    column: 16
  }, {
    code: "a,\nb { color: pink;}",
    message: _.messages.expectedBeforeSingleLine(),
    line: 2,
    column: 16
  }, {
    code: "a,\r\nb { color: pink;}",
    description: "CRLF",
    message: _.messages.expectedBeforeSingleLine(),
    line: 2,
    column: 16
  }, {
    code: "a { color: pink;  }",
    message: _.messages.expectedBeforeSingleLine(),
    line: 1,
    column: 18
  }, {
    code: "a { color: pink;\t}",
    message: _.messages.expectedBeforeSingleLine(),
    line: 1,
    column: 17
  }, {
    code: "a { color: pink; } b { color: red;}",
    message: _.messages.expectedBeforeSingleLine(),
    line: 1,
    column: 34
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-single-line"],

  accept: [{
    code: "a { color: pink;}"
  }, {
    code: "a { color: pink;} b { color: red;}"
  }, {
    code: "a { color: pink;}b { color: red;}"
  }, {
    code: "a,\nb { color: pink;} b { color: red;}",
    description: "multi-line rule, single-line block"
  }, {
    code: "a { color: pink;\ntop: 0; }"
  }, {
    code: "a { color: pink;\r\ntop: 0; }",
    description: "CRLF"
  }, {
    code: "a { color: pink;\ntop: 0;  } b { color: red;}"
  }, {
    code: "a { color: pink;\ntop: 0;\n}b { color: red;}"
  }],

  reject: [{
    code: "a { color: pink; }",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 17
  }, {
    code: "a,\nb { color: pink; }",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 2,
    column: 17
  }, {
    code: "a,\r\nb { color: pink; }",
    description: "CRLF",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 2,
    column: 17
  }, {
    code: "a { color: pink;  }",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 18
  }, {
    code: "a { color: pink;\t}",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 17
  }, {
    code: "a { color: pink;} b { color: red;\t}",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 34
  }, {
    code: "a { color: pink;  } b { color: red;}",
    message: _.messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 18
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always-multi-line"],

  accept: [{
    code: "a { color: pink;\ntop: 0; }"
  }, {
    code: "a { color: pink;\ntop: 0; } b { color: red; }"
  }, {
    code: "a { color: pink;\ntop: 0; }b { color: red; }"
  }, {
    code: "a { color: pink;\r\ntop: 0; }b { color: red; }",
    description: "CRLF"
  }, {
    code: "a { color: pink;}"
  }, {
    code: "a { color: pink;  } b { color: red; }"
  }, {
    code: "a { color: pink;\t}b { color: red; }"
  }],

  reject: [{
    code: "a { color: pink;\ntop: 0;}",
    message: _.messages.expectedBeforeMultiLine(),
    line: 2,
    column: 7
  }, {
    code: "a { color: pink;\ntop: 0;  }",
    message: _.messages.expectedBeforeMultiLine(),
    line: 2,
    column: 9
  }, {
    code: "a { color: pink;\ntop: 0;\t}",
    message: _.messages.expectedBeforeMultiLine(),
    line: 2,
    column: 8
  }, {
    code: "a { color: pink; } b { color: red;\ntop: 0;}",
    message: _.messages.expectedBeforeMultiLine(),
    line: 2,
    column: 7
  }, {
    code: "a { color: pink;\ntop: 0;} b { color: red; }",
    message: _.messages.expectedBeforeMultiLine(),
    line: 2,
    column: 7
  }, {
    code: "a { color: pink;\r\ntop: 0;} b { color: red; }",
    description: "CRLF",
    message: _.messages.expectedBeforeMultiLine(),
    line: 2,
    column: 7
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never-multi-line"],

  accept: [{
    code: "a { color: pink;\ntop: 0;}"
  }, {
    code: "a { color: pink;\ntop: 0;} b { color: red;}"
  }, {
    code: "a { color: pink;\r\ntop: 0;} b { color: red;}",
    description: "CRLF"
  }, {
    code: "a { color: pink;\ntop: 0;}b { color: red;}"
  }, {
    code: "a { color: pink; }"
  }, {
    code: "a { color: pink;  } b { color: red; }"
  }, {
    code: "a { color: pink;\t}b { color: red; }"
  }],

  reject: [{
    code: "a { color: pink;\ntop: 0; }",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 8
  }, {
    code: "a { color: pink;\ntop: 0;  }",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 9
  }, {
    code: "a { color: pink;\ntop: 0;\t}",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 8
  }, {
    code: "a { color: pink;\r\ntop: 0;\t}",
    description: "CRLF",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 8
  }, {
    code: "a { color: pink; } b { color: red;\ntop: 0; }",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 8
  }, {
    code: "a { color: pink;\ntop: 0; } b { color: red; }",
    message: _.messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 8
  }]
});