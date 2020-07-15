"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseHostObject = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var dbus = _interopRequireWildcard(require("dbus-next"));

var _dbus$interface = dbus["interface"],
    Interface = _dbus$interface.Interface,
    property = _dbus$interface.property,
    method = _dbus$interface.method,
    signal = _dbus$interface.signal,
    ACCESS_READ = _dbus$interface.ACCESS_READ,
    ACCESS_WRITE = _dbus$interface.ACCESS_WRITE,
    ACCESS_READWRITE = _dbus$interface.ACCESS_READWRITE;

var BaseHostObject = /*#__PURE__*/function () {
  function BaseHostObject(bluez, path) {
    var _this2 = this;

    (0, _classCallCheck2["default"])(this, BaseHostObject);
    (0, _defineProperty2["default"])(this, "path", void 0);
    this.path = path;

    var _this = this;

    bluez.bus.addMethodHandler(function (msg) {
      if (msg.path === _this.path && msg["interface"] === BaseHostObject._INTERFACE && msg.member === 'GetManagedObjects') {
        var someMethodReply = dbus.Message.newMethodReturn(msg, 'a{oa{sa{sv}}}', [_this.GetManagedObjects()]);
        console.log("".concat(_this2.path, ":GetManagedObjects"));
        bluez.bus.send(someMethodReply);
        return true;
      }
    });
  }

  (0, _createClass2["default"])(BaseHostObject, [{
    key: "GetManagedObjects",
    value: function GetManagedObjects() {
      return {};
    }
  }]);
  return BaseHostObject;
}();

exports.BaseHostObject = BaseHostObject;
(0, _defineProperty2["default"])(BaseHostObject, "_INTERFACE", 'org.freedesktop.DBus.ObjectManager');