"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UartService = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var dbus = _interopRequireWildcard(require("dbus-next"));

var _hostGattService = require("../../core/host-interfaces/host-gatt-service");

var _uartTxCharacteristic = require("./uart-tx-characteristic");

var _uartRxCharacteristic = require("./uart-rx-characteristic");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Message = dbus.Message;
var _dbus$interface = dbus["interface"],
    Interface = _dbus$interface.Interface,
    property = _dbus$interface.property,
    method = _dbus$interface.method,
    signal = _dbus$interface.signal,
    ACCESS_READ = _dbus$interface.ACCESS_READ,
    ACCESS_WRITE = _dbus$interface.ACCESS_WRITE,
    ACCESS_READWRITE = _dbus$interface.ACCESS_READWRITE;
var UART_SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';

var UartService = /*#__PURE__*/function (_HostGattService) {
  (0, _inherits2["default"])(UartService, _HostGattService);

  var _super = _createSuper(UartService);

  function UartService(bluez, index) {
    var _this;

    (0, _classCallCheck2["default"])(this, UartService);
    _this = _super.call(this, bluez, UART_SERVICE_UUID, true, index);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "txCharacteristic", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "rxCharacteristic", void 0);
    _this.txCharacteristic = new _uartTxCharacteristic.UartTxCharacteristic(bluez, (0, _assertThisInitialized2["default"])(_this), 0);
    _this.rxCharacteristic = new _uartRxCharacteristic.UartRxCharacteristic(bluez, (0, _assertThisInitialized2["default"])(_this), 1);

    _this.addCharacteristic(_this.txCharacteristic);

    _this.addCharacteristic(_this.rxCharacteristic);

    return _this;
  }

  return UartService;
}(_hostGattService.HostGattService);

exports.UartService = UartService;