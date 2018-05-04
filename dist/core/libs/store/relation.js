'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
    relations: {}
};

var getters = {};

var actions = {
    getRelation: function getRelation(_ref, type) {
        var _this = this;

        var state = _ref.state;
        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (state.relations[type]) {
                                _context.next = 8;
                                break;
                            }

                            _context.t0 = type;
                            _context.next = _context.t0 === 'editor' ? 4 : 8;
                            break;

                        case 4:
                            _context.next = 6;
                            return import('@ckeditor/ckeditor5-build-classic');

                        case 6:
                            state.relations.editor = _context.sent;
                            return _context.abrupt('break', 8);

                        case 8:
                            return _context.abrupt('return', state.relations[type] ? state.relations[type] : null);

                        case 9:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    }
};

var mutations = {
    addRelation: function addRelation(state, key, relation) {
        state.relations[key] = relation;
    }
};

exports.default = {
    namespaced: true,
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};