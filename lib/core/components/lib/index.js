'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _render = require('./render.vue');

var _render2 = _interopRequireDefault(_render);

var _modal = require('./modal.vue');

var _modal2 = _interopRequireDefault(_modal);

var _formComponmentErrorTip = require('./formComponmentErrorTip.vue');

var _formComponmentErrorTip2 = _interopRequireDefault(_formComponmentErrorTip);

var _alert = require('./alert.vue');

var _alert2 = _interopRequireDefault(_alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    render: _render2.default,
    modal: _modal2.default,
    formComponmentErrorTip: _formComponmentErrorTip2.default,
    alert: _alert2.default
};