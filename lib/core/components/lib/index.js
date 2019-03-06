"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _render = _interopRequireDefault(require("./render.vue"));

var _modal = _interopRequireDefault(require("./modal.vue"));

var _formComponmentErrorTip = _interopRequireDefault(require("./formComponmentErrorTip.vue"));

var _alert = _interopRequireDefault(require("./alert.vue"));

var _loading = _interopRequireDefault(require("./loading.vue"));

var _emotionText = _interopRequireDefault(require("./emotionText.vue"));

var _tab = _interopRequireDefault(require("./tab.vue"));

var _card = _interopRequireDefault(require("./card.vue"));

var _dashboard = _interopRequireDefault(require("./dashboard/dashboard.vue"));

var _dashboard_nav_item = _interopRequireDefault(require("./dashboard/dashboard_nav_item.vue"));

var _loadingBuild = _interopRequireDefault(require("./loading-build.vue"));

var _loadingGirl = _interopRequireDefault(require("./loading-girl.vue"));

var _loadingW = _interopRequireDefault(require("./loading-w10.vue"));

var _default = {
  dashboard: _dashboard.default,
  dashboardNavItem: _dashboard_nav_item.default,
  render: _render.default,
  modal: _modal.default,
  formComponmentErrorTip: _formComponmentErrorTip.default,
  alert: _alert.default,
  loading: _loading.default,
  emotionText: _emotionText.default,
  tab: _tab.default,
  card: _card.default,
  loadingBuild: _loadingBuild.default,
  loadingGirl: _loadingGirl.default,
  loadingW10: _loadingW.default
};
exports.default = _default;