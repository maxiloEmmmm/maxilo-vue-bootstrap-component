const adapter = function(){
    this.name = 'mxl_bootstrap_component_adapter';
    this.adapters = {
        alias: {},
        responseFormat: function(ds){return ds;}
    };

    this.useAlert = false;

    this.adapterInstance = [];

    /* alias: component level */
    /* responseFormat: component with http module */

    this.merge = function(key, options){
        if(!this.adapters[key]) {
            return ;
        }

        if (this.app.utils.base.getType(options) == 'Function' && this.app.utils.base.getType(this.adapters[key]) == 'Function') {
            this.adapters[key] = options;
            return ;
        }

        this.adapters[key] = this.app.utils._.merge(this.adapters[key], options);
    }

    this.add = function(obj){
        if (this.app.utils.base.getType(obj) != 'Object') {
            return ;
        }

        this.adapterInstance.push(obj);
    }

    this.run = async function (vue) {
        let len = this.adapterInstance.length;
        for (let i = 0; i < len; i++) {
            let v = this.adapterInstance[i];
            if (v.alias) {
                let alias = v.alias();
                let tmp = this.app.utils.base.getType(alias);
                if (tmp != 'Object') {
                    console.log('[mxl-bootstrap-component - adapter warning] alias return ' + tmp + ' qipan(:>) Object.');
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
            get: () => {
                return this.adapters;
            }
        });

        if (this.useAlert) {
            this.app.alert.base = await import('sweetalert');
        }
    };
};

export default adapter;