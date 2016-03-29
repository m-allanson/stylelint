"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [undefined],
  skipBasicChecks: true,

  accept: [{
    code: ""
  }, {
    code: "@import \"foo.css\";"
  }, {
    code: "a {\ncolor: pink; }",
    description: "multi-line declaration block with newline at start"
  }, {
    code: "a {\r\ncolor: pink; }",
    description: "multi-line declaration block with CRLF at start"
  }, {
    code: "a { color: pink;\n}",
    description: "multi-line declaration block with newline at end"
  }, {
    code: "a { color: pink;\r\n}",
    description: "multi-line declaration block with CRLF at end"
  }, {
    code: "a { color: pink;\nbackground: orange; }",
    description: "multi-line declaration block with newline in middle"
  }, {
    code: "a { color: pink;\r\nbackground: orange; }",
    description: "multi-line declaration block with CRLF in middle"
  }, {
    code: "@media (color) {\na { color: pink;\r\nbackground: orange; }\n}",
    description: "multi-line blocks"
  }, {
    code: "a {\n@media (color) { color: pink;\r\nbackground: orange; }\n}",
    description: "multi-line blocks with the at-rule nested"
  }],

  reject: [{
    code: "a { color: pink; }",
    message: _.messages.rejected,
    line: 1,
    column: 3
  }, {
    code: "a { color: pink; top: 1px; }",
    description: "single-line rule with two declarations",
    message: _.messages.rejected,
    line: 1,
    column: 3
  }, {
    code: "a,\nb { color: pink; }",
    description: "multi-line rule with single-line declaration block",
    message: _.messages.rejected,
    line: 2,
    column: 3
  }, {
    code: "@media print {\na { color: pink; }}",
    description: "single-line rule within multi-line at-rule",
    message: _.messages.rejected,
    line: 2,
    column: 3
  }, {
    code: "@media print {\r\na { color: pink; }}",
    description: "single-line rule within multi-line at-rule and CRLF",
    message: _.messages.rejected,
    line: 2,
    column: 3
  }, {
    code: "a {\r\n@media print { color: pink; }}",
    description: "single-line at-rule within multi-line rule and CRLF",
    message: _.messages.rejected,
    line: 2,
    column: 14
  }, {
    code: "@rule { a:b }",
    description: "single-line @rule",
    message: _.messages.rejected,
    line: 1,
    column: 7
  }]
});