"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _lodash = require("lodash");

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssScss = require("postcss-scss");

var _postcssScss2 = _interopRequireDefault(_postcssScss);

var _disableRanges = require("../disableRanges");

var _disableRanges2 = _interopRequireDefault(_disableRanges);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("disableRanges registers disable/enable commands without rules", function (t) {
  var planCount = 0;

  testDisableRanges("a {}", function (result) {
    t.deepEqual(result.stylelint.disabledRanges, { all: [] });
  });
  planCount += 1;

  testDisableRanges("/* stylelint-disable */\na {}", function (result) {
    t.deepEqual(result.stylelint.disabledRanges, {
      all: [{
        start: 1
      }]
    });
  });
  planCount += 1;

  testDisableRanges("a {}\n" + "/* stylelint-disable */\n" + "b {}\n" + "/* stylelint-enable */\n" + ".foo {}", function (result) {
    t.deepEqual(result.stylelint.disabledRanges, {
      all: [{ start: 2, end: 4 }]
    });
  });
  planCount += 1;

  testDisableRanges("a {}\n" + "/* stylelint-disable */\n" + "b {}\n" + "/* stylelint-enable */\n" + ".foo {}\n" + "/* stylelint-disable */\n" + "b {}\n" + "/* stylelint-enable */\n" + ".foo {}", function (result) {
    t.deepEqual(result.stylelint.disabledRanges, {
      all: [{ start: 2, end: 4 }, { start: 6, end: 8 }]
    });
  });
  planCount += 1;

  t.plan(planCount);
});

(0, _tape2.default)("disableRanges registers disable/enable commands with rules", function (t) {
  var planCount = 0;

  testDisableRanges("/* stylelint-disable foo-bar */\na {}", function (result) {
    t.deepEqual(result.stylelint.disabledRanges, {
      all: [],
      "foo-bar": [{ start: 1 }]
    });
  });
  planCount += 1;

  testDisableRanges("a {}\n" + "/* stylelint-disable foo-bar */\n" + "b {}\n" + "/* stylelint-enable */\n" + ".foo {}\n" + "/* stylelint-disable foo-bar,baz-maz */\n" + "b {}\n" + "/* stylelint-enable */\n" + ".foo {}", function (result) {
    t.deepEqual(result.stylelint.disabledRanges, {
      all: [],
      "foo-bar": [{ start: 2, end: 4 }, { start: 6, end: 8 }],
      "baz-maz": [{ start: 6, end: 8 }]
    });
  });
  planCount += 1;

  testDisableRanges("/* stylelint-disable foo-bar, hoo-hah,\n\tslime */\n" + "b {}\n", function (result) {
    t.deepEqual(result.stylelint.disabledRanges, {
      all: [],
      "foo-bar": [{ start: 1 }],
      "hoo-hah": [{ start: 1 }],
      "slime": [{ start: 1 }]
    });
  });
  planCount += 1;

  testDisableRanges("/* stylelint-disable selector-combinator-space-before */\n" + "a {}", function (result) {
    t.deepEqual(result.stylelint.disabledRanges, {
      all: [],
      "selector-combinator-space-before": [{ start: 1 }]
    });
  });
  planCount += 1;

  t.plan(planCount);
});

(0, _tape2.default)("disableRanges disabling single lines", function (t) {
  var planCount = 0;

  testDisableRanges("a {} /* stylelint-disable-line */", function (result) {
    t.deepEqual(result.stylelint.disabledRanges, {
      all: [{
        start: 1,
        end: 1
      }]
    }, "disabling all rules");
  });
  planCount += 1;

  testDisableRanges("a {} /* stylelint-disable-line block-no-empty */", function (result) {
    t.deepEqual(result.stylelint.disabledRanges, {
      all: [],
      "block-no-empty": [{
        start: 1,
        end: 1
      }]
    }, "disabling a single rule");
  });
  planCount += 1;

  testDisableRanges("b {}\n\na {} /* stylelint-disable-line block-no-empty, blergh */", function (result) {
    t.deepEqual(result.stylelint.disabledRanges, {
      all: [],
      "block-no-empty": [{
        start: 3,
        end: 3
      }],
      "blergh": [{
        start: 3,
        end: 3
      }]
    }, "disabling multiple specific rules");
  });
  planCount += 1;

  t.plan(planCount);
});

