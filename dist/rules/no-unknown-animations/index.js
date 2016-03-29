"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (actual) {
  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, { actual: actual });
    if (!validOptions) {
      return;
    }

    var declaredAnimations = new Set();
    root.walkAtRules("keyframes", function (atRule) {
      declaredAnimations.add(atRule.params);
    });

    root.walkDecls(function (decl) {
      if (decl.prop === "animation-name" && !animationNameKeywords.has(decl.value)) {
        checkAnimationName(decl.value, decl);
      }

      if (decl.prop === "animation") {
        var valueList = _postcss2.default.list.space(decl.value);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = valueList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var value = _step.value;

            // Ignore numbers with units
            if (_postcssValueParser2.default.unit(value)) {
              continue;
            }
            // Ignore keywords for other animation parts
            if (animationShorthandKeywords.has(value)) {
              continue;
            }
            // Ignore variables
            if ((0, _utils.cssWordIsVariable)(value)) {
              continue;
            }
            // Ignore functions
            if (value.indexOf("(") !== -1) {
              continue;
            }
            checkAnimationName(value, decl, decl.value.indexOf(value));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    });

    function checkAnimationName(animationName, decl) {
      var offset = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

      if (!declaredAnimations.has(animationName)) {
        (0, _utils.report)({
          result: result,
          ruleName: ruleName,
          message: messages.rejected(animationName),
          node: decl,
          index: (0, _utils.declarationValueIndexOffset)(decl) + offset
        });
      }
    }
  };
};

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require("postcss-value-parser");

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleName = exports.ruleName = "no-unknown-animations";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  rejected: function rejected(animationName) {
    return "Unknown animation name \"" + animationName + "\"";
  }
});

// cf. https://developer.mozilla.org/en-US/docs/Web/CSS/animation
var animationShorthandKeywords = new Set(["infinite", "normal", "reverse", "alternate", "alternate-reverse", "none", "initial", "inherit", "unset", "forwards", "backwards", "both", "running", "paused", "linear", "ease-in", "ease-out", "ease-in-out", "step-start", "step-end"]);

var animationNameKeywords = new Set(["none", "initial", "inherit", "unset"]);