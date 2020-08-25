"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DBusProperties = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _signal = require("./signal");

var DBusProperties = /*#__PURE__*/function () {
  function DBusProperties(interfaceName, internal) {
    (0, _classCallCheck2["default"])(this, DBusProperties);
    (0, _defineProperty2["default"])(this, "interfaceName", void 0);
    (0, _defineProperty2["default"])(this, "_internal", void 0);
    (0, _defineProperty2["default"])(this, "PropertiesChanged", new _signal.Signal('PropertiesChanged', this._internal, {
      interfaceName: null,
      changedProperties: null,
      InvalidatedProperties: null
    }));
    this._internal = internal;
    this.interfaceName = interfaceName;
  }
  /**
  * Get the values of all properties.
  * 
  * @returns values of properties, indexed by their name.
  */


  (0, _createClass2["default"])(DBusProperties, [{
    key: "getAllValues",
    value: function () {
      var _getAllValues = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var properties, _i, _Object$entries, _Object$entries$_i, name, variant;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                properties = {};
                _i = 0;
                _context.t0 = Object;
                _context.next = 5;
                return this.getAll();

              case 5:
                _context.t1 = _context.sent;
                _Object$entries = _context.t0.entries.call(_context.t0, _context.t1);

              case 7:
                if (!(_i < _Object$entries.length)) {
                  _context.next = 13;
                  break;
                }

                _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2), name = _Object$entries$_i[0], variant = _Object$entries$_i[1];
                properties[name] = variant.value;

              case 10:
                _i++;
                _context.next = 7;
                break;

              case 13:
                return _context.abrupt("return", properties);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAllValues() {
        return _getAllValues.apply(this, arguments);
      }

      return getAllValues;
    }()
    /*
    * Direct mappings to introspected properties, methods and signals of internal OrgfreedesktopDBusProperties
    */
    //@method({ name: 'Get', inSignature: 'ss', outSignature: 'v' })

  }, {
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(name) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this._internal.Get(this.interfaceName, name));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function get(_x) {
        return _get.apply(this, arguments);
      }

      return get;
    }() //@method({ name: 'Set', inSignature: 'ssv', outSignature: '' })

  }, {
    key: "set",
    value: function () {
      var _set = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(name, value) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this._internal.Set(this.interfaceName, name, value));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function set(_x2, _x3) {
        return _set.apply(this, arguments);
      }

      return set;
    }() //@method({ name: 'GetAll', inSignature: 's', outSignature: 'a{sv}' })

  }, {
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this._internal.GetAll(this.interfaceName));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getAll() {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }() //@signal({ name: 'PropertiesChanged', signature: 'sa{sv}as' })

  }]);
  return DBusProperties;
}();

exports.DBusProperties = DBusProperties;