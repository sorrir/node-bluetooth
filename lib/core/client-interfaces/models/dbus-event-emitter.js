"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DBusEventEmitter = exports.GenericDBusEventEmitter = void 0;

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var GenericDBusEventEmitter = /*#__PURE__*/function () {
  function GenericDBusEventEmitter(event, eventEmitter, keyProvider, eventTransform) {
    (0, _classCallCheck2["default"])(this, GenericDBusEventEmitter);
    (0, _defineProperty2["default"])(this, "eventName", void 0);
    (0, _defineProperty2["default"])(this, "_eventEmitter", void 0);
    (0, _defineProperty2["default"])(this, "_eventKeys", void 0);
    (0, _defineProperty2["default"])(this, "_eventTransform", void 0);
    this.eventName = event;
    this._eventEmitter = eventEmitter;
    this._eventKeys = Object.keys(keyProvider);
    this._eventTransform = eventTransform;
  }

  (0, _createClass2["default"])(GenericDBusEventEmitter, [{
    key: "waitForEvent",
    value: function () {
      var _waitForEvent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(evaluator) {
        var emitter, eventName, eventKeys, eventTransform;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                emitter = this._eventEmitter;
                eventName = this.eventName;
                eventKeys = this._eventKeys;
                eventTransform = this._eventTransform;
                return _context.abrupt("return", new Promise(function (resolve) {
                  function onEvent() {
                    for (var _len = arguments.length, eventArgs = new Array(_len), _key = 0; _key < _len; _key++) {
                      eventArgs[_key] = arguments[_key];
                    }

                    var event = GenericDBusEventEmitter._eventArgsToEvent(eventKeys, eventArgs, eventTransform);

                    if (evaluator(event) === true) {
                      emitter.removeListener(eventName, onEvent);
                      resolve(event);
                    }
                  }

                  emitter.addListener(eventName, onEvent);
                }));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function waitForEvent(_x) {
        return _waitForEvent.apply(this, arguments);
      }

      return waitForEvent;
    }()
  }, {
    key: "addListener",
    value: function addListener(listener) {
      this._eventEmitter.addListener(this.eventName, GenericDBusEventEmitter._transformListener(this._eventKeys, listener, this._eventTransform));
    }
  }, {
    key: "listeners",
    value: function listeners() {
      return this._eventEmitter.listeners(this.eventName);
    }
  }, {
    key: "listenerCount",
    value: function listenerCount() {
      return this._eventEmitter.listenerCount(this.eventName);
    }
  }, {
    key: "off",
    value: function off(listener) {
      return this._eventEmitter.off(this.eventName, GenericDBusEventEmitter._transformListener(this._eventKeys, listener, this._eventTransform));
    }
  }, {
    key: "on",
    value: function on(listener) {
      return this._eventEmitter.on(this.eventName, GenericDBusEventEmitter._transformListener(this._eventKeys, listener, this._eventTransform));
    }
  }, {
    key: "once",
    value: function once(listener) {
      return this._eventEmitter.once(this.eventName, GenericDBusEventEmitter._transformListener(this._eventKeys, listener, this._eventTransform));
    }
  }, {
    key: "prependListener",
    value: function prependListener(listener) {
      return this._eventEmitter.prependListener(this.eventName, GenericDBusEventEmitter._transformListener(this._eventKeys, listener, this._eventTransform));
    }
  }, {
    key: "prependOnceListener",
    value: function prependOnceListener(listener) {
      return this._eventEmitter.prependOnceListener(this.eventName, GenericDBusEventEmitter._transformListener(this._eventKeys, listener, this._eventTransform));
    }
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners() {
      return this._eventEmitter.removeAllListeners(this.eventName);
    }
  }, {
    key: "removeListener",
    value: function removeListener(listener) {
      return this._eventEmitter.removeListener(this.eventName, GenericDBusEventEmitter._transformListener(this._eventKeys, listener, this._eventTransform));
    }
  }, {
    key: "rawListeners",
    value: function rawListeners() {
      return this._eventEmitter.rawListeners(this.eventName);
    }
  }, {
    key: "eventNames",
    value: function eventNames() {
      return this._eventEmitter.eventNames();
    }
  }], [{
    key: "_transformListener",
    value: function _transformListener(eventKeys, listener, eventTransform) {
      return function () {
        try {
          for (var _len2 = arguments.length, eventArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            eventArgs[_key2] = arguments[_key2];
          }

          listener(GenericDBusEventEmitter._eventArgsToEvent(eventKeys, eventArgs, eventTransform));
        } catch (e) {
          console.log(e);
        }
      };
    }
  }, {
    key: "_eventArgsToEvent",
    value: function _eventArgsToEvent(eventKeys, eventArgs, eventTransform) {
      var event = {};
      eventArgs.forEach(function (arg, index) {
        event[eventKeys[index]] = arg;
      });
      return eventTransform(event);
    }
  }]);
  return GenericDBusEventEmitter;
}();

exports.GenericDBusEventEmitter = GenericDBusEventEmitter;

var DBusEventEmitter = /*#__PURE__*/function (_GenericDBusEventEmit) {
  (0, _inherits2["default"])(DBusEventEmitter, _GenericDBusEventEmit);

  var _super = _createSuper(DBusEventEmitter);

  function DBusEventEmitter(event, eventEmitter, keyProvider) {
    (0, _classCallCheck2["default"])(this, DBusEventEmitter);
    return _super.call(this, event, eventEmitter, keyProvider, function (event) {
      return event;
    });
  }

  return DBusEventEmitter;
}(GenericDBusEventEmitter);

exports.DBusEventEmitter = DBusEventEmitter;