'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var adapter = function adapter() {
    this.name = 'mxl_bootstrap_component_adapter';
    this.adapters = {
        alias: {},
        responseFormat: function responseFormat(ds) {
            return ds;
        }
    };

    this.adapterInstance = [];

    /* alias: component level */
    /* responseFormat: component with http module */

    this.merge = function (key, options) {
        if (!this.adapters[key]) {
            return;
        }

        if (this.app.utils.base.getType(options) == 'Function' && this.app.utils.base.getType(this.adapters[key]) == 'Function') {
            this.adapters[key] = options;
            return;
        }

        this.adapters[key] = this.app.utils._.merge(this.adapters[key], options);
    };

    this.add = function (obj) {
        if (this.app.utils.base.getType(obj) != 'Object') {
            return;
        }

        this.adapterInstance.push(obj);
    };

    this.run = function (vue) {
        var _this = this;

        var len = this.adapterInstance.length;
        for (var i = 0; i < len; i++) {
            var v = this.adapterInstance[i];
            if (v.alias) {
                var alias = v.alias();
                var _tmp = this.app.utils.base.getType(alias);
                if (_tmp != 'Object') {
                    console.log('[mxl-bootstrap-component - adapter warning] alias return ' + _tmp + ' qipan(:>) Object.');
                } else {
                    this.merge('alias', alias);
                }
            }

            if (v.responseFormat) {
                if (this.app.utils.base.getType(v.responseFormat) != 'Function') {
                    console.log('[mxl-bootstrap-component - adapter warning] responseFormat is ' + tmp + ' qipan(:>) Function.');
                } else {
                    this.merge('responseFormat', v);
                }
            }
        }
        Object.defineProperty(vue.prototype, '$mxl_bootstrap_component_adapter', {
            get: function get() {
                return _this.adapters;
            }
        });
    };
};

exports.default = adapter;