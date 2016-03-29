"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atRuleSemicolonNewlineAfter = require("./at-rule-semicolon-newline-after");

var _atRuleSemicolonNewlineAfter2 = _interopRequireDefault(_atRuleSemicolonNewlineAfter);

var _atRuleEmptyLineBefore = require("./at-rule-empty-line-before");

var _atRuleEmptyLineBefore2 = _interopRequireDefault(_atRuleEmptyLineBefore);

var _atRuleNoVendorPrefix = require("./at-rule-no-vendor-prefix");

var _atRuleNoVendorPrefix2 = _interopRequireDefault(_atRuleNoVendorPrefix);

var _blockClosingBraceNewlineAfter = require("./block-closing-brace-newline-after");

var _blockClosingBraceNewlineAfter2 = _interopRequireDefault(_blockClosingBraceNewlineAfter);

var _blockClosingBraceNewlineBefore = require("./block-closing-brace-newline-before");

var _blockClosingBraceNewlineBefore2 = _interopRequireDefault(_blockClosingBraceNewlineBefore);

var _blockClosingBraceSpaceAfter = require("./block-closing-brace-space-after");

var _blockClosingBraceSpaceAfter2 = _interopRequireDefault(_blockClosingBraceSpaceAfter);

var _blockClosingBraceSpaceBefore = require("./block-closing-brace-space-before");

var _blockClosingBraceSpaceBefore2 = _interopRequireDefault(_blockClosingBraceSpaceBefore);

var _blockNoEmpty = require("./block-no-empty");

var _blockNoEmpty2 = _interopRequireDefault(_blockNoEmpty);

var _blockNoSingleLine = require("./block-no-single-line");

var _blockNoSingleLine2 = _interopRequireDefault(_blockNoSingleLine);

var _blockOpeningBraceNewlineAfter = require("./block-opening-brace-newline-after");

var _blockOpeningBraceNewlineAfter2 = _interopRequireDefault(_blockOpeningBraceNewlineAfter);

var _blockOpeningBraceNewlineBefore = require("./block-opening-brace-newline-before");

var _blockOpeningBraceNewlineBefore2 = _interopRequireDefault(_blockOpeningBraceNewlineBefore);

var _blockOpeningBraceSpaceAfter = require("./block-opening-brace-space-after");

var _blockOpeningBraceSpaceAfter2 = _interopRequireDefault(_blockOpeningBraceSpaceAfter);

var _blockOpeningBraceSpaceBefore = require("./block-opening-brace-space-before");

var _blockOpeningBraceSpaceBefore2 = _interopRequireDefault(_blockOpeningBraceSpaceBefore);

var _colorHexCase = require("./color-hex-case");

var _colorHexCase2 = _interopRequireDefault(_colorHexCase);

var _colorHexLength = require("./color-hex-length");

var _colorHexLength2 = _interopRequireDefault(_colorHexLength);

var _colorNamed = require("./color-named");

var _colorNamed2 = _interopRequireDefault(_colorNamed);

var _colorNoHex = require("./color-no-hex");

var _colorNoHex2 = _interopRequireDefault(_colorNoHex);

var _colorNoInvalidHex = require("./color-no-invalid-hex");

var _colorNoInvalidHex2 = _interopRequireDefault(_colorNoInvalidHex);

var _commentEmptyLineBefore = require("./comment-empty-line-before");

var _commentEmptyLineBefore2 = _interopRequireDefault(_commentEmptyLineBefore);

var _commentWhitespaceInside = require("./comment-whitespace-inside");

var _commentWhitespaceInside2 = _interopRequireDefault(_commentWhitespaceInside);

var _customMediaPattern = require("./custom-media-pattern");

var _customMediaPattern2 = _interopRequireDefault(_customMediaPattern);

var _customPropertyNoOutsideRoot = require("./custom-property-no-outside-root");

