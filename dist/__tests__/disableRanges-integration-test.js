"use strict";

var _testRule = require("../testUtils/testRule.js");

var _testRule2 = _interopRequireDefault(_testRule);

var _blockNoEmpty = require("../rules/block-no-empty");

var _blockNoEmpty2 = _interopRequireDefault(_blockNoEmpty);

var _selectorCombinatorSpaceBefore = require("../rules/selector-combinator-space-before");

var _selectorCombinatorSpaceBefore2 = _interopRequireDefault(_selectorCombinatorSpaceBefore);

var _maxLineLength = require("../rules/max-line-length");

var _maxLineLength2 = _interopRequireDefault(_maxLineLength);

var _stringQuotes = require("../rules/string-quotes");

var _stringQuotes2 = _interopRequireDefault(_stringQuotes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// disabling all rules
(0, _testRule2.default)(_blockNoEmpty2.default, {
  ruleName: _blockNoEmpty.ruleName,
  config: [undefined],
  skipBasicChecks: true,

  accept: [{
    code: "/* stylelint-disable */\na {}"
  }, {
    code: "/* stylelint-disable-line */ a {}"
  }, {
    code: "a {} /* stylelint-disable-line */ "
  }, {
    code: "b { color: pink;}\n/* stylelint-disable */\na {}"
  }],

  reject: [{
    code: "a {}",
    message: _blockNoEmpty.messages.rejected
  }, {
    code: "a {}\n/* stylelint-disable */",
    message: _blockNoEmpty.messages.rejected
  }, {
    code: "a {}\n/* stylelint-disable-line */",
    message: _blockNoEmpty.messages.rejected
  }, {
    code: "/* stylelint-disable-line */\na {}",
    message: _blockNoEmpty.messages.rejected
  }]
});

(0, _testRule2.default)(_selectorCombinatorSpaceBefore2.default, {
  ruleName: _selectorCombinatorSpaceBefore.ruleName,
  config: ["always"],
  skipBasicChecks: true,

  reject: [{
    code: "a> b {}",
    message: _selectorCombinatorSpaceBefore.messages.expectedBefore(">")
  }]
});

(0, _testRule2.default)(_blockNoEmpty2.default, {
  ruleName: _blockNoEmpty.ruleName,
  config: [undefined],
  skipBasicChecks: true,

  accept: [{
    code: "/* stylelint-disable " + _blockNoEmpty.ruleName + " */\na {}"
  }, {
    code: "/* stylelint-disable-line " + _blockNoEmpty.ruleName + " */ a {}"
  }, {
    code: "a {} /* stylelint-disable-line " + _blockNoEmpty.ruleName + " */ "
  }],

  reject: [{
    code: "/* stylelint-disable declaration-no-important */\na {}",
    message: _blockNoEmpty.messages.rejected
  }, {
    code: "/* stylelint-disable-line declaration-no-important */\na {}",
    message: _blockNoEmpty.messages.rejected
  }, {
    code: "/* stylelint-disable-line " + _blockNoEmpty.ruleName + " */ a {}\nb {}",
    message: _blockNoEmpty.messages.rejected,
    line: 2,
    column: 3
  }]
});

(0, _testRule2.default)(_selectorCombinatorSpaceBefore2.default, {
  ruleName: _selectorCombinatorSpaceBefore.ruleName,
  config: ["always"],
  skipBasicChecks: true,

  accept: [{
    code: "/* stylelint-disable declaration-no-important, selector-combinator-space-before */ a> b {}"
  }, {
    code: "/* stylelint-disable-line declaration-no-important, selector-combinator-space-before */ a> b {}"
  }, {
    code: "a> b {} /* stylelint-disable-line declaration-no-important, selector-combinator-space-before */"
  }],

  reject: [{
    code: "/* stylelint-disable declaration-no-important */ a> b {}",
    message: _selectorCombinatorSpaceBefore.messages.expectedBefore(">")
  }, {
    code: "/* stylelint-disable-line declaration-no-important */\na> b {}",
    message: _selectorCombinatorSpaceBefore.messages.expectedBefore(">")
  }]
});

(0, _testRule2.default)(_blockNoEmpty2.default, {
  ruleName: _blockNoEmpty.ruleName,
  config: [undefined],
  skipBasicChecks: true,

  accept: [{
    code: "\n      /* stylelint-disable */\n      a {}\n      /* stylelint-enable */\n      /* stylelint-disable */\n      a {}\n    "
  }],

  reject: [{
    code: "\n      /* stylelint-disable */\n      a {}\n      /* stylelint-enable */\n      a {}\n    ",

    message: _blockNoEmpty.messages.rejected
  }]
});

(0, _testRule2.default)(_maxLineLength2.default, {
  ruleName: _maxLineLength.ruleName,
  config: [80],
  skipBasicChecks: true,

  accept: [{
    code: "\n      /* stylelint-disable */\n      .abracadabracadabra { background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba (255, 255, 255, 1)); }\n      /* stylelint-enable */\n    "
  }, {
    code: "\n      /* stylelint-disable-line */ .abracadabracadabra { background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba (255, 255, 255, 1)); }\n    "
  }, {
    code: "\n      /* stylelint-disable max-line-length */\n      .abracadabracadabra { background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba (255, 255, 255, 1)); }\n      /* stylelint-enable max-line-length */\n    "
  }, {
    code: "\n      .abracadabracadabra { background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba (255, 255, 255, 1)); } /* stylelint-disable-line max-line-length */\n    "
  }],

  reject: [{
    code: "\n      /* stylelint-disable block-no-empty */\n      .abracadabracadabra { background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba (255, 255, 255, 1)); }\n      /* stylelint-enable block-no-empty */\n    ",

    message: _maxLineLength.messages.expected(80)
  }, {
    code: "\n      /* stylelint-disable-line */\n      .abracadabracadabra { background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba (255, 255, 255, 1)); }\n    ",

    message: _maxLineLength.messages.expected(80)
  }, {
    code: "\n      .abracadabracadabra { background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba (255, 255, 255, 1)); }\n      /* stylelint-disable-line */\n    ",

    message: _maxLineLength.messages.expected(80)
  }, {
    code: "\n      /* stylelint-disable max-line-length */\n      .abracadabracadabra { background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba (255, 255, 255, 1)); }\n      /* stylelint-enable max-line-length */\n      .abracadabracadabra { background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba (255, 255, 255, 1)); }\n    ",

    message: _maxLineLength.messages.expected(80)
  }]
});

(0, _testRule2.default)(_stringQuotes2.default, {
  ruleName: _stringQuotes.ruleName,
  config: ["single"],
  skipBasicChecks: true,

  accept: [{
    code: "\n      /* stylelint-disable */\n      .foo { content: \"horse\"; }\n      /* stylelint-enable */\n    "
  }, {
    code: "\n      /* stylelint-disable string-quotes */\n      .foo { content: \"horse\"; }\n      /* stylelint-enable string-quotes */\n    "
  }],

  reject: [{
    code: "\n      /* stylelint-disable block-no-empty */\n      .foo { content: \"horse\"; }\n      /* stylelint-enable block-no-empty */\n    ",

    message: _stringQuotes.messages.expected("single")
  }, {
    code: "\n      /* stylelint-disable string-quotes */\n      .foo { content: \"horse\"; }\n      /* stylelint-enable string-quotes */\n      .foo { content: \"horse\"; }\n    ",

    message: _stringQuotes.messages.expected("single")
  }]
});