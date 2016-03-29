"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (result, ruleName) {
  var noErrors = true;

  for (var _len = arguments.length, optionDescriptions = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    optionDescriptions[_key - 2] = arguments[_key];
  }

  optionDescriptions.forEach(validate);

  return noErrors;

  function validate(_ref) {
    var possible = _ref.possible;
    var actual = _ref.actual;
    var optional = _ref.optional;

    var nothingPossible = !possible || Array.isArray(possible) && !possible.length;

    if (nothingPossible && actual === true) {
      return;
    }

    if (actual == null) {
      if (nothingPossible || optional) {
        return;
      }
      complain("Expected option value for rule \"" + ruleName + "\"");
      return;
    } else if (nothingPossible) {
      complain("Unexpected option value \"" + actual + "\" for rule \"" + ruleName + "\"");
      return;
    }

    // If `possible` is a function ...
    if ((0, _lodash.isFunction)(possible)) {
      if (!possible(actual)) {
        complain("Invalid option \"" + JSON.stringify(actual) + "\" for rule " + ruleName);
      }
      return;
    }

    // If `possible` is an array instead of an object ...
    if (!(0, _lodash.isPlainObject)(possible)) {
      [].concat(actual).forEach(function (a) {
        if (isValid(possible, a)) {
          return;
        }
        complain("Invalid option value \"" + a + "\" for rule \"" + ruleName + "\"");
      });
      return;
    }

    // If possible is an object ...
    if (!(0, _lodash.isPlainObject)(actual)) {
      complain("Invalid option value " + JSON.stringify(actual) + " for rule \"" + ruleName + "\": " + "should be an object");
      return;
    }

    Object.keys(actual).forEach(function (optionName) {
      if (ignoredOptions.indexOf(optionName) !== -1) {
        return;
      }

      if (!possible[optionName]) {
        complain("Invalid option name \"" + optionName + "\" for rule \"" + ruleName + "\"");
        return;
      }

      var actualOptionValue = actual[optionName];[].concat(actualOptionValue).forEach(function (a) {
        if (isValid(possible[optionName], a)) {
          return;
        }
        complain("Invalid value \"" + a + "\" for option \"" + optionName + "\" of rule \"" + ruleName + "\"");
      });
    });

    function complain(message) {
      noErrors = false;
      result.warn(message, {
        stylelintType: "invalidOption"
      });
    }
  }
};

var _lodash = require("lodash");

var ignoredOptions = ["severity", "message"];

/**
 * Validate a rule's options.
 *
 * See existing rules for examples.
 *
 * @param {Result} result - postcss result
 * @param {string} ruleName
 * @param {...object} ...optionDescriptions - Each optionDescription can
 *   have the following properties:
 *   	- `actual` (required): the actual passed option value or object.
 *   	- `possible` (required): a schema representation of what values are
 *      valid for those options. `possible` should be an object if the
 *      options are an object, with corresponding keys; if the options are not an
 *      object, `possible` isn't, either. All `possible` value representations
 *      should be **arrays of either values or functions**. Values are === checked
 *      against `actual`. Functions are fed `actual` as an argument and their
 *      return value is interpreted: truthy = valid, falsy = invalid.
 *    - `optional` (optional): If this is `true`, `actual` can be undefined.
 * @return {boolean} Whether or not the options are valid (true = valid)
 */


function isValid(possible, actual) {
  var possibleList = [].concat(possible);
  for (var i = 0, l = possibleList.length; i < l; i++) {
    var possibility = possibleList[i];
    if (typeof possibility === "function" && possibility(actual)) {
      return true;
    }
    if (actual === possibility) {
      return true;
    }
  }
}