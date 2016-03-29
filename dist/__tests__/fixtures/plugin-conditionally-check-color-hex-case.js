"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require("../../");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleName = "conditionally-check-color-hex-case";

exports.default = _2.default.createPlugin(ruleName, function (expectation) {
  var colorHexCaseRule = _2.default.rules["color-hex-case"](expectation);
  return function (root, result) {
    if (root.toString().indexOf("@@check-color-hex-case") === -1) return;
    colorHexCaseRule(root, result);
  };
});