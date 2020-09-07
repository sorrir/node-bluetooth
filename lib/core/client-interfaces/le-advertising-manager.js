"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LEAdvertisingManager = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _LEAdvertisingManager = require("./generated/LEAdvertisingManager1");

var _baseInterface = require("./models/base-interface");

var _property = require("./models/property");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var LEAdvertisingManager = /*#__PURE__*/function (_BaseInterface) {
  (0, _inherits2["default"])(LEAdvertisingManager, _BaseInterface);

  var _super = _createSuper(LEAdvertisingManager);

  /**
  * Hide constructor, initialization shall be done asynchronously with connect.
  */
  function LEAdvertisingManager(bluez, internal) {
    var _this;

    (0, _classCallCheck2["default"])(this, LEAdvertisingManager);
    _this = _super.call(this, bluez, internal);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "ActiveInstances", new _property.ReadOnlyProperty('ActiveInstances', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "SupportedInstances", new _property.ReadOnlyProperty('SupportedInstances', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "SupportedIncludes", new _property.ReadOnlyProperty('SupportedIncludes', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "SupportedSecondaryChannels", new _property.ReadOnlyProperty('SupportedSecondaryChannels', _this._internal));
    return _this;
  }
  /**
   * Connect to LE advertising manager under the specified path.
   * 
   * @param bluez `Bluez` instance. 
   * @param path path of the object.
   * @return `LEAdvertisingManager1` if it exists.
   */


  (0, _createClass2["default"])(LEAdvertisingManager, [{
    key: "registerAdvertisement",
    //@method({ name: 'RegisterAdvertisement', inSignature: 'oa{sv}', outSignature: '' })
    value: function () {
      var _registerAdvertisement = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(advertisement, options) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this._internal.RegisterAdvertisement(advertisement, options));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function registerAdvertisement(_x, _x2) {
        return _registerAdvertisement.apply(this, arguments);
      }

      return registerAdvertisement;
    }() //@method({ name: 'UnregisterAdvertisement', inSignature: 'o', outSignature: '' })

  }, {
    key: "unregisterAdvertisement",
    value: function () {
      var _unregisterAdvertisement = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(service) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this._internal.UnregisterAdvertisement(service));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function unregisterAdvertisement(_x3) {
        return _unregisterAdvertisement.apply(this, arguments);
      }

      return unregisterAdvertisement;
    }()
  }], [{
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(bluez, path) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = LEAdvertisingManager;
                _context3.t1 = bluez;
                _context3.next = 4;
                return _LEAdvertisingManager.LEAdvertisingManager1.Connect(bluez.bus, path);

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

      function connect(_x4, _x5) {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
    /*
    * Direct mappings to introspected properties, methods and signals of internal LEAdvertisingManager1
    */
    //@property({ name: 'ActiveInstances', signature: 'y', access: ACCESS_READ })

  }]);
  return LEAdvertisingManager;
}(_baseInterface.BaseInterface);

exports.LEAdvertisingManager = LEAdvertisingManager;