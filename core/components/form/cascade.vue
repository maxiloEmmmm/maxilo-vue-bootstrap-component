<template>
    <div :class="['dropdown', active ? 'open' : '', 'mxl-select']">
        <div class="form-control" @click.stop="toggle()" style="height:auto">
            <span class="mxl-select-item" style="background:#fff" v-show="checks.length == 0"></span>
            <span class="mxl-select-item" style="background:#fff;color:#000;">{{ view }}</span>
        </div>
        <ul class="dropdown-menu" @click.stop="()=>{}">
            <li>
                <mxl-hierarchy :options="lists" ref="core" @touch="itemClick"></mxl-hierarchy>
            </li>
        </ul>
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
            caches: {}
        };
    },
    mounted(){
        /* 加入全局组件管理器 */
        this.$store.commit('maxilo-bootstrap-component/addDropMenu', {
            uuid: this._uid,
            instance: this
        });
        this.initBodyToggle();
        this.fetch();
        this.makeKeyCache(this.data);
        this.repairValue();
    },
    props: {
        data: {
            default(){
                return [{
                    label: '无选项'
                }];
            }
        },
        single: {
            default: true
        },
        autoClickHide: {
            default: true
        },
        more: false,
        labelModel: false,
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
            return this.$utils._.merge(this.$mxl_bootstrap_component_adapter.alias.form.cascade, this.alias);
        },
        heightPadding(){
            return {
                padding: (!this.more || this.checks.length == 0 ? 6 : 8) +  'px 12px'
            }; 
        },
        view(){
            return this.checks.map(v => v[this._alias.label]).join(' ' + this.split + ' ');
        }
    },
    methods: {
        async fetch(p = null){
            if(this.caches[p]) {
                return this.caches[p];
            }else {
                if(!this.url) {
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
        toggle(){
            this.active = !this.active;

            /* 单例展开: 是否全局只展开一个 */
            if(this.active && this.single) {
                let dropMenus = this.$store.getters['maxilo-bootstrap-component/manager'].dropMenu;
                /* 关闭其他实例 */
                Object.keys(dropMenus).forEach(($v) => {
                    if($v != this._uid){
                        dropMenus[$v].hide();
                    }
                });
            }
        },
        /* 下拉菜单项点击 */
        async itemClick(current, level){
            this.checks = current;
            if(level+1 < this.lists.length) {
                this.lists = this.lists.slice(0, level+1);
            } 
            let last = current[current.length-1];
            if(last[this._alias.hasChild]) {
                this.$set(this.lists, level+1, last[this._alias.childs] 
                                                    ? last[this._alias.childs] 
                                                    : await this.fetch(last[this._alias.childs]));
            }
        },
        /* 多选已选移除 */
        remove($v){
            this.checks = this.checks.filter(v => v != $v);
        },
        initBodyToggle(){
            /* 全局监听失去焦点 */
            window.addEventListener('click', ($e) => {
                this.active = false;
            });
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
            this.lists = [this.data];
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

