<template>
    <div id="page-wrapper" class="gray-bg dashbard-1">
        <div class="row border-bottom" style="height:60px !important;">
            <div class="navbar-header">
                <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#" @click="toggleNav"><i class="fa fa-bars"></i> </a>
            </div>
            <ul class="nav navbar-top-links navbar-right">
                <slot name="header_right_bar"></slot>
            </ul>
        </div>
        <div class="row content-tabs">
            <button class="roll-nav roll-left J_tabLeft"><i class="fa fa-backward"></i>
            </button>
            <nav class="page-tabs J_menuTabs">
                <div class="page-tabs-content">
                    <a 
                        @click="change(index)" 
                        href="javascript:;" 
                        :class="['J_menuTab', 
                        currentWindow === index ? 'active' : '']" 
                        v-for="(window, index) in windows" 
                        :key="index">
                            {{ window }}
                            <i class="fa fa-times-circle" @click="remove(index)"></i>
                    </a>
                </div>
            </nav>
            <button class="roll-nav roll-right J_tabRight"><i class="fa fa-forward"></i>
            </button>
            <mxl-drop-menu 
                class="btn-group roll-nav roll-right" 
                :menus="[
                    {text: '刷新', fn: refreshWindow},
                    {text: '关闭全部选项卡', fn: closeAll}, 
                    {text: '关闭其他选项卡', fn: closeOther}
                ]">
                操作
            </mxl-drop-menu>
            <a href="javascript:;" class="roll-nav roll-right J_tabExit"><slot name="tab_right_block"></slot></a>
        </div>
        <div class="row J_mainContent" id="content-main">
            <iframe v-for="(window, index) in windows" :name="'w'+index" :key="index" class="J_iframe" width="100%" height="100%" :src="index" frameborder="0" seamless :style="{display: currentWindow === index ? 'inline' : 'none'}"></iframe>
        </div>
        <div class="footer">
            <div class="pull-right"><slot name="footer_right_text"></slot>
            </div>
        </div>
    </div>
</template>

<style>
/* todo wait del action ok. */
    .roll-right.J_tabRight {
        right: 60px !important;
    }

    .mxlHoverHidden {
        visibility: hidden;
    }
</style>


<script>
export default {
    data(){
        return {
            windows: {},
            currentWindow: '',
            closeOpear: false,
            hiddenTabSpan: []
        };
    },
    props: {
        initPage: {
            default(){
                return [];
            },
            type: Array
        }
    },
    created () {
        this.initPage.map((v, i) => {
            if(i === 0) {this.currentWindow = v.href;}
            this.$set(this.windows, v.href, v.title);
        });
    },
    inject: ['dashboard'],
    methods: {
        toggleNav(){
            this.dashboard.nav.toggleMini();
        },
        addWindow(title, href){
            if(!this.windows[href]) {
                this.$set(this.windows, href, title);
            }
            this.currentWindow = href;
        },
        async remove(href){
            if(this.windows[href] !== undefined) {
                /* 查询删除索引 */
                let removeIndex = Object.keys(this.windows).findIndex(v => v === href);
                /* 删除 */
                this.$delete(this.windows, href);
                await this.$nextTick();

                let windowKeys = Object.keys(this.windows);
                this.currentWindow = windowKeys[windowKeys.length === removeIndex ? removeIndex - 1 : removeIndex];
            }
        },
        change(href){
            this.currentWindow = href;
        },
        closeAll(){
            this.currentWindow = '';
            this.windows = {};
            this.closeOpear = false;
        },
        closeOther(){
            this.windows = this.$utils._.pick(this.windows, this.currentWindow);
            this.closeOpear = false;
        },
        refreshWindow(){
            if(!this.currentWindow) {
                return ;
            }
            document.all['w'+this.currentWindow].contentWindow.document.location.reload();
        }
    }
}
</script>

