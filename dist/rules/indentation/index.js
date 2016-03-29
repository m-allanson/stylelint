"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (space, options) {
  var isTab = space === "tab";
  var indentChar = isTab ? "\t" : (0, _lodash.repeat)(" ", space);
  var warningWord = isTab ? "tab" : "space";

  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, {
      actual: space,
      possible: [_lodash.isNumber, "tab"]
    }, {
      actual: options,
      possible: {
        except: ["block", "value", "param"],
        ignore: ["value", "param"],
        hierarchicalSelectors: [_lodash.isBoolean]
      },
      optional: true
    });
    if (!validOptions) {
      return;
    }

    // Cycle through all nodes using eachInside.
    // This is done instead of using
    // eachRule, eachAtRule, and eachDecl,
    // so that any hierarchy can be accounted for *in order*.
    root.walk(function (node) {

      var nodeLevel = indentationLevel(node);

      if (options && options.hierarchicalSelectors) {
        // hierarchicalSelectorsLevel will add the node to the hierarchyMap ...
        nodeLevel = hierarchicalSelectorsLevel(node, nodeLevel);
      } else {
        // ... so if it doesn't run we need to add this node to
        // the hierarchyMap for future reference.
        // If there isn't a selector hierarchy enforced, then the superordinate
        // can only be the node's parent.
        addNodeToHierarchy(node, node.parent, nodeLevel);
      }

      // At this point, the node's indent level should be calculated,
      // and this information should be saved in hierarchyMap

      var expectedWhitespace = (0, _lodash.repeat)(indentChar, nodeLevel);

      var before = node.raw("before");
      var after = node.raw("after");

      // Only inspect the spaces before the node
      // if this is the first node in root
      // or there is a newline in the `before` string.
      // (If there is no newline before a node,
      // there is no "indentation" to check.)
      var inspectBefore = root.first === node || before.indexOf("\n") !== -1;

      // Cut out any * hacks from `before`
      before = before[before.length - 1] === "*" ? before.slice(0, before.length - 1) : before;

      // Inspect whitespace in the `before` string that is
      // *after* the *last* newline character,
      // because anything besides that is not indentation for this node:
      // it is some other kind of separation, checked by some separate rule
      if (inspectBefore && before.slice(before.lastIndexOf("\n") + 1) !== expectedWhitespace) {
        (0, _utils.report)({
          message: messages.expected(legibleExpectation(nodeLevel)),
          node: node,
          result: result,
          ruleName: ruleName
        });
      }

      // Only blocks have the `after` string to check.
      // Only inspect `after` strings that start with a newline;
      // otherwise there's no indentation involved.
      if ((0, _utils.cssStatementHasBlock)(node) && after && after.indexOf("\n") !== -1 && after.slice(after.lastIndexOf("\n") + 1) !== expectedWhitespace) {
        (0, _utils.report)({
          message: messages.expected(legibleExpectation(nodeLevel)),
          node: node,
          index: node.toString().length - 1,
          result: result,
          ruleName: ruleName
        });
      }

      // If this is a declaration, check the value
      if (node.value) {
        checkValue(node, nodeLevel);
      }

      // If this is a rule, check the selector
      if (node.selector) {
        checkSelector(node, nodeLevel);
      }

      // If this is an at rule, check the params
      if (node.type === "atrule") {
        checkAtRuleParams(node, nodeLevel);
      }
    });

    function indentationLevel(node) {
      var level = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      if (node.parent.type === "root") {
        return level;
      }

      // In case by recursion we're checking a node that's
      // already been checked ...
      if (hierarchyMap.has(node)) {
        return hierarchyMap.get(node).level;
      }

      var calculatedLevel = void 0;
      if (hierarchyMap.has(node.parent)) {
        // If the hierarchyMap already contains this node's
        // parent, use that level
        calculatedLevel = hierarchyMap.get(node.parent).level + 1;
      } else {
        // Typically, indentation level equals the ancestor nodes
        // separating this node from root; so recursively
        // run this operation
        calculatedLevel = indentationLevel(node.parent, level + 1);
      }

      // If options.except includes "block",
      // blocks are taken down one from their calculated level
      // (all blocks are the same level as their parents)
      if ((0, _utils.optionsHaveException)(options, "block") && (node.type === "rule" || node.type === "atrule") && (0, _utils.cssStatementHasBlock)(node)) {
        calculatedLevel--;
      }

      return calculatedLevel;
    }

    function checkValue(decl, declLevel) {
      if (decl.value.indexOf("\n") === -1) {
        return;
      }
      if ((0, _utils.optionsHaveIgnored)(options, "value")) {
        return;
      }

      var declString = decl.toString();
      var valueLevel = (0, _utils.optionsHaveException)(options, "value") ? declLevel : declLevel + 1;

      checkMultilineBit(declString, valueLevel, decl);
    }

    function checkSelector(rule, ruleLevel) {
      var selector = rule.selector;

      checkMultilineBit(selector, ruleLevel, rule);
    }

    function checkAtRuleParams(atRule, ruleLevel) {
      if ((0, _utils.optionsHaveIgnored)(options, "param")) {
        return;
      }

      // @nest rules should be treated like regular rules, not expected
      // to have their params (selectors) indented
      var paramLevel = (0, _utils.optionsHaveException)(options, "param") || atRule.name === "nest" ? ruleLevel : ruleLevel + 1;

      checkMultilineBit((0, _utils.cssStatementStringBeforeBlock)(atRule).trim(), paramLevel, atRule);
    }

    function checkMultilineBit(source, newlineIndentLevel, node) {
      if (source.indexOf("\n") === -1) {
        return;
      }
      (0, _utils.styleSearch)({ source: source, target: "\n" }, function (match) {
        // Function arguments are ignored to allow for arbitrary indentation
        if (match.insideFunction) {
          return;
        }

        // Starting at the index after the newline, we want to
        // check that the whitespace characters (excluding newlines) before the first
        // non-whitespace character equal the expected indentation
        var afterNewlineSpaceMatches = /^([ \t]*)\S/.exec(source.slice(match.startIndex + 1));
        if (!afterNewlineSpaceMatches) {
          return;
        }
        var afterNewlineSpace = afterNewlineSpaceMatches[1];

        if (afterNewlineSpace !== (0, _lodash.repeat)(indentChar, newlineIndentLevel)) {
          (0, _utils.report)({
            message: messages.expected(legibleExpectation(newlineIndentLevel)),
            node: node,
            index: match.startIndex + 1,
            result: result,
            ruleName: ruleName
          });
        }
      });
    }
  };

  function legibleExpectation(level) {
    var count = isTab ? level : level * space;
    var quantifiedWarningWord = count === 1 ? warningWord : warningWord + "s";
    return count + " " + quantifiedWarningWord;
  }
};

