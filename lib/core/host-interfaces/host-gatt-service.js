"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HostGattService = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var dbus = _interopRequireWildcard(require("dbus-next"));

var _baseHostInterface = require("./models/base-host-interface");

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

var HostGattService = /*#__PURE__*/function (_BaseHostInterface) {
  (0, _inherits2["default"])(HostGattService, _BaseHostInterface);

  var _super = _createSuper(HostGattService);

  function HostGattService(bluez, uuid, primary) {
    var _this;

    var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    (0, _classCallCheck2["default"])(this, HostGattService);
    _this = _super.call(this, bluez, "/org/bluez/sorrir/service".concat(index), "org.bluez.GattService1", {
      'UUID': {
        signature: 's',
        value: uuid
      },
      'Characteristics': {
        signature: 'ao',
        value: {},
        valueTransform: function valueTransform(val) {
          return Object.keys(val);
        }
      },
      'Primary': {
        signature: 'b',
        value: primary
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "UUID", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Primary", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Characteristics", void 0);

    _this._init();

    return _this;
  }

  (0, _createClass2["default"])(HostGattService, [{
    key: "addCharacteristic",
    value: function addCharacteristic(characteristic) {
      this.Characteristics[characteristic.path] = characteristic;
    }
  }, {
    key: "removeCharacteristic",
    value: function removeCharacteristic(characteristic) {
      this.Characteristics[characteristic.path] = undefined;
    }
  }]);
  return HostGattService;
}(_baseHostInterface.BaseHostInterface);

exports.HostGattService = HostGattService;