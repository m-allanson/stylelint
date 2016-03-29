"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always"],
  skipBasicChecks: true,

  accept: [{
    code: "@foo;\na {}"
  }, {
    code: "@import 'x.css';\na {}"
  }, {
    code: "@charset 'UTF-8';\na {}"
  }, {
    code: "@charset 'UTF-8';\n@import 'x.css'"
  }, {
    code: "@charset 'UTF-8';\n@import 'x.css'\na {}"
  }, {
    code: "@namespace url(XML-namespace-URL);\na {}"
  }, {
    code: "@import 'x.css'); /* comment */\n"
  }, {
    code: "@import 'x.css');/* comment */\n"
  }, {
    code: "@import 'x.css');   /* comment */\n"
  }, {
    code: "@import 'x.css');\t/* comment */\n"
  }, {
    code: "@import 'x.css'); \t/* comment */\n"
  }, {
    code: "@charset 'UTF-8';\n@media {}"
  }, {
    code: "@import 'x.css';\r\n",
    description: "windows"
  }, {
    code: "@import 'x.css'; /* comment */\r\n",
    description: "windows"
  }, {
    code: "@import 'x.css';",
    description: "single blockless rule"
  }, {
    code: "a{\n@extend .b;\n@extend .c\n}",
    description: "non-standard nested rule"
  }, {
    code: "@font-face {}; a{}",
    description: "ignore at-rule with block"
  }],

  reject: [{
    code: "@mixin foo; a {}",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 12
  }, {
    code: "@import url(\"x.css\"); @charset \"UTF-8\";",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 22
  }, {
    code: "@charset \"UTF-8\"; a {};",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 18
  }, {
    code: "@charset \"UTF-8\"; a {};",
    message: _.messages.expectedAfter(),
    line: 1,
    column: 18
  }, {
    code: "a{\n@extend .b; @extend .c\n}",
    message: _.messages.expectedAfter(),
    line: 2,
    column: 12
  }]
});