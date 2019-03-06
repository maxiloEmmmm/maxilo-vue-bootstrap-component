"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _default = {
  getStyle: function getStyle(el, styleName) {
    if (el.currentStyle) {
      // for IE
      return el.currentStyle[styleName];
    } else {
      // for peace
      return getComputedStyle(el, false)[styleName];
    }
  },
  loading: function () {
    var _loading = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(el, func) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.app.instance.$nextTick();

            case 2:
              _context.next = 4;
              return el.mxlLoadingInstance.wait(func);

            case 4:
              return _context.abrupt("return", _context.sent);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function loading(_x, _x2) {
      return _loading.apply(this, arguments);
    };
  }(),
  setDrag: function setDrag(instance) {
    this.app.store.instance.commit('maxilo-bootstrap-component/addRelation', {
      key: 'dropVueInstance',
      relation: instance
    });
  },
  getDrag: function getDrag() {
    return this.app.store.instance.state['maxilo-bootstrap-component'].relations.dropVueInstance;
  }
};
exports.default = _default;