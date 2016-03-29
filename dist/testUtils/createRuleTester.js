"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (equalityCheck) {
  return function (rule, schema) {
    var ruleName = schema.ruleName;

    var ruleOptions = (0, _normalizeRuleSettings2.default)(schema.config);
    var rulePrimaryOptions = ruleOptions[0];
    var ruleSecondaryOptions = ruleOptions[1];

    var printableConfig = rulePrimaryOptions ? JSON.stringify(rulePrimaryOptions) : "";
    if (printableConfig && ruleSecondaryOptions) {
      printableConfig += ", " + JSON.stringify(ruleSecondaryOptions);
    }

    function createCaseDescription(code) {
      var text = "\n> rule: " + ruleName + "\n";
      text += "> config: " + printableConfig + "\n";
      text += "> code: " + JSON.stringify(code) + "\n";
      return text;
    }

    // Process the code through the rule and return
    // the PostCSS LazyResult promise
    function postcssProcess(code) {
      var postcssProcessOptions = {};
      if (schema.syntax === "scss") {
        postcssProcessOptions.syntax = _postcssScss2.default;
      }
      var processor = (0, _postcss2.default)();
      processor.use(_disableRanges2.default);

      if (schema.preceedingPlugins) {
        schema.preceedingPlugins.forEach(processor.use);
      }

      return processor.use(rule(rulePrimaryOptions, ruleSecondaryOptions)).process(code, postcssProcessOptions);
    }

    // Apply the basic positive checks unless
    // explicitly told not to
    var passingTestCases = schema.skipBasicChecks ? schema.accept : _basicChecks2.default.concat(schema.accept);

    if (passingTestCases && passingTestCases.length) {
      passingTestCases.forEach(function (acceptedCase) {
        if (!acceptedCase) {
          return;
        }
        var assertionDescription = spaceJoin(acceptedCase.description, "should be accepted");
        var resultPromise = postcssProcess(acceptedCase.code).then(function (postcssResult) {
          var warnings = postcssResult.warnings();
          return [{
            expected: 0,
            actual: warnings.length,
            description: assertionDescription
          }];
        }).catch(function (err) {
          return console.log(err.stack);
        }); // eslint-disable-line no-console

        equalityCheck(resultPromise, {
          comparisonCount: 1,
          caseDescription: createCaseDescription(acceptedCase.code),
          completeAssertionDescription: assertionDescription,
          only: acceptedCase.only
        });
      });
    }

    if (schema.reject) {
      schema.reject.forEach(function (rejectedCase) {
        var completeAssertionDescription = "should register one warning";
        var comparisonCount = 1;
        if (rejectedCase.line) {
          comparisonCount++;
          completeAssertionDescription += " on line " + rejectedCase.line;
        }
        if (rejectedCase.column) {
          comparisonCount++;
          completeAssertionDescription += " on column " + rejectedCase.column;
        }
        if (rejectedCase.message) {
          comparisonCount++;
          completeAssertionDescription += " with message \"" + rejectedCase.message + "\"";
        }

        var resultPromise = postcssProcess(rejectedCase.code).then(function (postcssResult) {
          var warnings = postcssResult.warnings();
          var comparisons = [{
            expected: 1,
            actual: warnings.length,
            description: spaceJoin(rejectedCase.description, "should register one warning")
          }];
          if (!warnings.length) return comparisons;

          var warning = warnings[0];

          if (rejectedCase.line) {
            comparisons.push({
              expected: rejectedCase.line,
              actual: warning.line,
              description: spaceJoin(rejectedCase.description, "should warn on line " + rejectedCase.line)
            });
          }
          if (rejectedCase.column !== undefined) {
            comparisons.push({
              expected: rejectedCase.column,
              actual: warning.column,
              description: spaceJoin(rejectedCase.description, "should warn on column " + rejectedCase.column)
            });
          }
          if (rejectedCase.message) {
            comparisons.push({
              expected: rejectedCase.message,
              actual: warning.text,
              description: spaceJoin(rejectedCase.description, "should warn with message " + rejectedCase.message)
            });
          }
          return comparisons;
        }).catch(function (err) {
          return console.log(err.stack);
        }); // eslint-disable-line no-console

        equalityCheck(resultPromise, {
          comparisonCount: comparisonCount,
          completeAssertionDescription: completeAssertionDescription,
          caseDescription: createCaseDescription(rejectedCase.code),
          only: rejectedCase.only
        });
      });
    }
  };
};

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssScss = require("postcss-scss");

