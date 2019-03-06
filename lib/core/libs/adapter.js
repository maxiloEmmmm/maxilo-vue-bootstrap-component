"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

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

  this.eventInit = function () {
    var _this = this;

    window.addEventListener('click', function ($e) {
      Object.keys(_this.app.store.instance.state['maxilo-bootstrap-component'].manager.dropMenu).forEach(function (v) {
        if (_this.app.store.instance.state['maxilo-bootstrap-component'].manager.dropMenu[v].autoClickHide === undefined || !!_this.app.store.instance.state['maxilo-bootstrap-component'].manager.dropMenu[v].autoClickHide) {
          _this.app.store.instance.state['maxilo-bootstrap-component'].manager.dropMenu[v].hideDropMenu && _this.app.store.instance.state['maxilo-bootstrap-component'].manager.dropMenu[v].hideDropMenu();
        }
      });
    });
  };

  this.run =
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(vue) {
      var _this2 = this;

      var len, i, v, alias, _tmp, base;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.eventInit();
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
                  return _this2.adapters;
                }
              });

              if (!this.useAlert) {
                _context.next = 11;
                break;
              }

              _context.next = 7;
              return import('sweetalert');

            case 7:
              base = _context.sent.default;
              this.app.alert.base = base;

              this.app.alert.confirm = function (options) {
                if (_this2.app.utils.base.getType(options) == 'String') {
                  options = {
                    text: options
                  };
                }

                return base(_this2.app.utils._.merge({}, {
                  text: "Are you sure you want to do this?",
                  buttons: {
                    cancel: {
                      text: '取消',
                      value: false,
                      visible: true
                    },
                    confirm: {
                      text: '确认',
                      value: true
                    }
                  }
                }, options));
              };

              this.app.alert.prompt = function (options) {
                if (_this2.app.utils.base.getType(options) == 'String') {
                  options = {
                    text: options
                  };
                }

                return base(_this2.app.utils._.merge({}, {
                  content: {
                    element: "input",
                    attributes: {
                      placeholder: "Type your password",
                      type: "text"
                    }
                  }
                }, options));
              };

            case 11:
            case "end":
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

var _default = adapter;
exports.default = _default;