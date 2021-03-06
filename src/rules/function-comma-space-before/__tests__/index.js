import testRule from "../../../testUtils/testRule"

import rule, { ruleName, messages } from ".."

testRule(rule, {
  ruleName,
  config: ["always"],

  accept: [ {
    code: "a::before { content: \"func(foo,bar,baz)\"; }",
  }, {
    code: "a::before { background: url('func(foo,bar,baz)'); }",
  }, {
    code: "a { background-size: 0, 0, 0; }",
  }, {
    code: "a { transform: translate(1 , 1); }",
  }, {
    code: "a { transform: translate(1 ,1); }",
  }, {
    code: "a { transform: color(rgb(0 , 0 ,0) lightness(50%)); }",
  }, {
    code: "a { background: url(data:image/svg+xml;charset=utf8,%3Csvg%20xmlns); }",
    description: "data URI with spaceless comma",
  }, {
    code: "$map: (key: value,key2: value2)",
    description: "SCSS map",
  } ],

  reject: [ {
    code: "a { transform: translate(1, 1); }",
    message: messages.expectedBefore(),
    line: 1,
    column: 27,
  }, {
    code: "a { transform: translate(1  , 1); }",
    message: messages.expectedBefore(),
    line: 1,
    column: 29,
  }, {
    code: "a { transform: translate(1\n, 1); }",
    message: messages.expectedBefore(),
    line: 2,
    column: 1,
  }, {
    code: "a { transform: translate(1\r\n, 1); }",
    description: "CRLF",
    message: messages.expectedBefore(),
    line: 2,
    column: 1,
  }, {
    code: "a { transform: translate(1\t, 1); }",
    message: messages.expectedBefore(),
    line: 1,
    column: 28,
  }, {
    code: "a { transform: color(rgb(0 , 0, 0) lightness(50%)); }",
    message: messages.expectedBefore(),
    line: 1,
    column: 31,
  }, {
    code: "a { transform: color(lightness(50%) rgb(0 , 0, 0)); }",
    message: messages.expectedBefore(),
    line: 1,
    column: 46,
  } ],
})

testRule(rule, {
  ruleName,
  config: ["never"],

  accept: [ {
    code: "a::before { content: \"func(foo ,bar ,baz)\"; }",
  }, {
    code: "a::before { background: url('func(foo ,bar ,baz)'); }",
  }, {
    code: "a { background-size: 0 , 0 , 0; }",
  }, {
    code: "a { transform: translate(1, 1); }",
  }, {
    code: "a { transform: translate(1,1); }",
  }, {
    code: "a { transform: color(rgb(0, 0,0) lightness(50%)); }",
  }, {
    code: "$map: (key: value ,key2: value2)",
    description: "SCSS map",
  } ],

  reject: [ {
    code: "a { transform: translate(1 , 1); }",
    message: messages.rejectedBefore(),
    line: 1,
    column: 28,
  }, {
    code: "a { transform: translate(1  , 1); }",
    message: messages.rejectedBefore(),
    line: 1,
    column: 29,
  }, {
    code: "a { transform: translate(1\n, 1); }",
    message: messages.rejectedBefore(),
    line: 2,
    column: 1,
  }, {
    code: "a { transform: translate(1\r\n, 1); }",
    description: "CRLF",
    message: messages.rejectedBefore(),
    line: 2,
    column: 1,
  }, {
    code: "a { transform: translate(1\t, 1); }",
    message: messages.rejectedBefore(),
    line: 1,
    column: 28,
  }, {
    code: "a { transform: color(rgb(0, 0 , 0) lightness(50%)); }",
    message: messages.rejectedBefore(),
    line: 1,
    column: 31,
  }, {
    code: "a { transform: color(lightness(50%) rgb(0, 0 , 0)); }",
    message: messages.rejectedBefore(),
    line: 1,
    column: 46,
  } ],
})

testRule(rule, {
  ruleName,
  config: ["always-single-line"],

  accept: [ {
    code: "a::before { content: \"func(foo,bar,baz)\"; }",
  }, {
    code: "a::before { background: url('func(foo,bar,baz)'); }",
  }, {
    code: "a { background-size: 0, 0, 0; }",
  }, {
    code: "a { transform: translate(1 , 1); }",
  }, {
    code: "a { transform: translate(1 ,1); }",
  }, {
    code: "a { transform: color(rgb(0 , 0 ,0) lightness(50%)); }",
  }, {
    code: "a { transform: translate(1,\n1); }",
  }, {
    code: "a { transform: translate(1  ,\n1); }",
  }, {
    code: "a { transform: translate(1\t,\r\n1); }",
    description: "CRLF",
  }, {
    code: "a { transform: translate(1\n, 1); }",
  }, {
    code: "a { transform: translate(1\n,\n1); }",
  }, {
    code: "a { background: linear-gradient(45deg,\nrgba(0 , 0 , 0 ,1)\n,red); }",
  }, {
    code: "$map: (key: value,key2: value2)",
    description: "SCSS map",
  } ],

  reject: [ {
    code: "a { transform: color(rgb(0 , 0, 0) lightness(50%)); }",
    message: messages.expectedBeforeSingleLine(),
    line: 1,
    column: 31,
  }, {
    code: "a { transform: color(lightness(50%) rgb(0 , 0, 0)); }",
    message: messages.expectedBeforeSingleLine(),
    line: 1,
    column: 46,
  }, {
    code: "a { background: linear-gradient(45deg,\nrgba(0 , 0,0 ,1),red); }",
    message: messages.expectedBeforeSingleLine(),
    line: 2,
    column: 11,
  } ],
})

testRule(rule, {
  ruleName,
  config: ["never-single-line"],

  accept: [ {
    code: "a::before { content: \"func(foo ,bar ,baz)\"; }",
  }, {
    code: "a::before { background: url('func(foo ,bar ,baz)'); }",
  }, {
    code: "a { background-size: 0 , 0 , 0; }",
  }, {
    code: "a { transform: translate(1, 1); }",
  }, {
    code: "a { transform: translate(1,1); }",
  }, {
    code: "a { transform: color(rgb(0, 0,0) lightness(50%)); }",
  }, {
    code: "a { transform: translate(1 ,\n1); }",
  }, {
    code: "a { transform: translate(1  ,\n1); }",
  }, {
    code: "a { transform: translate(1\t,\r\n1); }",
    description: "CRLF",
  }, {
    code: "a { transform: translate(1\n, 1); }",
  }, {
    code: "a { transform: translate(1\n,\n1); }",
  }, {
    code: "$map: (key: value ,key2: value2)",
    description: "SCSS map",
  } ],

  reject: [ {
    code: "a { transform: color(rgb(0, 0 , 0) lightness(50%)); }",
    message: messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 31,
  }, {
    code: "a { transform: color(lightness(50%) rgb(0, 0 , 0)); }",
    message: messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 46,
  } ],
})
