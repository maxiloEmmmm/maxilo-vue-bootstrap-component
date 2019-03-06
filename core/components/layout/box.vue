<template>
    <div style="max-width:100%;width:100%;">
        <div v-for="(row, index) in Math.ceil(($slots.default 
                ? $slots.default.filter(v => v.tag).length
                : 0) / _groups)" :key="index" :style="[{display: 'flex', flexWrap: 'wrap', width: '100%'}]">
            <mxl-render
                v-for="(group, i) in _groups"
                :key="i"
                :render="h => {return slotRender(h, index, i);}"
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
    computed: {
        percent(){
            return Math.floor(100/this._groups)+ '%';
        },
        _groups(){
            return this.groups ? this.groups : 4;
        }
    },
    methods: {
        slotRender(h, row, col){
            return h('div', {
                style: {
                    flex: `0 0 ${this.percent}`,
                    maxWidth: this.percent,
                },
                class: ['mxl-box-rules']
            }, [this.$utils.tool.getSlot(this.$slots.default, this._groups*row+col, h)]);
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


