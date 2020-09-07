"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Media = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _Media = require("./generated/Media1");

var _baseInterface = require("./models/base-interface");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Media = /*#__PURE__*/function (_BaseInterface) {
  (0, _inherits2["default"])(Media, _BaseInterface);

  var _super = _createSuper(Media);

  /**
  * Hide constructor, initialization shall be done asynchronously with connect.
  */
  function Media(bluez, internal) {
    (0, _classCallCheck2["default"])(this, Media);
    return _super.call(this, bluez, internal);
  }
  /**
   * Connect to media under the specified path.
   * 
   * @param bluez `Bluez` instance. 
   * @param path path of the object.
   * @return `Media` if it exists.
   */


  (0, _createClass2["default"])(Media, [{
    key: "registerEndpoint",

    /*
    * Direct mappings to introspected properties, methods and signals of internal Media1
    */
    //@method({ name: 'RegisterEndpoint', inSignature: 'oa{sv}', outSignature: '' })
    value: function () {
      var _registerEndpoint = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(endpoint, properties) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this._internal.RegisterEndpoint(endpoint, properties));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function registerEndpoint(_x, _x2) {
        return _registerEndpoint.apply(this, arguments);
      }

      return registerEndpoint;
    }() //@method({ name: 'UnregisterEndpoint', inSignature: 'o', outSignature: '' })

  }, {
    key: "unregisterEndpoint",
    value: function () {
      var _unregisterEndpoint = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(endpoint) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this._internal.UnregisterEndpoint(endpoint));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function unregisterEndpoint(_x3) {
        return _unregisterEndpoint.apply(this, arguments);
      }

      return unregisterEndpoint;
    }() //@method({ name: 'RegisterPlayer', inSignature: 'oa{sv}', outSignature: '' })

  }, {
    key: "registerPlayer",
    value: function () {
      var _registerPlayer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(player, properties) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this._internal.RegisterPlayer(player, properties));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function registerPlayer(_x4, _x5) {
        return _registerPlayer.apply(this, arguments);
      }

      return registerPlayer;
    }() //@method({ name: 'UnregisterPlayer', inSignature: 'o', outSignature: '' })

  }, {
    key: "unregisterPlayer",
    value: function () {
      var _unregisterPlayer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(player) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this._internal.UnregisterPlayer(player));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function unregisterPlayer(_x6) {
        return _unregisterPlayer.apply(this, arguments);
      }

      return unregisterPlayer;
    }() //@method({ name: 'RegisterApplication', inSignature: 'oa{sv}', outSignature: '' })

  }, {
    key: "registerApplication",
    value: function () {
      var _registerApplication = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(application, options) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this._internal.RegisterApplication(application, options));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function registerApplication(_x7, _x8) {
        return _registerApplication.apply(this, arguments);
      }

      return registerApplication;
    }() //@method({ name: 'UnregisterApplication', inSignature: 'o', outSignature: '' })

  }, {
    key: "unregisterApplication",
    value: function () {
      var _unregisterApplication = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(application) {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", this._internal.UnregisterApplication(application));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function unregisterApplication(_x9) {
        return _unregisterApplication.apply(this, arguments);
      }

      return unregisterApplication;
    }()
  }], [{
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(bluez, path) {
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.t0 = Media;
                _context7.t1 = bluez;
                _context7.next = 4;
                return _Media.Media1.Connect(bluez.bus, path);

              case 4:
                _context7.t2 = _context7.sent;
                return _context7.abrupt("return", new _context7.t0(_context7.t1, _context7.t2));

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function connect(_x10, _x11) {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }]);
  return Media;
}(_baseInterface.BaseInterface);

exports.Media = Media;