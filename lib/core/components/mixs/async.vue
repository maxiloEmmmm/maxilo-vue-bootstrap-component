<script>
export default {
    data(){
        return {
            /* 缓存map */
            cache: {},
            async_loading: false
        };
    },
    props: {
        /* 数据api */
        url: {
            default: ''
        },
        /* 异步获取参数 */
        async: {
            default(){
                return {};
            }
        },
        /* 是否使用缓存 */
        useCache: {
            default: false
        },
        justGetFormat: {
            default: false
        }
    },
    computed: {
        /* 异步获取配置 */
        _async(){
            let _this = this;
            let base = {
                method: 'get',
                params: {},
                /* 参数格式化 - 针对post */
                paramsFormat(p){
                    return _this.$utils._.merge(p.otherParams, p.params);
                },
                /* url格式化 */
                urlFormat(u, p){
                    return u;
                },
                /* 响应数据格式化 */
                responseFormat(d){
                    return d.data;
                }
            };
            Object.keys(this.async).forEach(v => base[v] ? (base[v] = this.async[v]) : '');
            return base;
        },
        _async_method(){
            return ['put', 'get', 'post'].includes(this._async.method) ? this._async.method : 'get';
        },
        _async_use_get_param_format(){
            return this._async_method === 'get' && !this.justGetFormat;
        }
    },
    methods: {
        /* 拉取数据 */
        async fetch(){
            if(!this.url) {
                return [];
            }

            try {
                let params = {
                    otherParams: this.getParams(),
                    params: this._async.params
                };
                let paramHash = this.$utils.tool.md5(JSON.stringify(params));
                if(this.useCache && this.cache[paramHash]) {
                    return this.cache[paramHash];
                }else {
                    this.async_loading = true;
                    /* fixed axios get method param. */
                    if(this._async.method === 'get') {
                        params = {params: this._async_use_get_param_format ? this._async.paramsFormat(params) : params};
                    }else {
                        params = this._async.paramsFormat(params);
                    }
                    let data = await this.$http[this._async_method](this._async.urlFormat(this.url, params), params);
                    this.async_loading = false;
                    let formatData = this._async.responseFormat(data);
                    this.cache[paramHash] = formatData;
                    return formatData;
                }
            } catch (error) {
                alert(error);
                this.$emit('fetchErr', error);
            }
        }
    }
};
</script>

