"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _standalone = require("../standalone");

var _standalone2 = _interopRequireDefault(_standalone);

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _stringFormatter = require("../formatters/stringFormatter");

var _stringFormatter2 = _interopRequireDefault(_stringFormatter);

var _configBlockNoEmpty = require("./fixtures/config-block-no-empty");

var _configBlockNoEmpty2 = _interopRequireDefault(_configBlockNoEmpty);

var _configExtendingOne = require("./fixtures/config-extending-one");

var _configExtendingOne2 = _interopRequireDefault(_configExtendingOne);

var _configExtendingAnotherExtend = require("./fixtures/config-extending-another-extend");

var _configExtendingAnotherExtend2 = _interopRequireDefault(_configExtendingAnotherExtend);

var _configExtendingThreeWithOverride = require("./fixtures/config-extending-three-with-override");

var _configExtendingThreeWithOverride2 = _interopRequireDefault(_configExtendingThreeWithOverride);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fixturesPath = _path2.default.join(__dirname, "fixtures");

(0, _tape2.default)("standalone with input file(s)", function (t) {
  var planned = 0;

  (0, _standalone2.default)({
    files: fixturesPath + "/empty-block.css",
    // Path to config file
    configFile: _path2.default.join(__dirname, "fixtures/config-block-no-empty.json")
  }).then(function (_ref) {
    var output = _ref.output;
    var results = _ref.results;

    t.ok(output.indexOf("block-no-empty") !== -1);
    t.equal(results.length, 1);
    t.equal(results[0].warnings.length, 1);
    t.equal(results[0].warnings[0].rule, "block-no-empty");
  }).catch(logError);
  planned += 4;

  var twoCsses = [fixturesPath + "/e*y-block.*", fixturesPath + "/invalid-h*.css"];
  (0, _standalone2.default)({
    files: twoCsses,
    config: {
      rules: { "block-no-empty": true, "color-no-invalid-hex": true }
    }
  }).then(function (_ref2) {
    var output = _ref2.output;
    var results = _ref2.results;

    t.ok(output.indexOf("block-no-empty") !== -1);
    t.ok(output.indexOf("color-no-invalid-hex") !== -1);
    t.equal(results.length, 2);
    t.equal(results[0].warnings.length, 1);
    t.equal(results[1].warnings.length, 1);
    // Ordering of the files is non-deterministic, I believe
    if (results[0].source.indexOf("empty-block") !== -1) {
      t.equal(results[0].warnings[0].rule, "block-no-empty");
      t.equal(results[1].warnings[0].rule, "color-no-invalid-hex");
    } else {
      t.equal(results[1].warnings[0].rule, "block-no-empty");
      t.equal(results[0].warnings[0].rule, "color-no-invalid-hex");
    }
  }).catch(logError);
  planned += 7;

  t.plan(planned);
});

(0, _tape2.default)("standalone with input css", function (t) {
  var planned = 0;

  (0, _standalone2.default)({ code: "a {}", config: _configBlockNoEmpty2.default }).then(function (_ref3) {
    var output = _ref3.output;
    var results = _ref3.results;

    t.equal(typeof output === "undefined" ? "undefined" : _typeof(output), "string");
    t.equal(results.length, 1);
    t.equal(results[0].warnings.length, 1);
    t.equal(results[0].warnings[0].rule, "block-no-empty");
  }).catch(logError);
  planned += 4;

  t.plan(planned);
});

(0, _tape2.default)("standalone with extending configuration and configBasedir", function (t) {
  var planned = 0;

  (0, _standalone2.default)({
    code: "a {}",
    config: _configExtendingOne2.default,
    configBasedir: _path2.default.join(__dirname, "fixtures")
  }).then(function (_ref4) {
    var output = _ref4.output;
    var results = _ref4.results;

    t.equal(typeof output === "undefined" ? "undefined" : _typeof(output), "string");
    t.equal(results.length, 1);
    t.equal(results[0].warnings.length, 1);
    t.equal(results[0].warnings[0].rule, "block-no-empty");
  }).catch(logError);
  planned += 4;

  // Recursive extending
  (0, _standalone2.default)({
    code: "a {}",
    config: _configExtendingAnotherExtend2.default,
    configBasedir: _path2.default.join(__dirname, "fixtures")
  }).then(function (_ref5) {
    var output = _ref5.output;
    var results = _ref5.results;

    t.equal(typeof output === "undefined" ? "undefined" : _typeof(output), "string");
    t.equal(results.length, 1);
    t.equal(results[0].warnings.length, 1);
    t.equal(results[0].warnings[0].rule, "block-no-empty");
  }).catch(logError);
  planned += 4;

  // Extending with overrides
  (0, _standalone2.default)({
    code: "a {}",
    config: _configExtendingThreeWithOverride2.default,
    configBasedir: _path2.default.join(__dirname, "fixtures")
  }).then(function (_ref6) {
    var results = _ref6.results;

    t.equal(results[0].warnings.length, 0);
  }).catch(logError);
  planned += 1;

  t.plan(planned);
});

