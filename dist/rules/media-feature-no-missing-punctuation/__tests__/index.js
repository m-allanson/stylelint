"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [true],

  accept: [{
    code: "@nonsense (min-width max-width no-width) {}"
  }, {
    code: "@import 'foo.css';"
  }, {
    code: "@if {} @else {}"
  }, {
    code: "@media (min-width: 300px) {}"
  }, {
    code: "@media ( min-width: 300px ) {}"
  }, {
    code: "@media (min-width   :\t300px) {}"
  }, {
    code: "@media ( min-width   :\t300px ) {}"
  }, {
    code: "@media (width > 20em) {}"
  }, {
    code: "@media (width> 20em) {}"
  }, {
    code: "@media (width >20em) {}"
  }, {
    code: "@media (width>20em) {}"
  }, {
    code: "@media (10px <= width < 20em) {}"
  }, {
    code: "@media (10px<= width < 20em) {}"
  }, {
    code: "@media (10px<= width <20em) {}"
  }, {
    code: "@media only screen and (min-width: 300px) and (max-width: 600px) {}"
  }, {
    code: "@media only screen and ( min-width: 300px ) and ( max-width: 600px ) {}"
  }, {
    code: "@media (color) {}"
  }],

  reject: [{
    code: "@media (min-width 300px) {}",
    message: _.messages.rejected,
    line: 1,
    column: 8
  }, {
    code: "@media (min-width   \t300px)",
    message: _.messages.rejected
  }, {
    code: "@media (10px width <= 20em)",
    message: _.messages.rejected
  }, {
    code: "@media (10px <= width 20em  )",
    message: _.messages.rejected
  }, {
    code: "@media only screen\n  and (min-width: 300px)\n  and (max-width 600px) {}",
    message: _.messages.rejected,
    line: 3,
    column: 7
  }, {
    code: "@media (color),\n  (min-width: 300px)\n  and (max-width 600px) {}",
    message: _.messages.rejected,
    line: 3,
    column: 7
  }]
});