"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _autoprefixer = require("autoprefixer");

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _prefixes = require("autoprefixer/lib/prefixes");

var _prefixes2 = _interopRequireDefault(_prefixes);

var _browsers = require("autoprefixer/lib/browsers");

var _browsers2 = _interopRequireDefault(_browsers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Use Autoprefixer's secret powers to determine whether or
 * not a certain CSS identifier contains a vendor prefix that
 * Autoprefixer, given the standardized identifier, could add itself.
 *
 * Used by `*-no-vendor-prefix-*` rules to find superfluous
 * vendor prefixes.
 */

var prefixes = new _prefixes2.default(_autoprefixer2.default.data.prefixes, new _browsers2.default(_autoprefixer2.default.data.browsers, []));

/**
 * Most identifier types have to be looked up in a unique way,
 * so we're exposing special functions for each.
 */
exports.default = {
  atRuleName: function atRuleName(identifier) {
    return prefixes.remove["@" + identifier];
  },
  selector: function selector(identifier) {
    return prefixes.remove.selectors.some(function (selectorObj) {
      return identifier === selectorObj.prefixed;
    });
  },
  mediaFeatureName: function mediaFeatureName(identifier) {
    return identifier.indexOf("device-pixel-ratio") !== -1;
  },
  property: function property(identifier) {
    return _autoprefixer2.default.data.prefixes[prefixes.unprefixed(identifier)];
  },
  propertyValue: function propertyValue(prop, value) {
    var possiblePrefixableValues = prefixes.remove[prop] && prefixes.remove[prop].values;
    return possiblePrefixableValues && possiblePrefixableValues.some(function (valueObj) {
      return value === valueObj.prefixed;
    });
  }
};