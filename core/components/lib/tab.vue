<template>
    <div>
        <ul :class="['nav', 'nav-tabs', _card]" role="tablist">
            <li 
                v-for="(nav, index) in navs"
                :key="index"
                style="cursor:pointer"
                class="nav-item">
                <a 
                    :class="['nav-link', index === active ? 'active' : '']"
                    @click="touchNav(nav, index)">
                    {{ nav.label ? nav.label : nav }}
                </a>
            </li>
            <li style="position: absolute;right: 0.5rem;">
                <mxl-btn @click="toggle">{{ paneShow ? openText : closeText}}</mxl-btn>
                <slot name="nav-right" :instance="_self"></slot>
            </li>
        </ul>
        <div class="tab-content" v-show="paneShow">
            <mxl-render
                v-for="i in slotLength" :key="i"
                :render="(h) => slotRender(h, i-1)"
            >
            </mxl-render>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tab',
    data(){
        return {
            active: 0,
            paneShow: true
        }
    },
    props: {
        navs: {
            default(){
                return [];
            },
            type: Array
        },
        cardHeader: {
            default: '',
            type: String
        },
        openText: {
            default: '收起来',
            type: String
        },
        closeText: {
            default: '让我看看',
            type: String
        }
    },
    computed: {
        currentPane(){
            let i = 0;
            if(this.navs[this.active] && this.navs[this.active].pane !== undefined) {
                let tmp = this.navs.findIndex(v => (v.label ? v.label : v) == this.navs[this.active].pane);
                i = tmp == -1 ? 0 : tmp;
            }else {
                i = this.active + 1 > this.slotLength ? 0 : this.active;
            }
            return i;
        },
        slotLength(){
            return this.$slots.default ? this.$slots.default.filter(v => v.tag).length : 0;
        },
        _card(){
            return this.cardHeader ? 'card-header-' + this.cardHeader : '';
        }
    },
    methods: {
        touchNav(item, index){
            this.active = index;
        },
        slotRender(h, i){
            return h('div', {
                class: ['tab-pane', 'fade', 'show', this.currentPane == i ? 'active' : '']
            }, [this.$utils.tool.getSlot(this.$slots.default, i, h)]);
        },
        toggle(){
            this.paneShow = !this.paneShow;
        }
    }
}
</script>