var _customPropertyNoOutsideRoot2 = _interopRequireDefault(_customPropertyNoOutsideRoot);

var _customPropertyPattern = require("./custom-property-pattern");

var _customPropertyPattern2 = _interopRequireDefault(_customPropertyPattern);

var _declarationBangSpaceAfter = require("./declaration-bang-space-after");

var _declarationBangSpaceAfter2 = _interopRequireDefault(_declarationBangSpaceAfter);

var _declarationBangSpaceBefore = require("./declaration-bang-space-before");

var _declarationBangSpaceBefore2 = _interopRequireDefault(_declarationBangSpaceBefore);

var _declarationBlockNoDuplicateProperties = require("./declaration-block-no-duplicate-properties");

var _declarationBlockNoDuplicateProperties2 = _interopRequireDefault(_declarationBlockNoDuplicateProperties);

var _declarationBlockNoShorthandPropertyOverrides = require("./declaration-block-no-shorthand-property-overrides");

var _declarationBlockNoShorthandPropertyOverrides2 = _interopRequireDefault(_declarationBlockNoShorthandPropertyOverrides);

var _declarationBlockPropertiesOrder = require("./declaration-block-properties-order");

var _declarationBlockPropertiesOrder2 = _interopRequireDefault(_declarationBlockPropertiesOrder);

var _declarationBlockSemicolonNewlineAfter = require("./declaration-block-semicolon-newline-after");

var _declarationBlockSemicolonNewlineAfter2 = _interopRequireDefault(_declarationBlockSemicolonNewlineAfter);

var _declarationBlockSemicolonNewlineBefore = require("./declaration-block-semicolon-newline-before");

var _declarationBlockSemicolonNewlineBefore2 = _interopRequireDefault(_declarationBlockSemicolonNewlineBefore);

var _declarationBlockSemicolonSpaceAfter = require("./declaration-block-semicolon-space-after");

var _declarationBlockSemicolonSpaceAfter2 = _interopRequireDefault(_declarationBlockSemicolonSpaceAfter);

var _declarationBlockSemicolonSpaceBefore = require("./declaration-block-semicolon-space-before");

var _declarationBlockSemicolonSpaceBefore2 = _interopRequireDefault(_declarationBlockSemicolonSpaceBefore);

var _declarationBlockSingleLineMaxDeclarations = require("./declaration-block-single-line-max-declarations");

var _declarationBlockSingleLineMaxDeclarations2 = _interopRequireDefault(_declarationBlockSingleLineMaxDeclarations);

var _declarationBlockTrailingSemicolon = require("./declaration-block-trailing-semicolon");

var _declarationBlockTrailingSemicolon2 = _interopRequireDefault(_declarationBlockTrailingSemicolon);

var _declarationColonNewlineAfter = require("./declaration-colon-newline-after");

var _declarationColonNewlineAfter2 = _interopRequireDefault(_declarationColonNewlineAfter);

var _declarationColonSpaceAfter = require("./declaration-colon-space-after");

var _declarationColonSpaceAfter2 = _interopRequireDefault(_declarationColonSpaceAfter);

var _declarationColonSpaceBefore = require("./declaration-colon-space-before");

var _declarationColonSpaceBefore2 = _interopRequireDefault(_declarationColonSpaceBefore);

var _declarationNoImportant = require("./declaration-no-important");

var _declarationNoImportant2 = _interopRequireDefault(_declarationNoImportant);

var _fontFamilyNameQuotes = require("./font-family-name-quotes");

var _fontFamilyNameQuotes2 = _interopRequireDefault(_fontFamilyNameQuotes);

var _fontWeightNotation = require("./font-weight-notation");

var _fontWeightNotation2 = _interopRequireDefault(_fontWeightNotation);

var _functionBlacklist = require("./function-blacklist");

var _functionBlacklist2 = _interopRequireDefault(_functionBlacklist);

var _functionCalcNoUnspacedOperator = require("./function-calc-no-unspaced-operator");

