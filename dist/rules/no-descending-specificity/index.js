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

    var selectorContextLookup = (0, _utils.cssNodeContextLookup)();

    root.walkRules(function (rule) {
      var comparisonContext = selectorContextLookup.getContext(rule, (0, _utils.findAtRuleContext)(rule));

      rule.selectors.forEach(function (selector) {
        // The edge-case of duplicate selectors will act acceptably
        var index = rule.selector.indexOf(selector.trim());
        // Resolve any nested selectors before checking
        (0, _postcssResolveNestedSelector2.default)(selector, rule).forEach(function (resolvedSelector) {
          (0, _postcssSelectorParser2.default)(function (s) {
            return checkSelector(s, rule, index, comparisonContext);
          }).process(resolvedSelector);
        });
      });
    });

    function checkSelector(selectorNode, rule, sourceIndex, comparisonContext) {
      var selector = selectorNode.toString();
      var lastNonPseudoSelectorNode = getLastNonPseudoSelectorNode(selectorNode);
      var selectorSpecificity = (0, _specificity.calculate)(selector)[0].specificity.split(",");
      var entry = { selector: selector, specificity: selectorSpecificity };

      if (!comparisonContext.has(lastNonPseudoSelectorNode)) {
        comparisonContext.set(lastNonPseudoSelectorNode, [entry]);
        return;
      }

      var priorComparableSelectors = comparisonContext.get(lastNonPseudoSelectorNode);

      priorComparableSelectors.forEach(function (priorEntry) {
        if ((0, _utils.isLowerSpecificity)(selectorSpecificity, priorEntry.specificity)) {
          (0, _utils.report)({
            ruleName: ruleName,
            result: result,
            node: rule,
            message: messages.rejected(selector, priorEntry.selector),
            index: sourceIndex
          });
        }
      });

      priorComparableSelectors.push(entry);
    }
  };
};

var _specificity = require("specificity");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _postcssSelectorParser = require("postcss-selector-parser");

var _postcssSelectorParser2 = _interopRequireDefault(_postcssSelectorParser);

var _postcssResolveNestedSelector = require("postcss-resolve-nested-selector");

var _postcssResolveNestedSelector2 = _interopRequireDefault(_postcssResolveNestedSelector);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleName = exports.ruleName = "no-descending-specificity";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  rejected: function rejected(a, b) {
    return "Expected selector \"" + b + "\" to come before selector \"" + a + "\"";
  }
});

function getLastNonPseudoSelectorNode(selectorNode) {
  var s = _lodash2.default.last(selectorNode.nodes[0].nodes);
  while (s.type === "pseudo") {
    var prev = s.prev();
    if (!prev) {
      return s.toString();
    }
    s = s.prev();
  }
  return s.toString();
}