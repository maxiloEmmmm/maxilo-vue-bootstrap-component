<template>
    <nav class="navbar-default navbar-static-side" role="navigation" :style="{display: 'block', overflowY: show.sidebar ? 'scroll' : '', transition: 'all .5s'}">
        <div class="nav-close" @click="toggleMini"><i class="fa fa-times-circle"></i>
        </div>
        <div class="sidebar-collapse" style="overflow: hidden">
            <ul class="nav" id="side-menu">
                <li class="nav-header">
                    <div class="dropdown profile-element" :class="show.headerMenu ? 'show' : ''">
                        <span v-if="_hasAvatar"><img alt="image" class="img-circle" :src="_avatar" style="width:64px;height:64px;"/></span>
                        <a class="dropdown-toggle" href="#">
                            <span class="clear">
                            <span class="block m-t-xs"><strong class="font-bold">{{nick_name}}</strong></span>
                            <span class="text-muted text-xs block" @click="toggleMenu">{{role_name}} <b class="fa fa-sort-desc align-middle" aria-hidden="true" v-if="_hasMenu"></b></span>
                            </span>
                        </a>
                        <div class="dropdown-menu animated fadeInRight m-t-xs" :class="show.headerMenu ? 'show' : ''">
                            <a class="dropdown-item" v-for="(item, index) in nav_header_menu" :key="index" @click="doMenu(item)">{{ index }}</a>
                        </div>
                    </div>
                    <div class="logo-element">{{ miniLogoText }}
                    </div>
                </li>
                <mxl-dashboard-nav-item :alias="itemAlias" :item="item" v-for="(item, index) in items" :key="index"></mxl-dashboard-nav-item>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    data(){
        return {
            show: {
                headerMenu: false,
                sidebar: true
            }
        }
    },
    props: {
        avatar: {
            default: false
        },
        role_name: {
            default: ''
        },
        nick_name: {
            default: ''
        },
        nav_header_menu: {
            default(){
                return {};
            },
            type: Object
        },
        items: {
            default(){
                return [];
            },
            type: Array
        },
        itemAlias: {
            default(){
                return {}
            },
            type: Object
        },
        miniLogoText: {
            default: ''
        }
    },
    computed: {
        _avatar(){
            return this.avatar ? this.avatar : '';
        },
        _hasAvatar(){
            return !!this._avatar;
        },
        _hasMenu(){
            return Object.keys(this.nav_header_menu).length !== 0;
        }
    },
    methods: {
        doMenu(item){
            item(this);
            this.toggleMenu();
        },
        isMini(){
            return document.body.classList.contains('mini-navbar');
        },
        toggleMini(){
            if(this.isMini()) {
                document.body.classList.remove('mini-navbar');
                this.$set(this.show, 'sidebar', false);
                setTimeout(() => this.$set(this.show, 'sidebar', true), 500);
                document.getElementById('side-menu').removeAttribute("style");
            }else {
                this.$set(this.show, 'sidebar', false);
                setTimeout(() => document.body.classList.add('mini-navbar'), 500);
            }
        },
        toggleMenu(){
            this.$set(this.show, 'headerMenu', !this.show.headerMenu);
        }
    },
    provide() {
        return {
            nav: this
        }
    }
}
</script>

<style>
    #side-menu li{
        width: 100%;
    }

    .dropdown-toggle::after {
        display: none;
    }
</style>