var _functionCalcNoUnspacedOperator2 = _interopRequireDefault(_functionCalcNoUnspacedOperator);

var _functionCommaNewlineAfter = require("./function-comma-newline-after");

var _functionCommaNewlineAfter2 = _interopRequireDefault(_functionCommaNewlineAfter);

var _functionCommaNewlineBefore = require("./function-comma-newline-before");

var _functionCommaNewlineBefore2 = _interopRequireDefault(_functionCommaNewlineBefore);

var _functionCommaSpaceAfter = require("./function-comma-space-after");

var _functionCommaSpaceAfter2 = _interopRequireDefault(_functionCommaSpaceAfter);

var _functionCommaSpaceBefore = require("./function-comma-space-before");

var _functionCommaSpaceBefore2 = _interopRequireDefault(_functionCommaSpaceBefore);

var _functionLinearGradientNoNonstandardDirection = require("./function-linear-gradient-no-nonstandard-direction");

var _functionLinearGradientNoNonstandardDirection2 = _interopRequireDefault(_functionLinearGradientNoNonstandardDirection);

var _functionMaxEmptyLines = require("./function-max-empty-lines");

var _functionMaxEmptyLines2 = _interopRequireDefault(_functionMaxEmptyLines);

var _functionParenthesesNewlineInside = require("./function-parentheses-newline-inside");

var _functionParenthesesNewlineInside2 = _interopRequireDefault(_functionParenthesesNewlineInside);

var _functionParenthesesSpaceInside = require("./function-parentheses-space-inside");

var _functionParenthesesSpaceInside2 = _interopRequireDefault(_functionParenthesesSpaceInside);

var _functionUrlQuotes = require("./function-url-quotes");

var _functionUrlQuotes2 = _interopRequireDefault(_functionUrlQuotes);

var _functionWhitelist = require("./function-whitelist");

var _functionWhitelist2 = _interopRequireDefault(_functionWhitelist);

var _functionWhitespaceAfter = require("./function-whitespace-after");

var _functionWhitespaceAfter2 = _interopRequireDefault(_functionWhitespaceAfter);

var _indentation = require("./indentation");

var _indentation2 = _interopRequireDefault(_indentation);

var _maxEmptyLines = require("./max-empty-lines");

var _maxEmptyLines2 = _interopRequireDefault(_maxEmptyLines);

var _maxLineLength = require("./max-line-length");

var _maxLineLength2 = _interopRequireDefault(_maxLineLength);

var _maxNestingDepth = require("./max-nesting-depth");

var _maxNestingDepth2 = _interopRequireDefault(_maxNestingDepth);

var _mediaFeatureColonSpaceAfter = require("./media-feature-colon-space-after");

var _mediaFeatureColonSpaceAfter2 = _interopRequireDefault(_mediaFeatureColonSpaceAfter);

var _mediaFeatureColonSpaceBefore = require("./media-feature-colon-space-before");

var _mediaFeatureColonSpaceBefore2 = _interopRequireDefault(_mediaFeatureColonSpaceBefore);

var _mediaFeatureNameNoVendorPrefix = require("./media-feature-name-no-vendor-prefix");

var _mediaFeatureNameNoVendorPrefix2 = _interopRequireDefault(_mediaFeatureNameNoVendorPrefix);

var _mediaFeatureNoMissingPunctuation = require("./media-feature-no-missing-punctuation");

var _mediaFeatureNoMissingPunctuation2 = _interopRequireDefault(_mediaFeatureNoMissingPunctuation);

var _mediaFeatureRangeOperatorSpaceAfter = require("./media-feature-range-operator-space-after");

var _mediaFeatureRangeOperatorSpaceAfter2 = _interopRequireDefault(_mediaFeatureRangeOperatorSpaceAfter);

var _mediaFeatureRangeOperatorSpaceBefore = require("./media-feature-range-operator-space-before");

