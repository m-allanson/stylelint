"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (expectation) {
  var checker = (0, _utils.whitespaceChecker)("space", expectation, messages);
  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, {
      actual: expectation,
      possible: ["always", "never"]
    });
    if (!validOptions) {
      return;
    }

    declarationBangSpaceChecker({
      root: root,
      result: result,
      locationChecker: checker.after,
      checkedRuleName: ruleName
    });
  };
};

exports.declarationBangSpaceChecker = declarationBangSpaceChecker;

var _utils = require("../../utils");

var ruleName = exports.ruleName = "declaration-bang-space-after";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedAfter: function expectedAfter() {
    return "Expected single space after \"!\"";
  },
  rejectedAfter: function rejectedAfter() {
    return "Unexpected whitespace after \"!\"";
  }
});

function declarationBangSpaceChecker(_ref) {
  var locationChecker = _ref.locationChecker;
  var root = _ref.root;
  var result = _ref.result;
  var checkedRuleName = _ref.checkedRuleName;

  root.walkDecls(function (decl) {
    var indexOffset = (0, _utils.declarationValueIndexOffset)(decl);
    var declString = decl.toString();
    var valueString = decl.toString().slice(indexOffset);
    if (valueString.indexOf("!") == -1) {
      return;
    }

    (0, _utils.styleSearch)({ source: valueString, target: "!" }, function (match) {
      check(declString, match.startIndex + indexOffset, decl);
    });
  });

  function check(source, index, node) {
    locationChecker({ source: source, index: index, err: function err(m) {
        return (0, _utils.report)({
          message: m,
          node: node,
          index: index,
          result: result,
          ruleName: checkedRuleName
        });
      }
    });
  }
}