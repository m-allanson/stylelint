"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _testUtils = require("../../../testUtils");

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sharedAlwaysTests = {
  accept: [{
    code: "a {} b {}",
    description: "rule ignored"
  }, {
    code: "@font-face {}",
    description: "first node ignored"
  }, {
    code: "a {}\n\n@media {}"
  }, {
    code: "@keyframes foo {}\n\n@media {}"
  }, {
    code: "a {}\r\n\r\n@media {}",
    description: "windows"
  }, {
    code: "a {}\n\r\n@media {}",
    description: "mixed"
  }],

  reject: [{
    code: "a {} @media {}",
    message: _.messages.expected
  }, {
    code: "@keyframes foo {} @media {}",
    message: _.messages.expected
  }, {
    code: "a {}\n@media {}",
    message: _.messages.expected
  }, {
    code: "a {}\r\n@media {}",
    message: _.messages.expected
  }, {
    code: "a {}\n\n/* comment */\n@media {}",
    message: _.messages.expected
  }, {
    code: "a {}\r\n\r\n/* comment */\r\n@media {}",
    message: _.messages.expected
  }]
};

var sharedNeverTests = {
  accept: [{
    code: "a {}\n\nb {}",
    description: "rule ignored"
  }, {
    code: "\n\n@font-face {}",
    description: "first node ignored"
  }, {
    code: "a {}\n@media {}"
  }, {
    code: "a {} @media {}"
  }, {
    code: "@keyframes foo {}\n@media {}"
  }, {
    code: "@keyframes foo {} @media {}"
  }],

  reject: [{
    code: "a {}\n\n@media {}",
    message: _.messages.rejected
  }, {
    code: "@keyframes foo {}\n/* comment */\n\n@media {}",
    message: _.messages.rejected
  }]
};

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(sharedAlwaysTests, {
  ruleName: _.ruleName,
  config: ["always"],

  accept: [{
    code: "a {\n\n  @mixin foo;\n}"
  }]
}));

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(sharedAlwaysTests, {
  ruleName: _.ruleName,
  config: ["always", { except: ["blockless-group"] }],

  accept: [{
    code: "a {\n\n  @mixin foo;\n}"
  }, {
    code: "@keyframes foo {}\n\n@import 'x.css'",
    description: "empty line not blockless pair"
  }, {
    code: "@import 'x.css';\n@import 'y.css'",
    description: "no empty line blockless pair"
  }, {
    code: "@import 'x.css';",
    description: "single blockless rule"
  }],

  reject: [{
    code: "@keyframes foo {}\n@import 'x.css'",
    message: _.messages.expected
  }, {
    code: "@import 'x.css';\n\n@import 'y.css'",
    message: _.messages.rejected
  }]
}));

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["always", { ignore: ["after-comment"] }],

  accept: [{
    code: "/* foo */\n@media {}"
  }, {
    code: "/* foo */\n\n@media{}"
  }, {
    code: "/* foo */\r\n\r\n@media {}",
    description: "CRLF"
  }],

  reject: [{
    code: "a {} @media {}",
    message: _.messages.expected
  }]
});

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(sharedAlwaysTests, {
  ruleName: _.ruleName,
  config: ["always", { except: ["all-nested"] }],

  accept: [{
    code: "a {\n  @mixin foo;\n  color: pink;\n}"
  }, {
    code: "a {\n  color: pink;\n  @mixin foo;\n}"
  }],

  reject: [{
    code: "a {\n\n  @mixin foo;\n  color: pink;\n}",
    message: _.messages.rejected
  }, {
    code: "a {\n\n  color: pink;\n\n  @mixin foo;\n}",
    message: _.messages.rejected
  }]
}));

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(sharedAlwaysTests, {
  ruleName: _.ruleName,
  config: ["always", { except: ["first-nested"] }],

  accept: [{
    code: "a {\n  @mixin foo;\n  color: pink;\n}"
  }],

  reject: [{
    code: "a {\n  color: pink;\n  @mixin foo;\n}",
    message: _.messages.expected
  }, {
    code: "a {\n\n  @mixin foo;\n  color: pink;\n}",
    message: _.messages.rejected
  }]
}));

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(sharedAlwaysTests, {
  ruleName: _.ruleName,
  config: ["always", { ignore: ["all-nested"] }],

  accept: [{
    code: "a {\n  @mixin foo;\n  color: pink;\n}"
  }, {
    code: "a {\n  color: pink;\n  @mixin foo;\n}"
  }, {
    code: "a {\n\n  @mixin foo;\n  color: pink;\n}"
  }, {
    code: "a {\n\n  color: pink;\n\n  @mixin foo;\n}"
  }]
}));

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(sharedAlwaysTests, {
  ruleName: _.ruleName,
  config: ["always", { except: ["blockless-group", "all-nested"] }],

  accept: [{
    code: "a {\n  @mixin foo;\n  color: pink;\n}"
  }, {
    code: "a {\n  color: pink;\n  @mixin foo;\n}"
  }, {
    code: "@keyframes foo {}\n\n@import 'x.css'",
    description: "empty line not blockless pair"
  }, {
    code: "@import 'x.css';\n@import 'y.css'",
    description: "no empty line blockless pair"
  }, {
    code: "@import 'x.css';",
    description: "single blockless rule"
  }, {
    code: "a {\n  @mixin foo;\n  @mixin bar;\n}"
  }],

  reject: [{
    code: "@keyframes foo {}\n@import 'x.css'",
    message: _.messages.expected
  }, {
    code: "@import 'x.css';\n\n@import 'y.css'",
    message: _.messages.rejected
  }, {
    code: "a {\n\n  @mixin foo;\n  color: pink;\n}",
    message: _.messages.rejected
  }, {
    code: "a {\n\n  color: pink;\n\n  @mixin foo;\n}",
    message: _.messages.rejected
  }]
}));

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(sharedNeverTests, {
  ruleName: _.ruleName,
  config: ["never"],

  accept: [{
    code: "a {\n  @mixin foo;\n}"
  }]
}));

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(sharedNeverTests, {
  ruleName: _.ruleName,
  config: ["never", { except: ["blockless-group"] }],

  accept: [{
    code: "a {\n  @mixin foo;\n}"
  }, {
    code: "@keyframes foo {}\n@import 'x.css'",
    description: "no empty line not blockless pair"
  }, {
    code: "@import 'x.css';\n\n@import 'y.css'",
    description: "empty line blockless pair"
  }, {
    code: "@import 'x.css';",
    description: "single blockless rule"
  }],

  reject: [{
    code: "@keyframes foo {}\n\n@import 'x.css'",
    message: _.messages.rejected
  }, {
    code: "@import 'x.css';\n@import 'y.css'",
    message: _.messages.expected
  }]
}));

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(sharedNeverTests, {
  ruleName: _.ruleName,
  config: ["never", { except: ["all-nested"] }],

  accept: [{
    code: "a {\n\n  @mixin foo;\n  color: pink;\n}"
  }, {
    code: "a {\n  color: pink;\n\n  @mixin foo;\n}"
  }],

  reject: [{
    code: "a {\n  @mixin foo;\n  color: pink;\n}",
    message: _.messages.expected
  }, {
    code: "a {\n\n  color: pink;\n  @mixin foo;\n}",
    message: _.messages.expected
  }]
}));

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(sharedNeverTests, {
  ruleName: _.ruleName,
  config: ["never", { except: ["first-nested"] }],

  accept: [{
    code: "a {\n\n  @mixin foo;\n  color: pink;\n}"
  }],

  reject: [{
    code: "a {\n  color: pink;\n\n  @mixin foo;\n}",
    message: _.messages.rejected
  }, {
    code: "a {\n  @mixin foo;\n  color: pink;\n}",
    message: _.messages.expected
  }]
}));

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["never", { ignore: ["after-comment"] }],

  accept: [{
    code: "/* foo */\n@media {}"
  }, {
    code: "/* foo */\r\na@media {}",
    description: "CRLF"
  }, {
    code: "/* foo */\n\n@media {}"
  }],

  reject: [{
    code: "b {}\n\n@media {}",
    message: _.messages.rejected
  }, {
    code: "b {}\r\n\r\n@media {}",
    description: "CRLF",
    message: _.messages.rejected
  }]
});

(0, _testRule2.default)(_2.default, (0, _testUtils.mergeTestDescriptions)(sharedNeverTests, {
  ruleName: _.ruleName,
  config: ["never", { ignore: ["all-nested"] }],

  accept: [{
    code: "a {\n  @mixin foo;\n  color: pink;\n}"
  }, {
    code: "a {\n  color: pink;\n  @mixin foo;\n}"
  }, {
    code: "a {\n\n  @mixin foo;\n  color: pink;\n}"
  }, {
    code: "a {\n\n  color: pink;\n\n  @mixin foo;\n}"
  }]
}));