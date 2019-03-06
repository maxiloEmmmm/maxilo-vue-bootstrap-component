<template>
    <li :class="[active ? 'active' : '']">
        <a href="#" @click="toggle">
            <i :class="_icon"></i>
            <span class="nav-label">{{ _title }}</span>
            <span class="fa arrow" v-if="_hasChild"></span>
        </a>
        <ul :class="['nav', `nav-${_level}-level`, 'collapse', active ? 'show' : '']" v-if="_hasChild">
            <mxl-dashboard-nav-item :item="child" v-for="(child, index) in _children" :key="index" :level="level+1" :alias="_alias"></mxl-dashboard-nav-item>
        </ul>
    </li>
</template>

<script>
export default {
    name: 'dashboardNavItem',
    data(){
        return {
            active: false
        };
    },
    props: {
        alias: {
            type: Object,
            default(){
                return {};
            }
        },
        item: {
            type: Object,
            default(){
                return {};
            }
        },
        level: {
            default: 0
        }
    },
    computed: {
        _alias() {
            return this.$utils._.merge({}, {
                title: 'title',
                href: 'href',
                out: 'out',
                icon: 'icon',
                children: 'children',
                hasChild: 'hasChild'
            }, this.alias);
        },
        _hasChild(){
            let children = this.item[this._alias['children']];  
            return !!this.item[this._alias['hasChild']] && Array.isArray(children) && children.length !== 0;
        },
        _level(){
            let level = {
                0: 'second',
                1: 'third',
            }[this.level]
            return level ? level : 'third';
        },
        _title(){
            return this.item[this._alias['title']];
        },
        _href(){
            return this.item[this._alias['href']];
        },
        _icon(){
            return this.item[this._alias['icon']];
        },
        _out(){
            return this.item[this._alias['out']];
        },
        _children(){
            return this.item[this._alias['children']];
        }
    },
    methods: {
        toggle(){
            this.active = !this.active;
            if(this.active && this.nav.isMini()) {
                this.nav.toggleMini();
            }

            if(!this._hasChild) {
                this.dashboard.wrapper.addWindow(this._title, this._href);
            }
        }
    },
    inject: ['nav', 'dashboard'],
    provide() {
        return {
            nav: this.nav
        }
    }
}
</script>

