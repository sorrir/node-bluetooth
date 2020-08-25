"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Device = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Device = require("./generated/Device1");

var _baseInterface = require("./models/base-interface");

var _property = require("./models/property");

var _gattService = require("./gatt-service");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * @class
 * Remote device that has been discovered by a `Adapter`.
 * 
 * Representation of Bluezs `Device1` interface.
 */
var Device = /*#__PURE__*/function (_BaseInterface) {
  (0, _inherits2["default"])(Device, _BaseInterface);

  var _super = _createSuper(Device);

  /**
  * Hide constructor, initialization shall be done asynchronously with connect
  */
  function Device(bluez, internal) {
    var _this;

    (0, _classCallCheck2["default"])(this, Device);
    _this = _super.call(this, bluez, internal);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Address", new _property.ReadOnlyProperty('Address', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "AddressType", new _property.ReadOnlyProperty('AddressType', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Name", new _property.ReadOnlyProperty('Name', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Alias", new _property.Property('Alias', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Class", new _property.ReadOnlyProperty('Class', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Appearance", new _property.ReadOnlyProperty('Appearance', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Icon", new _property.ReadOnlyProperty('Icon', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Paired", new _property.ReadOnlyProperty('Paired', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Trusted", new _property.Property('Trusted', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Blocked", new _property.Property('Blocked', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "LegacyPairing", new _property.ReadOnlyProperty('LegacyPairing', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "RSSI", new _property.ReadOnlyProperty('RSSI', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Connected", new _property.ReadOnlyProperty('Connected', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "UUIDs", new _property.ReadOnlyProperty('UUIDs', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Modalias", new _property.ReadOnlyProperty('Modalias', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Adapter", new _property.ReadOnlyProperty('Adapter', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "ManufacturerData", new _property.ReadOnlyProperty('ManufacturerData', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "ServiceData", new _property.ReadOnlyProperty('ServiceData', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "TxPower", new _property.ReadOnlyProperty('TxPower', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "ServicesResolved", new _property.ReadOnlyProperty('ServicesResolved', _this._internal));
    return _this;
  }

  (0, _createClass2["default"])(Device, [{
    key: "getService",

    /**
     * Get a service that matches the given filter.
     * 
     * @param filter filter by any given property of {@link GattService}, usally by UUID.
     * @param retryOptions retry this operation with a given number of times and interval in ms.
     * @param servicesResolvedTimeoutMs timeout for resolving the devices' services
     * 
     * @returns A matching {@link GattService} object or undefined.
     * If multiple services match the filter, the first one is returned.
     * 
     * @throws an exception if the services cannot be resolved until the given timeout.
     */
    value: function () {
      var _getService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var filter,
            retryOptions,
            servicesResolvedTimeoutMs,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                filter = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                retryOptions = _args.length > 1 && _args[1] !== undefined ? _args[1] : {
                  maxRetries: 0,
                  retryIntervalMs: 1000
                };
                servicesResolvedTimeoutMs = _args.length > 2 && _args[2] !== undefined ? _args[2] : 10000;
                _context.next = 5;
                return this.ServicesResolved.waitForValue(true, servicesResolvedTimeoutMs);

              case 5:
                return _context.abrupt("return", this.getChildObject('GattService1', _gattService.GattService.connect, filter, retryOptions));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getService() {
        return _getService.apply(this, arguments);
      }

      return getService;
    }()
    /**
     * Get all properties.
     * 
     * @returns properties with their respective names and values.
     */

  }, {
    key: "getAllProperties",
    value: function () {
      var _getAllProperties = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var properties, _i, _Object$entries, _Object$entries$_i, name, variant;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                properties = {};
                _i = 0;
                _context2.t0 = Object;
                _context2.next = 5;
                return this.getAllPropertiesAsVariants();

              case 5:
                _context2.t1 = _context2.sent;
                _Object$entries = _context2.t0.entries.call(_context2.t0, _context2.t1);

              case 7:
                if (!(_i < _Object$entries.length)) {
                  _context2.next = 13;
                  break;
                }

                _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2), name = _Object$entries$_i[0], variant = _Object$entries$_i[1];
                properties[name] = variant.value;

              case 10:
                _i++;
                _context2.next = 7;
                break;

              case 13:
                return _context2.abrupt("return", properties);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getAllProperties() {
        return _getAllProperties.apply(this, arguments);
      }

      return getAllProperties;
    }()
    /**
     * Get all properties as `Variant`s.
     * 
     * @returns properties with their respective names, values and signature.
     */

  }, {
    key: "getAllPropertiesAsVariants",
    value: function () {
      var _getAllPropertiesAsVariants = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this._internal.getProperties());

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getAllPropertiesAsVariants() {
        return _getAllPropertiesAsVariants.apply(this, arguments);
      }

      return getAllPropertiesAsVariants;
    }()
    /*
    * Direct mappings to introspected properties, methods and signals of internal Device1
    */
    //@property({ name: 'Address', signature: 's', access: ACCESS_READ })

  }, {
    key: "disconnect",
    //@method({ name: 'Disconnect', inSignature: '', outSignature: '' })
    value: function () {
      var _disconnect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this._internal.Disconnect());

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function disconnect() {
        return _disconnect.apply(this, arguments);
      }

      return disconnect;
    }() //@method({ name: 'Connect', inSignature: '', outSignature: '' })

  }, {
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this._internal.Connect());

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function connect() {
        return _connect.apply(this, arguments);
      }

      return connect;
    }() //@method({ name: 'ConnectProfile', inSignature: 's', outSignature: '' })

  }, {
    key: "connectProfile",
    value: function () {
      var _connectProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(UUID) {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", this._internal.ConnectProfile(UUID));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function connectProfile(_x) {
        return _connectProfile.apply(this, arguments);
      }

      return connectProfile;
    }() //@method({ name: 'DisconnectProfile', inSignature: 's', outSignature: '' })

  }, {
    key: "disconnectProfile",
    value: function () {
      var _disconnectProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(UUID) {
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", this._internal.DisconnectProfile(UUID));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function disconnectProfile(_x2) {
        return _disconnectProfile.apply(this, arguments);
      }

      return disconnectProfile;
    }() //@method({ name: 'Pair', inSignature: '', outSignature: '' })

  }, {
    key: "pair",
    value: function () {
      var _pair = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt("return", this._internal.Pair());

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function pair() {
        return _pair.apply(this, arguments);
      }

      return pair;
    }() //@method({ name: 'CancelPairing', inSignature: '', outSignature: '' })

  }, {
    key: "cancelPairing",
    value: function () {
      var _cancelPairing = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                return _context9.abrupt("return", this._internal.CancelPairing());

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function cancelPairing() {
        return _cancelPairing.apply(this, arguments);
      }

      return cancelPairing;
    }()
  }], [{
    key: "connect",
    value: function () {
      var _connect2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(bluez, path) {
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.t0 = Device;
                _context10.t1 = bluez;
                _context10.next = 4;
                return _Device.Device1.Connect(bluez.bus, path);

              case 4:
                _context10.t2 = _context10.sent;
                return _context10.abrupt("return", new _context10.t0(_context10.t1, _context10.t2));

              case 6:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function connect(_x3, _x4) {
        return _connect2.apply(this, arguments);
      }

      return connect;
    }()
  }]);
  return Device;
}(_baseInterface.BaseInterface);

exports.Device = Device;