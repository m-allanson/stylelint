"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,

  config: [["height", "width", {
    order: "flexible",
    properties: ["color", "font-size", "font-weight"]
  }]],

  accept: [{
    code: "a { height: 1px; width: 2px; color: pink; font-size: 2px; font-weight: bold; }"
  }, {
    code: "a { height: 1px; width: 2px; font-size: 2px; color: pink; font-weight: bold; }"
  }, {
    code: "a { height: 1px; width: 2px; font-size: 2px; font-weight: bold; color: pink; }"
  }, {
    code: "a { height: 1px; width: 2px; font-weight: bold; font-size: 2px; color: pink; }"
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
    code: "a { height: 1px; font-weight: bold; width: 2px; }",
    message: _.messages.expected("width", "font-weight"),
    line: 1,
    column: 37
  }, {
    code: "a { font-weight: bold; height: 1px; width: 2px; }",
    message: _.messages.expected("height", "font-weight"),
    line: 1,
    column: 24
  }, {
    code: "a { width: 2px; height: 1px; font-weight: bold; }",
    message: _.messages.expected("height", "width"),
    line: 1,
    column: 17
  }, {
    code: "a { height: 1px; color: pink; width: 2px; font-weight: bold; }",
    message: _.messages.expected("width", "color"),
    line: 1,
    column: 31
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,

  config: [["height", {
    order: "flexible",
    emptyLineBefore: "always",
    properties: ["color", "font-size", "font-weight"]
  }]],

  accept: [{
    code: "a {\n  height: 1px;\n\n  color: pink;\n  font-size: 2px;\n  font-weight: bold;\n}"
  }, {
    code: "a {\n  height: 1px;\n\n font-size: 2px;\n  color: pink;\n  font-weight: bold;\n}"
  }, {
    code: "a {\n  height: 1px;\n\n  font-size: 2px;\n  font-weight: bold;\n  color: pink;\n}"
  }, {
    code: "a {\n  height: 1px;\n\n  font-weight: bold;\n  font-size: 2px;\n  color: pink;\n}"
  }, {
    code: "a {\n  height: 1px;\n\n  /* something */\n  font-weight: bold;\n}",
    description: "comment before line break"
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
    code: "a {\n  background: orange;\n\n  font-weight: bold;\n}",
    description: "unspecified before grouped specified"
  }],

  reject: [{
    code: "a {\n  height: 1px;\n  color: pink;\n  font-size: 2px;\n  font-weight: bold;\n}",
    message: _.messages.expectedEmptyLineBetween("color", "height"),
    line: 3,
    column: 3
  }, {
    code: "a {\n  height: 1px;\n  font-size: 2px;\n  color: pink;\n  font-weight: bold;\n}",
    message: _.messages.expectedEmptyLineBetween("font-size", "height"),
    line: 3,
    column: 3
  }, {
    code: "a {\n  height: 1px;\n  font-weight: bold;\n  font-size: 2px;\n  color: pink;\n}",
    message: _.messages.expectedEmptyLineBetween("font-weight", "height"),
    line: 3,
    column: 3
  }, {
    code: "a {\n  height: 1px;\n  font-size: 2px;\n  color: pink;\n}",
    message: _.messages.expectedEmptyLineBetween("font-size", "height"),
    line: 3,
    column: 3
  }, {
    code: "a {\n  height: 1px;\n  width: 2px;\n  color: pink;\n}",
    message: _.messages.expectedEmptyLineBetween("color", "width"),
    line: 4,
    column: 3
  }, {
    code: "a {\n  height: 1px;\n  width: 2px;\n  border: 1px solid;\n  font-weight: pink;\n}",
    message: _.messages.expectedEmptyLineBetween("font-weight", "border"),
    line: 5,
    column: 3
  }, {
    code: "a {\n  height: 1px;\n  /* something */\n  font-weight: bold;\n}",
    message: _.messages.expectedEmptyLineBetween("font-weight", "height"),
    line: 4,
    column: 3
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,

  config: [["height", {
    order: "flexible",
    emptyLineBefore: "never",
    properties: ["color", "font-size", "font-weight"]
  }]],

  accept: [{
    code: "a {\n  height: 1px; color: pink;\n  font-size: 2px;\n  font-weight: bold;\n}"
  }, {
    code: "a {\n  height: 1px; font-size: 2px;\n  color: pink;\n  font-weight: bold;\n}"
  }, {
    code: "a {\n  height: 1px; font-size: 2px;\n  font-weight: bold;\n  color: pink;\n}"
  }, {
    code: "a {\n  height: 1px; font-weight: bold;\n  font-size: 2px;\n  color: pink;\n}"
  }, {
    code: "a {\n  height: 1px; /* something */\n  font-weight: bold;\n}",
    description: "comment before line break"
  }],

  reject: [{
    code: "a {\n  height: 1px;\n\n  color: pink;\n  font-size: 2px;\n  font-weight: bold;\n}",
    message: _.messages.rejectedEmptyLineBetween("color", "height"),
    line: 4,
    column: 3
  }, {
    code: "a {\n  height: 1px;\n\n  font-size: 2px;\n  color: pink;\n  font-weight: bold;\n}",
    message: _.messages.rejectedEmptyLineBetween("font-size", "height"),
    line: 4,
    column: 3
  }, {
    code: "a {\n  height: 1px;\n\n  font-weight: bold;\n  font-size: 2px;\n  color: pink;\n}",
    message: _.messages.rejectedEmptyLineBetween("font-weight", "height"),
    line: 4,
    column: 3
  }, {
    code: "a {\n  height: 1px;\n\n  font-size: 2px;\n  color: pink;\n}",
    message: _.messages.rejectedEmptyLineBetween("font-size", "height"),
    line: 4,
    column: 3
  }, {
    code: "a {\n  height: 1px;\n  width: 2px;\n\n  color: pink;\n}",
    message: _.messages.rejectedEmptyLineBetween("color", "width"),
    line: 5,
    column: 3
  }, {
    code: "a {\n  height: 1px;\n  width: 2px;\n  border: 1px solid;\n\n  font-weight: pink;\n}",
    message: _.messages.rejectedEmptyLineBetween("font-weight", "border"),
    line: 6,
    column: 3
  }, {
    code: "a {\n  height: 1px;\n\n  /* something */\n  font-weight: bold;\n}",
    message: _.messages.rejectedEmptyLineBetween("font-weight", "height"),
    line: 5,
    column: 3
  }]
});