var _mediaFeatureRangeOperatorSpaceBefore2 = _interopRequireDefault(_mediaFeatureRangeOperatorSpaceBefore);

var _mediaQueryListCommaNewlineAfter = require("./media-query-list-comma-newline-after");

var _mediaQueryListCommaNewlineAfter2 = _interopRequireDefault(_mediaQueryListCommaNewlineAfter);

var _mediaQueryListCommaNewlineBefore = require("./media-query-list-comma-newline-before");

var _mediaQueryListCommaNewlineBefore2 = _interopRequireDefault(_mediaQueryListCommaNewlineBefore);

var _mediaQueryListCommaSpaceAfter = require("./media-query-list-comma-space-after");

var _mediaQueryListCommaSpaceAfter2 = _interopRequireDefault(_mediaQueryListCommaSpaceAfter);

var _mediaQueryListCommaSpaceBefore = require("./media-query-list-comma-space-before");

var _mediaQueryListCommaSpaceBefore2 = _interopRequireDefault(_mediaQueryListCommaSpaceBefore);

var _mediaQueryParenthesesSpaceInside = require("./media-query-parentheses-space-inside");

var _mediaQueryParenthesesSpaceInside2 = _interopRequireDefault(_mediaQueryParenthesesSpaceInside);

var _noBrowserHacks = require("./no-browser-hacks");

var _noBrowserHacks2 = _interopRequireDefault(_noBrowserHacks);

var _noDescendingSpecificity = require("./no-descending-specificity");

var _noDescendingSpecificity2 = _interopRequireDefault(_noDescendingSpecificity);

var _noDuplicateSelectors = require("./no-duplicate-selectors");

var _noDuplicateSelectors2 = _interopRequireDefault(_noDuplicateSelectors);

var _noEolWhitespace = require("./no-eol-whitespace");

var _noEolWhitespace2 = _interopRequireDefault(_noEolWhitespace);

var _noIndistinguishableColors = require("./no-indistinguishable-colors");

var _noIndistinguishableColors2 = _interopRequireDefault(_noIndistinguishableColors);

var _noInvalidDoubleSlashComments = require("./no-invalid-double-slash-comments");

var _noInvalidDoubleSlashComments2 = _interopRequireDefault(_noInvalidDoubleSlashComments);

var _noMissingEofNewline = require("./no-missing-eof-newline");

var _noMissingEofNewline2 = _interopRequireDefault(_noMissingEofNewline);

var _noUnsupportedBrowserFeatures = require("./no-unsupported-browser-features");

var _noUnsupportedBrowserFeatures2 = _interopRequireDefault(_noUnsupportedBrowserFeatures);

var _noUnknownAnimations = require("./no-unknown-animations");

var _noUnknownAnimations2 = _interopRequireDefault(_noUnknownAnimations);

var _numberLeadingZero = require("./number-leading-zero");

var _numberLeadingZero2 = _interopRequireDefault(_numberLeadingZero);

var _numberMaxPrecision = require("./number-max-precision");

var _numberMaxPrecision2 = _interopRequireDefault(_numberMaxPrecision);

var _numberNoTrailingZeros = require("./number-no-trailing-zeros");

var _numberNoTrailingZeros2 = _interopRequireDefault(_numberNoTrailingZeros);

var _numberZeroLengthNoUnit = require("./number-zero-length-no-unit");

var _numberZeroLengthNoUnit2 = _interopRequireDefault(_numberZeroLengthNoUnit);

var _propertyBlacklist = require("./property-blacklist");

var _propertyBlacklist2 = _interopRequireDefault(_propertyBlacklist);

var _propertyNoVendorPrefix = require("./property-no-vendor-prefix");

var _propertyNoVendorPrefix2 = _interopRequireDefault(_propertyNoVendorPrefix);

var _propertyUnitBlacklist = require("./property-unit-blacklist");

