<template>
    <nav class="navbar-default navbar-static-side" role="navigation" :style="{display: 'block', overflowY: 'scroll'}">
        <div class="nav-close" @click="toggleMini"><i class="fa fa-times-circle"></i>
        </div>
        <div class="sidebar-collapse" style="overflow: hidden">
            <ul class="nav" id="side-menu">
                <li class="nav-header">
                    <div class="dropdown profile-element">
                        <span><img alt="image" class="img-circle" :src="_avatar" style="width:64px;height:64px;"/></span>
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <span class="clear">
                            <span class="block m-t-xs"><strong class="font-bold">{{nick_name}}</strong></span>
                            <span class="text-muted text-xs block">{{role_name}}<b class="caret" v-if="_hasMenu"></b></span>
                            </span>
                        </a>
                        <ul class="dropdown-menu animated fadeInRight m-t-xs">
                            <li v-for="(item, index) in nav_header_menu" :key="index" @click="doMenu(item)">{{ index }}</li>
                        </ul>
                    </div>
                    <div class="logo-element">{{ miniLogoText }}
                    </div>
                </li>
                <mxl-dashboard-nav-item :item="item" v-for="(item, index) in items" :key="index"></mxl-dashboard-nav-item>
            </ul>
        </div>
    </nav>
</template>

<script>
//import default avatar
import dashboardDefault from '../../../asset/images/component_dashboard_default.png';
export default {
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
                return [];
            },
            type: Array
        },
        items: {
            default(){
                return [];
            },
            type: Array
        },
        miniLogoText: {
            default: ''
        }
    },
    computed: {
        _avatar(){
            return this.avatar ? this.avatar : dashboardDefault;
        },
        _hasMenu(){
            return this.nav_header_menu.length !== 0;
        }
    },
    methods: {
        doMenu(item){
            item(this);
        },
        isMini(){
            return document.body.classList.contains('mini-navbar');
        },
        toggleMini(){
            if(this.isMini()) {
                document.body.classList.remove('mini-navbar');
                document.getElementById('side-menu').removeAttribute("style");
            }else {
                document.body.classList.add('mini-navbar');
            }
        }
    },
    provide() {
        return {
            nav: this
        }
    }
}
</script>

