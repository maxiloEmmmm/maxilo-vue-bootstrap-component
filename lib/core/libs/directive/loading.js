"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("core-js/modules/es6.regexp.to-string");

var random = function random() {
  var pre = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  function S4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  }

  function guid() {
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
  }

  return pre + guid();
};

var _default = {
  install: function install(vue) {
    vue.directive('mxlLoading', {
      bind: function () {
        var _bind2 = (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(el, _bind, vNode) {
          var flag, tag, node, instance, title, block;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  /* 将吸附区设置相对定位 */
                  el.style.position = 'relative';
                  /* loading版式 */

                  flag = _bind.arg ? _bind.arg : 'build';
                  /* 等待el插入dom */

                  /* 生成loading标识 */

                  tag = random('mxl-loading-');
                  /* 由吸附区保存loading标识 */

                  el.setAttribute('mxl-loading-id', tag);
                  /* 创建loading容器 */

                  node = document.createElement('div');
                  /* 设置loading标识 */

                  node.setAttribute('id', tag);
                  el.appendChild(node);
                  _context.next = 9;
                  return vNode.context.$nextTick();

                case 9:
                  /* 获取存储loading vNode的容器 */
                  instance = vNode.componentInstance ? vNode.componentInstance : vNode.elm;
                  /* 获取自定义提示 */

                  title = el.getAttribute('mxl-loading-title');
                  title = title ? title : '请等待';
                  /* 获取块模式 */

                  block = el.getAttribute('mxl-loading-block', 'block');
                  /* 生成loading vNode */

                  instance.mxlLoadingInstance = new vue({
                    el: '#' + tag,
                    template: "\n                    <mxl-loading-".concat(flag, " \n                        style=\"background: #fff;border: 1px solid #cecece;border-radius: 4px;z-index: 20000;width: 100%;height: 100%;position: absolute;\n                        top: 0;left: 0;\"\n                        id=\"").concat(tag, "\" \n                        title=\"").concat(title, "\"\n                        :value=\"").concat(!!_bind.value, "\"\n                        :block=\"'").concat(block, "' == 'block'\"></mxl-loading-").concat(flag, ">")
                  })._vnode.componentInstance;

                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function bind(_x, _x2, _x3) {
          return _bind2.apply(this, arguments);
        };
      }(),
      componentUpdated: function () {
        var _componentUpdated = (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(el, bind, vNode) {
          var instance, title;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return vue.nextTick();

                case 2:
                  instance = vNode.componentInstance ? vNode.componentInstance : vNode.elm;
                  instance.mxlLoadingInstance.$data.running = bind.value;
                  title = el.getAttribute('mxl-loading-title');
                  title = title ? title : '请等待';
                  instance.mxlLoadingInstance.$props.title = title;
                  instance.mxlLoadingInstance.$props.block = el.getAttribute('mxl-loading-block', 'block') == 'block';

                case 8:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        return function componentUpdated(_x4, _x5, _x6) {
          return _componentUpdated.apply(this, arguments);
        };
      }()
    });
  }
};
exports.default = _default;