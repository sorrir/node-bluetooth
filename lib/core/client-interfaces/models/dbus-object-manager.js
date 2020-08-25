"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DBusObjectManager = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _orgFreedesktopDBusObjectManager = require("../generated/org-freedesktop-DBus-ObjectManager");

var _signal = require("./signal");

var _handlebars = require("handlebars");

var DBusObjectManager = /*#__PURE__*/function () {
  /**
  * Hide constructor, initialization shall be done asynchronously with connect
  */
  function DBusObjectManager(path, internal) {
    (0, _classCallCheck2["default"])(this, DBusObjectManager);
    (0, _defineProperty2["default"])(this, "path", void 0);
    (0, _defineProperty2["default"])(this, "_internal", void 0);
    (0, _defineProperty2["default"])(this, "_eventFilter", void 0);
    (0, _defineProperty2["default"])(this, "InterfacesAdded", void 0);
    (0, _defineProperty2["default"])(this, "InterfacesRemoved", void 0);
    this._internal = internal;
    this.path = path;
    var _path = path;

    this._eventFilter = function (event) {
      return event.path.startsWith(_path);
    };

    this.InterfacesAdded = new _signal.Signal('InterfacesAdded', this._internal, {
      path: null,
      objects: null
    }, function (event) {
      return event;
    }, this._eventFilter);
    this.InterfacesRemoved = new _signal.Signal('InterfacesRemoved', this._internal, {
      path: null,
      interfaceNames: null
    }, function (event) {
      return event;
    }, this._eventFilter);
  }
  /**
   * Constructs another DBusObjectManager as branch of an existing one.
   * 
   * The resulting DBusObjectManager receives all data related to the given path from
   * the underlying instance. It is intended to be used to create the object managers
   * for client interfaces.
   * 
   * @param path path of the object to manage
   * 
   * @throws an exception if the provided path is not a subpath of root DBusObjectManager
   */


  (0, _createClass2["default"])(DBusObjectManager, [{
    key: "branch",
    value: function branch(path) {
      if (!path.startsWith(this.path)) {
        throw new _handlebars.Exception("Cannot branch DBusObjectManager: The path '".concat(path, "' is not a subpath of '").concat(this.path, "'"));
      }

      return new DBusObjectManager(path, this._internal);
    }
    /**
     * Instantiates and initializes Bluezs DBusObjectManager.
     * 
     * This method is meant to only be called from the init method of `Bluez`
     * 
     * @param bluez the Bluez object
     * 
     * @throws an exception if called with an already initialized `Bluez` instance
     */

  }, {
    key: "getManagedObjects",

    /*
    * Mappings to introspected properties, methods and signals of internal OrgfreedesktopDBusObjectManager
    */
    //@method({ name: 'GetManagedObjects', inSignature: '', outSignature: 'a{oa{sa{sv}}}' })
    value: function () {
      var _getManagedObjects = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var objects, output, _i, _Object$keys, path;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._internal.GetManagedObjects();

              case 2:
                objects = _context.sent;
                output = {};

                for (_i = 0, _Object$keys = Object.keys(objects); _i < _Object$keys.length; _i++) {
                  path = _Object$keys[_i];

                  if (path.startsWith(this.path)) {
                    output[path] = objects[path];
                  }
                }

                return _context.abrupt("return", output);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getManagedObjects() {
        return _getManagedObjects.apply(this, arguments);
      }

      return getManagedObjects;
    }()
  }], [{
    key: "__connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(bluez) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(bluez.objectManager !== undefined)) {
                  _context2.next = 2;
                  break;
                }

                throw new _handlebars.Exception("Cannot connect to DBusObjectManager: The DBusObjectManager is already initialized");

              case 2:
                _context2.t0 = DBusObjectManager;
                _context2.next = 5;
                return _orgFreedesktopDBusObjectManager.OrgfreedesktopDBusObjectManager.Connect(bluez.bus, "/");

              case 5:
                _context2.t1 = _context2.sent;
                return _context2.abrupt("return", new _context2.t0("/", _context2.t1));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function __connect(_x) {
        return _connect.apply(this, arguments);
      }

      return __connect;
    }()
  }]);
  return DBusObjectManager;
}();

exports.DBusObjectManager = DBusObjectManager;