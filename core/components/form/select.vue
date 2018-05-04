<template>
    <div :class="['dropdown', active ? 'open' : '', 'mxl-select']">
        <mxl-input-group>
            <div class="form-control" @click.stop="toggle()" style="height:auto">
                <template v-if="more">
                    <span v-for="(c, index) in checks" :key="index" class="mxl-select-item"><i class="fa fa-times" @click.stop="remove(c)"></i> | {{ dataKeyCache[c] }}</span>
                </template>
                <template v-else>
                    <span>{{ dataKeyCache[checks[0]] }}</span>
                </template>
                <span class="mxl-select-item" style="background:#fff" v-show="checks.length == 0">{{ placeholder }}</span>
            </div>
            <mxl-btn-group :input="true">
                <div class="btn btn-default" @click="reset" :style="[heightPadding]">清空</div>
            </mxl-btn-group>
        </mxl-input-group>
        <ul class="dropdown-menu" @click.stop="()=>{}" style="width:100%">
            <li @click.stop="itemClick(index)" v-for="(i, index) in options" :key="index" :style="[checks.includes(i[_alias.value]) ? {background: '#cecece'} : {}]"><a href="#">{{i[_alias.label]}}</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'select',
    data(){
        return {
            /* 是否展开 */
            active: false,

            checks: [],
            dataKeyCache: {}
        };
    },
    mounted(){
        /* 加入全局组件管理器 */
        this.$store.commit('maxilo-bootstrap-component/addDropMenu', {
            uuid: this._uid,
            instance: this
        });
        this.initBodyToggle();
        this.makeKeyCache();
        this.repairValue();
    },
    props: {
        placeholder: {
            default: ''
        },
        options: {
            default(){
                return [{
                    text: '无选项'
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
                    value: 'value'
                };
            }
        },
        value: {
            default: ''
        }
    },
    computed:{
        _alias(){
            return this.$utils._.merge(this.$mxl_bootstrap_component_adapter.alias.form.select, this.alias);
        },
        heightPadding(){
            return {
                padding: (!this.more || this.checks.length == 0 ? 6 : 8) +  'px 12px'
            }; 
        }
    },
    watch: {
        options: {
            deep: true,
            handler(){
                this.makeKeyCache();
            }
        }
    },
    methods: {
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
        itemClick(current){
            let currentValue = this.options[current][this._alias.value];
            if(this.more) {
                if(!this.checks.includes(currentValue)) {
                    this.$set(this.checks, this.checks.length, currentValue);
                    this.$emit('input', this.checks);
                }
            }else {
                if(this.checks[0] != currentValue) {
                    this.$set(this.checks, 0, currentValue);
                    this.$emit('input', this.checks);
                }
            }

            /* 自动关闭 */
            if(this.autoClickHide) {
                this.hide();
            }

            /* 触发定向钩子 */
            if(this.options[current]['fn']) {
                this.options[current]['fn'](this.options[current], current, this.checks);
            }

            /* 触发时间: 没有指定定向钩子 或者 明确指定触发事件 */
            if(this.options[current]['fn'] || this.options[current]['emit']) {
                this.$emit('touch', this.options[current], current, this.checks);
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
        /* 生成hash字典 */
        makeKeyCache(){
            this.options.forEach(element => {
                if(!element[this._alias.value] || !element[this._alias.label]) {
                    this.$utils.system.notice('[maxilo-vue-bootstrap-component - select | warning] one option is invalid');
                    console.log('invalid option: ', element);
                    return false;
                }
                this.dataKeyCache[element[this._alias.value]] = element[this._alias.label];
            });
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

            if(Array.isArray(this.value)) {
                let oks = this.value.filter((v) => this.dataKeyCache[v]);
                this.checks = this.more 
                    ? oks
                    : [oks[0]];
                this.$emit('input', this.checks);
            }else {
                let tmp = this.dataKeyCache[this.value] ? [this.value] : [];
                this.checks = tmp;
                this.$emit('input', tmp);
            }
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

