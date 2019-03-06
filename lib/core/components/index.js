"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _form = _interopRequireDefault(require("./form"));

var _layout = _interopRequireDefault(require("./layout"));

var _lib = _interopRequireDefault(require("./lib"));

var _data = _interopRequireDefault(require("./data"));

var _vendor = _interopRequireDefault(require("./vendor"));

var _default = {
  form: _form.default,
  layout: _layout.default,
  lib: _lib.default,
  data: _data.default,
  vendor: _vendor.default
};
exports.default = _default;