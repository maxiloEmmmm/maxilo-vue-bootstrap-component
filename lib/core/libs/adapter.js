'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var adapter = function adapter() {
    this.name = 'mxl_bootstrap_component_adapter';
    this.adapters = {
        alias: {},
        responseFormat: function responseFormat(ds) {
            return ds;
        }
    };

    this.useAlert = false;

    this.adapterInstance = [];

    /* alias: component level */
    /* responseFormat: component with http module */

    this.merge = function (key, options) {
        if (!this.adapters[key]) {
            return;
        }

        if (this.app.utils.base.getType(options) == 'Function' && this.app.utils.base.getType(this.adapters[key]) == 'Function') {
            this.adapters[key] = options;
            return;
        }

        this.adapters[key] = this.app.utils._.merge(this.adapters[key], options);
    };

    this.add = function (obj) {
        if (this.app.utils.base.getType(obj) != 'Object') {
            return;
        }

        this.adapterInstance.push(obj);
    };

    this.run = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(vue) {
            var _this = this;

            var len, i, v, alias, _tmp;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            len = this.adapterInstance.length;

                            for (i = 0; i < len; i++) {
                                v = this.adapterInstance[i];

                                if (v.alias) {
                                    alias = v.alias();
                                    _tmp = this.app.utils.base.getType(alias);

                                    if (_tmp != 'Object') {
                                        console.log('[mxl-bootstrap-component - adapter warning] alias return ' + _tmp + ' qipan(:>) Object.');
                                    } else {
                                        this.merge('alias', alias);
                                    }
                                }

                                if (v.responseFormat) {
                                    if (this.app.utils.base.getType(v.responseFormat) != 'Function') {
                                        console.log('[mxl-bootstrap-component - adapter warning] responseFormat is ' + tmp + ' qipan(:>) Function.');
                                    } else {
                                        this.merge('responseFormat', v);
                                    }
                                }
                            }
                            Object.defineProperty(vue.prototype, '$mxl_bootstrap_component_adapter', {
                                get: function get() {
                                    return _this.adapters;
                                }
                            });

                            if (!this.useAlert) {
                                _context.next = 7;
                                break;
                            }

                            _context.next = 6;
                            return import('sweetalert');

                        case 6:
                            this.app.alert.base = _context.sent;

                        case 7:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }();
};

exports.default = adapter;