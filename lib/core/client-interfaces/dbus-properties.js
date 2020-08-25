"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DBusProperties = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _orgFreedesktopDBusProperties = require("./generated/org-freedesktop-DBus-Properties");

var _baseInterface = require("./models/base-interface");

var _signal = require("./models/signal");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var DBusProperties = /*#__PURE__*/function (_BaseInterface) {
  (0, _inherits2["default"])(DBusProperties, _BaseInterface);

  var _super = _createSuper(DBusProperties);

  /**
  * Hide constructor, initialization shall be done asynchronously with connect
  */
  function DBusProperties(bluez, internal) {
    var _this;

    (0, _classCallCheck2["default"])(this, DBusProperties);
    _this = _super.call(this, bluez, internal);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "PropertiesChanged", new _signal.Signal('PropertiesChanged', _this._internal, {
      interfaceName: null,
      changedProperties: null,
      InvalidatedProperties: null
    }));
    return _this;
  }

  (0, _createClass2["default"])(DBusProperties, [{
    key: "get",

    /*
    * Direct mappings to introspected properties, methods and signals of internal OrgfreedesktopDBusProperties
    */
    //@method({ name: 'Get', inSignature: 'ss', outSignature: 'v' })
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(iface, name) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this._internal.Get(iface, name));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x, _x2) {
        return _get.apply(this, arguments);
      }

      return get;
    }() //@method({ name: 'Set', inSignature: 'ssv', outSignature: '' })

  }, {
    key: "set",
    value: function () {
      var _set = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(iface, name, value) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this._internal.Set(iface, name, value));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function set(_x3, _x4, _x5) {
        return _set.apply(this, arguments);
      }

      return set;
    }() //@method({ name: 'GetAll', inSignature: 's', outSignature: 'a{sv}' })

  }, {
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(iface) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this._internal.GetAll(iface));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getAll(_x6) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }() //@signal({ name: 'PropertiesChanged', signature: 'sa{sv}as' })

  }], [{
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(bluez, path) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.t0 = DBusProperties;
                _context4.t1 = bluez;
                _context4.next = 4;
                return _orgFreedesktopDBusProperties.OrgfreedesktopDBusProperties.Connect(bluez.bus, path);

              case 4:
                _context4.t2 = _context4.sent;
                return _context4.abrupt("return", new _context4.t0(_context4.t1, _context4.t2));

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function connect(_x7, _x8) {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }]);
  return DBusProperties;
}(_baseInterface.BaseInterface);

exports.DBusProperties = DBusProperties;