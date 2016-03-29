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
    code: "a { padding: 10px; }"
  }, {
    code: "a { padding: 10px; padding-left: 20px; }"
  }, {
    code: "@media (color) { padding: 10px; padding-left: 20px; }"
  }, {
    code: "a { @media (color) { padding: 10px; padding-left: 20px; }}"
  }, {
    code: "a { padding-left: 10px; { b { padding: 20px; }}}",
    description: "nested related properties"
  }, {
    code: "a { border-top-width: 1px; top: 0; bottom: 3px; border-bottom: 2px solid blue; }"
  }, {
    code: "a { transition-property: opacity; } a { transition: opacity 1s linear; }"
  }, {
    code: "a { transition-property: opacity; -webkit-transition: opacity 1s linear; }"
  }],

  reject: [{
    code: "a { padding-left: 10px; padding: 20px; }",
    message: _.messages.rejected("padding", "padding-left")
  }, {
    code: "a { padding-left: 10px; { b { padding-top: 10px; padding: 20px; }}}",
    description: "override within nested rule",
    message: _.messages.rejected("padding", "padding-top")
  }, {
    code: "a { border-top-width: 1px; top: 0; bottom: 3px; border: 2px solid blue; }",
    message: _.messages.rejected("border", "border-top-width")
  }, {
    code: "a { transition-property: opacity; transition: opacity 1s linear; }",
    message: _.messages.rejected("transition", "transition-property")
  }, {
    code: "a { background-repeat: no-repeat; background: url(lion.png); }",
    message: _.messages.rejected("background", "background-repeat")
  }, {
    code: "@media (color) { background-repeat: no-repeat; background: url(lion.png); }",
    message: _.messages.rejected("background", "background-repeat")
  }, {
    code: "a { @media (color) { background-repeat: no-repeat; background: url(lion.png); }}",
    message: _.messages.rejected("background", "background-repeat")
  }]
});