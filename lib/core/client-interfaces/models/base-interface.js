"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseInterface = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _helper = require("../../helper");

var BaseInterface = /*#__PURE__*/function () {
  function BaseInterface(bluez, internal) {
    (0, _classCallCheck2["default"])(this, BaseInterface);
    (0, _defineProperty2["default"])(this, "_bluez", void 0);
    (0, _defineProperty2["default"])(this, "_internal", void 0);
    (0, _defineProperty2["default"])(this, "path", void 0);
    this._bluez = bluez;
    this._internal = internal;
    this.path = internal.dbusObject.path;
  }
  /**
   * @return the internal {@Link EventEmitter}
   */


  (0, _createClass2["default"])(BaseInterface, [{
    key: "eventEmitter",
    value: function eventEmitter() {
      return this._internal;
    }
  }, {
    key: "getChildObjectsRaw",
    value: function () {
      var _getChildObjectsRaw = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(interfaceName) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this._bluez.getObjectData(interfaceName, this.path));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getChildObjectsRaw(_x) {
        return _getChildObjectsRaw.apply(this, arguments);
      }

      return getChildObjectsRaw;
    }()
    /**
     * Finds a specific child that matches the given filter.
     * 
     * @param filter Filter, for example ```{'Name' : 'child_name'}```
     * @returns a child object if it exists. If multiple childs match the filter,
     * the first one is returned
     */

  }, {
    key: "getChildObject",
    value: function () {
      var _getChildObject = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(interfaceName, constructor) {
        var filter,
            options,
            childData,
            _i,
            _Object$entries,
            _Object$entries$_i,
            _path,
            data,
            isIn,
            _loop,
            _i2,
            _Object$entries2,
            _ret,
            _args2 = arguments;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                filter = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
                options = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : {
                  maxRetries: 0,
                  retryIntervalMs: 1000
                };
                _context2.next = 4;
                return this._bluez.getObjectData(interfaceName, this.path);

              case 4:
                childData = _context2.sent;
                _i = 0, _Object$entries = Object.entries(childData);

              case 6:
                if (!(_i < _Object$entries.length)) {
                  _context2.next = 23;
                  break;
                }

                _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2), _path = _Object$entries$_i[0], data = _Object$entries$_i[1];
                isIn = true;

                _loop = function _loop() {
                  var _Object$entries2$_i = (0, _slicedToArray2["default"])(_Object$entries2[_i2], 2),
                      key = _Object$entries2$_i[0],
                      filterValue = _Object$entries2$_i[1];

                  var objectValue = (data[key] || {}).value;

                  if (objectValue instanceof Array) {
                    if (filterValue instanceof Array) {
                      isIn = filterValue.every(function (val) {
                        return objectValue.includes(val);
                      });
                    } else {
                      isIn = objectValue.includes(filterValue);
                    }
                  } else {
                    isIn = objectValue === filterValue;
                  }

                  if (!isIn) {
                    return "break";
                  }
                };

                _i2 = 0, _Object$entries2 = Object.entries(filter);

              case 11:
                if (!(_i2 < _Object$entries2.length)) {
                  _context2.next = 18;
                  break;
                }

                _ret = _loop();

                if (!(_ret === "break")) {
                  _context2.next = 15;
                  break;
                }

                return _context2.abrupt("break", 18);

              case 15:
                _i2++;
                _context2.next = 11;
                break;

              case 18:
                if (!isIn) {
                  _context2.next = 20;
                  break;
                }

                return _context2.abrupt("return", constructor(this._bluez, _path));

              case 20:
                _i++;
                _context2.next = 6;
                break;

              case 23:
                if (!(options.maxRetries > 0)) {
                  _context2.next = 28;
                  break;
                }

                _context2.next = 26;
                return (0, _helper.sleep)(options.retryIntervalMs);

              case 26:
                options.maxRetries--;
                return _context2.abrupt("return", this.getChildObject(interfaceName, constructor, filter, options));

              case 28:
                return _context2.abrupt("return", undefined);

              case 29:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getChildObject(_x2, _x3) {
        return _getChildObject.apply(this, arguments);
      }

      return getChildObject;
    }()
  }]);
  return BaseInterface;
}();

exports.BaseInterface = BaseInterface;