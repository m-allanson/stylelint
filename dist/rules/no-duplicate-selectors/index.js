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

    // The top level of this map will be rule sources.
    // Each source maps to another map, which maps rule parents to a set of selectors.
    // This ensures that selectors are only checked against selectors
    // from other rules that share the same parent and the same source.
    var selectorContextLookup = (0, _utils.cssNodeContextLookup)();

    root.walkRules(function (rule) {

      // Return early if the rule contains a keyframe selector
      if (rule.parent.type === "atrule" && rule.parent.name === "keyframes") {
        return;
      }

      var contextSelectorSet = selectorContextLookup.getContext(rule, (0, _utils.findAtRuleContext)(rule));
      var resolvedSelectors = rule.selectors.reduce(function (result, selector) {
        return (0, _lodash.union)(result, (0, _postcssResolveNestedSelector2.default)(selector, rule));
      }, []);
      var normalizedSelectorList = resolvedSelectors.map(_normalizeSelector2.default);

      // Complain if the same selector list occurs twice

      // Sort the selectors list so that the order of the constituents
      // doesn't matter
      var sortedSelectorList = normalizedSelectorList.slice().sort().join(",");
      if (contextSelectorSet.has(sortedSelectorList)) {
        // If the selector isn't nested we can use its raw value; otherwise,
        // we have to approximate something for the message -- which is close enough
        var isNestedSelector = resolvedSelectors.join(",") !== rule.selectors.join(",");
        var selectorForMessage = isNestedSelector ? resolvedSelectors.join(", ") : rule.selector;
        return (0, _utils.report)({
          result: result,
          ruleName: ruleName,
          node: rule,
          message: messages.rejected(selectorForMessage)
        });
      }

      // We're treating the Map created by cssNodeContextLookup as a Set
      contextSelectorSet.set(sortedSelectorList, null);

      // Or complain if one selector list contains the same selector more than one
      rule.selectors.forEach(function (selector, i) {
        if ((0, _lodash.includes)(normalizedSelectorList.slice(0, i), (0, _normalizeSelector2.default)(selector))) {
          (0, _utils.report)({
            result: result,
            ruleName: ruleName,
            node: rule,
            message: messages.rejected(selector)
          });
        }
      });
    });
  };
};

var _lodash = require("lodash");

var _postcssResolveNestedSelector = require("postcss-resolve-nested-selector");

var _postcssResolveNestedSelector2 = _interopRequireDefault(_postcssResolveNestedSelector);

var _normalizeSelector = require("normalize-selector");

var _normalizeSelector2 = _interopRequireDefault(_normalizeSelector);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleName = exports.ruleName = "no-duplicate-selectors";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  rejected: function rejected(selector) {
    return "Unexpected duplicate selector \"" + selector + "\"";
  }
});