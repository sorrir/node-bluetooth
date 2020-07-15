"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseHostInterface = require("./base-host-interface");

Object.keys(_baseHostInterface).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _baseHostInterface[key];
    }
  });
});

var _baseHostObject = require("./base-host-object");

Object.keys(_baseHostObject).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _baseHostObject[key];
    }
  });
});