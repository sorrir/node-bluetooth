"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GattCharacteristic = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _GattCharacteristic = require("./generated/GattCharacteristic1");

var _baseInterface = require("./models/base-interface");

var _property = require("./models/property");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var GattCharacteristic = /*#__PURE__*/function (_BaseInterface) {
  (0, _inherits2["default"])(GattCharacteristic, _BaseInterface);

  var _super = _createSuper(GattCharacteristic);

  /**
  * Hide constructor, initialization shall be done asynchronously with connect.
  */
  function GattCharacteristic(bluez, internal) {
    var _this;

    (0, _classCallCheck2["default"])(this, GattCharacteristic);
    _this = _super.call(this, bluez, internal);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "ValueAsString", new _property.ReadOnlyProperty('Value', _this._internal, {
      "in": function _in(value) {
        return Buffer.from(value).toString();
      }
    }));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "UUID", new _property.ReadOnlyProperty('UUID', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Service", new _property.ReadOnlyProperty('Service', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Value", new _property.ReadOnlyProperty('Value', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Notifying", new _property.ReadOnlyProperty('Notifying', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Flags", new _property.ReadOnlyProperty('Flags', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "WriteAcquired", new _property.ReadOnlyProperty('WriteAcquired', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "NotifyAcquired", new _property.ReadOnlyProperty('NotifyAcquired', _this._internal));
    return _this;
  }
  /**
   * Connect to GATT characteristic under the specified path.
   * 
   * @param bluez `Bluez` instance. 
   * @param path path of the object.
   * @return `GattCharacteristic` if it exists.
   */


  (0, _createClass2["default"])(GattCharacteristic, [{
    key: "writeString",

    /**
     * Write a string to the characteristic.
     * 
     * @param text text to write.
     * @param options options for writing the text.
     */
    value: function () {
      var _writeString = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(text) {
        var options,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                return _context.abrupt("return", this.writeValue(Buffer.from(text).toJSON().data, options));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function writeString(_x) {
        return _writeString.apply(this, arguments);
      }

      return writeString;
    }()
    /**
     * Read a string from the characteristic.
     * 
     * @param options currently not used
     */

  }, {
    key: "readString",
    value: function () {
      var _readString = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var options,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                _context2.t0 = Buffer;
                _context2.next = 4;
                return this.Value.get();

              case 4:
                _context2.t1 = _context2.sent;
                return _context2.abrupt("return", _context2.t0.from.call(_context2.t0, _context2.t1).toString());

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function readString() {
        return _readString.apply(this, arguments);
      }

      return readString;
    }()
  }, {
    key: "readValue",
    //@method({ name: 'ReadValue', inSignature: 'a{sv}', outSignature: 'ay' })
    value: function () {
      var _readValue = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = Array;
                _context3.next = 3;
                return this._internal.ReadValue(options);

              case 3:
                _context3.t1 = _context3.sent;
                return _context3.abrupt("return", new _context3.t0(_context3.t1));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function readValue(_x2) {
        return _readValue.apply(this, arguments);
      }

      return readValue;
    }() //@method({ name: 'WriteValue', inSignature: 'aya{sv}', outSignature: '' })

  }, {
    key: "writeValue",
    value: function () {
      var _writeValue = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(value, options) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this._internal.WriteValue(value, options));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function writeValue(_x3, _x4) {
        return _writeValue.apply(this, arguments);
      }

      return writeValue;
    }() //@method({ name: 'AcquireWrite', inSignature: 'a{sv}', outSignature: 'hq' })

  }, {
    key: "acquireWrite",
    value: function () {
      var _acquireWrite = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(options) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this._internal.AcquireWrite(options));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function acquireWrite(_x5) {
        return _acquireWrite.apply(this, arguments);
      }

      return acquireWrite;
    }() //@method({ name: 'AcquireNotify', inSignature: 'a{sv}', outSignature: 'hq' })

  }, {
    key: "acquireNotify",
    value: function () {
      var _acquireNotify = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(options) {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", this._internal.AcquireNotify(options));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function acquireNotify(_x6) {
        return _acquireNotify.apply(this, arguments);
      }

      return acquireNotify;
    }() //@method({ name: 'StartNotify', inSignature: '', outSignature: '' })

  }, {
    key: "startNotify",
    value: function () {
      var _startNotify = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", this._internal.StartNotify());

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function startNotify() {
        return _startNotify.apply(this, arguments);
      }

      return startNotify;
    }() //@method({ name: 'StopNotify', inSignature: '', outSignature: '' })

  }, {
    key: "stopNotify",
    value: function () {
      var _stopNotify = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt("return", this._internal.StopNotify());

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function stopNotify() {
        return _stopNotify.apply(this, arguments);
      }

      return stopNotify;
    }()
  }], [{
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(bluez, path) {
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.t0 = GattCharacteristic;
                _context9.t1 = bluez;
                _context9.next = 4;
                return _GattCharacteristic.GattCharacteristic1.Connect(bluez.bus, path);

              case 4:
                _context9.t2 = _context9.sent;
                return _context9.abrupt("return", new _context9.t0(_context9.t1, _context9.t2));

              case 6:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function connect(_x7, _x8) {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }]);
  return GattCharacteristic;
}(_baseInterface.BaseInterface);

exports.GattCharacteristic = GattCharacteristic;