"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UartBluetoothClient = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _types = require("../core/types");

var _adapter = require("../core/client-interfaces/adapter");

var _handlebars = require("handlebars");

var _bluez = require("../core/bluez");

var UartBluetoothClient = /*#__PURE__*/function () {
  function UartBluetoothClient(target) {
    (0, _classCallCheck2["default"])(this, UartBluetoothClient);
    (0, _defineProperty2["default"])(this, "target", void 0);
    (0, _defineProperty2["default"])(this, "handleMessage", void 0);
    (0, _defineProperty2["default"])(this, "isStarted", void 0);
    (0, _defineProperty2["default"])(this, "address", void 0);
    (0, _defineProperty2["default"])(this, "_txCharacteristic", void 0);
    (0, _defineProperty2["default"])(this, "_rxCharacteristic", void 0);
    (0, _defineProperty2["default"])(this, "_targetDevice", void 0);
    this.target = target;

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
  }

  (0, _createClass2["default"])(UartBluetoothClient, [{
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var bluez, adapter, device, service, obj;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return new _bluez.Bluez().init();

              case 2:
                bluez = _context3.sent;
                _context3.next = 5;
                return _adapter.Adapter.connect(bluez);

              case 5:
                adapter = _context3.sent;
                _context3.next = 8;
                return adapter.Address.get();

              case 8:
                this.address = _context3.sent;
                _context3.next = 11;
                return adapter.Powered.set(true);

              case 11:
                _context3.next = 13;
                return adapter.startDiscovery();

              case 13:
                _context3.next = 15;
                return adapter.Discovering.waitForValue(true);

              case 15:
                _context3.next = 17;
                return adapter.setDiscoveryFilter({
                  'Transport': new _types.Variant('s', 'le')
                });

              case 17:
                _context3.next = 19;
                return adapter.getDeviceByName(this.target);

              case 19:
                device = _context3.sent;
                console.log('connecting to server...');
                _context3.next = 23;
                return device.connect();

              case 23:
                _context3.next = 25;
                return device.Connected.waitForValue(true);

              case 25:
                console.log('successfully connected');
                _context3.next = 28;
                return device.getService({
                  UUID: '6e400001-b5a3-f393-e0a9-e50e24dcca9e'
                });

              case 28:
                service = _context3.sent;
                _context3.next = 31;
                return service.getCharacteristic({
                  Flags: 'write'
                });

              case 31:
                this._txCharacteristic = _context3.sent;
                _context3.next = 34;
                return service.getCharacteristic({
                  Flags: 'notify'
                });

              case 34:
                this._rxCharacteristic = _context3.sent;
                _context3.next = 37;
                return this._rxCharacteristic.startNotify();

              case 37:
                this.isStarted = true;
                obj = this;
                _context3.next = 41;
                return this._rxCharacteristic.ValueAsString.addListener( /*#__PURE__*/function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(text) {
                    var json;
                    return _regenerator["default"].wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            try {
                              json = JSON.parse(text);
                              obj.handleMessage(json['msg'], json['sender']);
                            } catch (e) {
                              console.error("Error while parsing an incoming message:\n".concat(e));
                            }

                          case 1:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x3) {
                    return _ref2.apply(this, arguments);
                  };
                }());

              case 41:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function connect() {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: "sendMessage",
    value: function () {
      var _sendMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(message) {
        var json, text;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this.isStarted) {
                  _context4.next = 2;
                  break;
                }

                throw new _handlebars.Exception('Client is not yet connected');

              case 2:
                json = {
                  msg: message || "",
                  sender: this.address
                };
                text = JSON.stringify(json);
                _context4.next = 6;
                return this._txCharacteristic.writeString(text);

              case 6:
                console.log("sent: ".concat(text));

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function sendMessage(_x4) {
        return _sendMessage.apply(this, arguments);
      }

      return sendMessage;
    }()
  }, {
    key: "disconnect",
    value: function () {
      var _disconnect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._rxCharacteristic.stopNotify();

              case 2:
                _context5.next = 4;
                return this._targetDevice.disconnect();

              case 4:
                console.log('successfully disconnected from server');

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function disconnect() {
        return _disconnect.apply(this, arguments);
      }

      return disconnect;
    }()
  }]);
  return UartBluetoothClient;
}();

exports.UartBluetoothClient = UartBluetoothClient;