"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UartBluetoothServer = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _adapter = require("../core/client-interfaces/adapter");

var _LEAdvertisingManager = require("../core/client-interfaces/generated/LEAdvertisingManager1");

var _GattManager = require("../core/client-interfaces/generated/GattManager1");

var _handlebars = require("handlebars");

var _bluez = require("../core/bluez");

var _uartAdvertisement = require("./host-interfaces/uart-advertisement");

var _uartApplication = require("./host-interfaces/uart-application");

var UartBluetoothServer = /*#__PURE__*/function () {
  function UartBluetoothServer(name) {
    (0, _classCallCheck2["default"])(this, UartBluetoothServer);
    (0, _defineProperty2["default"])(this, "name", void 0);
    (0, _defineProperty2["default"])(this, "handleMessage", void 0);
    (0, _defineProperty2["default"])(this, "isStarted", void 0);
    (0, _defineProperty2["default"])(this, "address", void 0);
    (0, _defineProperty2["default"])(this, "_application", void 0);
    (0, _defineProperty2["default"])(this, "_txCharacteristic", void 0);
    (0, _defineProperty2["default"])(this, "_advertisingManager", void 0);
    (0, _defineProperty2["default"])(this, "_gattManager", void 0);
    (0, _defineProperty2["default"])(this, "_advertisement", void 0);
    this.name = name;

    this.handleMessage = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(message, sender) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();

    this.isStarted = false;
    this.address = undefined;
  }

  (0, _createClass2["default"])(UartBluetoothServer, [{
    key: "start",
    value: function () {
      var _start = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var bluez, adapter, obj;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return new _bluez.Bluez().init();

              case 2:
                bluez = _context2.sent;
                _context2.next = 5;
                return _adapter.Adapter.connect(bluez);

              case 5:
                adapter = _context2.sent;
                _context2.next = 8;
                return adapter.Address.get();

              case 8:
                this.address = _context2.sent;
                _context2.next = 11;
                return _LEAdvertisingManager.LEAdvertisingManager1.Connect(bluez.bus);

              case 11:
                this._advertisingManager = _context2.sent;
                _context2.next = 14;
                return _GattManager.GattManager1.Connect(bluez.bus);

              case 14:
                this._gattManager = _context2.sent;
                _context2.next = 17;
                return adapter.Powered.set(true);

              case 17:
                bluez.bus.addMethodHandler(function (msg) {
                  console.log("".concat(msg.path, ", ").concat(msg["interface"], ", ").concat(msg.member));
                });
                this._advertisement = new _uartAdvertisement.UartAdvertisment(bluez, this.name, 0);
                this._application = new _uartApplication.UartApplication(bluez);
                _context2.next = 22;
                return this._advertisingManager.RegisterAdvertisement(this._advertisement.path, {});

              case 22:
                _context2.next = 24;
                return this._gattManager.RegisterApplication(this._application.path, {});

              case 24:
                obj = this;

                this._application.service.rxCharacteristic.onMessage = function (message, options) {
                  try {
                    var json = JSON.parse(message);
                    obj.handleMessage(json['msg'], json['sender']);
                  } catch (e) {
                    console.error("Error while parsing an incoming message:\n".concat(e));
                  }
                };

                this._txCharacteristic = this._application.service.txCharacteristic;
                this.isStarted = true;
                console.log('successfully started server');

              case 29:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function start() {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: "sendMessage",
    value: function () {
      var _sendMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(message) {
        var json, text;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.isStarted) {
                  _context3.next = 2;
                  break;
                }

                throw new _handlebars.Exception('Server is not yet started');

              case 2:
                json = {
                  msg: message || "",
                  sender: this.address
                };
                text = JSON.stringify(json);

                this._txCharacteristic.sendMessage(text);

                console.log("sent: ".concat(text));

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function sendMessage(_x3) {
        return _sendMessage.apply(this, arguments);
      }

      return sendMessage;
    }()
  }, {
    key: "stop",
    value: function () {
      var _stop = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // await this._advertisingManager.UnregisterAdvertisement(this._advertisement.path)
                // await this._gettManager.UnregisterApplication(this._application.path)
                console.log('successfully stopped server');

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function stop() {
        return _stop.apply(this, arguments);
      }

      return stop;
    }()
  }]);
  return UartBluetoothServer;
}();

exports.UartBluetoothServer = UartBluetoothServer;