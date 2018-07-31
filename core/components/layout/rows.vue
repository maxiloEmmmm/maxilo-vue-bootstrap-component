<template>
    <div>
        <template v-for="(r, index) in rows">
            <mxl-render
                :key="index"
                :render="(h) => slotRender(h, index)"
            >
            </mxl-render>
        </template>
    </div>
</template>

<script>
import row from './row';
export default {
    name: 'rows',
    props: {
        rows: {
            type: Number,
            default: 1
        }
    },
    methods: {
        slotRender(h, i){
            if(this.$slots.default === undefined) {return ''}
            let s = this.$slots.default.filter(v => v.tag)[i];
            if(!s) {return '';}
            return h(row, [...this.$utils.tool.slotDeepClone([s], h)]);
        }
    }
}
</script>

