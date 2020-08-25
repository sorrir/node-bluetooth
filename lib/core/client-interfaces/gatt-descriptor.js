"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GattDescriptor = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _GattDescriptor = require("./generated/GattDescriptor1");

var _baseInterface = require("./models/base-interface");

var _property = require("./models/property");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var GattDescriptor = /*#__PURE__*/function (_BaseInterface) {
  (0, _inherits2["default"])(GattDescriptor, _BaseInterface);

  var _super = _createSuper(GattDescriptor);

  /**
  * Hide constructor, initialization shall be done asynchronously with connect
  */
  function GattDescriptor(bluez, internal) {
    var _this;

    (0, _classCallCheck2["default"])(this, GattDescriptor);
    _this = _super.call(this, bluez, internal);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "UUID", new _property.ReadOnlyProperty('UUID', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Characteristic", new _property.ReadOnlyProperty('Characteristic', _this._internal));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "Value", new _property.ReadOnlyProperty('Value', _this._internal));
    return _this;
  }

  (0, _createClass2["default"])(GattDescriptor, [{
    key: "getAllProperties",

    /**
    * Get all properties.
    * 
    * @returns properties with their respective names and values.
    */
    value: function () {
      var _getAllProperties = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var properties, _i, _Object$entries, _Object$entries$_i, name, variant;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                properties = {};
                _i = 0;
                _context.t0 = Object;
                _context.next = 5;
                return this.getAllPropertiesAsVariants();

              case 5:
                _context.t1 = _context.sent;
                _Object$entries = _context.t0.entries.call(_context.t0, _context.t1);

              case 7:
                if (!(_i < _Object$entries.length)) {
                  _context.next = 13;
                  break;
                }

                _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2), name = _Object$entries$_i[0], variant = _Object$entries$_i[1];
                properties[name] = variant.value;

              case 10:
                _i++;
                _context.next = 7;
                break;

              case 13:
                return _context.abrupt("return", properties);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
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
      var _getAllPropertiesAsVariants = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this._internal.getProperties());

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getAllPropertiesAsVariants() {
        return _getAllPropertiesAsVariants.apply(this, arguments);
      }

      return getAllPropertiesAsVariants;
    }()
    /*
    * Direct mappings to introspected properties, methods and signals of internal GattDescriptor1
    */
    //@property({ name: 'UUID', signature: 's', access: ACCESS_READ })

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

      function readValue(_x) {
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

      function writeValue(_x2, _x3) {
        return _writeValue.apply(this, arguments);
      }

      return writeValue;
    }()
  }], [{
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(bluez, path) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.t0 = GattDescriptor;
                _context5.t1 = bluez;
                _context5.next = 4;
                return _GattDescriptor.GattDescriptor1.Connect(bluez.bus, path);

              case 4:
                _context5.t2 = _context5.sent;
                return _context5.abrupt("return", new _context5.t0(_context5.t1, _context5.t2));

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function connect(_x4, _x5) {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }]);
  return GattDescriptor;
}(_baseInterface.BaseInterface);

exports.GattDescriptor = GattDescriptor;