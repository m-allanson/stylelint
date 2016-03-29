"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _styleSearch = require("../styleSearch");

var _styleSearch2 = _interopRequireDefault(_styleSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("default options", function (t) {
  t.deepEqual(styleSearchResults({
    source: "abc cba",
    target: "c"
  }), [2, 4]);
  t.deepEqual(styleSearchResults({
    source: "abc cb",
    target: "a"
  }), [0]);
  t.deepEqual(styleSearchResults({
    source: "abc cba",
    target: "b"
  }), [1, 5]);
  t.end();
});

(0, _tape2.default)("`onlyOne` option", function (t) {
  t.deepEqual(styleSearchResults({
    source: "abc cba",
    target: "c",
    onlyOne: true
  }), [2]);
  t.deepEqual(styleSearchResults({
    source: "abc cba",
    target: "a",
    onlyOne: true
  }), [0]);
  t.deepEqual(styleSearchResults({
    source: "abc cba",
    target: "b",
    onlyOne: false
  }), [1, 5]);
  t.end();
});

(0, _tape2.default)("`withinFunctionalNotation` option", function (t) {
  t.deepEqual(styleSearchResults({
    source: "abc var(--cba)",
    target: "c",
    withinFunctionalNotation: true
  }), [10]);
  t.deepEqual(styleSearchResults({
    source: "abc var(--cba)",
    target: "a",
    withinFunctionalNotation: true
  }), [12]);
  t.deepEqual(styleSearchResults({
    source: "abc \"var(--cba)\"",
    target: "a",
    withinFunctionalNotation: true
  }), []);
  t.deepEqual(styleSearchResults({
    source: "translate(1px, calc(1px * 2))",
    target: "1",
    withinFunctionalNotation: true
  }), [10, 20]);
  t.deepEqual(styleSearchResults({
    source: "abc \"var(--cba)\"",
    target: "a",
    withinFunctionalNotation: false
  }), [0]);
  t.deepEqual(styleSearchResults({
    source: "var(--horse)",
    target: "v",
    withinFunctionalNotation: true
  }), []);
  t.end();
});

(0, _tape2.default)("`outsideFunctionalNotation` option", function (t) {
  t.deepEqual(styleSearchResults({
    source: "abc var(--cba)",
    target: "c",
    outsideFunctionalNotation: true
  }), [2]);
  t.deepEqual(styleSearchResults({
    source: "abc var(--cba)",
    target: "a",
    outsideFunctionalNotation: true
  }), [0]);
  t.deepEqual(styleSearchResults({
    source: "abc \"a var(--cba)\"",
    target: "a",
    outsideFunctionalNotation: true
  }), [0]);
  t.deepEqual(styleSearchResults({
    source: "translate(1px, calc(1px * 2))",
    target: "1",
    outsideFunctionalNotation: true
  }), []);
  t.deepEqual(styleSearchResults({
    source: "var(--horse)",
    target: "v",
    outsideFunctionalNotation: true
  }), []);
  t.end();
});

(0, _tape2.default)("ignores matches within single-quote strings", function (t) {
  t.deepEqual(styleSearchResults({
    source: "abc 'abc'",
    target: "c"
  }), [2]);
  t.deepEqual(styleSearchResults({
    source: "abc 'abc' cba",
    target: "c"
  }), [2, 10]);
  t.end();
});

(0, _tape2.default)("ignores matches within double-quote strings", function (t) {
  /* eslint-disable quotes */
  t.deepEqual(styleSearchResults({
    source: 'abc "abc"',
    target: "c"
  }), [2]);
  t.deepEqual(styleSearchResults({
    source: 'abc "abc" cba',
    target: "c"
  }), [2, 10]);
  t.end();
  /* eslint-enable quotes */
});

(0, _tape2.default)("`checkStrings` option", function (t) {
  t.deepEqual(styleSearchResults({
    source: "abc 'abc'",
    target: "b",
    checkStrings: true
  }), [1, 6]);

  t.deepEqual(styleSearchResults({
    source: "abc /* 'abc' */",
    target: "b",
    checkStrings: true
  }), [1], "no strings within comments");
  t.end();
});

(0, _tape2.default)("`withinStrings` option", function (t) {
  /* eslint-disable quotes */
  t.deepEqual(styleSearchResults({
    source: 'abc "abc"',
    target: "b",
    withinStrings: true
  }), [6]);

  t.deepEqual(styleSearchResults({
    source: "p[href^='https://']:before { content: \"\/*\"; \n  top: 0;\n}",
    target: "\n",
    withinStrings: true
  }), [], "comments do not start inside strings");
  /* eslint-enable quotes */

  t.end();
});

(0, _tape2.default)("ignores matches within comments", function (t) {
  t.deepEqual(styleSearchResults({
    source: "abc/*comment*/",
    target: "m"
  }), []);
  t.deepEqual(styleSearchResults({
    source: "abc/*command*/",
    target: "a"
  }), [0]);
  t.end();
});

(0, _tape2.default)("`checkComments` option", function (t) {
  t.deepEqual(styleSearchResults({
    source: "abc/*abc*/",
    target: "b",
    checkComments: true
  }), [1, 6]);
  t.end();
});

(0, _tape2.default)("`withinComments` option", function (t) {
  t.deepEqual(styleSearchResults({
    source: "abc/*abc*/",
    target: "b",
    withinComments: true
  }), [6]);

  t.deepEqual(styleSearchResults({
    source: "ab'c/*abc*/c'",
    target: "b",
    withinComments: true
  }), [], "no comments within strings");
  t.end();
});

(0, _tape2.default)("ignores matches within single-line comment", function (t) {
  t.deepEqual(styleSearchResults({
    source: "abc // comment",
    target: "m"
  }), []);
  t.deepEqual(styleSearchResults({
    source: "abc // command",
    target: "a"
  }), [0]);
  t.end();
});

(0, _tape2.default)("handles escaped double-quotes in double-quote strings", function (t) {
  /* eslint-disable quotes */
  t.deepEqual(styleSearchResults({
    source: 'abc "ab\\"c"',
    target: "c"
  }), [2]);
  t.deepEqual(styleSearchResults({
    source: 'abc "a\\"bc" foo cba',
    target: "c"
  }), [2, 16]);
  t.end();
  /* eslint-enable quotes */
});

(0, _tape2.default)("handles escaped double-quotes in single-quote strings", function (t) {
  t.deepEqual(styleSearchResults({
    source: "abc 'ab\\'c'",
    target: "c"
  }), [2]);
  t.deepEqual(styleSearchResults({
    source: "abc 'a\\'bc' foo cba",
    target: "c"
  }), [2, 16]);
  t.end();
});

(0, _tape2.default)("count", function (t) {
  var endCounts = [];
  (0, _styleSearch2.default)({ source: "123 123 123", target: "1" }, function (index, count) {
    endCounts.push(count);
  });
  t.deepEqual(endCounts, [1, 2, 3]);
  t.end();
});

(0, _tape2.default)("finds parentheses", function (t) {
  t.deepEqual(styleSearchResults({
    source: "a { color: rgb(0,0,0); }",
    target: "("
  }), [14]);
  t.deepEqual(styleSearchResults({
    source: "a { color: rgb(0,0,0); }",
    target: ")"
  }), [20]);
  t.end();
});

(0, _tape2.default)("finds function names on demand only", function (t) {
  t.deepEqual(styleSearchResults({
    source: "a { color: rgb(0,0,0); }",
    target: "rgb"
  }), []);
  t.deepEqual(styleSearchResults({
    source: "a { color: rgb(0,0,0); }",
    target: "rgb",
    checkFunctionNames: true
  }), [11]);
  t.end();
});

(0, _tape2.default)("non-single-character target", function (t) {
  t.deepEqual(styleSearchResults({
    source: "abc cba",
    target: "abc"
  }), [0]);
  t.deepEqual(styleSearchResults({
    source: "abc cba",
    target: "cb"
  }), [4]);
  t.deepEqual(styleSearchResults({
    source: "abc cba",
    target: "c c"
  }), [2]);
  t.deepEqual(styleSearchResults({
    source: "abc cba abc",
    target: "abc"
  }), [0, 8]);
  t.deepEqual(styleSearchResults({
    source: "abc cba 'abc'",
    target: "abc"
  }), [0]);
  t.deepEqual(styleSearchResults({
    source: "abc cb",
    target: "aa"
  }), []);
  t.end();
});

(0, _tape2.default)("array target", function (t) {
  t.deepEqual(styleSearchResults({
    source: "abc cba",
    target: ["a", "b"]
  }), [0, 1, 5, 6]);
  t.deepEqual(styleSearchResults({
    source: "abc cba",
    target: ["c", "b"]
  }), [1, 2, 4, 5]);
  t.deepEqual(styleSearchResults({
    source: "abc cba",
    target: ["bc", "a"]
  }), [0, 1, 6]);
  t.deepEqual(styleSearchResults({
    source: "abc cba",
    target: ["abc", "f"]
  }), [0]);
  t.deepEqual(styleSearchResults({
    source: "abc cba",
    target: [0, 1, 2]
  }), []);
  t.end();
});

(0, _tape2.default)("match object", function (t) {
  (0, _styleSearch2.default)({ source: "abc", target: "bc" }, function (match) {
    t.equal(match.startIndex, 1);
    t.equal(match.endIndex, 3);
    t.equal(match.target, "bc");
    t.equal(match.insideFunction, false);
    t.equal(match.insideComment, false);
  });

  var twoMatches = [];
  (0, _styleSearch2.default)({ source: "abc bca", target: ["bc ", "ca"] }, function (match) {
    twoMatches.push(match);
  });
  var firstMatch = twoMatches[0];
  var secondMatch = twoMatches[1];
  t.equal(firstMatch.startIndex, 1);
  t.equal(firstMatch.endIndex, 4);
  t.equal(firstMatch.target, "bc ");
  t.equal(firstMatch.insideFunction, false);
  t.equal(firstMatch.insideComment, false);
  t.equal(secondMatch.startIndex, 5);
  t.equal(secondMatch.endIndex, 7);
  t.equal(secondMatch.target, "ca");
  t.equal(secondMatch.insideFunction, false);
  t.equal(secondMatch.insideComment, false);

  t.test("match within a function", function (st) {
    (0, _styleSearch2.default)({ source: "a { color: rgb(0, 0, 1); }", target: "1" }, function (match) {
      st.equal(match.insideFunction, true);
      st.equal(match.insideComment, false);
      st.end();
    });
  });

  t.test("match within a comment", function (st) {
    (0, _styleSearch2.default)({ source: "a { color: /* 1 */ pink; }", target: "1", checkComments: true }, function (match) {
      st.equal(match.insideFunction, false);
      st.equal(match.insideComment, true);
      st.end();
    });
  });

  t.test("match within a block comment", function (st) {
    (0, _styleSearch2.default)({ source: "a { color:\n/**\n * 0\n * 1\n */\npink; }", target: "1", checkComments: true }, function (match) {
      st.equal(match.insideFunction, false);
      st.equal(match.insideComment, true);
      st.end();
    });
  });

  t.test("match within a comment within function", function (st) {
    (0, _styleSearch2.default)({ source: "a { color: rgb(0, 0, 0 /* 1 */); }", target: "1", checkComments: true }, function (match) {
      st.equal(match.insideFunction, true);
      st.equal(match.insideComment, true);
      st.end();
    });
  });

  t.end();
});

function styleSearchResults(options) {
  var results = [];
  (0, _styleSearch2.default)(options, function (match) {
    return results.push(match.startIndex);
  });
  return results;
}