(0, _tape2.default)("standalone with extending configuration and no configBasedir", function (t) {
  var planned = 0;

  (0, _standalone2.default)({
    code: "a {}",
    config: _configExtendingOne2.default
  }).catch(function (err) {
    t.equal(err.code, 78);
  });
  planned += 1;

  t.plan(planned);
});

(0, _tape2.default)("standalone with input css and alternate formatter specified by keyword", function (t) {
  var planned = 0;

  (0, _standalone2.default)({ code: "a {}", config: _configBlockNoEmpty2.default, formatter: "string" }).then(function (_ref7) {
    var output = _ref7.output;

    var strippedOutput = _chalk2.default.stripColor(output);
    t.equal(typeof output === "undefined" ? "undefined" : _typeof(output), "string");
    t.ok(strippedOutput.indexOf("1:3") !== -1);
    t.ok(strippedOutput.indexOf("block-no-empty") !== -1);
  }).catch(logError);
  planned += 3;

  t.plan(planned);
});

(0, _tape2.default)("standalone with input css and alternate formatter function", function (t) {
  var planned = 0;

  (0, _standalone2.default)({ code: "a {}", config: _configBlockNoEmpty2.default, formatter: _stringFormatter2.default }).then(function (_ref8) {
    var output = _ref8.output;

    var strippedOutput = _chalk2.default.stripColor(output);
    t.equal(typeof output === "undefined" ? "undefined" : _typeof(output), "string");
    t.ok(strippedOutput.indexOf("1:3") !== -1);
    t.ok(strippedOutput.indexOf("block-no-empty") !== -1);
  }).catch(logError);
  planned += 3;

  t.plan(planned);
});

(0, _tape2.default)("standalone with input css and quiet mode", function (t) {
  var planned = 0;
  var config = {
    quiet: true,
    rules: {
      "block-no-empty": [true, { "severity": "warning" }]
    }
  };

  (0, _standalone2.default)({ code: "a {}", config: config }).then(function (_ref9) {
    var output = _ref9.output;

    var parsedOutput = JSON.parse(output);
    t.deepEqual(parsedOutput[0].warnings, []);
  }).catch(logError);
  planned += 1;

  t.plan(planned);
});

(0, _tape2.default)("standalone with scss syntax", function (t) {
  var planned = 0;
  var config = {
    rules: {
      "block-no-empty": true
    }
  };

  (0, _standalone2.default)({
    config: config,
    code: "$foo: bar; // foo;\nb {}",
    syntax: "scss",
    formatter: _stringFormatter2.default
  }).then(function (_ref10) {
    var output = _ref10.output;

    var strippedOutput = _chalk2.default.stripColor(output);
    t.equal(typeof output === "undefined" ? "undefined" : _typeof(output), "string");
    t.ok(strippedOutput.indexOf("2:3") !== -1);
    t.ok(strippedOutput.indexOf("block-no-empty") !== -1);
  }).catch(logError);
  planned += 3;

  t.plan(planned);
});

(0, _tape2.default)("standalone with extending config and ignoreFiles glob ignoring single glob", function (t) {
  var planned = 0;
  (0, _standalone2.default)({
    files: [fixturesPath + "/*.css"],
    config: {
      ignoreFiles: "**/invalid-hex.css",
      extends: ["./config-block-no-empty", "./config-color-no-invalid-hex"]
    },
    configBasedir: _path2.default.join(__dirname, "fixtures")
  }).then(function (_ref11) {
    var output = _ref11.output;

    var parsedOutput = JSON.parse(output);
    t.equal(parsedOutput.length, 2);
    t.ok(parsedOutput[0].source.indexOf("empty-block.css") !== -1);
    t.equal(parsedOutput[0].warnings.length, 1);
    t.ok(parsedOutput[1].source.indexOf("invalid-hex.css") !== -1);
    t.equal(parsedOutput[1].warnings.length, 0);
  }).catch(logError);
  planned += 5;
  t.plan(planned);
});

(0, _tape2.default)("standalone with absolute ignoreFiles glob path", function (t) {
  var planned = 0;
  (0, _standalone2.default)({
    files: [fixturesPath + "/empty-block.css", fixturesPath + "/invalid-hex.css"],
    config: {
      ignoreFiles: [fixturesPath + "/empty-b*.css"],
      rules: {
        "block-no-empty": true
      }
    },
    configBasedir: _path2.default.join(__dirname, "fixtures")
  }).then(function (_ref12) {
    var output = _ref12.output;

    var parsedOutput = JSON.parse(output);
    t.equal(parsedOutput.length, 2);
    t.equal(parsedOutput[0].warnings.length, 0);
    t.equal(parsedOutput[1].warnings.length, 0);
  }).catch(logError);
  planned += 3;
  t.plan(planned);
});

