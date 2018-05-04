const getStyle = function(el, styleName) {
     if (el.currentStyle) {
         // for IE
         return el.currentStyle[styleName];
     } else {
         // for peace
         return getComputedStyle(el, false)[styleName];
     }
}

export default {
    getStyle
}