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
      possible: ["always", "never", "always-single-line"]
    });
    if (!validOptions) {
      return;
    }

    declarationColonSpaceChecker({
      root: root,
      result: result,
      locationChecker: checker.after,
      checkedRuleName: ruleName
    });
  };
};

exports.declarationColonSpaceChecker = declarationColonSpaceChecker;

var _utils = require("../../utils");

var ruleName = exports.ruleName = "declaration-colon-space-after";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedAfter: function expectedAfter() {
    return "Expected single space after \":\"";
  },
  rejectedAfter: function rejectedAfter() {
    return "Unexpected whitespace after \":\"";
  },
  expectedAfterSingleLine: function expectedAfterSingleLine() {
    return "Expected single space after \":\" with a single-line value";
  }
});

function declarationColonSpaceChecker(_ref) {
  var locationChecker = _ref.locationChecker;
  var root = _ref.root;
  var result = _ref.result;
  var checkedRuleName = _ref.checkedRuleName;

  root.walkDecls(function (decl) {

    if ((0, _utils.cssDeclarationIsMap)(decl)) {
      return;
    }

    // Get the raw prop, and only the prop
    var endOfPropIndex = (0, _utils.declarationValueIndexOffset)(decl) + decl.raw("between").length - 1;

    // The extra characters tacked onto the end ensure that there is a character to check
    // after the colon. Otherwise, with `background:pink` the character after the
    var propPlusColon = decl.toString().slice(0, endOfPropIndex) + "xxx";

    for (var i = 0, l = propPlusColon.length; i < l; i++) {
      if (propPlusColon[i] !== ":") {
        continue;
      }
      locationChecker({
        source: propPlusColon,
        index: i,
        lineCheckStr: decl.value,
        err: function err(m) {
          (0, _utils.report)({
            message: m,
            node: decl,
            index: decl.prop.toString().length + 1,
            result: result,
            ruleName: checkedRuleName
          });
        }
      });
      break;
    }
  });
}