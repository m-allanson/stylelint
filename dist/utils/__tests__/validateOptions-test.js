"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _validateOptions = require("../validateOptions");

var _validateOptions2 = _interopRequireDefault(_validateOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mockResult() {
  return { warn: _sinon2.default.spy() };
}

(0, _tape2.default)("validateOptions for primary options", function (t) {
  var result = mockResult();

  (0, _validateOptions2.default)(result, "foo", {
    possible: ["a", "b", "c"],
    actual: "a"
  });
  t.notOk(result.warn.calledOnce, "passing string equivalence");
  result.warn.reset();

  (0, _validateOptions2.default)(result, "foo", {
    possible: ["a", "b", "c"],
    actual: "d"
  });
  t.ok(result.warn.calledOnce, "failing string equivalence");
  t.ok(result.warn.calledWith("Invalid option value \"d\" for rule \"foo\""));
  result.warn.reset();

  (0, _validateOptions2.default)(result, "foo", {
    possible: [true, false],
    actual: false
  });
  t.notOk(result.warn.calledOnce, "passing boolean equivalence");
  result.warn.reset();

  (0, _validateOptions2.default)(result, "foo", {
    possible: [true, false],
    actual: "a"
  });
  t.ok(result.warn.calledOnce, "failing boolean equivalence");
  t.ok(result.warn.calledWith("Invalid option value \"a\" for rule \"foo\""));
  result.warn.reset();

  (0, _validateOptions2.default)(result, "bar", {
    possible: ["a", function (x) {
      return x > 2;
    }, "c"],
    actual: 3
  });
  t.notOk(result.warn.calledOnce, "passing evaluation");
  result.warn.reset();

  (0, _validateOptions2.default)(result, "bar", {
    possible: ["a", function (x) {
      return x > 2;
    }, "c"],
    actual: 1
  });
  t.ok(result.warn.calledOnce, "failing evaluation");
  t.ok(result.warn.calledWith("Invalid option value \"1\" for rule \"bar\""));
  result.warn.reset();

  (0, _validateOptions2.default)(result, "foo", {
    possible: [true, false],
    actual: undefined
  });
  t.ok(result.warn.calledOnce, "undefined `actual` with `possible` values and no `optional` option");
  t.ok(result.warn.calledWith("Expected option value for rule \"foo\""));
  result.warn.reset();

  t.end();
});

(0, _tape2.default)("validateOptions for secondary options objects", function (t) {
  var result = mockResult();

  var schema = {
    foo: ["always", "never"],
    bar: [function (x) {
      return typeof x === "number";
    }, "tab"]
  };

  (0, _validateOptions2.default)(result, "foo", {
    possible: schema,
    actual: { foo: "always", bar: 2 }
  });
  t.notOk(result.warn.called);
  result.warn.reset();

  (0, _validateOptions2.default)(result, "foo", {
    possible: schema,
    actual: { foo: "never", bar: "tab" }
  });
  t.notOk(result.warn.called);
  result.warn.reset();

  (0, _validateOptions2.default)(result, "bar", {
    possible: schema,
    actual: { foo: "neveer", bar: false }
  });
  t.ok(result.warn.calledTwice);
  t.ok(result.warn.calledWith("Invalid value \"neveer\" for option \"foo\" of rule \"bar\""));
  t.ok(result.warn.calledWith("Invalid value \"false\" for option \"bar\" of rule \"bar\""));
  result.warn.reset();

  (0, _validateOptions2.default)(result, "bar", {
    possible: schema,
    actual: { foo: "never", barr: 1 }
  });
  t.ok(result.warn.calledOnce);
  t.ok(result.warn.calledWith("Invalid option name \"barr\" for rule \"bar\""));
  result.warn.reset();

  (0, _validateOptions2.default)(result, "foo", {
    possible: [true, false],
    actual: undefined,
    optional: true
  });
  t.notOk(result.warn.calledOnce, "undefined `actual` with `possible` values and an `optional` option");
  result.warn.reset();

  (0, _validateOptions2.default)(result, "foo", {
    possible: schema,
    actual: 2
  });
  t.ok(result.warn.calledOnce, "possible is actual but actual is non-object");
  t.ok(result.warn.calledWith("Invalid option value 2 for rule \"foo\": should be an object"));
  result.warn.reset();

  t.end();
});

(0, _tape2.default)("validateOptions for secondary options objects with subarrays", function (t) {
  var result = mockResult();

  var schema = {
    bar: ["one", "two", "three", "four"]
  };

  (0, _validateOptions2.default)(result, "foo", {
    possible: schema,
    actual: { bar: ["one", "three"] }
  });
  t.notOk(result.warn.called);
  result.warn.reset();

  (0, _validateOptions2.default)(result, "foo", {
    possible: schema,
    actual: { bar: ["one", "three", "floor"] }
  });
  t.ok(result.warn.calledOnce);
  t.ok(result.warn.calledWith("Invalid value \"floor\" for option \"bar\" of rule \"foo\""));
  result.warn.reset();

  t.end();
});

(0, _tape2.default)("validateOptions for `*-no-*` rule with no valid options", function (t) {
  var result = mockResult();

  (0, _validateOptions2.default)(result, "no-dancing", {
    actual: undefined
  });
  t.notOk(result.warn.called, "with empty array as `possible`");
  result.warn.reset();

  (0, _validateOptions2.default)(result, "no-dancing", {
    actual: undefined
  });
  t.notOk(result.warn.called, "with `possible` left undefined");
  result.warn.reset();

  (0, _validateOptions2.default)(result, "no-dancing", {
    actual: "foo"
  });
  t.ok(result.warn.calledOnce);
  t.ok(result.warn.calledWith("Unexpected option value \"foo\" for rule \"no-dancing\""));
  result.warn.reset();

  (0, _validateOptions2.default)(result, "no-dancing", {
    actual: false
  });
  t.ok(result.warn.calledOnce);
  t.ok(result.warn.calledWith("Unexpected option value \"false\" for rule \"no-dancing\""));
  result.warn.reset();

  t.end();
});

(0, _tape2.default)("validateOptions for multiple actual/possible pairs, checking return value", function (t) {
  var result = mockResult();

  var validOptions = (0, _validateOptions2.default)(result, "foo", {
    possible: ["one", "two"],
    actual: "one"
  }, {
    possible: ["three", "four"],
    actual: "three"
  });
  t.equal(validOptions, true);
  t.notOk(result.warn.called);
  result.warn.reset();

  var invalidOptions = (0, _validateOptions2.default)(result, "foo", {
    possible: ["one", "two"],
    actual: "onne"
  }, {
    possible: ["three", "four"],
    actual: "threee"
  });
  t.equal(invalidOptions, false);
  t.ok(result.warn.calledTwice);
  t.ok(result.warn.calledWith("Invalid option value \"onne\" for rule \"foo\""));
  t.ok(result.warn.calledWith("Invalid option value \"threee\" for rule \"foo\""));
  result.warn.reset();

  t.end();
});

(0, _tape2.default)("validateOptions with a function for 'possible'", function (t) {
  var result = mockResult();
  var schema = function schema(x) {
    if (x === "bar") {
      return true;
    }
    if (!Array.isArray(x)) {
      return false;
    }
    if (x.every(function (item) {
      return typeof item === "string" || !!item.properties;
    })) {
      return true;
    }
    return false;
  };

  var validExplicitlyNamedString = (0, _validateOptions2.default)(result, "foo", {
    possible: schema,
    actual: "bar"
  });
  t.equal(validExplicitlyNamedString, true, "explicitly named string passes");
  t.notOk(result.warn.called);
  result.warn.reset();

  var validArrayOfStrings = (0, _validateOptions2.default)(result, "foo", {
    possible: schema,
    actual: ["one", "two", "three"]
  });
  t.equal(validArrayOfStrings, true, "array of strings passes");
  t.notOk(result.warn.called);
  result.warn.reset();

  var validArrayOfObjects = (0, _validateOptions2.default)(result, "foo", {
    possible: schema,
    actual: [{ properties: ["one"] }, { properties: ["two", "three"] }]
  });
  t.equal(validArrayOfObjects, true, "array of objects passes");
  t.notOk(result.warn.called);
  result.warn.reset();

  var validArrayOfObjectsAndStrings = (0, _validateOptions2.default)(result, "foo", {
    possible: schema,
    actual: [{ properties: ["one"] }, { properties: ["two", "three"] }, "four"]
  });
  t.equal(validArrayOfObjectsAndStrings, true, "array of mixed objects and strings passes");
  t.notOk(result.warn.called);
  result.warn.reset();

  var invalidObject = (0, _validateOptions2.default)(result, "foo", {
    possible: schema,
    actual: { properties: ["one"] }
  });
  t.equal(invalidObject, false, "invalid object fails");
  t.ok(result.warn.calledOnce);
  t.equal(result.warn.args[0][0], "Invalid option \"{\"properties\":[\"one\"]}\" for rule foo");
  result.warn.reset();

  t.end();
});