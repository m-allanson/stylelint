"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _postcssPlugin = require("../postcssPlugin");

var _postcssPlugin2 = _interopRequireDefault(_postcssPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("`configFile` option with absolute path", function (t) {
  var config = {
    configFile: _path2.default.join(__dirname, "fixtures/config-block-no-empty.json")
  };
  t.plan(2);
  _postcssPlugin2.default.process("a {}", config).then(function (result) {
    var warnings = result.warnings();
    t.equal(warnings.length, 1);
    t.ok(warnings[0].text.indexOf("block-no-empty") !== -1);
  });
});

(0, _tape2.default)("`configFile` with bad path", function (t) {
  t.plan(1);
  _postcssPlugin2.default.process("a {}", { configFile: "./herby.json" }).catch(function (err) {
    t.equal(err.code, "ENOENT");
  });
});