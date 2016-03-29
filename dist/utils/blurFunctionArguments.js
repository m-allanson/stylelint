"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (source, functionName) {
  var blurChar = arguments.length <= 2 || arguments[2] === undefined ? "`" : arguments[2];

  var nameWithParen = functionName + "(";
  if (!_lodash2.default.includes(source, nameWithParen)) {
    return source;
  }

  var functionNameLength = functionName.length;

  var result = source;
  var searchStartIndex = 0;
  while (source.indexOf(nameWithParen, searchStartIndex) !== -1) {
    var openingParenIndex = source.indexOf(nameWithParen, searchStartIndex) + functionNameLength;
    var closingParenIndex = (0, _balancedMatch2.default)("(", ")", source.slice(openingParenIndex)).end + openingParenIndex;
    var argumentsLength = closingParenIndex - openingParenIndex - 1;
    result = result.slice(0, openingParenIndex + 1) + _lodash2.default.repeat(blurChar, argumentsLength) + result.slice(closingParenIndex);
    searchStartIndex = closingParenIndex;
  }
  return result;
};

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _balancedMatch = require("balanced-match");

var _balancedMatch2 = _interopRequireDefault(_balancedMatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }