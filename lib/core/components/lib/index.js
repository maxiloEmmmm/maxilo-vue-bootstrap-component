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

var _loading = require('./loading.vue');

var _loading2 = _interopRequireDefault(_loading);

var _emotionText = require('./emotionText.vue');

var _emotionText2 = _interopRequireDefault(_emotionText);

var _dashboard = require('./dashboard/dashboard.vue');

var _dashboard2 = _interopRequireDefault(_dashboard);

var _dashboard_nav_item = require('./dashboard/dashboard_nav_item.vue');

var _dashboard_nav_item2 = _interopRequireDefault(_dashboard_nav_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    dashboard: _dashboard2.default,
    dashboardNavItem: _dashboard_nav_item2.default,
    render: _render2.default,
    modal: _modal2.default,
    formComponmentErrorTip: _formComponmentErrorTip2.default,
    alert: _alert2.default,
    loading: _loading2.default,
    emotionText: _emotionText2.default
};