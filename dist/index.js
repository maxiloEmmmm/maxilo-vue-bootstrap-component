'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _components = require('./core/components');

var _components2 = _interopRequireDefault(_components);

var _maxiloVue = require('maxilo-vue');

var _maxiloVue2 = _interopRequireDefault(_maxiloVue);

require('./core/asset/sass/core.scss');

var _manager = require('./core/libs/store/manager');

var _manager2 = _interopRequireDefault(_manager);

var _adapter = require('./core/libs/adapter');

var _adapter2 = _interopRequireDefault(_adapter);

var _systemAdapter = require('./core/libs/systemAdapter');

var _systemAdapter2 = _interopRequireDefault(_systemAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_maxiloVue2.default.vue.warnHandler = function (a) {
    if (!/reserved HTML elements as component/g.test(a)) {
        _maxiloVue2.default.utils.system.notice(a);
    }
};
var pre = 'mxl';

function depPre(target) {
    if (!target.__file) {
        if (Array.isArray(target)) {
            target.forEach(function (v, i) {
                v = depPre(v);
                target[pre + _maxiloVue2.default.utils._.upperFirst(i)] = v;
                delete target[i];
            });
        } else {
            (0, _keys2.default)(target).forEach(function (key) {
                target[key] = depPre(target[key]);
                target[pre + _maxiloVue2.default.utils._.upperFirst(key)] = target[key];
                delete target[key];
            });
        }
    }

    return target;
}

_maxiloVue2.default.store.once('maxilo-bootstrap-component', _manager2.default);

_maxiloVue2.default.register(new _adapter2.default());

_maxiloVue2.default.mxl_bootstrap_component_adapter.add(new _systemAdapter2.default());

exports.default = depPre(_components2.default);