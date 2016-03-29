"use strict";

var _testRule = require("../../../testUtils/testRule");

var _testRule2 = _interopRequireDefault(_testRule);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["single-where-required"],

  accept: [{
    code: "a { font-family: $sassy-font-family; }",
    description: "ignores sass variables"
  }, {
    code: "a { font-family: @less-666; }",
    description: "ignores less variables"
  }, {
    code: "a { font-family: var(--ff1); }",
    description: "ignores custom properties"
  }, {
    code: "a { font-family: Lucida Grande, Arial, sans-serif; }"
  }, {
    code: "a { font-family: 'Red/Black', Arial, sans-serif; }"
  }, {
    code: "a { font-family: Arial, 'Ahem!', sans-serif; }"
  }, {
    code: "a { font-family: 'Hawaii 5-0', Arial, sans-serif; }"
  }],

  reject: [{
    code: "a { font-family: 'Lucida Grande', Arial, sans-serif; }",
    message: _.messages.expected("no", "Lucida Grande"),
    line: 1,
    column: 19
  }, {
    code: "a { font-family: Lucida Grande, Arial, 'sans-serif'; }",
    message: _.messages.expected("no", "sans-serif"),
    line: 1,
    column: 41
  }, {
    code: "a { font-family: Red/Black, Arial, sans-serif; }",
    message: _.messages.expected("single", "Red/Black")
  }, {
    code: "a { font-family: \"Red/Black\", Arial, sans-serif; }",
    message: _.messages.expected("single", "Red/Black")
  }, {
    code: "a { font-family: Arial, Ahem!, sans-serif; }",
    message: _.messages.expected("single", "Ahem!")
  }, {
    code: "a { font-family: Arial, \"Ahem!\", sans-serif; }",
    message: _.messages.expected("single", "Ahem!")
  }, {
    code: "a { font-family: Hawaii 5-0, Arial, sans-serif; }",
    message: _.messages.expected("single", "Hawaii 5-0")
  }, {
    code: "a { font-family: \"Hawaii 5-0\", Arial, sans-serif; }",
    message: _.messages.expected("single", "Hawaii 5-0")
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["double-where-required"],

  accept: [{
    code: "a { font-family: $sassy-font-family; }",
    description: "ignores sass variables"
  }, {
    code: "a { font-family: @less-666; }",
    description: "ignores less variables"
  }, {
    code: "a { font-family: var(--ff1); }",
    description: "ignores custom properties"
  }, {
    code: "a { font-family: Lucida Grande, Arial, sans-serif; }"
  }, {
    code: "a { font-family: \"Red/Black\", Arial, sans-serif; }"
  }, {
    code: "a { font-family: Arial, \"Ahem!\", sans-serif; }"
  }, {
    code: "a { font-family: \"Hawaii 5-0\", Arial, sans-serif; }"
  }],

  reject: [{
    code: "a { font-family: \"Lucida Grande\", Arial, sans-serif; }",
    message: _.messages.expected("no", "Lucida Grande"),
    line: 1,
    column: 19
  }, {
    code: "a { font-family: Lucida Grande, Arial, \"sans-serif\"; }",
    message: _.messages.expected("no", "sans-serif"),
    line: 1,
    column: 41
  }, {
    code: "a { font-family: Red/Black, Arial, sans-serif; }",
    message: _.messages.expected("double", "Red/Black")
  }, {
    code: "a { font-family: 'Red/Black', Arial, sans-serif; }",
    message: _.messages.expected("double", "Red/Black")
  }, {
    code: "a { font-family: Arial, Ahem!, sans-serif; }",
    message: _.messages.expected("double", "Ahem!")
  }, {
    code: "a { font-family: Arial, 'Ahem!', sans-serif; }",
    message: _.messages.expected("double", "Ahem!")
  }, {
    code: "a { font-family: Hawaii 5-0, Arial, sans-serif; }",
    message: _.messages.expected("double", "Hawaii 5-0")
  }, {
    code: "a { font-family: 'Hawaii 5-0', Arial, sans-serif; }",
    message: _.messages.expected("double", "Hawaii 5-0")
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["single-where-recommended"],

  accept: [{
    code: "a { font-family: $sassy-font-family; }",
    description: "ignores sass variables"
  }, {
    code: "a { font-family: @less-666; }",
    description: "ignores less variables"
  }, {
    code: "a { font-family: var(--ff1); }",
    description: "ignores custom properties"
  }, {
    code: "a { font-family: 'Lucida Grande', Arial, sans-serif; }"
  }, {
    code: "a { font-family: Times, 'Times New Roman', serif; }"
  }, {
    code: "a { font-family: 'Something6'; }"
  }, {
    code: "a { font-family: 'snake_case'; }"
  }, {
    code: "a { font-family: 'Red/Black', Arial, sans-serif; }"
  }, {
    code: "a { font-family: Arial, 'Ahem!', sans-serif; }"
  }, {
    code: "a { font-family: 'Hawaii 5-0', Arial, sans-serif; }"
  }],

  reject: [{
    code: "a { font-family: Lucida Grande, Arial, sans-serif; }",
    message: _.messages.expected("single", "Lucida Grande"),
    line: 1,
    column: 18
  }, {
    code: "a { font-family: 'Lucida Grande', Arial, 'sans-serif'; }",
    message: _.messages.expected("no", "sans-serif"),
    line: 1,
    column: 43
  }, {
    code: "a { font-family: Red/Black, Arial, sans-serif; }",
    message: _.messages.expected("single", "Red/Black")
  }, {
    code: "a { font-family: \"Red/Black\", Arial, sans-serif; }",
    message: _.messages.expected("single", "Red/Black")
  }, {
    code: "a { font-family: Arial, Ahem!, sans-serif; }",
    message: _.messages.expected("single", "Ahem!")
  }, {
    code: "a { font-family: Arial, \"Ahem!\", sans-serif; }",
    message: _.messages.expected("single", "Ahem!")
  }, {
    code: "a { font-family: Hawaii 5-0, Arial, sans-serif; }",
    message: _.messages.expected("single", "Hawaii 5-0")
  }, {
    code: "a { font-family: \"Hawaii 5-0\", Arial, sans-serif; }",
    message: _.messages.expected("single", "Hawaii 5-0")
  }, {
    code: "a { font-family: Times, Times New Roman, serif; }",
    message: _.messages.expected("single", "Times New Roman")
  }, {
    code: "a { font-family: Times, \"Times New Roman\", serif; }",
    message: _.messages.expected("single", "Times New Roman")
  }, {
    code: "a { font-family: Something6; }",
    message: _.messages.expected("single", "Something6")
  }, {
    code: "a { font-family: \"Something6\"; }",
    message: _.messages.expected("single", "Something6")
  }, {
    code: "a { font-family: snake_case; }",
    message: _.messages.expected("single", "snake_case")
  }, {
    code: "a { font-family: \"snake_case\"; }",
    message: _.messages.expected("single", "snake_case")
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["double-where-recommended"],

  accept: [{
    code: "a { font-family: $sassy-font-family; }",
    description: "ignores sass variables"
  }, {
    code: "a { font-family: @less-666; }",
    description: "ignores less variables"
  }, {
    code: "a { font-family: var(--ff1); }",
    description: "ignores custom properties"
  }, {
    code: "a { font-family: \"Lucida Grande\", Arial, sans-serif; }"
  }, {
    code: "a { font-family: Times, \"Times New Roman\", serif; }"
  }, {
    code: "a { font-family: \"Something6\"; }"
  }, {
    code: "a { font-family: \"snake_case\"; }"
  }, {
    code: "a { font-family: \"Red/Black\", Arial, sans-serif; }"
  }, {
    code: "a { font-family: Arial, \"Ahem!\", sans-serif; }"
  }, {
    code: "a { font-family: \"Hawaii 5-0\", Arial, sans-serif; }"
  }],

  reject: [{
    code: "a { font-family: Lucida Grande, Arial, sans-serif; }",
    message: _.messages.expected("double", "Lucida Grande"),
    line: 1,
    column: 18
  }, {
    code: "a { font-family: \"Lucida Grande\", Arial, \"sans-serif\"; }",
    message: _.messages.expected("no", "sans-serif"),
    line: 1,
    column: 43
  }, {
    code: "a { font-family: Red/Black, Arial, sans-serif; }",
    message: _.messages.expected("double", "Red/Black")
  }, {
    code: "a { font-family: 'Red/Black', Arial, sans-serif; }",
    message: _.messages.expected("double", "Red/Black")
  }, {
    code: "a { font-family: Arial, Ahem!, sans-serif; }",
    message: _.messages.expected("double", "Ahem!")
  }, {
    code: "a { font-family: Arial, 'Ahem!', sans-serif; }",
    message: _.messages.expected("double", "Ahem!")
  }, {
    code: "a { font-family: Hawaii 5-0, Arial, sans-serif; }",
    message: _.messages.expected("double", "Hawaii 5-0")
  }, {
    code: "a { font-family: 'Hawaii 5-0', Arial, sans-serif; }",
    message: _.messages.expected("double", "Hawaii 5-0")
  }, {
    code: "a { font-family: Times, Times New Roman, serif; }",
    message: _.messages.expected("double", "Times New Roman")
  }, {
    code: "a { font-family: Times, 'Times New Roman', serif; }",
    message: _.messages.expected("double", "Times New Roman")
  }, {
    code: "a { font-family: Something6; }",
    message: _.messages.expected("double", "Something6")
  }, {
    code: "a { font-family: 'Something6'; }",
    message: _.messages.expected("double", "Something6")
  }, {
    code: "a { font-family: snake_case; }",
    message: _.messages.expected("double", "snake_case")
  }, {
    code: "a { font-family: 'snake_case'; }",
    message: _.messages.expected("double", "snake_case")
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["single-unless-keyword"],

  accept: [{
    code: "a { font-family: $sassy-font-family; }",
    description: "ignores sass variables"
  }, {
    code: "a { font-family: @less-666; }",
    description: "ignores less variables"
  }, {
    code: "a { font-family: var(--ff1); }",
    description: "ignores custom properties"
  }, {
    code: "a { font-family: 'Lucida Grande', 'Arial', sans-serif; }"
  }, {
    code: "a { font-family: 'Hawaii 5-0', 'Arial', cursive; }"
  }, {
    code: "a { font-family: 'Times', 'Arial', serif; }"
  }, {
    code: "a { font-family: 'Times', 'Arial', fantasy; }"
  }, {
    code: "a { font-family: 'Times', 'Arial', cursive; }"
  }, {
    code: "a { font-family: inherit; }"
  }],

  reject: [{
    code: "a { font-family: 'Lucida Grande', 'Arial', 'sans-serif'; }",
    message: _.messages.expected("no", "sans-serif")
  }, {
    code: "a { font-family: 'inherit'; }",
    message: _.messages.expected("no", "inherit")
  }, {
    code: "a { font-family: \"Lucida Grande\", 'Arial', sans-serif; }",
    message: _.messages.expected("single", "Lucida Grande")
  }, {
    code: "a { font-family: 'Lucida Grande', \"Arial\", sans-serif; }",
    message: _.messages.expected("single", "Arial")
  }]
});

(0, _testRule2.default)(_2.default, {
  ruleName: _.ruleName,
  config: ["double-unless-keyword"],

  accept: [{
    code: "a { font-family: $sassy-font-family; }",
    description: "ignores sass variables"
  }, {
    code: "a { font-family: @less-666; }",
    description: "ignores less variables"
  }, {
    code: "a { font-family: var(--ff1); }",
    description: "ignores custom properties"
  }, {
    code: "a { font-family: \"Lucida Grande\", \"Arial\", sans-serif; }"
  }, {
    code: "a { font-family: \"Hawaii 5-0\", \"Arial\", cursive; }"
  }, {
    code: "a { font-family: \"Times\", \"Arial\", serif; }"
  }, {
    code: "a { font-family: \"Times\", \"Arial\", fantasy; }"
  }, {
    code: "a { font-family: \"Times\", \"Arial\", cursive; }"
  }, {
    code: "a { font-family: inherit; }"
  }],

  reject: [{
    code: "a { font-family: \"Lucida Grande\", \"Arial\", \"sans-serif\"; }",
    message: _.messages.expected("no", "sans-serif")
  }, {
    code: "a { font-family: \"inherit\"; }",
    message: _.messages.expected("no", "inherit")
  }, {
    code: "a { font-family: 'Lucida Grande', \"Arial\", sans-serif; }",
    message: _.messages.expected("double", "Lucida Grande")
  }, {
    code: "a { font-family: \"Lucida Grande\", 'Arial', sans-serif; }",
    message: _.messages.expected("double", "Arial")
  }]
});