var _lodash = require("lodash");

var _utils = require("../../utils");

var ruleName = exports.ruleName = "indentation";
var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  expected: function expected(x) {
    return "Expected indentation of " + x;
  }
});

// The hierarchyMap keeps track of nodes with confirmed
// superordinates and indentation levels.
// It can then be used to quickly check the indentation level of
// some prior node, or (when hierarchicalSelectors is one) by rules to check
// if they have a peer in the hierarchyMap, and should share that
// peer's superordinate.
var hierarchyMap = new Map();

function addNodeToHierarchy(node, superordinate, level) {
  hierarchyMap.set(node, { superordinate: superordinate, level: level });
}

/**
 * @param {number|"tab"} space - Number of whitespaces to expect, or else
 *   keyword "tab" for single `\t`
 * @param {object} [options]
 * @param {array} [options.except = ["block", "value"]] - Do *not* expect extra level of
 *   indentation for nested blocks and multi-line values, respectively
 * @param {array} [options.hierarchicalSelectors = false] - If `true`, we'll look for a
 *   hierarchical style of indentation (see tests and docs)
 */


// Figure the correct level of indentation if this is a rule that is
// part of a hierarchy of selectors.
//
// In the hierarchy, Rule A is subordinate to Rule B if Rule A's
// selector starts with Rule B's selector. Each rule can be
// subordinate to one other rule, but superordinate to many.
//
// Subordinates do not always immediately follow their
// superordinates, so it would be overly simplistic to just
// check if any given rule is subordinate to the previous rule.
function hierarchicalSelectorsLevel(node, nodeLevel) {
  var prevNode = node.prev();

  // For various reasons we might rule out that this is
  // a hierarchical node
  if (!prevNode || prevNode.type !== "rule" || node.type === "decl" || node.type === "comment") {
    addNodeToHierarchy(node, node.parent, nodeLevel);
    return nodeLevel;
  }

  // For at-rules: if *all* of the rules in the at-rule start with
  // selector of the rule before the at-rule, it should be subordinated
  // to the previous rule
  if (node.type === "atrule") {
    var insubordinate = void 0;
    node.walkRules(function (rule) {
      if (!isSubordinateTo(rule, prevNode)) {
        insubordinate = true;
        return false;
      }
    });
    var expectedLevel = hierarchyMap.has(prevNode) ? hierarchyMap.get(prevNode).level + 1 : nodeLevel + 1;
    if (insubordinate) {
      addNodeToHierarchy(node, node.parent, expectedLevel);
      return nodeLevel;
    }
    addNodeToHierarchy(node, prevNode, expectedLevel);
    return expectedLevel;
  }

  // For rules ...
  var isFirstSubordinate = isSubordinateTo(node, prevNode);
  if (isFirstSubordinate) {
    var _expectedLevel = hierarchyMap.has(prevNode) ? hierarchyMap.get(prevNode).level + 1 : nodeLevel + 1;
    addNodeToHierarchy(node, prevNode, _expectedLevel);
    return _expectedLevel;
  }

  // If this node is not subordinate to prevNode, but prevNode was itself a subordinate,
  // maybe this node is a peer of prevNode (and therefore should be subordinate to the
  // same superordinate). Or maybe it's a peer of prevNode's superordinate.
  // Recursively check the hierarchy in this manner for possible peers: if one
  // is found, use that peer's nodeLevel.
  var maybePeer = prevNode;
  while (maybePeer) {
    if (hierarchyMap.has(maybePeer)) {
      var maybePeerInfo = hierarchyMap.get(maybePeer);
      if (isSubordinateTo(node, maybePeerInfo.superordinate)) {
        addNodeToHierarchy(node, maybePeerInfo.superordinate, maybePeerInfo.level);
        return maybePeerInfo.level;
      } else {
        maybePeer = maybePeerInfo.superordinate;
      }
    } else {
      maybePeer = false;
    }
  }

  addNodeToHierarchy(node, node.parent, nodeLevel);
  return nodeLevel;
}

function isSubordinateTo(a, b) {
  return a && b && a.selector.indexOf(b.selector) === 0 && a.selector !== b.selector;
}