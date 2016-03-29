"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var code = _ref.code;
  var codeFilename = _ref.codeFilename;
  var config = _ref.config;
  var syntax = _ref.syntax;
  var _ref$formatter = _ref.formatter;
  var formatter = _ref$formatter === undefined ? "json" : _ref$formatter;

  if (typeof code !== "string") {
    throw new Error("You must pass a `code` string, or use the node or CLI APIs to pass a `files` glob");
  }

  var chosenFormatter = typeof formatter === "string" ? formatters[formatter] : formatter;

  var errored = false;

  return lintString(code, codeFilename).then(function (result) {
    var results = [result];
    var output = chosenFormatter(results);
    return {
      output: output,
      results: results,
      errored: errored
    };
  });

  function lintString(code, filepath) {
    var postcssProcessOptions = {};
    if (filepath) {
      postcssProcessOptions.from = filepath;
    }
    if (syntax === "scss") {
      postcssProcessOptions.syntax = _postcssScss2.default;
    }

    return (0, _postcss2.default)().use((0, _postcssSimplePlugin2.default)({
      config: config
    })).process(code, postcssProcessOptions).then(handleResult);

    function handleResult(postcssResult) {
      var source = !postcssResult.root.source ? undefined : postcssResult.root.source.input.file || postcssResult.root.source.input.id;

      if (postcssResult.stylelint.stylelintError) {
        errored = true;
      }

      // Strip out deprecation warnings from the messages
      var deprecations = _lodash2.default.remove(postcssResult.messages, { stylelintType: "deprecation" }).map(function (d) {
        return {
          text: d.text,
          reference: d.stylelintReference
        };
      });

      // Also strip out invalid options
      var invalidOptionWarnings = _lodash2.default.remove(postcssResult.messages, { stylelintType: "invalidOption" }).map(function (w) {
        return { text: w.text };
      });

      return {
        source: source,
        deprecations: deprecations,
        invalidOptionWarnings: invalidOptionWarnings,
        errored: postcssResult.stylelint.stylelintError,
        warnings: postcssResult.messages.map(function (message) {
          return {
            line: message.line,
            column: message.column,
            rule: message.rule,
            severity: message.severity,
            text: message.text
          };
        })
      };
    }
  }
};

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _postcssScss = require("postcss-scss");

var _postcssScss2 = _interopRequireDefault(_postcssScss);

var _postcssSimplePlugin = require("./postcssSimplePlugin");

var _postcssSimplePlugin2 = _interopRequireDefault(_postcssSimplePlugin);

var _formatters = require("./formatters");

var formatters = _interopRequireWildcard(_formatters);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }