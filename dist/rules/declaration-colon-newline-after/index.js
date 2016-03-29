"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (expectation) {
  var checker = (0, _utils.whitespaceChecker)("newline", expectation, messages);
  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, {
      actual: expectation,
      possible: ["always", "always-multi-line"]
    });
    if (!validOptions) {
      return;
    }

    root.walkDecls(function (decl) {

      if ((0, _utils.cssDeclarationIsMap)(decl)) {
        return;
      }

      // Get the raw prop, and only the prop
      var endOfPropIndex = (0, _utils.declarationValueIndexOffset)(decl) + decl.raw("between").length - 1;

      // The extra characters tacked onto the end ensure that there is a character to check
      // after the colon. Otherwise, with `background:pink` the character after the
      var propPlusColon = decl.toString().slice(0, endOfPropIndex) + "xxx";

      var _loop = function _loop(i, l) {
        if (propPlusColon[i] !== ":") {
          return "continue";
        }
        var indexToCheck = propPlusColon.substr(propPlusColon[i], 3) === "/*" ? propPlusColon.indexOf("*/", i) + 1 : i;

        checker.afterOneOnly({
          source: propPlusColon,
          index: indexToCheck,
          lineCheckStr: decl.value,
          err: function err(m) {
            (0, _utils.report)({
              message: m,
              node: decl,
              index: indexToCheck,
              result: result,
              ruleName: ruleName
            });
          }
        });
        return "break";
      };

      _loop2: for (var i = 0, l = propPlusColon.length; i < l; i++) {
        var _ret = _loop(i, l);

        switch (_ret) {
          case "continue":
            continue;

          case "break":
            break _loop2;}
      }
    });
  };
};

var _utils = require("../../utils");

var ruleName = exports.ruleName = "declaration-colon-newline-after";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedAfter: function expectedAfter() {
    return "Expected newline after \":\"";
  },
  rejectedAfter: function rejectedAfter() {
    return "Unexpected whitespace after \":\"";
  },
  expectedAfterMultiLine: function expectedAfterMultiLine() {
    return "Expected newline after \":\" with a multi-line value";
  }
});