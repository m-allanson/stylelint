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
    code: "a + a {}",
    description: "space before and after + combinator"
  }, {
    code: "a > a {}",
    description: "space before and after > combinator"
  }, {
    code: "a ~ a {}",
    description: "space before and after ~ combinator"
  }, {
    code: ".foo ~ a + bar {}",
    description: "multiple spaced combinators"
  }, {
    code: "a +a {}",
    description: "space before and none after + combinator"
  }, {
    code: "a >a {}",
    description: "space before and none after > combinator"
  }, {
    code: "a ~a {}",
    description: "space before and none after ~ combinator"
  }, {
    code: "a +\na {}",
    description: "space before and newline after + combinator"
  }, {
    code: "a +\r\na {}",
    description: "space before and CRLF after + combinator"
  }, {
    code: "a >\na {}",
    description: "space before and newline after > combinator"
  }, {
    code: "a ~\na {}",
    description: "space before and newline after ~ combinator"
  }, {
    code: "a ~\r\na {}",
    description: "space before and CRLF after ~ combinator"
  }, {
    code: ".foo ~a +bar {}",
    description: "multiple combinators with space before and none after"
  }, {
    code: ".foo:nth-child(2n+1) {}",
    description: "unspaced + in nth-child argument"
  }, {
    code: ".foo:nth-child(2n-1) {}",
    description: "unspaced - in nth-child argument"
  }, {
    code: "a[rel~='copyright'] {}",
    description: "attribute selector with ~="
  }, {
    code: ".foo {\n\t> span,\n\t> b { color:pink; } }",
    description: "nested selectors starting with combinator"
  }],

  reject: [{
    code: "a  +a {}",
    description: "two spaces before + combinator",
    message: _.messages.expectedBefore("+"),
    line: 1,
    column: 4
  }, {
    code: "a\n+ a {}",
    description: "newline before + combinator",
    message: _.messages.expectedBefore("+"),
    line: 2,
    column: 1
  }, {
    code: "a\r\n+ a {}",
    description: "CRLF before + combinator",
    message: _.messages.expectedBefore("+"),
    line: 2,
    column: 1
  }, {
    code: "a+a {}",
    description: "no space before + combinator",
    message: _.messages.expectedBefore("+"),
    line: 1,
    column: 2
  }, {
    code: "a>a {}",
    description: "no space before > combinator",
    message: _.messages.expectedBefore(">"),
    line: 1,
    column: 2
  }, {
    code: "a~a {}",
    description: "no space before ~ combinator",
    message: _.messages.expectedBefore("~"),
    line: 1,
    column: 2
  }, {
    code: "a + .foo.bar~ a {}",
    description: "multiple combinators: no space before ~ combinator",
    message: _.messages.expectedBefore("~"),
    line: 1,
    column: 13
  }, {
    code: "#foo+ .foo.bar ~ a {}",
    description: "multiple combinators: no space before + combinator",
    message: _.messages.expectedBefore("+"),
    line: 1,
    column: 5
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never"],

  accept: [{
    code: "a+ a {}",
    description: "no space before one after + combinator"
  }, {
    code: "a> a {}",
    description: "no space before one after > combinator"
  }, {
    code: "a~ a {}",
    description: "no space before one after ~ combinator"
  }, {
    code: "a+a {}",
    description: "no space before or after + combinator"
  }, {
    code: "a>a {}",
    description: "no space before or after > combinator"
  }, {
    code: "a~a {}",
    description: "no space before or after ~ combinator"
  }, {
    code: "a+\na {}",
    description: "no space before and newline after + combinator"
  }, {
    code: "a>\na {}",
    description: "no space before and newline after > combinator"
  }, {
    code: "a>\r\na {}",
    description: "no space before and CRLF after > combinator"
  }, {
    code: "a~\na {}",
    description: "no space before and newline after ~ combinator"
  }, {
    code: ".foo~ a+ bar {}",
    description: "multiple combinators with no space before"
  }, {
    code: ".foo:nth-child(2n + 1) {}",
    description: "spaced + in nth-child argument"
  }, {
    code: ".foo:nth-child(2n - 1) {}",
    description: "spaced - in nth-child argument"
  }, {
    code: "a[rel~='copyright'] {}",
    description: "attribute selector with ~="
  }],

  reject: [{
    code: "a +a {}",
    description: "space before + combinator",
    message: _.messages.rejectedBefore("+"),
    line: 1,
    column: 3
  }, {
    code: "a >a {}",
    description: "space before > combinator",
    message: _.messages.rejectedBefore(">"),
    line: 1,
    column: 3
  }, {
    code: "a ~a {}",
    description: "space before ~ combinator",
    message: _.messages.rejectedBefore("~"),
    line: 1,
    column: 3
  }, {
    code: "a\n+a {}",
    description: "newline before + combinator",
    message: _.messages.rejectedBefore("+"),
    line: 2,
    column: 1
  }, {
    code: "a\n>a {}",
    description: "newline before > combinator",
    message: _.messages.rejectedBefore(">"),
    line: 2,
    column: 1
  }, {
    code: "a\n~a {}",
    description: "newline before ~ combinator",
    message: _.messages.rejectedBefore("~"),
    line: 2,
    column: 1
  }, {
    code: "a\r\n~a {}",
    description: "CRLF before ~ combinator",
    message: _.messages.rejectedBefore("~"),
    line: 2,
    column: 1
  }, {
    code: "a + .foo.bar~ a {}",
    description: "multiple combinators: space before + combinator",
    message: _.messages.rejectedBefore("+"),
    line: 1,
    column: 3
  }, {
    code: "#foo+ .foo.bar ~ a {}",
    description: "multiple combinators: no space before ~ combinator",
    message: _.messages.rejectedBefore("~"),
    line: 1,
    column: 16
  }]
});