"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DBusObjectManager = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _orgFreedesktopDBusObjectManager = require("./generated/org-freedesktop-DBus-ObjectManager");

var _baseInterface = require("./models/base-interface");

var _signal = require("./models/signal");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var DBusObjectManager = /*#__PURE__*/function (_BaseInterface) {
  (0, _inherits2["default"])(DBusObjectManager, _BaseInterface);

  var _super = _createSuper(DBusObjectManager);

  /**
  * Hide constructor, initialization shall be done asynchronously with connect
  */
  function DBusObjectManager(bluez, internal) {
    var _this;

    (0, _classCallCheck2["default"])(this, DBusObjectManager);
    _this = _super.call(this, bluez, internal);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "InterfacesAdded", new _signal.Signal('InterfacesAdded', _this._internal, {
      path: null,
      objects: null
    }));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "InterfacesRemoved", new _signal.Signal('InterfacesRemoved', _this._internal, {
      path: null,
      interfaceNames: null
    }));
    return _this;
  }

  (0, _createClass2["default"])(DBusObjectManager, [{
    key: "getManagedObjects",

    /**
    * Direct mappings to introspected properties, methods and signals of internal OrgfreedesktopDBusObjectManager
    */
    //@method({ name: 'GetManagedObjects', inSignature: '', outSignature: 'a{oa{sa{sv}}}' })
    value: function () {
      var _getManagedObjects = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this._internal.GetManagedObjects());

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getManagedObjects() {
        return _getManagedObjects.apply(this, arguments);
      }

      return getManagedObjects;
    }() //@signal({ name: 'InterfacesAdded', signature: 'oa{sa{sv}}' })

  }], [{
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(bluez, path) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = DBusObjectManager;
                _context2.t1 = bluez;
                _context2.next = 4;
                return _orgFreedesktopDBusObjectManager.OrgfreedesktopDBusObjectManager.Connect(bluez.bus, path);

              case 4:
                _context2.t2 = _context2.sent;
                return _context2.abrupt("return", new _context2.t0(_context2.t1, _context2.t2));

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function connect(_x, _x2) {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }]);
  return DBusObjectManager;
}(_baseInterface.BaseInterface);

exports.DBusObjectManager = DBusObjectManager;