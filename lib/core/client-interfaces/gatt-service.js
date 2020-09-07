"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GattService = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _GattService = require("./generated/GattService1");

var _baseInterface = require("./models/base-interface");

var _property = require("./models/property");

var _gattCharacteristic = require("./gatt-characteristic");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var GattService = /*#__PURE__*/function (_BaseInterface) {
  (0, _inherits2["default"])(GattService, _BaseInterface);

  var _super = _createSuper(GattService);

  /**
  * Hide constructor, initialization shall be done asynchronously with connect.
  */
  function GattService(bluez, internal) {
    var _this;

    (0, _classCallCheck2["default"])(this, GattService);
    _this = _super.call(this, bluez, internal);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "UUID", new _property.ReadOnlyProperty('UUID', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Device", new _property.ReadOnlyProperty('Device', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Primary", new _property.ReadOnlyProperty('Primary', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Includes", new _property.ReadOnlyProperty('Includes', _this._internal));
    return _this;
  }
  /**
  * Connect to GATT service under the specified path.
  * 
  * @param bluez `Bluez` instance. 
  * @param path path of the object.
  * @return `GattService` if it exists.
  */


  (0, _createClass2["default"])(GattService, [{
    key: "getCharacteristicsRaw",

    /**
     * Get information about all characteristics.
     * 
     * @returns An object of the format {'characteristic_path' : data}.
     */
    value: function () {
      var _getCharacteristicsRaw = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.getChildObjectsRaw('GattCharacteristic1'));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getCharacteristicsRaw() {
        return _getCharacteristicsRaw.apply(this, arguments);
      }

      return getCharacteristicsRaw;
    }()
    /**
    * Get a characteristic that matches the given filter.
    * 
    * @param filter filter by any given property of `GattCharacteristic`, usally by UUID.
    * @param retryOptions retry this operation with a given number of times and interval in ms.
    * 
    * @returns `GattCharacteristic` object or undefined.
    * If multiple services match the filter, the first one is returned.
    */

  }, {
    key: "getCharacteristic",
    value: function () {
      var _getCharacteristic = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var filter,
            options,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                filter = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                options = _args2.length > 1 ? _args2[1] : undefined;
                return _context2.abrupt("return", this.getChildObject('GattCharacteristic1', _gattCharacteristic.GattCharacteristic.connect, filter, options));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getCharacteristic() {
        return _getCharacteristic.apply(this, arguments);
      }

      return getCharacteristic;
    }()
    /*
    * Direct mappings to introspected properties, methods and signals of internal GattService1
    */
    //@property({ name: 'UUID', signature: 's', access: ACCESS_READ })

  }], [{
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(bluez, path) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = GattService;
                _context3.t1 = bluez;
                _context3.next = 4;
                return _GattService.GattService1.Connect(bluez.bus, path);

              case 4:
                _context3.t2 = _context3.sent;
                return _context3.abrupt("return", new _context3.t0(_context3.t1, _context3.t2));

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function connect(_x, _x2) {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }]);
  return GattService;
}(_baseInterface.BaseInterface);

exports.GattService = GattService;