(0, _tape2.default)("standalone with extending config with ignoreFiles glob ignoring one by negation", function (t) {
  var planned = 0;
  (0, _standalone2.default)({
    files: [fixturesPath + "/*.css"],
    config: {
      ignoreFiles: ["**/*.css", "!**/invalid-hex.css"],
      extends: [fixturesPath + "/config-block-no-empty", fixturesPath + "/config-color-no-invalid-hex"]
    },
    configBasedir: _path2.default.join(__dirname, "fixtures")
  }).then(function (_ref13) {
    var output = _ref13.output;

    var parsedOutput = JSON.parse(output);
    t.equal(parsedOutput.length, 2);
    t.ok(parsedOutput[0].source.indexOf("empty-block.css") !== -1);
    t.equal(parsedOutput[0].warnings.length, 0);
    t.ok(parsedOutput[1].source.indexOf("invalid-hex.css") !== -1);
    t.equal(parsedOutput[1].warnings.length, 1);
  }).catch(logError);
  planned += 5;
  t.plan(planned);
});

(0, _tape2.default)("standalone extending a config that ignores files", function (t) {
  var planned = 0;
  (0, _standalone2.default)({
    files: [fixturesPath + "/*.css"],
    config: {
      extends: [fixturesPath + "/config-extending-and-ignoring"]
    },
    configBasedir: _path2.default.join(__dirname, "fixtures")
  }).then(function (_ref14) {
    var output = _ref14.output;

    var parsedOutput = JSON.parse(output);
    t.equal(parsedOutput.length, 2);
    t.ok(parsedOutput[0].source.indexOf("empty-block.css") !== -1, "ignoreFiles in extended config has no effect");
    t.equal(parsedOutput[0].warnings.length, 1);
    t.ok(parsedOutput[1].source.indexOf("invalid-hex.css") !== -1);
    t.equal(parsedOutput[1].warnings.length, 0);
  }).catch(logError);
  planned += 5;
  t.plan(planned);
});

(0, _tape2.default)("standalone extending a config that is overridden", function (t) {
  (0, _standalone2.default)({
    code: "a { b: \"c\" }",
    config: {
      extends: [fixturesPath + "/config-string-quotes-single"],
      rules: { "string-quotes": "double" }
    }
  }).then(function (_ref15) {
    var output = _ref15.output;

    var parsedOutput = JSON.parse(output);
    t.equal(parsedOutput[0].warnings.length, 0);
  }).catch(logError);
  t.plan(1);
});

(0, _tape2.default)("standalone loading YAML with custom message", function (t) {
  (0, _standalone2.default)({
    code: "a { color: pink; }",
    configFile: _path2.default.join(__dirname, "fixtures/config-color-named-custom-message.yaml")
  }).then(function (_ref16) {
    var output = _ref16.output;

    var parsedOutput = JSON.parse(output)[0];
    t.equal(parsedOutput.warnings.length, 1);
    t.equal(parsedOutput.warnings[0].text, "Unacceptable");
  }).catch(logError);

  t.plan(2);
});

(0, _tape2.default)("standalone using codeFilename and ignoreFiles together", function (t) {
  (0, _standalone2.default)({
    code: "a {}",
    codeFilename: _path2.default.join(__dirname, "foo.css"),
    config: {
      ignoreFiles: ["**/foo.css"],
      rules: { "block-no-empty": true }
    }
  }).then(function (_ref17) {
    var output = _ref17.output;

    var parsedOutput = JSON.parse(output)[0];
    t.equal(parsedOutput.warnings.length, 0, "no warnings");
  }).catch(logError);

  t.plan(1);
});

(0, _tape2.default)("standalone using codeFilename and ignoreFiles with configBasedir", function (t) {
  (0, _standalone2.default)({
    code: "a {}",
    codeFilename: _path2.default.join(__dirname, "foo.css"),
    config: {
      ignoreFiles: ["foo.css"],
      rules: { "block-no-empty": true }
    },
    configBasedir: __dirname
  }).then(function (_ref18) {
    var output = _ref18.output;

    var parsedOutput = JSON.parse(output)[0];
    t.equal(parsedOutput.warnings.length, 0, "no warnings");
  }).catch(logError);

  t.plan(1);
});

function logError(err) {
  console.log(err.stack); // eslint-disable-line no-console
}