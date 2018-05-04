"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getStyle = function getStyle(el, styleName) {
    if (el.currentStyle) {
        // for IE
        return el.currentStyle[styleName];
    } else {
        // for peace
        return getComputedStyle(el, false)[styleName];
    }
};

exports.default = {
    getStyle: getStyle
};