var _postcssScss2 = _interopRequireDefault(_postcssScss);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _normalizeRuleSettings = require("../normalizeRuleSettings");

var _normalizeRuleSettings2 = _interopRequireDefault(_normalizeRuleSettings);

var _disableRanges = require("../disableRanges");

var _disableRanges2 = _interopRequireDefault(_disableRanges);

var _basicChecks = require("./basicChecks");

var _basicChecks2 = _interopRequireDefault(_basicChecks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function spaceJoin() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _lodash2.default.compact(args).join(" ");
}

/**
 * Create a stylelint rule testing function.
 *
 * Pass in an `equalityCheck` function. Given some information,
 * this checker should use Whatever Test Runner to perform
 * equality checks.
 *
 * `equalityCheck` should accept two arguments:
 * - `processCss` {Promise}: A Promise that resolves with an array of
 *   comparisons that you need to check (documented below).
 * - `context` {object}: An object that contains additional information
 *   you may need:
 *   - `caseDescription` {string}: A description of the test case as a whole.
 *   	 Will look like this:
 *   	   > rule: value-list-comma-space-before
 *   	   > config: "always-single-line"
 *   	   > code: "a { background-size: 0 ,0;\n}"
 *   - `comparisonCount` {number}: The number of comparisons that
 *     will need to be performed (e.g. useful for tape).
 *   - `completeAssertionDescription` {string}: While each individual
 *   	 comparison may have its own description, this is a description
 *   	 of the whole assertion (e.g. useful for Mocha).
 *   - `only` {boolean}: If `true`, the test runner should only run this
 *     test case (e.g. `test.only` in tape, `describe.only` in Mocha).
 *
 * `processCss` is a Promsie that resolves with an array of comparisons.
 * Each comparison has the following properties:
 * - `actual` {any}: Some actual value.
 * - `expected` {any}: Some expected value.
 * - `description` {string}: A (possibly empty) description of the comparison.
 *
 * Within `equalityCheck`, you need to ensure that you:
 * - Set up the test case.
 * - When `processCss` resolves, loop through every comparison.
 * - For each comparison, make an assertion checking that `actual === expected`.
 *
 * The `testRule` function that you get has a simple signature:
 * `testRule(rule, testGroupDescription)`.
 *
 * `rule` is just the rule that you are testing (a function).
 *
 * `testGroupDescription` is an object fitting the following schema.
 *
 * Required properties:
 * - `ruleName` {string}: The name of the rule. Used in descriptions.
 * - `config` {any}: The rule's configuration for this test group.
 *   Should match the format you'd use in `.stylelintrc`.
 * - `accept` {array}: An array of objects describing test cases that
 *   should not violate the rule. Each object has these properties:
 *   - `code` {string}: The source CSS to check.
 *   - `description` {[string]}: An optional description of the case.
 * - `reject` {array}: An array of objects describing test cases that
 *   should violate the rule once. Each object has these properties:
 *   - `code` {string}: The source CSS to check.
 *   - `message` {string}: The message of the expected violation.
 *   - `line` {[number]}: The expected line number of the violation.
 *     If this is left out, the line won't be checked.
 *   - `column` {[number]}: The expected column number of the violation.
 *     If this is left out, the column won't be checked.
 *   - `description` {[string]}: An optional description of the case.
 *
 * Optional properties:
 * - `syntax` {"css"|"scss"}: Defaults to `"css"`. Set to `"scss"` to
 *   run a test that uses `postcss-scss` to parse.
 * - `skipBasicChecks` {boolean}: Defaults to `false`. If `true`, a
 *   few rudimentary checks (that should almost always be included)
 *   will not be performed.
 * - `preceedingPlugins` {array}: An array of PostCSS plugins that
 *   should be run before the CSS is tested.
 *
 * @param {function} equalityCheck - Described above
 * @return {function} testRule - Decsribed above
 */