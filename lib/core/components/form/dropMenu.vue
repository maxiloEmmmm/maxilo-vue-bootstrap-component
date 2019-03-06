<template>
    <div :class="[btn ? 'btn-group' : 'dropdown', active ? 'show' : '']">
        <button class="btn dropdown-toggle" :class="['btn-primary' + type, _size, split ? 'dropdown-toggle-split' : '']" type="button" @click.stop="toggle()">
            <slot></slot>
        </button>
        <div class="dropdown-menu" :class="active ? 'show' : ''">
            <a class="dropdown-item" @click="itemClick($event, index)" v-for="(i, index) in menus" :key="index" href="javascript:void(0)">{{i.text}}</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'dropMenu',
    data(){
        return {
            /* 是否展开 */
            active: false,
        };
    },
    mounted(){
        /* 加入全局组件管理器 */
        this.$store.commit('maxilo-bootstrap-component/addDropMenu', {
            uuid: this._uid,
            instance: this
        });
        this.initBodyToggle();
    },
    computed: {
        _size(){
            return {
                md: '',
                lg: 'btn-lg',
                sm: 'btn-sm',
            }[this.size];
        }  
    },
    props: {
        menus: {
            default(){
                return [{
                    text: '无选项'
                }];
            }
        },
        single: {
            default: true
        },
        btn: {
            default: true
        },
        autoClickHide: {
            default: true
        },
        type: {
            default: 'primary',
            type: String
        },
        size: {
            default: 'md'
        },
        split: {
            default: true
        }
    },
    methods: {
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
        ulClick(e){
            this.$utils.tool.stopPropagation(e);
        },
        itemClick(e, current){
            /* 自动关闭 */
            if(this.autoClickHide) {
                this.hide();
            }
            this.$utils.tool.stopPropagation(e);

            /* 触发定向钩子 */
            if(this.menus[current]['fn']) {
                this.menus[current]['fn'](this.menus[current], current);
            }

            /* 触发时间: 没有指定定向钩子 或者 明确指定触发事件 */
            if(this.menus[current]['fn'] || this.menus[current]['emit']) {
                this.$emit('touch', this.menus[current], current);
            }
        },
        initBodyToggle(){
            /* 全局监听失去焦点 */
            window.addEventListener('click', ($e) => {
                this.active = false;
            });
        },
        hide(){
            this.active = false;
        },
        show(){
            this.active = true;
        }
    }
};
</script>