var _propertyUnitBlacklist2 = _interopRequireDefault(_propertyUnitBlacklist);

var _propertyUnitWhitelist = require("./property-unit-whitelist");

var _propertyUnitWhitelist2 = _interopRequireDefault(_propertyUnitWhitelist);

var _propertyValueBlacklist = require("./property-value-blacklist");

var _propertyValueBlacklist2 = _interopRequireDefault(_propertyValueBlacklist);

var _propertyValueWhitelist = require("./property-value-whitelist");

var _propertyValueWhitelist2 = _interopRequireDefault(_propertyValueWhitelist);

var _propertyWhitelist = require("./property-whitelist");

var _propertyWhitelist2 = _interopRequireDefault(_propertyWhitelist);

var _rootNoStandardProperties = require("./root-no-standard-properties");

var _rootNoStandardProperties2 = _interopRequireDefault(_rootNoStandardProperties);

var _ruleNestedEmptyLineBefore = require("./rule-nested-empty-line-before");

var _ruleNestedEmptyLineBefore2 = _interopRequireDefault(_ruleNestedEmptyLineBefore);

var _ruleNonNestedEmptyLineBefore = require("./rule-non-nested-empty-line-before");

var _ruleNonNestedEmptyLineBefore2 = _interopRequireDefault(_ruleNonNestedEmptyLineBefore);

var _selectorClassPattern = require("./selector-class-pattern");

var _selectorClassPattern2 = _interopRequireDefault(_selectorClassPattern);

var _selectorCombinatorSpaceAfter = require("./selector-combinator-space-after");

var _selectorCombinatorSpaceAfter2 = _interopRequireDefault(_selectorCombinatorSpaceAfter);

var _selectorCombinatorSpaceBefore = require("./selector-combinator-space-before");

var _selectorCombinatorSpaceBefore2 = _interopRequireDefault(_selectorCombinatorSpaceBefore);

var _selectorIdPattern = require("./selector-id-pattern");

var _selectorIdPattern2 = _interopRequireDefault(_selectorIdPattern);

var _selectorListCommaNewlineAfter = require("./selector-list-comma-newline-after");

var _selectorListCommaNewlineAfter2 = _interopRequireDefault(_selectorListCommaNewlineAfter);

var _selectorListCommaNewlineBefore = require("./selector-list-comma-newline-before");

var _selectorListCommaNewlineBefore2 = _interopRequireDefault(_selectorListCommaNewlineBefore);

var _selectorListCommaSpaceAfter = require("./selector-list-comma-space-after");

var _selectorListCommaSpaceAfter2 = _interopRequireDefault(_selectorListCommaSpaceAfter);

var _selectorListCommaSpaceBefore = require("./selector-list-comma-space-before");

var _selectorListCommaSpaceBefore2 = _interopRequireDefault(_selectorListCommaSpaceBefore);

var _selectorMaxSpecificity = require("./selector-max-specificity");

var _selectorMaxSpecificity2 = _interopRequireDefault(_selectorMaxSpecificity);

var _selectorNoAttribute = require("./selector-no-attribute");

var _selectorNoAttribute2 = _interopRequireDefault(_selectorNoAttribute);

var _selectorNoCombinator = require("./selector-no-combinator");

var _selectorNoCombinator2 = _interopRequireDefault(_selectorNoCombinator);

var _selectorNoId = require("./selector-no-id");

var _selectorNoId2 = _interopRequireDefault(_selectorNoId);

var _selectorNoType = require("./selector-no-type");

var _selectorNoType2 = _interopRequireDefault(_selectorNoType);

var _selectorNoUniversal = require("./selector-no-universal");

var _selectorNoUniversal2 = _interopRequireDefault(_selectorNoUniversal);

var _selectorNoVendorPrefix = require("./selector-no-vendor-prefix");

var _selectorNoVendorPrefix2 = _interopRequireDefault(_selectorNoVendorPrefix);

