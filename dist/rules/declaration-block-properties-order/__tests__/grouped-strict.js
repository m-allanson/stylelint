"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,

  config: [["height", "width", {
    order: "strict",
    properties: ["color", "font-size", "font-weight"]
  }]],

  accept: [{
    code: "a { height: 1px; width: 2px; color: pink; font-size: 2px; font-weight: bold; }"
  }, {
    code: "a { height: 10px; background: orange; }",
    description: "unspecified after groupless specified"
  }, {
    code: "a { font-weight: bold; background: orange; }",
    description: "unspecified after grouped specified"
  }, {
    code: "a { background: orange; height: 10px; }",
    description: "unspecified before groupless specified"
  }, {
    code: "a { background: orange; font-weight: bold; }",
    description: "unspecified before grouped specified"
  }],

  reject: [{
    code: "a { width: 2px; color: pink; font-size: 2px; font-weight: bold; height: 1px; }",
    message: _.messages.expected("height", "font-weight")
  }, {
    code: "a { height: 1px; color: pink; width: 2px; font-size: 2px; font-weight: bold; }",
    message: _.messages.expected("width", "color")
  }, {
    code: "a { height: 1px; width: 2px; font-size: 2px; color: pink; font-weight: bold; }",
    message: _.messages.expected("color", "font-size")
  }, {
    code: "a { height: 1px; width: 2px; font-size: 2px; font-weight: bold; color: pink; }",
    message: _.messages.expected("color", "font-weight")
  }, {
    code: "a { height: 1px; width: 2px; color: pink; font-weight: bold; font-size: 2px; }",
    message: _.messages.expected("font-size", "font-weight")
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,

  config: [[{
    emptyLineBefore: "always",
    properties: ["height", "width"]
  }, {
    emptyLineBefore: "always",
    properties: ["font-size", "font-weight"]
  }]],

  accept: [{
    code: "a {\r\n  height: 1px;\r\n  width: 2px;\r\n\r\n  font-size: 2px;\r\n  font-weight: bold;\r\n}"
  }, {
    code: "a {\r\n  height: 1px;\r\n\r\n  font-weight: bold;\r\n}"
  }, {
    code: "a {\r\n  height: 1px;\r\n  \r\n  font-weight: bold;\r\n}"
  }, {
    code: "a {\n height: 10px;\n background: orange;\n}",
    description: "unspecified after specified"
  }, {
    code: "a {\n color: blue;\n\n font-weight: bold;\n}",
    description: "unspecified before specified"
  }],

  reject: [{
    code: "a {\r\n  height: 1px;\r\n  width: 2px;\r\n  font-size: 2px;\r\n  font-weight: bold;\r\n}",
    message: _.messages.expectedEmptyLineBetween("font-size", "width"),
    line: 4,
    column: 3
  }, {
    code: "a {\r\n  height: 1px;\r\n  font-weight: bold;\r\n}",
    message: _.messages.expectedEmptyLineBetween("font-weight", "height"),
    line: 3,
    column: 3
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,

  config: [[{
    emptyLineBefore: "never",
    properties: ["height", "width"]
  }, {
    emptyLineBefore: "never",
    properties: ["font-size", "font-weight"]
  }]],

  accept: [{
    code: "a {\r\n  height: 1px;\r\n  width: 2px;\r\n  font-size: 2px;\r\n  font-weight: bold;\r\n}"
  }, {
    code: "a {\r\n  height: 1px;\r\n  font-weight: bold;\r\n}"
  }, {
    code: "a {\r\n  height: 1px;  \r\n  font-weight: bold;\r\n}"
  }],

  reject: [{
    code: "a {\r\n  height: 1px;\r\n  width: 2px;\r\n\r\n  font-size: 2px;\r\n  font-weight: bold;\r\n}",
    message: _.messages.rejectedEmptyLineBetween("font-size", "width"),
    line: 5,
    column: 3
  }, {
    code: "a {\r\n  height: 1px;\r\n\r\n  font-weight: bold;\r\n}",
    message: _.messages.rejectedEmptyLineBetween("font-weight", "height"),
    line: 4,
    column: 3
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,

  config: [[{
    emptyLineBefore: "always",
    properties: ["margin-top", "margin-right", "margin-bottom"]
  }, {
    emptyLineBefore: "always",
    properties: ["font-size"]
  }]],

  skipBasicChecks: true,

  accept: [{
    code: ".foo { margin-bottom: 20px;\n\nfont-size: 26px; }"
  }],

  reject: [{
    code: ".foo { margin-bottom: 20px; font-size: 26px; }",
    message: _.messages.expectedEmptyLineBetween("font-size", "margin-bottom")
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,

  config: [[{
    emptyLineBefore: "never",
    properties: ["margin-top", "margin-right", "margin-bottom"]
  }, {
    emptyLineBefore: "never",
    properties: ["font-size"]
  }]],

  skipBasicChecks: true,

  accept: [{
    code: ".foo { margin-bottom: 20px; font-size: 26px; }"
  }],

  reject: [{
    code: ".foo { margin-bottom: 20px;\n\n font-size: 26px; }",
    message: _.messages.rejectedEmptyLineBetween("font-size", "margin-bottom")
  }]
});