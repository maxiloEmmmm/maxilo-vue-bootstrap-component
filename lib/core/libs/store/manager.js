"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var state = {
  manager: {
    dropMenu: {},
    menu: {}
  },
  relations: {}
};
var getters = {
  manager: function manager(state) {
    return state.manager;
  }
};
var actions = {
  getRelation: function () {
    var _getRelation = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref, type) {
      var state;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = _ref.state;

              if (state.relations[type]) {
                _context.next = 9;
                break;
              }

              _context.t0 = type;
              _context.next = _context.t0 === 'editor' ? 5 : 9;
              break;

            case 5:
              _context.next = 7;
              return import('@ckeditor/ckeditor5-build-classic');

            case 7:
              state.relations.editor = _context.sent.default;
              return _context.abrupt("break", 9);

            case 9:
              return _context.abrupt("return", state.relations[type] ? state.relations[type] : null);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getRelation(_x, _x2) {
      return _getRelation.apply(this, arguments);
    }

    return getRelation;
  }()
};
var mutations = {
  addRelation: function addRelation(state, payload) {
    state.relations[payload.key] = payload.relation;
  },
  hideDropMenu: function hideDropMenu(state, dropMenuInstance) {
    state.manager.dropMenu[dropMenuInstance._uid] = dropMenuInstance;

    if (dropMenuInstance._dorp_menu_single !== undefined && !!dropMenuInstance._dorp_menu_single) {
      Object.keys(state.manager.dropMenu).forEach(function (v) {
        if (v != dropMenuInstance._uid) {
          state.manager.dropMenu[v].hideDropMenu && state.manager.dropMenu[v].hideDropMenu();
        }
      });
    }
  },
  menuMerge: function menuMerge(state, payload) {
    if (state.manager.menu[payload.primaryKey] === undefined) {
      state.manager.menu[payload.primaryKey] = {
        class: {},
        mode: {},
        func: {}
      };
    }

    Object.assign(state.manager.menu[payload.primaryKey], payload.data);
  }
};
var _default = {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
exports.default = _default;