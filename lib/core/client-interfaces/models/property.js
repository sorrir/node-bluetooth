"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Property = exports.ReadOnlyProperty = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _dbusEventEmitter = require("./dbus-event-emitter");

var Helper = _interopRequireWildcard(require("../../helper"));

var _handlebars = require("handlebars");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * @class 
 * Property that can only be read.
 * Wraps around the 'PropertiesChanged' event of the '_internal' {@link EventEmitter} of a client interface.
 */
var ReadOnlyProperty = /*#__PURE__*/function (_GenericDBusEventEmit) {
  (0, _inherits2["default"])(ReadOnlyProperty, _GenericDBusEventEmit);

  var _super = _createSuper(ReadOnlyProperty);

  function ReadOnlyProperty(name, internal) {
    var _this2;

    var valueTransformer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      "in": function _in(value) {
        return value;
      }
    };
    (0, _classCallCheck2["default"])(this, ReadOnlyProperty);
    _this2 = _super.call(this, 'PropertiesChanged', internal, {
      interfaceName: null,
      changedProperties: null,
      invalidatedProperties: null
    }, function (event) {
      return valueTransformer["in"]((event.changedProperties[name] || {}).value);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "name", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "_internal", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "_valueTransformer", void 0);
    _this2.name = name;
    _this2._internal = internal;
    _this2._valueTransformer = _objectSpread({
      out: function out(value) {
        return value;
      }
    }, valueTransformer);
    return _this2;
  }
  /**
   * Get the value of the property.
   * 
   * @returns the value of the property.
   */


  (0, _createClass2["default"])(ReadOnlyProperty, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this._internal[this.name]());

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get() {
        return _get.apply(this, arguments);
      }

      return get;
    }()
    /**
     * Wait until a change of the property happens.
     * 
     * @returns the value of the property after the change.
     */

  }, {
    key: "waitForChange",
    value: function () {
      var _waitForChange = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.waitForEvent(function () {
                  return true;
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function waitForChange() {
        return _waitForChange.apply(this, arguments);
      }

      return waitForChange;
    }()
    /**
     * Wait for a specific value of the property.
     * 
     * @param newValue  the value to be reached.
     * @param timeoutMs timeout in milliseconds. Defaults to 30 seconds.
     * 
     * @throws an exception if the new value is not reached until the given timeout
     */

  }, {
    key: "waitForValue",
    value: function () {
      var _waitForValue = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(newValue) {
        var _this3 = this;

        var timeoutMs,
            _this,
            _args4 = arguments;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                timeoutMs = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : 30000;
                _this = this; // check the current value and simultaneously wait for an incoming event
                // return true if either of those reach the desired value before the timeout
                // return false otherwise

                return _context4.abrupt("return", Helper.firstResolve([new Promise( /*#__PURE__*/function () {
                  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(resolve, reject) {
                    var value;
                    return _regenerator["default"].wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return _this.get();

                          case 2:
                            value = _context3.sent;

                            if (value === newValue) {
                              resolve(true);
                            } else {
                              reject();
                            }

                          case 4:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x2, _x3) {
                    return _ref.apply(this, arguments);
                  };
                }()), this.waitForEvent(function (value) {
                  return value === newValue;
                }).then(function () {
                  return true;
                }), Helper.sleep(timeoutMs).then(function () {
                  return false;
                })]).then(function (success) {
                  if (!success) {
                    throw new _handlebars.Exception("Waiting for value timed out: '".concat(_this3.name, "' did not become '").concat(newValue, "'"));
                  }
                }));

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function waitForValue(_x) {
        return _waitForValue.apply(this, arguments);
      }

      return waitForValue;
    }()
  }]);
  return ReadOnlyProperty;
}(_dbusEventEmitter.GenericDBusEventEmitter);
/**
 * @class
 * Property that can be set as well as read.
 */


exports.ReadOnlyProperty = ReadOnlyProperty;

var Property = /*#__PURE__*/function (_ReadOnlyProperty) {
  (0, _inherits2["default"])(Property, _ReadOnlyProperty);

  var _super2 = _createSuper(Property);

  function Property(name, internal) {
    var valueTransformer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      "in": function _in(value) {
        return value;
      },
      out: function out(value) {
        return value;
      }
    };
    (0, _classCallCheck2["default"])(this, Property);
    return _super2.call(this, name, internal, valueTransformer);
  }
  /**
   * Set the value of the property.
   * 
   * @param value the new value.
   */


  (0, _createClass2["default"])(Property, [{
    key: "set",
    value: function () {
      var _set = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(value) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this._internal[this.name](this._valueTransformer.out(value)));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function set(_x4) {
        return _set.apply(this, arguments);
      }

      return set;
    }()
  }]);
  return Property;
}(ReadOnlyProperty);

exports.Property = Property;