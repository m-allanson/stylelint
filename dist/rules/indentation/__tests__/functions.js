"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: [2],
  skipBasicChecks: true,

  accept: [{
    code: ".foo {\n" + "  color: rgb(0, 0, 0);\n" + "}"
  }, {
    code: ".foo {\n" + "  color: rgb(\n" + "    0,\n" + "    0,\n" + "    0\n" + "  );\n" + "}"
  }, {
    code: ".foo {\n" + "  color: rgb(\n" + "      0,\n" + "      0,\n" + "      0\n" + "    );\n" + "}"
  }, {
    code: ".foo {\n" + "  color: rgb(\n" + "0,\n" + "0,\n" + "0\n" + "    );\n" + "}"
  }, {
    code: ".foo {\n" + "  color: bar(\n" + "    rgb(\n" + "      0,\n" + "      0,\n" + "      0\n" + "    )\n" + "  );\n" + "}"
  }, {
    code: ".foo {\n" + "  color: bar(\n" + "      rgb(\n" + "        0,\n" + "        0,\n" + "        0\n" + "      )\n" + "    );\n" + "}"
  }]
});