(0, _tape2.default)("SCSS // line-disabling comment", function (t) {
  var planCount = 0;

  var scssSource = "a {\n    color: pink !important; // stylelint-disable-line declaration-no-important\n  }";
  (0, _postcss2.default)().use(_disableRanges2.default).process(scssSource, { syntax: _postcssScss2.default }).then(function (result) {
    t.deepEqual(result.stylelint.disabledRanges, {
      all: [],
      "declaration-no-important": [{
        start: 2,
        end: 2
      }]
    });
  }).catch(logError);
  planCount += 1;

  t.plan(planCount);
});

(0, _tape2.default)("Nesting disabledRanges", function (t) {
  var planCount = 0;

  testDisableRanges("/* stylelint-disable foo */\n    /* stylelint-disable bar */\n    /* stylelint-disable baz, hop */\n    /* stylelint-enable bar */\n    /* stylelint-enable foo, hop */\n    /* stylelint-enable baz */", function (result) {
    t.deepEqual(result.stylelint.disabledRanges, {
      all: [],
      foo: [{ start: 1, end: 5 }],
      bar: [{ start: 2, end: 4 }],
      baz: [{ start: 3, end: 6 }],
      hop: [{ start: 3, end: 5 }]
    });
  });
  planCount += 1;

  testDisableRanges("/* stylelint-disable */\n    /* stylelint-enable bar */\n    /* stylelint-disable bar */\n    /* stylelint-enable */", function (result) {
    t.deepEqual(result.stylelint.disabledRanges, {
      all: [{ start: 1, end: 4 }],
      bar: [{ start: 1, end: 2 }, { start: 3, end: 4 }]
    });
  });
  planCount += 1;

  testDisableRanges("/* stylelint-disable foo */\n    /* stylelint-disable bar, baz */\n    /* stylelint-enable */", function (result) {
    t.deepEqual(result.stylelint.disabledRanges, {
      all: [],
      foo: [{ start: 1, end: 3 }],
      bar: [{ start: 2, end: 3 }],
      baz: [{ start: 2, end: 3 }]
    });
  });
  planCount += 1;

  testDisableRanges("/* stylelint-disable */\n    /* stylelint-enable foo */\n    /* stylelint-enable */\n    /* stylelint-disable bar */", function (result) {
    t.deepEqual(result.stylelint.disabledRanges, {
      all: [{ start: 1, end: 3 }],
      foo: [{ start: 1, end: 2 }],
      bar: [{ start: 1, end: 3 }, { start: 4 }]
    });
  });
  planCount += 1;

  t.plan(planCount);
});

(0, _tape2.default)("disabledRanges errors", function (t) {
  var planCount = 0;

  testDisableRanges("/* stylelint-disable */\n    a {} /* stylelint-disable-line */", _lodash.noop, function (err) {
    t.equal(err.reason, "All rules have already been disabled");
  });
  planCount += 1;

  testDisableRanges("/* stylelint-disable */\n    a {} /* stylelint-disable-line foo */", _lodash.noop, function (err) {
    t.equal(err.reason, "All rules have already been disabled");
  });
  planCount += 1;

  testDisableRanges("/* stylelint-disable foo */\n    a {} /* stylelint-disable-line foo */", _lodash.noop, function (err) {
    t.equal(err.reason, "\"foo\" has already been disabled");
  });
  planCount += 1;

  testDisableRanges("/* stylelint-disable */ /* stylelint-disable */", _lodash.noop, function (err) {
    t.equal(err.reason, "All rules have already been disabled");
  });
  planCount += 1;

  testDisableRanges("/* stylelint-disable foo */ /* stylelint-disable foo*/", _lodash.noop, function (err) {
    t.equal(err.reason, "\"foo\" has already been disabled");
  });
  planCount += 1;

  testDisableRanges("/* stylelint-enable */", _lodash.noop, function (err) {
    t.equal(err.reason, "No rules have been disabled");
  });
  planCount += 1;

  testDisableRanges("/* stylelint-enable foo */", _lodash.noop, function (err) {
    t.equal(err.reason, "\"foo\" has not been disabled");
  });
  planCount += 1;

  t.plan(planCount);
});

function testDisableRanges(source, cb) {
  var errorHandler = arguments.length <= 2 || arguments[2] === undefined ? logError : arguments[2];

  (0, _postcss2.default)().use(_disableRanges2.default).process(source).then(cb).catch(errorHandler);
}

function logError(err) {
  console.log(err.stack); // eslint-disable-line no-console
}