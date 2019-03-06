"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _input = _interopRequireDefault(require("./input.vue"));

var _inputGroup = _interopRequireDefault(require("./inputGroup.vue"));

var _inputGroupText = _interopRequireDefault(require("./inputGroupText.vue"));

var _dropMenu = _interopRequireDefault(require("./dropMenu.vue"));

var _btn = _interopRequireDefault(require("./btn.vue"));

var _btnToolBar = _interopRequireDefault(require("./btnToolBar.vue"));

var _btnGroup = _interopRequireDefault(require("./btnGroup.vue"));

var _select = _interopRequireDefault(require("./select.vue"));

var _cascade = _interopRequireDefault(require("./cascade.vue"));

var _date = _interopRequireDefault(require("./date.vue"));

var _upload = _interopRequireDefault(require("./upload.vue"));

var _editor = _interopRequireDefault(require("./editor.vue"));

var _inlineForm = _interopRequireDefault(require("./inlineForm.vue"));

var _formContainer = _interopRequireDefault(require("./formContainer.vue"));

var _formGroup = _interopRequireDefault(require("./formGroup.vue"));

var _inlineFormGroup = _interopRequireDefault(require("./inlineFormGroup.vue"));

var _checkbox = _interopRequireDefault(require("./checkbox.vue"));

var _switch = _interopRequireDefault(require("./switch.vue"));

var _default = {
  inlineForm: _inlineForm.default,
  formContainer: _formContainer.default,
  formGroup: _formGroup.default,
  inlineFormGroup: _inlineFormGroup.default,
  input: _input.default,
  inputGroup: _inputGroup.default,
  inputGroupText: _inputGroupText.default,
  dropMenu: _dropMenu.default,
  btn: _btn.default,
  btnGroup: _btnGroup.default,
  btnToolBar: _btnToolBar.default,
  select: _select.default,
  switch: _switch.default,
  cascade: _cascade.default,
  date: _date.default,
  upload: _upload.default,
  editor: _editor.default,
  checkbox: _checkbox.default
};
exports.default = _default;