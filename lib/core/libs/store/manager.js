'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var state = {
    manager: {
        dropMenu: {}
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
        var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, type) {
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
            }, _callee, this);
        }));

        function getRelation(_x, _x2) {
            return _ref.apply(this, arguments);
        }

        return getRelation;
    }()
};

var mutations = {
    addDropMenu: function addDropMenu(state, payload) {
        state.manager.dropMenu[payload.uuid] = payload.instance;
    },
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