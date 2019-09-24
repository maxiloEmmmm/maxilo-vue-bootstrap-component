"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _default = {
  data: function data() {
    return {
      running: false
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    block: {
      default: true
    },
    title: {
      default: '正在处理您的请求',
      type: String
    }
  },
  mounted: function mounted() {
    this.$el.style.cssText = this.$el.style.cssText + ';display: none !important;';
  },
  watch: {
    running: function running() {
      if (this.running) {
        this.showTriggle && this.showTriggle();
      } else {
        this.hideTriggle && this.hideTriggle();
      }

      this.render();
      this.$emit('input', this.running);
    },
    value: {
      handler: function handler() {
        this.running = this.value;
      },
      immediate: true
    }
  },
  methods: {
    render: function render() {
      this.$el.style.cssText = this.$el.style.cssText + ';display: ' + (this.running ? 'flex !important;flex-wrap: wrap;' : 'none !important') + ';';
    },
    show: function show() {
      this.running = true;
    },
    hide: function hide() {
      this.running = false;
    },
    wait: function () {
      var _wait = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(fn) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.show();
                return _context2.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref = (0, _asyncToGenerator2.default)(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee(ok) {
                    var ds;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return fn();

                          case 2:
                            ds = _context.sent;

                            _this.hide();

                            ok(ds);

                          case 5:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x2) {
                    return _ref.apply(this, arguments);
                  };
                }()));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function wait(_x) {
        return _wait.apply(this, arguments);
      }

      return wait;
    }()
  }
};
exports.default = _default;