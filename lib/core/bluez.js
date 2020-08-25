"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bluez = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var dbus = _interopRequireWildcard(require("dbus-next"));

var _dbusObjectManager = require("./client-interfaces/models/dbus-object-manager");

var _dbusObject = require("./client-interfaces/models/dbus-object");

var Bluez = /*#__PURE__*/function () {
  function Bluez() {
    (0, _classCallCheck2["default"])(this, Bluez);
    (0, _defineProperty2["default"])(this, "bus", void 0);
    (0, _defineProperty2["default"])(this, "objectManager", void 0);
    this.bus = dbus.systemBus();
  }

  (0, _createClass2["default"])(Bluez, [{
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.bus.requestName('org.bluez');

              case 2:
                _context.next = 4;
                return _dbusObjectManager.DBusObjectManager.__connect(this);

              case 4:
                this.objectManager = _context.sent;
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
    key: "getObjectData",
    value: function () {
      var _getObjectData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(interfaceName) {
        var path,
            _interfaceName,
            objects,
            output,
            _i,
            _Object$keys,
            key,
            data,
            _args2 = arguments;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                path = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : '/org/bluez';
                _interfaceName = "org.bluez.".concat(interfaceName);
                _context2.next = 4;
                return this.objectManager.getManagedObjects();

              case 4:
                objects = _context2.sent;
                output = {};

                for (_i = 0, _Object$keys = Object.keys(objects); _i < _Object$keys.length; _i++) {
                  key = _Object$keys[_i];

                  if (key.startsWith(path)) {
                    data = objects[key][_interfaceName];

                    if (data) {
                      output[key] = data;
                    }
                  }
                }

                return _context2.abrupt("return", output);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getObjectData(_x) {
        return _getObjectData.apply(this, arguments);
      }

      return getObjectData;
    }()
  }, {
    key: "getDBusObject",
    value: function () {
      var _getDBusObject = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(path, name) {
        var withProps,
            _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                withProps = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : false;
                return _context3.abrupt("return", new _dbusObject.DBusObject(this, path, name, withProps).init());

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getDBusObject(_x2, _x3) {
        return _getDBusObject.apply(this, arguments);
      }

      return getDBusObject;
    }()
  }, {
    key: "exportInterface",
    value: function exportInterface(iface) {
      return this.bus["export"](iface.path, iface);
    }
  }, {
    key: "unexportInterface",
    value: function unexportInterface(iface) {
      return this.bus.unexport(iface.path);
    }
  }, {
    key: "updateInterface",
    value: function updateInterface(iface) {
      this.bus.unexport(iface.path);
      this.bus["export"](iface.path, iface);
    }
  }]);
  return Bluez;
}();

exports.Bluez = Bluez;