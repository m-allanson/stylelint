"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (targetWhitespace, expectation, messages) {

  // Keep track of active arguments in order to avoid passing
  // too much stuff around, making signatures long and confusing.
  // This variable gets reset anytime a checking function is called.
  var activeArgs = void 0;

  /**
   * Check for whitespace *before* a character.
   *
   * @param {object} args - Named arguments object
   * @param {string} args.source - The source string
   * @param {number} args.index - The index of the character to check before
   * @param {function} args.err - If a violation is found, this callback
   *   will be invoked with the relevant warning message.
   *   Typically this callback will report() the violation.
   * @param {string} [args.lineCheckStr] - Single- and multi-line checkers
   *   will use this string to determine whether they should proceed,
   *   i.e. if this string is one line only, single-line checkers will check,
   *   multi-line checkers will ignore.
   *   If none is passed, they will use `source`.
   * @param {boolean} [args.onlyOneChar=false] - Only check *one* character before.
   *   By default, "always-*" checks will look for the `targetWhitespace` one
   *   before and then ensure there is no whitespace two before. This option
   *   bypasses that second check.
   * @param {boolean} [args.allowIndentation=false] - Allow arbitrary indentation
   *   between the `targetWhitespace` (almost definitely a newline) and the `index`.
   *   With this option, the checker will see if a newline *begins* the whitespace before
   *   the `index`.
   */
  function before(_ref) {
    var source = _ref.source;
    var index = _ref.index;
    var err = _ref.err;
    var lineCheckStr = _ref.lineCheckStr;
    var _ref$onlyOneChar = _ref.onlyOneChar;
    var onlyOneChar = _ref$onlyOneChar === undefined ? false : _ref$onlyOneChar;
    var _ref$allowIndentation = _ref.allowIndentation;
    var allowIndentation = _ref$allowIndentation === undefined ? false : _ref$allowIndentation;

    activeArgs = { source: source, index: index, err: err, onlyOneChar: onlyOneChar, allowIndentation: allowIndentation };
    switch (expectation) {
      case "always":
        expectBefore();
        break;
      case "never":
        rejectBefore();
        break;
      case "always-single-line":
        if (!(0, _isSingleLineString2.default)(lineCheckStr || source)) {
          return;
        }
        expectBefore(messages.expectedBeforeSingleLine);
        break;
      case "never-single-line":
        if (!(0, _isSingleLineString2.default)(lineCheckStr || source)) {
          return;
        }
        rejectBefore(messages.rejectedBeforeSingleLine);
        break;
      case "always-multi-line":
        if ((0, _isSingleLineString2.default)(lineCheckStr || source)) {
          return;
        }
        expectBefore(messages.expectedBeforeMultiLine);
        break;
      case "never-multi-line":
        if ((0, _isSingleLineString2.default)(lineCheckStr || source)) {
          return;
        }
        rejectBefore(messages.rejectedBeforeMultiLine);
        break;
      default:
        throw (0, _configurationError2.default)("Unknown expectation \"" + expectation + "\"");
    }
  }

  /**
   * Check for whitespace *after* a character.
   *
   * Parameters are pretty much the same as for `before()`, above, just substitute
   * the word "after" for "before".
   */
  function after(_ref2) {
    var source = _ref2.source;
    var index = _ref2.index;
    var err = _ref2.err;
    var lineCheckStr = _ref2.lineCheckStr;
    var _ref2$onlyOneChar = _ref2.onlyOneChar;
    var onlyOneChar = _ref2$onlyOneChar === undefined ? false : _ref2$onlyOneChar;

    activeArgs = { source: source, index: index, err: err, onlyOneChar: onlyOneChar };
    switch (expectation) {
      case "always":
        expectAfter();
        break;
      case "never":
        rejectAfter();
        break;
      case "always-single-line":
        if (!(0, _isSingleLineString2.default)(lineCheckStr || source)) {
          return;
        }
        expectAfter(messages.expectedAfterSingleLine);
        break;
      case "never-single-line":
        if (!(0, _isSingleLineString2.default)(lineCheckStr || source)) {
          return;
        }
        rejectAfter(messages.rejectedAfterSingleLine);
        break;
      case "always-multi-line":
        if ((0, _isSingleLineString2.default)(lineCheckStr || source)) {
          return;
        }
        expectAfter(messages.expectedAfterMultiLine);
        break;
      case "never-multi-line":
        if ((0, _isSingleLineString2.default)(lineCheckStr || source)) {
          return;
        }
        rejectAfter(messages.rejectedAfterMultiLine);
        break;
      default:
        throw (0, _configurationError2.default)("Unknown expectation \"" + expectation + "\"");
    }
  }

  function beforeAllowingIndentation(obj) {
    before((0, _lodash.assign)({}, obj, { allowIndentation: true }));
  }

  function expectBefore() {
    var messageFunc = arguments.length <= 0 || arguments[0] === undefined ? messages.expectedBefore : arguments[0];

    if (activeArgs.allowIndentation) {
      expectBeforeAllowingIndentation(messageFunc);
      return;
    }

    var _activeArgs = activeArgs;
    var source = _activeArgs.source;
    var index = _activeArgs.index;

    var oneCharBefore = source[index - 1];
    var twoCharsBefore = source[index - 2];

    if (!isValue(oneCharBefore)) {
      return;
    }

    if (targetWhitespace === "newline") {
      // If index is preceeded by a Windows CR-LF ...
      if (oneCharBefore === "\n" && twoCharsBefore === "\r") {
        if (activeArgs.onlyOneChar || !(0, _isWhitespace2.default)(source[index - 3])) {
          return;
        }
      }

      // If index is followed by a Unix LF ...
      if (oneCharBefore === "\n" && twoCharsBefore !== "\r") {
        if (activeArgs.onlyOneChar || !(0, _isWhitespace2.default)(twoCharsBefore)) {
          return;
        }
      }
    }

    if (targetWhitespace === "space" && oneCharBefore === " ") {
      if (activeArgs.onlyOneChar || !(0, _isWhitespace2.default)(twoCharsBefore)) {
        return;
      }
    }

    activeArgs.err(messageFunc(source[index]));
  }

  function expectBeforeAllowingIndentation() {
    var messageFunc = arguments.length <= 0 || arguments[0] === undefined ? messages.expectedBefore : arguments[0];
    var _activeArgs2 = activeArgs;
    var source = _activeArgs2.source;
    var index = _activeArgs2.index;
    var err = _activeArgs2.err;

    var expectedChar = function () {
      if (targetWhitespace === "newline") {
        return "\n";
      }
      if (targetWhitespace === "space") {
        return " ";
      }
    }();
    var i = index - 1;
    while (source[i] !== expectedChar) {
      if (source[i] === "\t" || source[i] === " ") {
        i--;
        continue;
      }
      err(messageFunc(source[index]));
      return;
    }
  }

  function rejectBefore() {
    var messageFunc = arguments.length <= 0 || arguments[0] === undefined ? messages.rejectedBefore : arguments[0];
    var _activeArgs3 = activeArgs;
    var source = _activeArgs3.source;
    var index = _activeArgs3.index;

    var oneCharBefore = source[index - 1];

    if (isValue(oneCharBefore) && (0, _isWhitespace2.default)(oneCharBefore)) {
      activeArgs.err(messageFunc(source[index]));
    }
  }

  function afterOneOnly(obj) {
    after((0, _lodash.assign)({}, obj, { onlyOneChar: true }));
  }

  function expectAfter() {
    var messageFunc = arguments.length <= 0 || arguments[0] === undefined ? messages.expectedAfter : arguments[0];
    var _activeArgs4 = activeArgs;
    var source = _activeArgs4.source;
    var index = _activeArgs4.index;


    var oneCharAfter = source[index + 1];
    var twoCharsAfter = source[index + 2];

    if (!isValue(oneCharAfter)) {
      return;
    }

    if (targetWhitespace === "newline") {
      // If index is followed by a Windows CR-LF ...
      if (oneCharAfter === "\r" && twoCharsAfter === "\n") {
        if (activeArgs.onlyOneChar || !(0, _isWhitespace2.default)(source[index + 3])) {
          return;
        }
      }

      // If index is followed by a Unix LF ...
      if (oneCharAfter === "\n") {
        if (activeArgs.onlyOneChar || !(0, _isWhitespace2.default)(twoCharsAfter)) {
          return;
        }
      }
    }

    if (targetWhitespace === "space" && oneCharAfter === " ") {
      if (activeArgs.onlyOneChar || !(0, _isWhitespace2.default)(twoCharsAfter)) {
        return;
      }
    }

    activeArgs.err(messageFunc(source[index]));
  }

  function rejectAfter() {
    var messageFunc = arguments.length <= 0 || arguments[0] === undefined ? messages.rejectedAfter : arguments[0];
    var _activeArgs5 = activeArgs;
    var source = _activeArgs5.source;
    var index = _activeArgs5.index;

    var oneCharAfter = source[index + 1];

    if (isValue(oneCharAfter) && (0, _isWhitespace2.default)(oneCharAfter)) {
      activeArgs.err(messageFunc(source[index]));
    }
  }

  return {
    before: before,
    beforeAllowingIndentation: beforeAllowingIndentation,
    after: after,
    afterOneOnly: afterOneOnly
  };
};

