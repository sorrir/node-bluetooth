"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sleep = sleep;
exports.retry = retry;
exports.firstResolve = firstResolve;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

// Helper types
function sleep(_x) {
  return _sleep.apply(this, arguments);
} // Helper functions


function _sleep() {
  _sleep = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ms) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve) {
              setTimeout(resolve, ms);
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _sleep.apply(this, arguments);
}

function retry(_x2, _x3) {
  return _retry2.apply(this, arguments);
}

function _retry2() {
  _retry2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(options, fn) {
    var _len,
        args,
        _key,
        _args2 = arguments;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            for (_len = _args2.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
              args[_key - 2] = _args2[_key];
            }

            return _context2.abrupt("return", _retry.apply(void 0, [options.maxRetries, options.retryIntervalMs, fn].concat(args)));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _retry2.apply(this, arguments);
}

function _retry(_x4, _x5, _x6) {
  return _retry3.apply(this, arguments);
}

function _retry3() {
  _retry3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(retriesLeft, retryIntervalMs, fn) {
    var _len2,
        args,
        _key2,
        result,
        _args3 = arguments;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            for (_len2 = _args3.length, args = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
              args[_key2 - 3] = _args3[_key2];
            }

            _context3.next = 3;
            return fn.apply(void 0, args);

          case 3:
            result = _context3.sent;

            if (!result) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", result);

          case 6:
            _context3.next = 8;
            return sleep(retryIntervalMs);

          case 8:
            retriesLeft--;
            return _context3.abrupt("return", _retry.apply(void 0, [retriesLeft, retryIntervalMs, fn].concat(args)));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _retry3.apply(this, arguments);
}

function firstResolve(promises) {
  return Promise.all(promises.map(function (p) {
    // If a request fails, count that as a resolution so it will keep
    // waiting for other possible successes. If a request succeeds,
    // treat it as a rejection so Promise.all immediately bails out.
    return p.then(function (val) {
      return Promise.reject(val);
    }, function (err) {
      return Promise.resolve(err);
    });
  })).then( // If '.all' resolved, we've just got an array of errors.
  function (errors) {
    return Promise.reject(errors);
  }, // If '.all' rejected, we've got the result we wanted.
  function (val) {
    return Promise.resolve(val);
  });
}