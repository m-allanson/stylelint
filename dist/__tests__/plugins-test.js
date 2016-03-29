"use strict";

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cssWithFoo = ".foo {}";

var cssWithoutFoo = ".bar {}";

var configRelative = {
  plugins: ["./fixtures/plugin-warn-about-foo"],
  rules: {
    "warn-about-foo": "always",
    "block-no-empty": true
  }
};

var configAbsolute = {
  plugins: [_path2.default.join(__dirname, "./fixtures/plugin-warn-about-foo")],
  rules: {
    "warn-about-foo": "always",
    "block-no-empty": true
  }
};

var configExtendRelative = {
  extends: ["./fixtures/config-relative-plugin"]
};

var processorRelative = (0, _postcss2.default)().use((0, _2.default)({ config: configRelative, configBasedir: __dirname }));
var processorAbsolute = (0, _postcss2.default)().use((0, _2.default)({ config: configAbsolute }));
var processorExtendRelative = (0, _postcss2.default)().use((0, _2.default)({ config: configExtendRelative, configBasedir: __dirname }));

(0, _tape2.default)("plugin runs", function (t) {
  var planned = 0;

  processorRelative.process(cssWithFoo).then(function (result) {
    t.equal(result.warnings().length, 2);
    t.equal(result.warnings()[0].text, "found .foo (warn-about-foo)");
    t.ok(result.warnings()[0].node);
  }).catch(logError);
  planned += 3;

  processorRelative.process(cssWithoutFoo).then(function (result) {
    t.equal(result.warnings().length, 2);
    t.equal(result.warnings()[0].text, "never found .foo (warn-about-foo)");
    t.notOk(result.warnings()[0].node);
  }).catch(logError);
  planned += 3;

  t.plan(planned);
});

(0, _tape2.default)("plugin with absolute path and no configBasedir", function (t) {
  var planned = 0;

  processorAbsolute.process(cssWithFoo).then(function (result) {
    t.equal(result.warnings().length, 2);
    t.equal(result.warnings()[0].text, "found .foo (warn-about-foo)");
    t.ok(result.warnings()[0].node);
  }).catch(logError);
  planned += 3;

  t.plan(planned);
});

(0, _tape2.default)("config extending another config that invokes a plugin with a relative path", function (t) {
  var planned = 0;

  processorExtendRelative.process(cssWithFoo).then(function (result) {
    t.equal(result.warnings().length, 1);
    t.equal(result.warnings()[0].text, "found .foo (warn-about-foo)");
    t.ok(result.warnings()[0].node);
  }).catch(logError);
  planned += 3;

  t.plan(planned);
});

(0, _tape2.default)("plugin using exposed rules via stylelint.rules", function (t) {
  var planned = 0;

  var cssWithDirectiveLower = "/** @@check-color-hex-case */ a { color: #eee; }";
  var cssWithDirectiveUpper = "/** @@check-color-hex-case */ a { color: #EEE; }";
  var cssWithoutDirectiveLower = "a { color: #eee; }";
  var cssWithoutDirectiveUpper = "a { color: #EEE; }";
  var config = function config(expectation) {
    return {
      config: {
        plugins: [_path2.default.join(__dirname, "fixtures/plugin-conditionally-check-color-hex-case")],
        rules: {
          "conditionally-check-color-hex-case": expectation
        }
      }
    };
  };

  (0, _postcss2.default)().use((0, _2.default)(config("upper"))).process(cssWithDirectiveLower).then(function (result) {
    t.equal(result.warnings().length, 1);
    t.equal(result.warnings()[0].text, "Expected \"#eee\" to be \"#EEE\" (color-hex-case)");
  }).catch(logError);
  planned += 2;

  (0, _postcss2.default)().use((0, _2.default)(config("upper"))).process(cssWithDirectiveUpper).then(function (result) {
    t.equal(result.warnings().length, 0);
  }).catch(logError);
  planned += 1;

  (0, _postcss2.default)().use((0, _2.default)(config("lower"))).process(cssWithDirectiveUpper).then(function (result) {
    t.equal(result.warnings().length, 1);
    t.equal(result.warnings()[0].text, "Expected \"#EEE\" to be \"#eee\" (color-hex-case)");
  }).catch(logError);
  planned += 2;

  (0, _postcss2.default)().use((0, _2.default)(config("lower"))).process(cssWithDirectiveLower).then(function (result) {
    t.equal(result.warnings().length, 0);
  }).catch(logError);
  planned += 1;

  (0, _postcss2.default)().use((0, _2.default)(config("upper"))).process(cssWithoutDirectiveLower).then(function (result) {
    t.equal(result.warnings().length, 0);
  }).catch(logError);
  planned += 1;

  (0, _postcss2.default)().use((0, _2.default)(config("lower"))).process(cssWithoutDirectiveUpper).then(function (result) {
    t.equal(result.warnings().length, 0);
  }).catch(logError);
  planned += 1;

  t.plan(planned);
});

function logError(err) {
  console.log(err.stack); // eslint-disable-line no-console
}