var _lodash = require("lodash");

var _isWhitespace = require("./isWhitespace");

var _isWhitespace2 = _interopRequireDefault(_isWhitespace);

var _isSingleLineString = require("./isSingleLineString");

var _isSingleLineString2 = _interopRequireDefault(_isSingleLineString);

var _configurationError = require("./configurationError");

var _configurationError2 = _interopRequireDefault(_configurationError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isValue(x) {
  return x !== undefined && x !== null;
}

/**
 * Create a whitespaceChecker, which exposes the following functions:
 * - `before()`
 * - `beforeAllowingIndentation()`
 * - `after()`
 * - `afterOneOnly()`
 *
 * @param {"space"|"newline"} targetWhitespace - This is a keyword instead
 *   of the actual character (e.g. " ") in order to accommodate
 *   different styles of newline ("\n" vs "\r\n")
 * @param {
 *     "always"|"never"
 *     |"always-single-line"|"always-multi-line"
 *     | "never-single-line"|"never-multi-line"
 *   } expectation
 * @param {object} messages - An object of message functions;
 *   calling `before*()` or `after*()` and the `expectation` that is passed
 *   determines which message functions are required
 * @param {function} [messages.exectedBefore]
 * @param {function} [messages.rejectedBefore]
 * @param {function} [messages.expectedAfter]
 * @param {function} [messages.rejectedAfter]
 * @param {function} [messages.expectedBeforeSingleLine]
 * @param {function} [messages.rejectedBeforeSingleLine]
 * @param {function} [messages.expectedBeforeMultiLine]
 * @param {function} [messages.rejectedBeforeMultiLine]
 * @return {object} The checker, with its exposed checking functions
 */