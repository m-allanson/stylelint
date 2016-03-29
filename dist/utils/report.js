"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var

  /**
   * Report a violation.
   *
   * This function accounts for `disabledRanges` attached to the result.
   * That is, if the reported violation is within a disabledRange,
   * it is ignored. Otherwise, it is attached to the result as a
   * postcss warning.
   *
   * It also accounts for the rule's severity.
   *
   * You *must* pass *either* a node or a line number.
   *
   * @param {object} violation - Details about the violation
   * @param {string} violation.ruleName - The name of the rule
   * @param {Result} violation.result - postcss Result object
   * @param {string} violation.message - Message to inform user of the violation
   * @param {Node} [violation.node] - postcss Node object
   * @param {Node} [violation.index] - Index that should be passed to result.warn()
   * @param {Node} [violation.word] - Word that should be passed to result.warn()
   * @param {number} [violation.line] - Line number of the violation
   */
  ruleName = _ref.ruleName;
  var result = _ref.result;
  var message = _ref.message;
  var line = _ref.line;
  var node = _ref.node;
  var index = _ref.index;
  var word = _ref.word;

  result.stylelint = result.stylelint || {};

  // In quiet mode, mere warnings are ignored
  if (result.stylelint.quiet && result.stylelint.ruleSeverities[ruleName] !== "error") {
    return;
  }

  // If a line is not passed, use the node.positionBy method to get the
  // line number that the complaint pertains to
  var startLine = line || node.positionBy({ index: index }).line;

  if (result.stylelint.disabledRanges) {
    var ranges = result.stylelint.disabledRanges[ruleName] || result.stylelint.disabledRanges.all;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = ranges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var range = _step.value;

        if (
        // If the violation is within a disabledRange,
        // and that disabledRange's rules include this one,
        // do not register a warning
        range.start <= startLine && (range.end >= startLine || range.end === undefined) && (!range.rules || range.rules.indexOf(ruleName) !== -1)) {
          return;
        }
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

  var severity = (0, _lodash.get)(result.stylelint, ["ruleSeverities", ruleName], "ignore");

  if (typeof severity === "undefined") {
    throw new Error("The rule name \"" + ruleName + "\" has no corresponding registered severity.\n\n" + "This is most likely a bug in stylelint: please file an issue with this stack trace " + "at\nhttps://github.com/stylelint/stylelint/issues");
  }

  if (!result.stylelint.stylelintError && severity === "error") {
    result.stylelint.stylelintError = true;
  }

  var warningProperties = {
    severity: severity,
    rule: ruleName
  };
  if (node) {
    warningProperties.node = node;
  }
  if (index) {
    warningProperties.index = index;
  }
  if (word) {
    warningProperties.word = word;
  }

  var warningMessage = (0, _lodash.get)(result.stylelint, ["customMessages", ruleName], message);
  result.warn(warningMessage, warningProperties);
};

var _lodash = require("lodash");