exports.id = 441;
exports.ids = [441];
exports.modules = {

/***/ 4441:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nTimesRec": () => /* binding */ nTimesRec
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(generatorFn),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(generatorFnYield),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(nTimes),
    _marked4 = /*#__PURE__*/regeneratorRuntime.mark(range),
    _marked5 = /*#__PURE__*/regeneratorRuntime.mark(generatorFnIterator),
    _marked6 = /*#__PURE__*/regeneratorRuntime.mark(nTimesRec);

function generatorFn() {
  return regeneratorRuntime.wrap(function generatorFn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 'foo';

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var g = generatorFn();
console.log(g);
console.log(g.next());
console.log(g[Symbol.iterator]);
console.log(g[Symbol.iterator]() === g); //yield 中断执行generatorFn

function generatorFnYield() {
  return regeneratorRuntime.wrap(function generatorFnYield$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return 'foo';

        case 2:
          _context2.next = 4;
          return 'bar';

        case 4:
          return _context2.abrupt("return", 'baz');

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}

var generatorFnYieldObj = generatorFnYield();
console.log(generatorFnYieldObj.next());
console.log(generatorFnYieldObj.next());
console.log(generatorFnYieldObj.next());
console.log(generatorFnYieldObj); //迭代器

function nTimes(n) {
  return regeneratorRuntime.wrap(function nTimes$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!n--) {
            _context3.next = 5;
            break;
          }

          _context3.next = 3;
          return;

        case 3:
          _context3.next = 0;
          break;

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}

var _iterator = _createForOfIteratorHelper(nTimes(6)),
    _step;

try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var n = _step.value;
    console.log('foo');
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

function range(start, end) {
  return regeneratorRuntime.wrap(function range$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!(end > start)) {
            _context4.next = 5;
            break;
          }

          _context4.next = 3;
          return start++;

        case 3:
          _context4.next = 0;
          break;

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}

console.log(Array.from(range(3, 10))); //产生可迭代对象

function generatorFnIterator() {
  return regeneratorRuntime.wrap(function generatorFnIterator$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.delegateYield(['a', 'b', 'c'], "t0", 1);

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5);
}

var _iterator2 = _createForOfIteratorHelper(generatorFnIterator()),
    _step2;

try {
  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
    var v = _step2.value;
    console.log(v);
  } //yield*实现递归

} catch (err) {
  _iterator2.e(err);
} finally {
  _iterator2.f();
}

function nTimesRec(n) {
  return regeneratorRuntime.wrap(function nTimesRec$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (!(n > 0)) {
            _context6.next = 4;
            break;
          }

          return _context6.delegateYield(nTimesRec(n - 1), "t0", 2);

        case 2:
          _context6.next = 4;
          return n - 1;

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6);
}

var _iterator3 = _createForOfIteratorHelper(nTimesRec(4)),
    _step3;

try {
  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
    var _n = _step3.value;
    console.log(_n);
  } //提前终止生成器

} catch (err) {
  _iterator3.e(err);
} finally {
  _iterator3.f();
}

console.log(g);
g["return"](4); //g.throw(4)

console.log(g);


/***/ })

};
;
//# sourceMappingURL=441.js.map