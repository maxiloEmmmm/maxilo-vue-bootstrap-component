<template>
    <div id="wrapper">
        <mxl-loading v-model="loading"></mxl-loading>
        <template v-if="!loading">
            <!--左侧导航开始-->
            <item-nav :items="items" ref="nav" :miniLogoText="miniLogoText"></item-nav>
            <!--左侧导航结束-->
            <!--右侧部分开始-->
            <item-wrapper ref="wrapper">
                <template slot="header_right_bar">
                    <slot name="header_right"></slot>
                </template>
                <template slot="footer_right_text">
                    <slot name="footer_right"></slot>
                </template>
                <template slot="tab_right_block">
                    <slot name="tab_right"></slot>
                </template>
            </item-wrapper>
            <!--右侧部分结束-->
            <!--右侧边栏开始-->
            <item-right-sidebar ref="sidebar"></item-right-sidebar>
        </template>
    </div>
</template>

<script>
import nav from './dashboard_nav';
import wrapper from './dashboard_wrapper';
import rightSidebar from './dashboard_right_sidebar';
export default {
    data(){
        return {
            loading: true,
        }
    },
    components: {
        itemNav: nav,
        itemWrapper: wrapper,
        itemRightSidebar: rightSidebar
    },
    async created(){
        await import('../../../asset/sass/hplus_base.css');
        document.body.classList.add('fixed-sidebar', 'full-height-layout', 'gray-bg');
        document.body.style.overflow = 'hidden';
        document.getElementById('app').style.height = '100%';
        this.loading = false;
    },
    mounted () {
        window.topDashboard = this;
        this.listen();
    },
    methods: {
        listen(){
            /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) && (document.getElementById('content-main').style["overflow-y"] = "auto");
            window.addEventListener("load", this.eventListen);
            window.addEventListener("resize", this.eventListen);
        },
        eventListen(){
            if(document.body.clientWidth < 769) {
                document.body.classList.add('mini-navbar');
            }
        }
    },
    props: {
        items: {
            default(){
                return [];
            },
            type: Array
        },
        miniLogoText: {
            default: 'Power by maxilo.'
        }
    },
    provide() {
        return {
            dashboard: this.$refs
        }
    }
}
</script>