var _selectorPseudoElementColonNotation = require("./selector-pseudo-element-colon-notation");

var _selectorPseudoElementColonNotation2 = _interopRequireDefault(_selectorPseudoElementColonNotation);

var _selectorRootNoComposition = require("./selector-root-no-composition");

var _selectorRootNoComposition2 = _interopRequireDefault(_selectorRootNoComposition);

var _selectorTypeCase = require("./selector-type-case");

var _selectorTypeCase2 = _interopRequireDefault(_selectorTypeCase);

var _stringNoNewline = require("./string-no-newline");

var _stringNoNewline2 = _interopRequireDefault(_stringNoNewline);

var _stringQuotes = require("./string-quotes");

var _stringQuotes2 = _interopRequireDefault(_stringQuotes);

var _stylelintDisableReason = require("./stylelint-disable-reason");

var _stylelintDisableReason2 = _interopRequireDefault(_stylelintDisableReason);

var _timeNoImperceptible = require("./time-no-imperceptible");

var _timeNoImperceptible2 = _interopRequireDefault(_timeNoImperceptible);

var _unitBlacklist = require("./unit-blacklist");

var _unitBlacklist2 = _interopRequireDefault(_unitBlacklist);

var _unitWhitelist = require("./unit-whitelist");

var _unitWhitelist2 = _interopRequireDefault(_unitWhitelist);

var _valueListCommaNewlineAfter = require("./value-list-comma-newline-after");

var _valueListCommaNewlineAfter2 = _interopRequireDefault(_valueListCommaNewlineAfter);

var _valueListCommaNewlineBefore = require("./value-list-comma-newline-before");

var _valueListCommaNewlineBefore2 = _interopRequireDefault(_valueListCommaNewlineBefore);

var _valueListCommaSpaceAfter = require("./value-list-comma-space-after");

var _valueListCommaSpaceAfter2 = _interopRequireDefault(_valueListCommaSpaceAfter);

var _valueListCommaSpaceBefore = require("./value-list-comma-space-before");

var _valueListCommaSpaceBefore2 = _interopRequireDefault(_valueListCommaSpaceBefore);

var _valueNoVendorPrefix = require("./value-no-vendor-prefix");

