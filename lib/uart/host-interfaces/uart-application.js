"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UartApplication = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var dbus = _interopRequireWildcard(require("dbus-next"));

var _hostGattApplication = require("../../core/host-interfaces/host-gatt-application");

var _uartService = require("./uart-service");

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

var UartApplication = /*#__PURE__*/function (_HostGattApplication) {
  (0, _inherits2["default"])(UartApplication, _HostGattApplication);

  var _super = _createSuper(UartApplication);

  function UartApplication(bluez) {
    var _this;

    (0, _classCallCheck2["default"])(this, UartApplication);
    _this = _super.call(this, bluez);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "service", void 0);
    _this.service = new _uartService.UartService(bluez, 0);

    _this.addService(_this.service);

    return _this;
  }

  return UartApplication;
}(_hostGattApplication.HostGattApplication);

exports.UartApplication = UartApplication;