"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options) {
  var rawConfig = function () {
    if (options.config) return options.config;
    if (options.rules) return options;
    return false;
  }();
  var configBasedir = options.configBasedir || process.cwd();

  if (rawConfig) {
    return augmentConfig(rawConfig, configBasedir).then(function (config) {
      return {
        config: (0, _lodash.merge)(config, options.configOverrides),
        configDir: configBasedir
      };
    });
  }

  var cosmiconfigOptions = {
    // Turn off argv option to avoid hijacking the all-too-common
    // --config argument, when this is used in conjunction with other CLI's
    // (e.g. webpack)
    argv: false,
    // Allow extensions on rc filenames
    rcExtensions: true
  };

  if (options.configFile) {
    cosmiconfigOptions.configPath = _path2.default.resolve(process.cwd(), options.configFile);
  }

  var rootConfigDir = void 0;

  return (0, _cosmiconfig2.default)("stylelint", cosmiconfigOptions).then(function (result) {
    if (!result) throw (0, _utils.configurationError)("No configuration found");
    rootConfigDir = _path2.default.dirname(result.filepath);
    return augmentConfig(result.config, rootConfigDir);
  }).then(function (augmentedConfig) {
    var finalConfig = options.configOverrides ? (0, _lodash.merge)({}, augmentedConfig, options.configOverrides) : augmentedConfig;
    return {
      config: finalConfig,
      configDir: rootConfigDir
    };
  });
};

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _cosmiconfig = require("cosmiconfig");

var _cosmiconfig2 = _interopRequireDefault(_cosmiconfig);

var _resolveFrom = require("resolve-from");

var _resolveFrom2 = _interopRequireDefault(_resolveFrom);

var _lodash = require("lodash");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function augmentConfig(config, configDir) {
  // Absolutize the plugins here, because here is the place
  // where we know the basedir for this particular config
  var configWithAbsolutePlugins = absolutizePlugins(config, configDir);
  if (!config.extends) {
    return Promise.resolve(configWithAbsolutePlugins);
  }

  var extendLookups = [].concat(configWithAbsolutePlugins.extends);
  var origConfig = (0, _lodash.omit)(configWithAbsolutePlugins, "extends");
  var resultPromise = extendLookups.reduce(function (mergeConfigs, extendLookup) {
    return mergeConfigs.then(function (mergedConfig) {
      return loadExtendedConfig(mergedConfig, extendLookup).then(function (extendedConfig) {
        return (0, _lodash.merge)({}, mergedConfig, extendedConfig);
      });
    });
  }, Promise.resolve(origConfig));

  return resultPromise.then(function (mergedConfig) {
    return (0, _lodash.merge)({}, mergedConfig, origConfig);
  });

  function loadExtendedConfig(config, extendLookup) {
    var extendPath = getModulePath(configDir, extendLookup);
    var extendDir = _path2.default.dirname(extendPath);
    return (0, _cosmiconfig2.default)(null, {
      configPath: extendPath,
      // In case --config was used: do not pay attention to it again
      argv: false
    }).then(function (result) {
      return augmentConfig(stripIgnoreFiles(result.config), extendDir);
    });
  }
}

// Replace all plugin lookups with absolute paths
function absolutizePlugins(config, configDir) {
  if (!config.plugins) {
    return config;
  }
  return (0, _lodash.assign)({}, config, {
    plugins: config.plugins.map(function (lookup) {
      return getModulePath(configDir, lookup);
    })
  });
}

function getModulePath(basedir, lookup) {
  var path = (0, _resolveFrom2.default)(basedir, lookup);
  if (path) return path;
  throw (0, _utils.configurationError)("Could not find \"" + lookup + "\". Do you need a `configBasedir`?");
}

// The `ignoreFiles` option only works with the
// config that is being directly invoked, not any
// extended configs
function stripIgnoreFiles(config) {
  return (0, _lodash.omit)(config, "ignoreFiles");
}