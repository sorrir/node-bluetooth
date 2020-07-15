"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HostGattApplication = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var dbus = _interopRequireWildcard(require("dbus-next"));

var _baseHostObject = require("./models/base-host-object");

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

var HostGattApplication = /*#__PURE__*/function (_BaseHostObject) {
  (0, _inherits2["default"])(HostGattApplication, _BaseHostObject);

  var _super = _createSuper(HostGattApplication);

  function HostGattApplication(bluez) {
    var _this;

    (0, _classCallCheck2["default"])(this, HostGattApplication);
    _this = _super.call(this, bluez, '/');
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "bluez", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "services", void 0);
    _this.services = {};
    return _this;
  }

  (0, _createClass2["default"])(HostGattApplication, [{
    key: "GetManagedObjects",
    value: function GetManagedObjects() {
      var objects = {};

      for (var _i = 0, _Object$keys = Object.keys(this.services); _i < _Object$keys.length; _i++) {
        var servicePath = _Object$keys[_i];
        var service = this.services[servicePath];
        var object = {};
        object[service.name] = service.GetAll().value;
        objects[service.path] = object;

        for (var _i2 = 0, _Object$keys2 = Object.keys(service.Characteristics); _i2 < _Object$keys2.length; _i2++) {
          var charPath = _Object$keys2[_i2];
          var _char = service.Characteristics[charPath];
          var _object = {};
          _object[_char.name] = _char.GetAll().value;
          objects[_char.path] = _object;
        }
      }

      return objects;
    }
  }, {
    key: "addService",
    value: function addService(service) {
      this.services[service.path] = service;
    }
  }]);
  return HostGattApplication;
}(_baseHostObject.BaseHostObject);

exports.HostGattApplication = HostGattApplication;