var _valueNoVendorPrefix2 = _interopRequireDefault(_valueNoVendorPrefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  "at-rule-semicolon-newline-after": _atRuleSemicolonNewlineAfter2.default,
  "at-rule-empty-line-before": _atRuleEmptyLineBefore2.default,
  "at-rule-no-vendor-prefix": _atRuleNoVendorPrefix2.default,
  "block-closing-brace-newline-after": _blockClosingBraceNewlineAfter2.default,
  "block-closing-brace-newline-before": _blockClosingBraceNewlineBefore2.default,
  "block-closing-brace-space-after": _blockClosingBraceSpaceAfter2.default,
  "block-closing-brace-space-before": _blockClosingBraceSpaceBefore2.default,
  "block-no-empty": _blockNoEmpty2.default,
  "block-no-single-line": _blockNoSingleLine2.default,
  "block-opening-brace-newline-after": _blockOpeningBraceNewlineAfter2.default,
  "block-opening-brace-newline-before": _blockOpeningBraceNewlineBefore2.default,
  "block-opening-brace-space-after": _blockOpeningBraceSpaceAfter2.default,
  "block-opening-brace-space-before": _blockOpeningBraceSpaceBefore2.default,
  "color-hex-case": _colorHexCase2.default,
  "color-hex-length": _colorHexLength2.default,
  "color-named": _colorNamed2.default,
  "color-no-hex": _colorNoHex2.default,
  "color-no-invalid-hex": _colorNoInvalidHex2.default,
  "comment-empty-line-before": _commentEmptyLineBefore2.default,
  "comment-whitespace-inside": _commentWhitespaceInside2.default,
  "custom-media-pattern": _customMediaPattern2.default,
  "custom-property-no-outside-root": _customPropertyNoOutsideRoot2.default,
  "custom-property-pattern": _customPropertyPattern2.default,
  "declaration-bang-space-after": _declarationBangSpaceAfter2.default,
  "declaration-bang-space-before": _declarationBangSpaceBefore2.default,
  "declaration-block-no-duplicate-properties": _declarationBlockNoDuplicateProperties2.default,
  "declaration-block-no-shorthand-property-overrides": _declarationBlockNoShorthandPropertyOverrides2.default,
  "declaration-block-properties-order": _declarationBlockPropertiesOrder2.default,
  "declaration-block-semicolon-newline-after": _declarationBlockSemicolonNewlineAfter2.default,
  "declaration-block-semicolon-newline-before": _declarationBlockSemicolonNewlineBefore2.default,
  "declaration-block-semicolon-space-after": _declarationBlockSemicolonSpaceAfter2.default,
  "declaration-block-semicolon-space-before": _declarationBlockSemicolonSpaceBefore2.default,
  "declaration-block-single-line-max-declarations": _declarationBlockSingleLineMaxDeclarations2.default,
  "declaration-block-trailing-semicolon": _declarationBlockTrailingSemicolon2.default,
  "declaration-colon-newline-after": _declarationColonNewlineAfter2.default,
  "declaration-colon-space-after": _declarationColonSpaceAfter2.default,
  "declaration-colon-space-before": _declarationColonSpaceBefore2.default,
  "declaration-no-important": _declarationNoImportant2.default,
  "font-family-name-quotes": _fontFamilyNameQuotes2.default,
  "font-weight-notation": _fontWeightNotation2.default,
  "function-blacklist": _functionBlacklist2.default,
  "function-calc-no-unspaced-operator": _functionCalcNoUnspacedOperator2.default,
  "function-comma-newline-after": _functionCommaNewlineAfter2.default,
  "function-comma-newline-before": _functionCommaNewlineBefore2.default,
  "function-comma-space-after": _functionCommaSpaceAfter2.default,
  "function-comma-space-before": _functionCommaSpaceBefore2.default,
  "function-linear-gradient-no-nonstandard-direction": _functionLinearGradientNoNonstandardDirection2.default,
  "function-max-empty-lines": _functionMaxEmptyLines2.default,
  "function-parentheses-newline-inside": _functionParenthesesNewlineInside2.default,
  "function-parentheses-space-inside": _functionParenthesesSpaceInside2.default,
  "function-url-quotes": _functionUrlQuotes2.default,
  "function-whitelist": _functionWhitelist2.default,
  "function-whitespace-after": _functionWhitespaceAfter2.default,
  "indentation": _indentation2.default, // eslint-disable-line object-shorthand
  "max-empty-lines": _maxEmptyLines2.default,
  "max-line-length": _maxLineLength2.default,
  "max-nesting-depth": _maxNestingDepth2.default,
  "media-feature-colon-space-after": _mediaFeatureColonSpaceAfter2.default,
  "media-feature-colon-space-before": _mediaFeatureColonSpaceBefore2.default,
  "media-feature-name-no-vendor-prefix": _mediaFeatureNameNoVendorPrefix2.default,
  "media-feature-no-missing-punctuation": _mediaFeatureNoMissingPunctuation2.default,
  "media-feature-range-operator-space-after": _mediaFeatureRangeOperatorSpaceAfter2.default,
  "media-feature-range-operator-space-before": _mediaFeatureRangeOperatorSpaceBefore2.default,
  "media-query-list-comma-newline-after": _mediaQueryListCommaNewlineAfter2.default,
  "media-query-list-comma-newline-before": _mediaQueryListCommaNewlineBefore2.default,
  "media-query-list-comma-space-after": _mediaQueryListCommaSpaceAfter2.default,
  "media-query-list-comma-space-before": _mediaQueryListCommaSpaceBefore2.default,
  "media-query-parentheses-space-inside": _mediaQueryParenthesesSpaceInside2.default,
  "no-browser-hacks": _noBrowserHacks2.default,
  "no-descending-specificity": _noDescendingSpecificity2.default,
  "no-duplicate-selectors": _noDuplicateSelectors2.default,
  "no-eol-whitespace": _noEolWhitespace2.default,
  "no-indistinguishable-colors": _noIndistinguishableColors2.default,
  "no-invalid-double-slash-comments": _noInvalidDoubleSlashComments2.default,
  "no-missing-eof-newline": _noMissingEofNewline2.default,
  "no-unknown-animations": _noUnknownAnimations2.default,
  "no-unsupported-browser-features": _noUnsupportedBrowserFeatures2.default,
  "number-leading-zero": _numberLeadingZero2.default,
  "number-max-precision": _numberMaxPrecision2.default,
  "number-no-trailing-zeros": _numberNoTrailingZeros2.default,
  "number-zero-length-no-unit": _numberZeroLengthNoUnit2.default,
  "property-blacklist": _propertyBlacklist2.default,
  "property-no-vendor-prefix": _propertyNoVendorPrefix2.default,
  "property-unit-blacklist": _propertyUnitBlacklist2.default,
  "property-unit-whitelist": _propertyUnitWhitelist2.default,
  "property-value-blacklist": _propertyValueBlacklist2.default,
  "property-value-whitelist": _propertyValueWhitelist2.default,
  "property-whitelist": _propertyWhitelist2.default,
  "root-no-standard-properties": _rootNoStandardProperties2.default,
  "rule-nested-empty-line-before": _ruleNestedEmptyLineBefore2.default,
  "rule-non-nested-empty-line-before": _ruleNonNestedEmptyLineBefore2.default,
  "selector-class-pattern": _selectorClassPattern2.default,
  "selector-combinator-space-after": _selectorCombinatorSpaceAfter2.default,
  "selector-combinator-space-before": _selectorCombinatorSpaceBefore2.default,
  "selector-id-pattern": _selectorIdPattern2.default,
  "selector-list-comma-newline-after": _selectorListCommaNewlineAfter2.default,
  "selector-list-comma-newline-before": _selectorListCommaNewlineBefore2.default,
  "selector-list-comma-space-after": _selectorListCommaSpaceAfter2.default,
  "selector-list-comma-space-before": _selectorListCommaSpaceBefore2.default,
  "selector-max-specificity": _selectorMaxSpecificity2.default,
  "selector-no-attribute": _selectorNoAttribute2.default,
  "selector-no-combinator": _selectorNoCombinator2.default,
  "selector-no-id": _selectorNoId2.default,
  "selector-no-type": _selectorNoType2.default,
  "selector-no-universal": _selectorNoUniversal2.default,
  "selector-no-vendor-prefix": _selectorNoVendorPrefix2.default,
  "selector-pseudo-element-colon-notation": _selectorPseudoElementColonNotation2.default,
  "selector-root-no-composition": _selectorRootNoComposition2.default,
  "selector-type-case": _selectorTypeCase2.default,
  "string-no-newline": _stringNoNewline2.default,
  "string-quotes": _stringQuotes2.default,
  "stylelint-disable-reason": _stylelintDisableReason2.default,
  "time-no-imperceptible": _timeNoImperceptible2.default,
  "unit-blacklist": _unitBlacklist2.default,
  "unit-whitelist": _unitWhitelist2.default,
  "value-list-comma-newline-after": _valueListCommaNewlineAfter2.default,
  "value-list-comma-newline-before": _valueListCommaNewlineBefore2.default,
  "value-list-comma-space-after": _valueListCommaSpaceAfter2.default,
  "value-list-comma-space-before": _valueListCommaSpaceBefore2.default,
  "value-no-vendor-prefix": _valueNoVendorPrefix2.default
};