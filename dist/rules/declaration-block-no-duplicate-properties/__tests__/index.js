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
    code: "a { color: pink; }"
  }, {
    code: "a { color: pink; background: orange; }"
  }, {
    code: "a { color: pink; { &:hover { color: orange; } } }",
    description: "spec nested"
  }, {
    code: "a { color: pink; @media { color: orange; } }",
    description: "nested"
  }, {
    code: "a { color: pink; @media { color: orange; &::before { color: black; } } }",
    description: "double nested"
  }, {
    code: "a { $scss: 0; $scss: $scss + 1; }"
  }, {
    code: "a { @less: 0; @less: @less + 1; }"
  }, {
    code: "a { --custom-property: 0; --custom-property: 1; }"
  }, {
    code: "@fontface { src: url(font.eof); src: url(font.woff) }"
  }],

  reject: [{
    code: "a { color: pink; color: orange }",
    message: _.messages.rejected("color")
  }, {
    code: "a { color: pink; background: orange; color: orange }",
    message: _.messages.rejected("color")
  }, {
    code: "a { color: pink; background: orange; background: pink; }",
    message: _.messages.rejected("background")
  }, {
    code: "a { color: pink; { &:hover { color: orange; color: black; } } }",
    description: "spec nested",
    message: _.messages.rejected("color")
  }, {
    code: "a { color: pink; @media { color: orange; color: black; } }",
    description: "nested",
    message: _.messages.rejected("color")
  }, {
    code: "@media { color: orange; .foo { color: black; color: white; } }",
    description: "nested",
    message: _.messages.rejected("color")
  }, {
    code: "a { color: pink; @media { color: orange; &::before { color: black; color: white; } } }",
    description: "double nested",
    message: _.messages.rejected("color")
  }, {
    code: "a { color: pink; @media { color: orange; .foo { color: black; color: white; } } }",
    description: "double nested again",
    message: _.messages.rejected("color")
  }]
});