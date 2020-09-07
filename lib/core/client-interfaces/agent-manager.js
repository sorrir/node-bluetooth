"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgentManager = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _AgentManager = require("./generated/AgentManager1");

var _baseInterface = require("./models/base-interface");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var AgentManager = /*#__PURE__*/function (_BaseInterface) {
  (0, _inherits2["default"])(AgentManager, _BaseInterface);

  var _super = _createSuper(AgentManager);

  /**
  * Hide constructor, initialization shall be done asynchronously with connect.
  */
  function AgentManager(bluez, internal) {
    (0, _classCallCheck2["default"])(this, AgentManager);
    return _super.call(this, bluez, internal);
  }
  /**
  * Connect to agent manager under the specified path.
  * 
  * @param bluez `Bluez` instance. 
  * @param path path of the object.
  * @return `AgentManager` if it exists.
  */


  (0, _createClass2["default"])(AgentManager, [{
    key: "registerAgent",

    /*
    * Direct mappings to introspected properties, methods and signals of internal AgentManager1
    */
    //@method({ name: 'RegisterAgent', inSignature: 'os', outSignature: '' })
    value: function () {
      var _registerAgent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(agent, capability) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this._internal.RegisterAgent(agent, capability));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function registerAgent(_x, _x2) {
        return _registerAgent.apply(this, arguments);
      }

      return registerAgent;
    }() //@method({ name: 'UnregisterAgent', inSignature: 'o', outSignature: '' })

  }, {
    key: "unregisterAgent",
    value: function () {
      var _unregisterAgent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(agent) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this._internal.UnregisterAgent(agent));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function unregisterAgent(_x3) {
        return _unregisterAgent.apply(this, arguments);
      }

      return unregisterAgent;
    }() //@method({ name: 'RequestDefaultAgent', inSignature: 'o', outSignature: '' })

  }, {
    key: "requestDefaultAgent",
    value: function () {
      var _requestDefaultAgent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(agent) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this._internal.RequestDefaultAgent(agent));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function requestDefaultAgent(_x4) {
        return _requestDefaultAgent.apply(this, arguments);
      }

      return requestDefaultAgent;
    }()
  }], [{
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(bluez, path) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.t0 = AgentManager;
                _context4.t1 = bluez;
                _context4.next = 4;
                return _AgentManager.AgentManager1.Connect(bluez.bus, path);

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

      function connect(_x5, _x6) {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }]);
  return AgentManager;
}(_baseInterface.BaseInterface);

exports.AgentManager = AgentManager;