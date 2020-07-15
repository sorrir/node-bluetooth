"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DBusObject = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _types = require("../../types");

var dbus = _interopRequireWildcard(require("dbus-next"));

var _handlebars = require("handlebars");

var _dbus$interface = dbus["interface"],
    Interface = _dbus$interface.Interface,
    property = _dbus$interface.property,
    method = _dbus$interface.method,
    signal = _dbus$interface.signal,
    ACCESS_READ = _dbus$interface.ACCESS_READ,
    ACCESS_WRITE = _dbus$interface.ACCESS_WRITE,
    ACCESS_READWRITE = _dbus$interface.ACCESS_READWRITE;

var DBusObject = /*#__PURE__*/function () {
  function DBusObject(bluez, path, name) {
    var hasProperties = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    (0, _classCallCheck2["default"])(this, DBusObject);
    (0, _defineProperty2["default"])(this, "bluez", void 0);
    (0, _defineProperty2["default"])(this, "name", void 0);
    (0, _defineProperty2["default"])(this, "path", void 0);
    (0, _defineProperty2["default"])(this, "hasProperties", void 0);
    (0, _defineProperty2["default"])(this, "_object", void 0);
    (0, _defineProperty2["default"])(this, "_interface", void 0);
    (0, _defineProperty2["default"])(this, "_properties", void 0);
    this.bluez = bluez;
    this.name = name;
    this.path = path;
    this.hasProperties = hasProperties;
  }

  (0, _createClass2["default"])(DBusObject, [{
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.bluez.bus.getProxyObject('org.bluez', this.path);

              case 2:
                this._object = _context.sent;
                this._interface = this._object.getInterface(this.name);
                if (this.hasProperties) this._properties = this._object.getInterface('org.freedesktop.DBus.Properties');
                return _context.abrupt("return", this);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "call",
    value: function () {
      var _call = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(methodName) {
        var _this$_interface;

        var _len,
            args,
            _key,
            _args2 = arguments;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                for (_len = _args2.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = _args2[_key];
                }

                return _context2.abrupt("return", (_this$_interface = this._interface)[methodName].apply(_this$_interface, args));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function call(_x) {
        return _call.apply(this, arguments);
      }

      return call;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(parameterName) {
        var variant;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.hasProperties) {
                  _context3.next = 2;
                  break;
                }

                throw new _handlebars.Exception("Object has no properties");

              case 2:
                _context3.next = 4;
                return this._properties.Get(this.name, parameterName);

              case 4:
                variant = _context3.sent;
                return _context3.abrupt("return", variant.value);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function get(_x2) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "set",
    value: function () {
      var _set = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(parameterName, value) {
        var signature,
            _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                signature = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : null;

                if (signature === null) {
                  signature = DBusObject._getSignature(value);
                }

                return _context4.abrupt("return", this._properties.Set(this.name, parameterName, new _types.Variant(signature, value)));

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function set(_x3, _x4) {
        return _set.apply(this, arguments);
      }

      return set;
    }()
  }], [{
    key: "_getSignature",
    value: function _getSignature(value) {
      if (typeof value === 'string') {
        return 's';
      } else if (typeof value === 'boolean') {
        return 'b';
      } else if (typeof value === 'number') {
        return 'n';
      }

      throw new _handlebars.Exception("Type of ".concat(value, " is not trivial"));
    }
  }]);
  return DBusObject;
}();

exports.DBusObject = DBusObject;