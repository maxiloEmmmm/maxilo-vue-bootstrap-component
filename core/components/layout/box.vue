<template>
    <div style="display: table;max-width:100%;width:100%;">
        <div v-for="(row, index) in rows" :key="index" :style="[{display: 'table-row'}]">
            <mxl-render
                v-for="(group, i) in groups"
                :key="i"
                :render="h => {return slotRender(h, index, i);}"
                v-if="groups*(row-1)+group <= slotNum"
            ></mxl-render>
        </div>
    </div>
</template>

<script>
export default {
    name: 'box',
    props: {
        groups: {
            default: 4
        }
    },
    data(){
        return {
            rows: 0,
            slotNum: 0
        };
    },
    async mounted(){
        this.render();
    },
    computed: {
        percent(){
            return Math.floor(100/this.groups) + '%';
        }
    },
    methods: {
        slotRender(h, row, col){
            return h('div', {
                style: {
                    display: 'table-cell',
                    width: this.percent,
                    maxWidth: this.percent,
                    verticalAlign: 'middle'
                },
                class: ['mxl-box-rules']
            }, [...this.$utils.tool.slotDeepClone([this.$slots.default.filter(v => v.tag)[this.groups*row+col]], h)]);
        },
        async getRowLength(){
            await this.$nextTick();
            if(this.$slots.default) {
                this.rows = Math.ceil(this.$slots.default.filter(v => v.tag).length / this.groups);
            }
        },
        async getSlotNum(){
            await this.$nextTick();
            if(this.$slots.default) {
                this.slotNum = this.$slots.default.filter(v => v.tag).length;
            }
        },
        render(){
            this.getRowLength();
            this.getSlotNum();
        }
    }
}
</script>

<style>
    .mxl-box-rules > * {
        width: 100%;
        max-width:100%;
        word-break: break-all;
    }
</style>


