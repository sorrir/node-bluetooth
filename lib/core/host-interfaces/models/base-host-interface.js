"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseHostInterface = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _types = require("../../types");

var dbus = _interopRequireWildcard(require("dbus-next"));

var _handlebars = require("handlebars");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var _dbus$interface = dbus["interface"],
    property = _dbus$interface.property,
    method = _dbus$interface.method,
    signal = _dbus$interface.signal,
    ACCESS_READ = _dbus$interface.ACCESS_READ,
    ACCESS_WRITE = _dbus$interface.ACCESS_WRITE,
    ACCESS_READWRITE = _dbus$interface.ACCESS_READWRITE;

var BaseHostInterface = /*#__PURE__*/function (_dbus$interface$Inter) {
  (0, _inherits2["default"])(BaseHostInterface, _dbus$interface$Inter);

  var _super = _createSuper(BaseHostInterface);

  /**
   *  {@Link _init} has to be called after this
   * */
  function BaseHostInterface(bluez, path, name) {
    var _this2;

    var managedProperties = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    (0, _classCallCheck2["default"])(this, BaseHostInterface);
    _this2 = _super.call(this, name);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "name", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "path", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "bluez", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "managedProperties", void 0);
    _this2.name = name;
    _this2.path = path;
    _this2.bluez = bluez;
    _this2.managedProperties = managedProperties;

    var _this = (0, _assertThisInitialized2["default"])(_this2);

    bluez.bus.addMethodHandler(function (msg) {
      return _this._handleReturnFn(msg, 'GetAll'); //TODO: implement this correctly

      /*
      if (_this._handleReturnFn(msg, 'Get'))
          return true
      */
    });
    return _this2;
  } //TODO: find a better solution for this workaround
  //what this does: changes the order of adding the class parameters to after the constructors
  //so that they are not overwritten in by the declaration of the derived class
  //also, the interface needs to be exported after the decleration of the derived class
  //because otherwise overwritten methods are not reflected


  (0, _createClass2["default"])(BaseHostInterface, [{
    key: "_init",
    value: function _init() {
      for (var _i = 0, _Object$entries = Object.entries(this.managedProperties); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2),
            name = _Object$entries$_i[0],
            _property = _Object$entries$_i[1];

        this[name] = _property.value;
      }

      this.bluez.exportInterface(this);
      return this;
    }
  }, {
    key: "GetAll",
    value: function GetAll() {
      var allProperties = {};

      for (var _i2 = 0, _Object$entries2 = Object.entries(this.managedProperties); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = (0, _slicedToArray2["default"])(_Object$entries2[_i2], 2),
            name = _Object$entries2$_i[0],
            _property2 = _Object$entries2$_i[1];

        allProperties[name] = this._getProperty(name, _property2);
      }

      return new _types.Variant('a{sv}', allProperties);
    }
  }, {
    key: "Get",
    value: function Get(name) {
      var property = this.managedProperties[name];
      return property === undefined ? undefined : this._getProperty(name, property);
    } //emitOnPropertiesChanged(string: string, dict: dict<string, Variant>, array: Array<string>) { this._internal.emit('PropertiesChanged', string, dict, array) }

  }, {
    key: "emitPropertiesChanged",
    value: function emitPropertiesChanged(values) {
      var message = dbus.Message.newSignal(this.path, BaseHostInterface._INTERFACE, 'PropertiesChanged', 'sa{sv}as', [this.name, values, []]);
      this.bluez.bus.send(message);
    }
  }, {
    key: "unexport",
    value: function unexport() {
      this.bluez.unexportInterface(this);
    }
  }, {
    key: "update",
    value: function update() {
      this.bluez.updateInterface(this);
    }
  }, {
    key: "_getProperty",
    value: function _getProperty(name, property) {
      var value = property.valueTransform ? property.valueTransform(this[name]) : this[name];
      return new _types.Variant(property.signature, value || property.value);
    }
  }, {
    key: "_handleReturnFn",
    value: function _handleReturnFn(msg, name) {
      if (msg.path === this.path && msg["interface"] === BaseHostInterface._INTERFACE && msg.member === name) {
        try {
          console.log("".concat(this.path, ":").concat(name));

          for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
          }

          var variant = this[name].apply(this, args);

          if (variant !== undefined) {
            var reply = dbus.Message.newMethodReturn(msg, variant.signature, [variant.value]);
            this.bluez.bus.send(reply);
          } else {
            throw new _handlebars.Exception("This should not happen");
          }

          return true;
        } catch (e) {
          console.log(e);
        }
      }
    }
  }]);
  return BaseHostInterface;
}(dbus["interface"].Interface);

exports.BaseHostInterface = BaseHostInterface;
(0, _defineProperty2["default"])(BaseHostInterface, "_INTERFACE", 'org.freedesktop.DBus.Properties');