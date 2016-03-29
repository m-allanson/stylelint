"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["double"],

  accept: [{
    code: "@import url(\"foo.css\");",

    description: {
      message: _.messages.expected("double quotes"),
      line: 1,
      column: 14
    }
  }, {
    code: "@document url(\"http://www.w3.org/\");"
  }, {
    code: "@document url-prefix(\"http://www.w3.org/\");"
  }, {
    code: "@document domain(\"http://www.w3.org/\");"
  }, {
    code: "@font-face { font-family: 'foo'; src: url(\"foo.ttf\"); }"
  }, {
    code: "a { background: url(\"foo.css\"); }"
  }, {
    code: "a { cursor: url(\"foo.png\"); }"
  }, {
    code: "a { background-image: url(\"foo.css\"), url(\"bar.css\"), url(\"baz.css\"); }"
  }],

  reject: [{
    code: "@import url('foo.css');",
    message: _.messages.expected("double quotes"),
    line: 1,
    column: 13
  }, {
    code: "@import url(foo.css);",
    message: _.messages.expected("double quotes"),
    line: 1,
    column: 13
  }, {
    code: "@document url('http://www.w3.org/');",
    message: _.messages.expected("double quotes"),
    line: 1,
    column: 15
  }, {
    code: "@document url-prefix(http://www.w3.org/Style);",
    message: _.messages.expected("double quotes", "url-prefix"),
    line: 1,
    column: 22
  }, {
    code: "@document domain('mozilla.org');",
    message: _.messages.expected("double quotes", "domain"),
    line: 1,
    column: 18
  }, {
    code: "@font-face { font-family: 'foo'; src: url(foo.ttf); }",
    message: _.messages.expected("double quotes"),
    line: 1,
    column: 43
  }, {
    code: "a { background: url('foo.css'); }",
    message: _.messages.expected("double quotes"),
    line: 1,
    column: 21
  }, {
    code: "a { cursor: url(foo.png); }",
    message: _.messages.expected("double quotes"),
    line: 1,
    column: 17
  }, {
    code: "a { background-image: url(foo.css), url(\"bar.css\"), url(\"baz.css\"); }",
    message: _.messages.expected("double quotes"),
    line: 1,
    column: 27
  }, {
    code: "a { background-image: url(\"foo.css\"), url(bar.css), url(\"baz.css\"); }",
    message: _.messages.expected("double quotes"),
    line: 1,
    column: 43
  }, {
    code: "a { background-image: url(\"foo.css\"), url(\"bar.css\"), url(baz.css); }",
    message: _.messages.expected("double quotes"),
    line: 1,
    column: 59
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["single"],

  accept: [{
    code: "@import url('foo.css');"
  }, {
    code: "@document url('http://www.w3.org/');"
  }, {
    code: "@document url-prefix('http://www.w3.org/');"
  }, {
    code: "@document domain('http://www.w3.org/');"
  }, {
    code: "@font-face { font-family: 'foo'; src: url('foo.ttf'); }"
  }, {
    code: "a { background: url('foo.css'); }"
  }, {
    code: "a { cursor: url('foo.png'); }"
  }, {
    code: "a { background-image: url('foo.css'), url('bar.css'), url('baz.css'); }"
  }],

  reject: [{
    code: "@import url(\"foo.css\");",
    message: _.messages.expected("single quotes"),
    line: 1,
    column: 13
  }, {
    code: "@import url(foo.css);",
    message: _.messages.expected("single quotes"),
    line: 1,
    column: 13
  }, {
    code: "@document url(\"http://www.w3.org/\");",
    message: _.messages.expected("single quotes"),
    line: 1,
    column: 15
  }, {
    code: "@document url-prefix(http://www.w3.org/Style);",
    message: _.messages.expected("single quotes", "url-prefix"),
    line: 1,
    column: 22
  }, {
    code: "@document domain(\"mozilla.org\");",
    message: _.messages.expected("single quotes", "domain"),
    line: 1,
    column: 18
  }, {
    code: "@font-face { font-family: 'foo'; src: url(foo.ttf); }",
    message: _.messages.expected("single quotes"),
    line: 1,
    column: 43
  }, {
    code: "a { background: url(\"foo.css\"); }",
    message: _.messages.expected("single quotes"),
    line: 1,
    column: 21
  }, {
    code: "a { cursor: url(foo.png); }",
    message: _.messages.expected("single quotes"),
    line: 1,
    column: 17
  }, {
    code: "a { background-image: url(foo.css), url('bar.css'), url('baz.css'); }",
    message: _.messages.expected("single quotes"),
    line: 1,
    column: 27
  }, {
    code: "a { background-image: url('foo.css'), url(bar.css), url('baz.css'); }",
    message: _.messages.expected("single quotes"),
    line: 1,
    column: 43
  }, {
    code: "a { background-image: url('foo.css'), url('bar.css'), url(baz.css); }",
    message: _.messages.expected("single quotes"),
    line: 1,
    column: 59
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["none"],

  accept: [{
    code: "@import url(foo.css);"
  }, {
    code: "@document url(http://www.w3.org/);"
  }, {
    code: "@document url-prefix(http://www.w3.org/);"
  }, {
    code: "@document domain(http://www.w3.org/);"
  }, {
    code: "@font-face { font-family: foo; src: url(foo.ttf); }"
  }, {
    code: "a { background: url(foo.css); }"
  }, {
    code: "a { cursor: url(foo.png); }"
  }, {
    code: "a { background-image: url(foo.css), url(bar.css), url(baz.css); }"
  }],

  reject: [{
    code: "@import url(\"foo.css\");",
    message: _.messages.expected("no quotes"),
    line: 1,
    column: 13
  }, {
    code: "@import url('foo.css');",
    message: _.messages.expected("no quotes"),
    line: 1,
    column: 13
  }, {
    code: "@document url(\"http://www.w3.org/\");",
    message: _.messages.expected("no quotes"),
    line: 1,
    column: 15
  }, {
    code: "@document url-prefix('http://www.w3.org/Style');",
    message: _.messages.expected("no quotes", "url-prefix"),
    line: 1,
    column: 22
  }, {
    code: "@document domain(\"mozilla.org\");",
    message: _.messages.expected("no quotes", "domain"),
    line: 1,
    column: 18
  }, {
    code: "@font-face { font-family: foo; src: url('foo.ttf'); }",
    message: _.messages.expected("no quotes"),
    line: 1,
    column: 41
  }, {
    code: "a { background: url(\"foo.css\"); }",
    message: _.messages.expected("no quotes"),
    line: 1,
    column: 21
  }, {
    code: "a { cursor: url(\"foo.png\"); }",
    message: _.messages.expected("no quotes"),
    line: 1,
    column: 17
  }, {
    code: "a { background-image: url('foo.css'), url(bar.css), url(baz.css); }",
    message: _.messages.expected("no quotes"),
    line: 1,
    column: 27
  }, {
    code: "a { background-image: url(foo.css), url('bar.css'), url(baz.css); }",
    message: _.messages.expected("no quotes"),
    line: 1,
    column: 41
  }, {
    code: "a { background-image: url(foo.css), url(bar.css), url('baz.css'); }",
    message: _.messages.expected("no quotes"),
    line: 1,
    column: 55
  }]
});