"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (statement) {
  return statement.nodes !== undefined // has block
   && statement.nodes.length === 0 // and is empty
  ;
};