"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

var _components = _interopRequireDefault(require("./core/components"));

var _directive = _interopRequireDefault(require("./core/libs/directive"));

require("./core/asset/sass/core.scss");

var _manager = _interopRequireDefault(require("./core/libs/store/manager"));

var _adapter = _interopRequireDefault(require("./core/libs/adapter"));

var _systemAdapter = _interopRequireDefault(require("./core/libs/systemAdapter"));

var _utils = _interopRequireDefault(require("./core/libs/utils"));

function _default(core) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _directive.default.forEach(function (v) {
    return core.vue.use(v);
  });

  core.store.once('maxilo-bootstrap-component', _manager.default);
  var module = new _adapter.default();
  module.useAlert = !!option.useAlert;
  core.register(module);
  core.mxl_bootstrap_component_adapter.add(new _systemAdapter.default());
  Object.keys(_utils.default).forEach(function (k) {
    core.utils.add("mxlvbc.".concat(k), _utils.default[k], true);
  });
  var pre = 'mxl';

  function depPre(target) {
    if (!target.__file && !target._compiled && !target.functional && !target._scopeId) {
      if (Array.isArray(target)) {
        target.forEach(function (v, i) {
          v = depPre(v);
          target[pre + core.utils._.upperFirst(i)] = v;
          delete target[i];
        });
      } else {
        Object.keys(target).forEach(function (key) {
          target[key] = depPre(target[key]);
          target[pre + core.utils._.upperFirst(key)] = target[key];
          delete target[key];
        });
      }
    }

    return target;
  }

  core.vue.depComponent(depPre(_components.default));
}

;
