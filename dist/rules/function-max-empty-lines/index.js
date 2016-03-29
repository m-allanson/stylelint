"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (max) {
  var maxAdjacentNewlines = max + 1;

  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, {
      actual: max,
      possible: _lodash.isNumber
    });
    if (!validOptions) {
      return;
    }

    root.walkDecls(function (decl) {
      if (decl.value.indexOf("(") === -1) {
        return;
      }

      var declString = decl.toString();
      var repeatLFNewLines = (0, _lodash.repeat)("\n", maxAdjacentNewlines);
      var repeatCRLFNewLines = (0, _lodash.repeat)("\r\n", maxAdjacentNewlines);

      (0, _utils.styleSearch)({ source: declString, target: "\n", withinFunctionalNotation: true }, function (match) {
        if (declString.substr(match.startIndex + 1, maxAdjacentNewlines) === repeatLFNewLines || declString.substr(match.startIndex + 1, maxAdjacentNewlines * 2) === repeatCRLFNewLines) {
          (0, _utils.report)({
            message: messages.rejected,
            node: decl,
            index: match.startIndex,
            result: result,
            ruleName: ruleName
          });
        }
      });
    });
  };
};

var _lodash = require("lodash");

var _utils = require("../../utils");

var ruleName = exports.ruleName = "function-max-empty-lines";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  rejected: "Unexpected empty line within function"
});