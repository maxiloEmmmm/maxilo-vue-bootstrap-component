<template>
    <div :class="['mxl-select']">
        <div class="form-control" @click.stop="toggle($event)" style="height:auto" ref="form">
            <span class="mxl-select-item" style="background:#fff;color:#000;" v-if="!_hasView">{{ placeholder }}</span>
            <span class="mxl-select-item" style="background:#fff;color:#000;" v-else>{{ view }}</span>
        </div>
        <mxl-modal :show="active" :fullScreen="false" size="85">
            <mxl-hierarchy :alias="_alias" :options="lists" ref="core" @touch="itemClick">
                <template slot="icon" slot-scope="prop">
                    <i class="fa" :class="'fa-chevron-' + (prop.item[_alias.hasChild] ? 'right' : '')"></i>
                </template>
            </mxl-hierarchy>
            <div slot="footer">
                <mxl-btn @click="hide">终了</mxl-btn>
            </div>
        </mxl-modal>
    </div>
</template>

<script>
export default {
    name: 'cascade',
    data(){
        return {
            /* 是否展开 */
            active: false,
            lists: [],
            checks: [],
            caches: {},
            position: {
                top: 0,
                left: 0,
                position: 'fixed',
                zIndex: 200
            }
        };
    },
    async mounted(){
        /* 加入全局组件管理器 */
        this.$store.commit('maxilo-bootstrap-component/addDropMenu', {
            uuid: this._uid,
            instance: this
        });
        if(this.data.length == 0) {
            this.lists = [await this.fetch()];
        }
        this.makeKeyCache(this.data);

        /* 第一级别 */
        if(this.data.length != 0) {
            this.lists = [this.data];
        }
        this.repairValue();
    },
    props: {
        placeholder: {
            default: '请选择'
        },
        data: {
            default(){
                return [];
            }
        },
        autoClickHide: {
            default: true
        },
        alias: {
            default(){
                return {
                    label: 'label',
                    value: 'value',
                    hasChild: 'hasChild',
                    childs: 'childs',
                    requestPid: 'pid'
                };
            }
        },
        value: {
            default: ''
        },
        url: {
            default: false
        },
        requestMethod: {
            default: 'post'
        },
        split: {
            default: '/'
        }
    },
    computed:{
        _alias(){
            return this.$utils._.merge({}, {
                label: 'label',
                value: 'value',
                hasChild: 'hasChild',
                childs: 'childs',
                requestPid: 'pid'
            }, this.alias);
        },
        view(){
            return this.checks.map(v => v[this._alias.label]).join(' ' + this.split + ' ');
        },
        _hasView(){
            return this.checks.length != 0;
        }
    },
    watch: {
        value: {
            deep: true,
            handler(){
                this.repairValue();
            }
        },
        data: {
            deep: true,
            handler(){
                this.makeKeyCache(this.data);

                /* 第一级别 */
                if(this.data.length != 0) {
                    this.lists = [this.data];
                }
                this.repairValue();
            }
        }
    },
    methods: {
        getView(){
            return this.view;
        },
        getViewDetail(){
            return this.checks.map(v => v[this._alias.label]);
        },
        async fetch(p = null){
            /* 从缓存抓取 */
            if(this.caches[p]) {
                return this.caches[p][this._alias.childs];
            }else {
                if(!this.url) {
                    console.log('[maxilo-vue-bootstrap-component - cascade | warning] want more child, but url is not defined, return empty Array.');
                    return [];
                }
                let method = this.requestMethod == 'post' ? this.$http.post : this.$http.get;
                let tmp = {};
                if(p) {
                    tmp[this._alias.requestPid] = p;
                }
                this.caches[p] = this.$mxl_bootstrap_component_adapter.responseFormat(await method(this.url, tmp));
                this.makeKeyCache(this.caches[p]);
                return this.caches[p];
            }
        },
        /* 反转下拉菜单 */
        toggle($event){
            this.active = !this.active;
        },
        /* 下拉菜单项点击 */
        async itemClick(current, level){
            this.checks = current;
            if(level+1 < this.lists.length) {
                this.lists = this.lists.slice(0, level+1);
            } 
            let last = current[current.length-1];
            if(last[this._alias.hasChild]) {
                this.$set(this.lists, level+1, last[this._alias.childs].length != 0 
                                                    ? last[this._alias.childs] 
                                                    : await this.fetch(last[this._alias.childs]));
            }else {
                if(this.autoClickHide) {
                    this.hide();
                }
            }
            let c = this.checks.map(v => v[this._alias.value]);
            this.$emit('input', c);
            this.$emit('touch', c);
        },
        /* 多选已选移除 */
        remove($v){
            this.checks = this.checks.filter(v => v != $v);
        },
        /* 隐藏下拉 */
        hide(){
            this.active = false;
        },
        /* 显示下拉 */
        show(){
            this.active = true;
        },
        /* 重置 */
        async reset(){
            this.checks = [];
            this.$emit('input', []);
            /* 渲染完成后释放控制流 */
            await this.$nextTick();
        },
        async repairValue(){
            /* 等待数据初始化 */
            await this.$nextTick();

            if(!Array.isArray(this.value)) {
                this.reset();
            }else {
                let tmp = this.value;
                let len = tmp.length;
                for(let i = 0; i < len-1; i++) {
                    this.lists[i+1] = await this.fetch(tmp[i]);
                }

                tmp = [];
                this.value.forEach((v, i) => {
                    if(this.lists[i]) {
                        let index = this.lists[i].findIndex($v => $v[this._alias.value] == v);
                        if(index !== -1) {
                            tmp.push(index);
                        }
                    }
                });
                this.$refs.core.setActive(tmp);
                this.checks = this.value.map(v => this.caches[v]);
            }
        },
        makeKeyCache(data){
            data.forEach(v => {
                this.caches[v[this._alias.value]] = v
                if(v[this._alias.hasChild]) {
                    this.makeKeyCache(v[this._alias.childs])
                }
            });
        }
    }
};
</script>

<style>
    .mxl-select-item {
        padding: 1px 5px;
        border-radius: 4px;
        color: #fff;
        background: #ccc;
        margin: 1px;
        display: inline-block;
    }
</style>

