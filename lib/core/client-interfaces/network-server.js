"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkServer = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _NetworkServer = require("./generated/NetworkServer1");

var _baseInterface = require("./models/base-interface");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var NetworkServer = /*#__PURE__*/function (_BaseInterface) {
  (0, _inherits2["default"])(NetworkServer, _BaseInterface);

  var _super = _createSuper(NetworkServer);

  /**
  * Hide constructor, initialization shall be done asynchronously with connect.
  */
  function NetworkServer(bluez, internal) {
    (0, _classCallCheck2["default"])(this, NetworkServer);
    return _super.call(this, bluez, internal);
  }
  /**
  * Connect to network server under the specified path.
  * 
  * @param bluez `Bluez` instance. 
  * @param path path of the object.
  * @return `NetworkServer` if it exists.
  */


  (0, _createClass2["default"])(NetworkServer, [{
    key: "register",

    /*
    * Direct mappings to introspected properties, methods and signals of internal NetworkServer1
    */
    //@method({ name: 'Register', inSignature: 'ss', outSignature: '' })
    value: function () {
      var _register = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(uuid, bridge) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this._internal.Register(uuid, bridge));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function register(_x, _x2) {
        return _register.apply(this, arguments);
      }

      return register;
    }() //@method({ name: 'Unregister', inSignature: 's', outSignature: '' })

  }, {
    key: "unregister",
    value: function () {
      var _unregister = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(uuid) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this._internal.Unregister(uuid));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function unregister(_x3) {
        return _unregister.apply(this, arguments);
      }

      return unregister;
    }()
  }], [{
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(bluez, path) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = NetworkServer;
                _context3.t1 = bluez;
                _context3.next = 4;
                return _NetworkServer.NetworkServer1.Connect(bluez.bus, path);

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
  }]);
  return NetworkServer;
}(_baseInterface.BaseInterface);

exports.NetworkServer = NetworkServer;