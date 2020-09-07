"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Adapter = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Adapter = require("./generated/Adapter1");

var _baseInterface = require("./models/base-interface");

var _property = require("./models/property");

var _device = require("./device");

var _leAdvertisingManager = require("./le-advertising-manager");

var _gattManager = require("./gatt-manager");

var _media = require("./media");

var _networkServer = require("./network-server");

var _handlebars = require("handlebars");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * @class
 * Bluetooth adapter that manages devices.
 * 
 * Representation of Bluezs `Adapter1` interface.
 */
var Adapter = /*#__PURE__*/function (_BaseInterface) {
  (0, _inherits2["default"])(Adapter, _BaseInterface);

  var _super = _createSuper(Adapter);

  /**
  * Hide constructor, initialization shall be done asynchronously with connect.
  */
  function Adapter(bluez, internal) {
    var _this;

    (0, _classCallCheck2["default"])(this, Adapter);
    _this = _super.call(this, bluez, internal);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Address", new _property.ReadOnlyProperty('Address', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "AddressType", new _property.ReadOnlyProperty('AddressType', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Name", new _property.ReadOnlyProperty('Name', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Alias", new _property.Property('Alias', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Class", new _property.ReadOnlyProperty('Class', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Powered", new _property.Property('Powered', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Discoverable", new _property.Property('Discoverable', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "DiscoverableTimeout", new _property.Property('DiscoverableTimeout', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Pairable", new _property.Property('Pairable', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "PairableTimeout", new _property.Property('PairableTimeout', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Discovering", new _property.ReadOnlyProperty('Discovering', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "UUIDs", new _property.ReadOnlyProperty('UUIDs', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Modalias", new _property.ReadOnlyProperty('Modalias', _this._internal));
    return _this;
  }
  /**
   * Connect to adapter under the specified path.
   * 
   * @param bluez `Bluez` instance. 
   * @param path path of the object.
   * @return `Adapter` if it exists.
   */


  (0, _createClass2["default"])(Adapter, [{
    key: "getDevicesRaw",

    /**
        * Get information about all discovered devices.
        * 
        * @return An object of the format {'device_path' : data}.
        */
    value: function () {
      var _getDevicesRaw = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this._bluez.getObjectData('Device1', this.path));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getDevicesRaw() {
        return _getDevicesRaw.apply(this, arguments);
      }

      return getDevicesRaw;
    }()
    /**
     * Returns a device with the given address.
     * 
     * @param address Bluetooth device address.
     * @return `Device` if it exists.
     */

  }, {
    key: "getDeviceByAddress",
    value: function () {
      var _getDeviceByAddress = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(address, options) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.getDevice({
                  'Address': address
                }, options));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getDeviceByAddress(_x, _x2) {
        return _getDeviceByAddress.apply(this, arguments);
      }

      return getDeviceByAddress;
    }()
    /**
     * Returns a device with the given name.
     * 
     * @param address Bluetooth device name.
     * @return `Device` if it exists.
     */

  }, {
    key: "getDeviceByName",
    value: function () {
      var _getDeviceByName = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(name, options) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.getDevice({
                  'Name': name
                }, options));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getDeviceByName(_x3, _x4) {
        return _getDeviceByName.apply(this, arguments);
      }

      return getDeviceByName;
    }()
    /**
     * Returns a device with the given alias.
     * 
     * @param address Bluetooth device alias.
     * @return `Device` if it exists.
     */

  }, {
    key: "getDeviceByAlias",
    value: function () {
      var _getDeviceByAlias = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(alias, options) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this.getDevice({
                  'Alias': alias
                }, options));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getDeviceByAlias(_x5, _x6) {
        return _getDeviceByAlias.apply(this, arguments);
      }

      return getDeviceByAlias;
    }()
    /**
    * Get a device that matches the given filter.
    * 
    * @param filter filter by any given property of `Device`, usally by UUID.
    * @param retryOptions retry this operation with a given number of times and interval in ms.
    * 
    * @returns `Device` object or undefined.
    * If multiple services match the filter, the first one is returned.
    */

  }, {
    key: "getDevice",
    value: function () {
      var _getDevice = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var filter,
            options,
            _args5 = arguments;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                filter = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
                options = _args5.length > 1 ? _args5[1] : undefined;
                return _context5.abrupt("return", this.getChildObject('Device1', _device.Device.connect, filter, options));

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getDevice() {
        return _getDevice.apply(this, arguments);
      }

      return getDevice;
    }()
    /**
     * Deletes all devices managed by the adapter.
     */

  }, {
    key: "clearDevices",
    value: function () {
      var _clearDevices = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        var _this2 = this;

        var paths;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.getDevicesRaw().then(function (data) {
                  return Object.keys(data);
                });

              case 2:
                paths = _context7.sent;
                paths.forEach( /*#__PURE__*/function () {
                  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(path) {
                    return _regenerator["default"].wrap(function _callee6$(_context6) {
                      while (1) {
                        switch (_context6.prev = _context6.next) {
                          case 0:
                            _context6.next = 2;
                            return _this2.removeDeviceByPath(path);

                          case 2:
                            return _context6.abrupt("return", _context6.sent);

                          case 3:
                          case "end":
                            return _context6.stop();
                        }
                      }
                    }, _callee6);
                  }));

                  return function (_x7) {
                    return _ref.apply(this, arguments);
                  };
                }());

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function clearDevices() {
        return _clearDevices.apply(this, arguments);
      }

      return clearDevices;
    }()
    /**
     * Deletes a specific device registred under the given path.
     * 
     * @param path the path of the `Device`.
     */

  }, {
    key: "removeDeviceByPath",
    value: function () {
      var _removeDeviceByPath = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(path) {
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt("return", this._internal.RemoveDevice(path));

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function removeDeviceByPath(_x8) {
        return _removeDeviceByPath.apply(this, arguments);
      }

      return removeDeviceByPath;
    }()
    /**
     * Get the adapters `LEAdvertisingManager`.
     */

  }, {
    key: "getAdvertisingManager",
    value: function () {
      var _getAdvertisingManager = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                return _context9.abrupt("return", _leAdvertisingManager.LEAdvertisingManager.connect(this._bluez, this.path));

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getAdvertisingManager() {
        return _getAdvertisingManager.apply(this, arguments);
      }

      return getAdvertisingManager;
    }()
    /**
     * Get the adapters `GattManager`.
     */

  }, {
    key: "getGattManager",
    value: function () {
      var _getGattManager = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                return _context10.abrupt("return", _gattManager.GattManager.connect(this._bluez, this.path));

              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getGattManager() {
        return _getGattManager.apply(this, arguments);
      }

      return getGattManager;
    }()
    /**
     * Get the adapters `Media`.
     */

  }, {
    key: "getMedia",
    value: function () {
      var _getMedia = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt("return", _media.Media.connect(this._bluez, this.path));

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function getMedia() {
        return _getMedia.apply(this, arguments);
      }

      return getMedia;
    }()
    /**
     * Get the adapters `NetworkServer`.
     */

  }, {
    key: "getNetworkServer",
    value: function () {
      var _getNetworkServer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                return _context12.abrupt("return", _networkServer.NetworkServer.connect(this._bluez, this.path));

              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function getNetworkServer() {
        return _getNetworkServer.apply(this, arguments);
      }

      return getNetworkServer;
    }()
    /*
       * Direct mappings to introspected properties, methods and signals of internal Adapter1
       */
    //@property({ name: 'Address', signature: 's', access: ACCESS_READ })

  }, {
    key: "startDiscovery",
    //@method({ name: 'StartDiscovery', inSignature: '', outSignature: '' })
    value: function () {
      var _startDiscovery = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                return _context13.abrupt("return", this._internal.StartDiscovery());

              case 1:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function startDiscovery() {
        return _startDiscovery.apply(this, arguments);
      }

      return startDiscovery;
    }() //@method({ name: 'SetDiscoveryFilter', inSignature: 'a{sv}', outSignature: '' })

  }, {
    key: "setDiscoveryFilter",
    value: function () {
      var _setDiscoveryFilter = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(properties) {
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                return _context14.abrupt("return", this._internal.SetDiscoveryFilter(properties));

              case 1:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function setDiscoveryFilter(_x9) {
        return _setDiscoveryFilter.apply(this, arguments);
      }

      return setDiscoveryFilter;
    }() //@method({ name: 'StopDiscovery', inSignature: '', outSignature: '' })

  }, {
    key: "stopDiscovery",
    value: function () {
      var _stopDiscovery = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
        return _regenerator["default"].wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                return _context15.abrupt("return", this._internal.StopDiscovery());

              case 1:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function stopDiscovery() {
        return _stopDiscovery.apply(this, arguments);
      }

      return stopDiscovery;
    }() //@method({ name: 'RemoveDevice', inSignature: 'o', outSignature: '' })

  }, {
    key: "removeDevice",
    value: function () {
      var _removeDevice = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(device) {
        return _regenerator["default"].wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                return _context16.abrupt("return", this._internal.RemoveDevice(device));

              case 1:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function removeDevice(_x10) {
        return _removeDevice.apply(this, arguments);
      }

      return removeDevice;
    }() //@method({ name: 'GetDiscoveryFilters', inSignature: '', outSignature: 'as' })

  }, {
    key: "getDiscoveryFilters",
    value: function () {
      var _getDiscoveryFilters = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
        return _regenerator["default"].wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.t0 = Array;
                _context17.next = 3;
                return this._internal.GetDiscoveryFilters();

              case 3:
                _context17.t1 = _context17.sent;
                return _context17.abrupt("return", new _context17.t0(_context17.t1));

              case 5:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function getDiscoveryFilters() {
        return _getDiscoveryFilters.apply(this, arguments);
      }

      return getDiscoveryFilters;
    }()
  }], [{
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(bluez) {
        var path,
            _args18 = arguments;
        return _regenerator["default"].wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                path = _args18.length > 1 && _args18[1] !== undefined ? _args18[1] : "/org/bluez/hci0";
                _context18.t0 = Adapter;
                _context18.t1 = bluez;
                _context18.next = 5;
                return _Adapter.Adapter1.Connect(bluez.bus, path);

              case 5:
                _context18.t2 = _context18.sent;
                return _context18.abrupt("return", new _context18.t0(_context18.t1, _context18.t2));

              case 7:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18);
      }));

      function connect(_x11) {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
    /**
     * Connect to the default adapter.
     * 
     * @param bluez `Bluez` instance.
     */

  }, {
    key: "connectDefault",
    value: function () {
      var _connectDefault = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(bluez) {
        var adapterPaths;
        return _regenerator["default"].wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.t0 = Object;
                _context19.next = 3;
                return bluez.getObjectData('Adapter1', '/org/bluez');

              case 3:
                _context19.t1 = _context19.sent;
                adapterPaths = _context19.t0.keys.call(_context19.t0, _context19.t1);

                if (!(adapterPaths.length === 0)) {
                  _context19.next = 7;
                  break;
                }

                throw new _handlebars.Exception("Could not connect to default adapter: No adapter found");

              case 7:
                return _context19.abrupt("return", Adapter.connect(bluez, adapterPaths[0]));

              case 8:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19);
      }));

      function connectDefault(_x12) {
        return _connectDefault.apply(this, arguments);
      }

      return connectDefault;
    }()
  }]);
  return Adapter;
}(_baseInterface.BaseInterface);

exports.Adapter = Adapter;