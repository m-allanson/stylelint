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
      possible: ["always", "never", "always-single-line", "never-single-line"]
    });
    if (!validOptions) {
      return;
    }

    functionCommaSpaceChecker({
      root: root,
      result: result,
      locationChecker: checker.after,
      checkedRuleName: ruleName
    });
  };
};

exports.functionCommaSpaceChecker = functionCommaSpaceChecker;

var _postcssValueParser = require("postcss-value-parser");

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleName = exports.ruleName = "function-comma-space-after";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expectedAfter: function expectedAfter() {
    return "Expected single space after \",\"";
  },
  rejectedAfter: function rejectedAfter() {
    return "Unexpected whitespace after \",\"";
  },
  expectedAfterSingleLine: function expectedAfterSingleLine() {
    return "Expected single space after \",\" in a single-line function";
  },
  rejectedAfterSingleLine: function rejectedAfterSingleLine() {
    return "Unexpected whitespace after \",\" in a single-line function";
  }
});

function functionCommaSpaceChecker(_ref) {
  var locationChecker = _ref.locationChecker;
  var root = _ref.root;
  var result = _ref.result;
  var checkedRuleName = _ref.checkedRuleName;

  root.walkDecls(function (decl) {
    if ((0, _utils.cssDeclarationIsMap)(decl)) {
      return;
    }

    (0, _postcssValueParser2.default)(decl.value).walk(function (valueNode) {
      if (valueNode.type !== "function") {
        return;
      }

      // Ignore `url()` arguments, which may contain data URIs or other funky stuff
      if (valueNode.value === "url") {
        return;
      }

      var functionArguments = function () {
        var result = _postcssValueParser2.default.stringify(valueNode);
        // Remove function name and opening paren
        result = result.slice(valueNode.value.length + 1);
        // Remove closing paren
        result = result.slice(0, result.length - 1);
        return result;
      }();

      (0, _utils.styleSearch)({
        source: functionArguments,
        target: ",",
        outsideFunctionalNotation: true
      }, function (match) {
        locationChecker({
          source: functionArguments,
          index: match.startIndex,
          err: function err(message) {
            var index = (0, _utils.declarationValueIndexOffset)(decl) + valueNode.value.length + 1 + valueNode.sourceIndex + match.startIndex;
            (0, _utils.report)({
              index: index,
              message: message,
              node: decl,
              result: result,
              ruleName: checkedRuleName
            });
          }
        });
      });
    });
  });
}