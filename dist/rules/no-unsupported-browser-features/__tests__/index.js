"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [true]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [true, { browsers: "last 2 versions" }],

  accept: [{
    code: "a { opacity: 1; }"
  }, {
    code: "a { outline: none; }"
  }, {
    code: "a { background: linear-gradient(black, white); }"
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [true, { browsers: "ie >= 7, safari >= 6" }],

  reject: [{
    code: "a { opacity: 1; }",
    description: "opacity",
    message: _.messages.rejected("CSS3 Opacity not supported by: IE (7,8)"),
    line: 1,
    column: 5
  }, {
    code: "a { outline: none; }",
    description: "outline",
    message: _.messages.rejected("CSS outline not supported by: IE (7)"),
    line: 1,
    column: 5
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [true, { browsers: "ie >= 7, safari >= 6", ignore: "outline" }],

  accept: [{
    code: "a { outline: none; }"
  }],

  reject: [{
    code: "a { opacity: 1; }",
    description: "opacity",
    message: _.messages.rejected("CSS3 Opacity not supported by: IE (7,8)"),
    line: 1,
    column: 5
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [true, { browsers: "ie >= 9" }],

  accept: [{
    code: "a { opacity: 1; }"
  }, {
    code: "a { outline: none; }"
  }],

  reject: [{
    code: "a { background: linear-gradient(black, white); }",
    description: "gradient",
    message: _.messages.rejected("CSS Gradients not supported by: IE (9)"),
    line: 1,
    column: 5
  }]
});