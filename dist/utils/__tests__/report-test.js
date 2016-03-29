"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _report = require("../report");

var _report2 = _interopRequireDefault(_report);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("without disabledRanges", function (t) {
  var v = {
    ruleName: "foo",
    result: {
      warn: _sinon2.default.spy()
    },
    message: "bar",
    node: {
      positionBy: function positionBy() {
        return { line: 2 };
      }
    }
  };
  (0, _report2.default)(v);
  var spyArgs = v.result.warn.args[0];
  t.equal(spyArgs[0], "bar");
  t.equal(spyArgs[1].node, v.node);
  t.end();
});

(0, _tape2.default)("with irrelevant general disabledRange", function (t) {
  var v = {
    ruleName: "foo",
    result: {
      warn: _sinon2.default.spy(),
      stylelint: {
        disabledRanges: {
          all: [{ start: 5, end: 8 }]
        }
      }
    },
    message: "bar",
    node: {
      positionBy: function positionBy() {
        return { line: 2 };
      }
    }
  };
  (0, _report2.default)(v);
  var spyArgs = v.result.warn.args[0];
  t.equal(spyArgs[0], "bar");
  t.equal(spyArgs[1].node, v.node);
  t.end();
});

(0, _tape2.default)("with relevant general disabledRange", function (t) {
  var v = {
    ruleName: "foo",
    result: {
      warn: _sinon2.default.spy(),
      stylelint: {
        disabledRanges: {
          all: [{ start: 5, end: 8 }]
        }
      }
    },
    message: "bar",
    node: {
      positionBy: function positionBy() {
        return { line: 6 };
      }
    }
  };
  (0, _report2.default)(v);
  t.notOk(v.result.warn.called);
  t.end();
});

(0, _tape2.default)("with irrelevant rule-specific disabledRange", function (t) {
  var v = {
    ruleName: "foo",
    result: {
      warn: _sinon2.default.spy(),
      stylelint: {
        disabledRanges: {
          all: [],
          bar: [{ start: 5, end: 8 }]
        }
      }
    },
    message: "bar",
    node: {
      positionBy: function positionBy() {
        return { line: 6 };
      }
    }
  };
  (0, _report2.default)(v);
  var spyArgs = v.result.warn.args[0];
  t.equal(spyArgs[0], "bar");
  t.equal(spyArgs[1].node, v.node);
  t.end();
});

(0, _tape2.default)("with relevant rule-specific disabledRange", function (t) {
  var v = {
    ruleName: "foo",
    result: {
      warn: _sinon2.default.spy(),
      stylelint: {
        disabledRanges: {
          all: [],
          foo: [{ start: 5, end: 8 }]
        }
      }
    },
    message: "bar",
    node: {
      positionBy: function positionBy() {
        return { line: 6 };
      }
    }
  };
  (0, _report2.default)(v);
  t.notOk(v.result.warn.called);
  t.end();
});

(0, _tape2.default)("with relevant general disabledRange, among others", function (t) {
  var v = {
    ruleName: "foo",
    result: {
      warn: _sinon2.default.spy(),
      stylelint: {
        disabledRanges: {
          all: [{ start: 1, end: 3 }, { start: 5, end: 8 }]
        }
      }
    },
    message: "bar",
    node: {
      positionBy: function positionBy() {
        return { line: 6 };
      }
    }
  };
  (0, _report2.default)(v);
  t.notOk(v.result.warn.called);
  t.end();
});

(0, _tape2.default)("with relevant rule-specific disabledRange, among others", function (t) {
  var v = {
    ruleName: "foo",
    result: {
      warn: _sinon2.default.spy(),
      stylelint: {
        disabledRanges: {
          all: [],
          foo: [{ start: 1, end: 3, rules: ["foo"] }, { start: 5, end: 8, rules: ["foo"] }]
        }
      }
    },
    message: "bar",
    node: {
      positionBy: function positionBy() {
        return { line: 6 };
      }
    }
  };
  (0, _report2.default)(v);
  t.notOk(v.result.warn.called);
  t.end();
});

(0, _tape2.default)("with quiet mode on and rule severity of 'warning'", function (t) {
  var v = {
    ruleName: "foo",
    result: {
      warn: _sinon2.default.spy(),
      stylelint: {
        quiet: true,
        ruleSeverities: {
          foo: "warning"
        }
      }
    },
    message: "bar",
    node: {
      positionBy: function positionBy() {
        return { line: 6 };
      }
    }
  };
  (0, _report2.default)(v);
  t.notOk(v.result.warn.called);
  t.end();
});

(0, _tape2.default)("with quiet mode on and rule severity of 'error'", function (t) {
  var v = {
    ruleName: "foo",
    result: {
      warn: _sinon2.default.spy(),
      stylelint: {
        quiet: true,
        ruleSeverities: {
          foo: "error"
        }
      }
    },
    message: "bar",
    node: {
      positionBy: function positionBy() {
        return { line: 6 };
      }
    }
  };
  (0, _report2.default)(v);
  t.ok(v.result.warn.called);
  t.end();
});