"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options, callback) {
  var source = options.source;
  var target = options.target;


  var insideString = false;
  var insideComment = false;
  var insideSingleLineComment = false;
  var insideFunction = false;
  var openingParenCount = 0;
  var matchCount = 0;
  var openingQuote = void 0;

  var ignoreStrings = !options.checkStrings && !options.withinStrings;
  var ignoreComments = !options.checkComments && !options.withinComments;

  var targetIsArray = Array.isArray(target);

  // If the target is just a string, it is easy to check whether
  // some index of the source matches it.
  // If the target is an array of strings, though, we have to
  // check whether some index of the source mathces *any* of
  // those target strings (stopping after the first match).
  var checkAgainstTarget = function () {
    if (!targetIsArray) {
      return checkChar.bind(null, target);
    }
    return function (index) {
      for (var ti = 0, tl = target.length; ti < tl; ti++) {
        var checkResult = checkChar(target[ti], index);
        if (checkResult) {
          return checkResult;
        }
      }
      return false;
    };
  }();

  function checkChar(targetString, index) {
    var targetStringLength = targetString.length;

    // Target is a single character
    if (targetStringLength === 1 && source[index] !== targetString) {
      return false;
    }

    // Target is multiple characters
    if (source.substr(index, targetStringLength) !== targetString) {
      return false;
    }

    return {
      insideFunction: insideFunction,
      insideComment: insideComment,
      insideString: insideString,
      startIndex: index,
      endIndex: index + targetStringLength,
      target: targetString
    };
  }

  for (var i = 0, l = source.length; i < l; i++) {

    var currentChar = source[i];

    // Register the beginning of a comment
    if (!insideString && !insideComment && currentChar === "/" && source[i - 1] !== "\\" // escaping
    ) {
        if (source[i + 1] === "*") {
          insideComment = true;
          continue;
        }
        // single-line
        if (source[i + 1] === "/") {
          insideComment = true;
          insideSingleLineComment = true;
          continue;
        }
      }

    // Register the end of a (standard) comment
    if (insideComment && !insideSingleLineComment && currentChar === "*" && source[i - 1] !== "\\" // escaping
     && source[i + 1] === "/") {
      insideComment = false;
      continue;
    }

    // Register the end of a single-line comment
    if (insideComment && insideSingleLineComment && currentChar === "\n") {
      insideComment = false;
      insideSingleLineComment = false;
    }

    if (insideComment && ignoreComments) {
      continue;
    }

    // Register the beginning of a string
    if (!insideComment && !insideString && (currentChar === "\"" || currentChar === "'")) {
      if (source[i - 1] === "\\") {
        continue;
      } // escaping

      openingQuote = currentChar;
      insideString = true;

      // For string-quotes rule
      if (target === currentChar) {
        matchFound(checkAgainstTarget(i));
      }
      continue;
    }

    if (insideString) {
      // Register the end of a string
      if (currentChar === openingQuote) {
        if (source[i - 1] === "\\") {
          continue;
        } // escaping
        insideString = false;
        continue;
      }
    }

    if (insideString && ignoreStrings) {
      continue;
    }

    // Register the beginning of a function
    if (currentChar === "(") {
      // Keep track of opening parentheses so that we
      // know when the outermost function (possibly
      // containing nested functions) is closing
      openingParenCount++;
      insideFunction = true;
      if (target === "(") {
        matchFound(checkAgainstTarget(i));
      }
      continue;
    }

    // Register the end of a function
    if (currentChar === ")") {
      openingParenCount--;
      if (openingParenCount === 0) {
        insideFunction = false;
      }
      if (target === ")") {
        matchFound(checkAgainstTarget(i));
      }
      continue;
    }

    // If this char is part of a function name, ignore it
    if (!options.checkFunctionNames && /^[a-zA-Z]*\(/.test(source.slice(i))) {
      continue;
    }

    var match = checkAgainstTarget(i);

    if (!match) {
      continue;
    }

    if (options.withinFunctionalNotation && !insideFunction) {
      continue;
    }
    if (options.outsideFunctionalNotation && insideFunction) {
      continue;
    }
    if (options.withinStrings && !insideString) {
      continue;
    }
    if (options.withinComments && !insideComment) {
      continue;
    }
    matchFound(match);
    if (options.onlyOne) {
      return;
    }
  }

  function matchFound(match) {
    matchCount++;
    callback(match, matchCount);
  }
};