"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DBusSignatures = exports.Variant = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var dbus = _interopRequireWildcard(require("dbus-next"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

//TODO: find a better solution for this workaround
//The constructor of Variant is not correctly declared
//in types.d.ts of dbus-next, so no constructor with
//input arguments is accepted by typescript
//to use Variants in typescript, the class is extended
//with the needed constructor, however the name of it is checked
//in some functions of dbus. This therefore the prototype
// of the constructor is overriden before the export
var Variant = /*#__PURE__*/function (_dbus$Variant) {
  (0, _inherits2["default"])(Variant, _dbus$Variant);

  var _super = _createSuper(Variant);

  function Variant(signature, value) {
    var _this;

    (0, _classCallCheck2["default"])(this, Variant);
    _this = _super.call(this);
    _this.signature = signature;
    _this.value = value;
    return _this;
  }

  return Variant;
}(dbus.Variant);

exports.Variant = Variant;
Variant.prototype.constructor = dbus.Variant;

var DBusSignatures = /*#__PURE__*/function () {
  function DBusSignatures() {
    (0, _classCallCheck2["default"])(this, DBusSignatures);
  }

  (0, _createClass2["default"])(DBusSignatures, null, [{
    key: "getSignature",
    value: function getSignature(type) {
      return DBusSignatures[type];
    }
  }, {
    key: "getType",
    value: function getType(signature) {
      return Object.entries(DBusSignatures).find(function (_ref) {
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
            _ = _ref2[0],
            val = _ref2[1];

        return val === signature;
      })[0];
    }
  }, {
    key: "getImportableTypes",
    value: function getImportableTypes() {
      return ['int16', 'uint16', 'int32', 'uint32', 'byte', 'path', 'fileDescriptor', 'dict'];
    }
  }]);
  return DBusSignatures;
}();

exports.DBusSignatures = DBusSignatures;
(0, _defineProperty2["default"])(DBusSignatures, "boolean", 'b');
(0, _defineProperty2["default"])(DBusSignatures, "int16", 'n');
(0, _defineProperty2["default"])(DBusSignatures, "uint16", 'q');
(0, _defineProperty2["default"])(DBusSignatures, "int32", 'i');
(0, _defineProperty2["default"])(DBusSignatures, "uint32", 'u');
(0, _defineProperty2["default"])(DBusSignatures, "byte", 'y');
(0, _defineProperty2["default"])(DBusSignatures, "path", 'o');
(0, _defineProperty2["default"])(DBusSignatures, "string", 's');
(0, _defineProperty2["default"])(DBusSignatures, "Variant", 'v');
(0, _defineProperty2["default"])(DBusSignatures, "fileDescriptor", 'h');
(0, _defineProperty2["default"])(DBusSignatures, "Array", 'a');
(0, _defineProperty2["default"])(DBusSignatures, "dict", 'a{');