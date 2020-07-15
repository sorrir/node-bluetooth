"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _LEAdvertisingManager = require("./core/client-interfaces/generated/LEAdvertisingManager1");

var _GattManager = require("./core/client-interfaces/generated/GattManager1");

var _adapter = require("./core/client-interfaces/adapter");

var _bluez = require("./core/bluez");

var _types = require("./core/types");

var _helper = require("./core/helper");

var _uartAdvertisement = require("./uart/host-interfaces/uart-advertisement");

var _uartApplication = require("./uart/host-interfaces/uart-application");

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var bluez;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("Hello test");
            _context.next = 3;
            return new _bluez.Bluez().init();

          case 3:
            bluez = _context.sent;
            _context.next = 6;
            return startClient(bluez);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _main.apply(this, arguments);
}

main()["catch"](function (err) {
  console.log(err);
});

function startServer(_x) {
  return _startServer.apply(this, arguments);
}

function _startServer() {
  _startServer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(bluez) {
    var adapter, advertisingManager, gattManager, advertisement, application;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _adapter.Adapter.connect(bluez);

          case 2:
            adapter = _context2.sent;
            _context2.next = 5;
            return _LEAdvertisingManager.LEAdvertisingManager1.Connect(bluez.bus);

          case 5:
            advertisingManager = _context2.sent;
            _context2.next = 8;
            return _GattManager.GattManager1.Connect(bluez.bus);

          case 8:
            gattManager = _context2.sent;
            _context2.next = 11;
            return adapter.Powered.set(true);

          case 11:
            _context2.t0 = console;
            _context2.next = 14;
            return adapter.Powered.get();

          case 14:
            _context2.t1 = _context2.sent;

            _context2.t0.log.call(_context2.t0, _context2.t1);

            bluez.bus.addMethodHandler(function (msg) {
              console.log("".concat(msg.path, ", ").concat(msg["interface"], ", ").concat(msg.member));
            });
            advertisement = new _uartAdvertisement.UartAdvertisment(bluez, 'SORRIR-Gatt-Server', 0);
            application = new _uartApplication.UartApplication(bluez);
            _context2.next = 21;
            return advertisingManager.RegisterAdvertisement(advertisement.path, {});

          case 21:
            _context2.next = 23;
            return gattManager.RegisterApplication(application.path, {});

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _startServer.apply(this, arguments);
}

function startClient(_x2) {
  return _startClient.apply(this, arguments);
}

function _startClient() {
  _startClient = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(bluez) {
    var adapter, name, device, service, writeCharacteristic, notifyCharacteristic;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _adapter.Adapter.connect(bluez);

          case 2:
            adapter = _context4.sent;
            _context4.next = 5;
            return adapter.Powered.set(true);

          case 5:
            // bluez.objectManager.interfacesAdded.on((event) => {
            //     console.log(`+ ${event.path}`)
            // })
            // bluez.objectManager.interfacesRemoved.on((event) => {
            //     console.log(`- ${event.path}`)
            // })
            console.log("clear devices");
            _context4.next = 8;
            return adapter.clearDevices();

          case 8:
            _context4.t0 = Object;
            _context4.next = 11;
            return adapter.getDevicesRaw();

          case 11:
            _context4.t1 = _context4.sent;
            _context4.t2 = _context4.t0.keys.call(_context4.t0, _context4.t1).length;

            if (!(_context4.t2 > 0)) {
              _context4.next = 16;
              break;
            }

            _context4.next = 16;
            return bluez.objectManager.interfacesRemoved.waitForEvent(function (event) {
              return event.path.startsWith(adapter.path + "/dev_");
            });

          case 16:
            _context4.next = 18;
            return adapter.startDiscovery();

          case 18:
            _context4.next = 20;
            return adapter.setDiscoveryFilter({
              Transport: new _types.Variant('s', 'le')
            });

          case 20:
            _context4.next = 22;
            return adapter.Name.get();

          case 22:
            name = _context4.sent;
            _context4.next = 25;
            return adapter.getDeviceByName('SORRIR-Gatt-Server');

          case 25:
            device = _context4.sent;
            console.log('connect');
            _context4.next = 29;
            return device.connect();

          case 29:
            _context4.next = 31;
            return device.Connected.waitForValue(true);

          case 31:
            console.log('isConnected');
            _context4.next = 34;
            return device.getService({
              UUID: '6e400001-b5a3-f393-e0a9-e50e24dcca9e'
            });

          case 34:
            service = _context4.sent;
            _context4.next = 37;
            return service.getCharacteristic({
              Flags: 'write'
            });

          case 37:
            writeCharacteristic = _context4.sent;
            _context4.next = 40;
            return service.getCharacteristic({
              Flags: 'notify'
            });

          case 40:
            notifyCharacteristic = _context4.sent;
            _context4.next = 43;
            return notifyCharacteristic.startNotify();

          case 43:
            notifyCharacteristic.ValueAsString.addListener( /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(text) {
                var msg;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        console.log(text);
                        _context3.next = 3;
                        return (0, _helper.sleep)(100);

                      case 3:
                        msg = JSON.stringify({
                          msg: JSON.parse(text).msg,
                          sender: name
                        });
                        console.log(msg);
                        _context3.next = 7;
                        return writeCharacteristic.writeString(msg);

                      case 7:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x3) {
                return _ref.apply(this, arguments);
              };
            }());
            _context4.next = 46;
            return writeCharacteristic.writeString(JSON.stringify({
              msg: "OH BOY"
            }));

          case 46:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _startClient.apply(this, arguments);
}