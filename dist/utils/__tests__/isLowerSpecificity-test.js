"use strict";

var _isLowerSpecificity = require("../isLowerSpecificity");

var _isLowerSpecificity2 = _interopRequireDefault(_isLowerSpecificity);

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("isLowerSpecificity", function (t) {
  t.ok((0, _isLowerSpecificity2.default)("0,0,0,1", "0,0,0,2"));
  t.notOk((0, _isLowerSpecificity2.default)("0,0,1,0", "0,0,0,2"));

  t.ok((0, _isLowerSpecificity2.default)([0, 0, 999, 999], [0, 1, 0, 0]));
  t.ok((0, _isLowerSpecificity2.default)([0, 999, 999, 999], [0, 1000, 0, 0]));

  t.end();
});