<template>
    <div>
        <template v-for="(c, index) in _cols">
            <mxl-render
                :key="index"
                :render="(h) => slotRender(h, c, index)"
            >
            </mxl-render>
        </template>
    </div>
</template>

<script>
import col from './col';
export default {
    name: 'cols',
    data(){
        return {
            _cols: [{
                layoutModel: this.layoutModel,
                size: 12
            }]
        };
    },
    props: {
        cols: {
            type: String,
            default: '12'
        },
        layoutModel: {
            type: String,
            default: 'md'
        }
    },
    watch: {
        cols: {
            immediate: true,
            handler(){
                this.repairCol();
            }
        }
    },
    methods: {
        slotRender(h, c, i){
            if(this.$slots.default === undefined) {return ''}
            let s = this.$slots.default.filter(v => v.tag)[i];
            if(!s) {return '';}
            return h(col, {props: c}, [...this.$utils.tool.slotDeepClone([s], h)]);
        },
        repairCol(){
            let cols = this.cols.split('-');
            let _cols = [];
            let limit = 0;
            cols.forEach(v => {
                let tmp = v.split(',');
                tmp = tmp.length == 1 ? {
                    layoutModel: this.layoutModel,
                    size: parseInt(tmp[0])
                } : {
                    layoutModel: tmp[0],
                    size: parseInt(tmp[1])
                };
                if(limit + tmp.size > 12) {
                    if(12 - limit > 0) {
                        _cols.push({
                            layoutModel: tmp.layoutModel,
                            size: 12 - limit
                        });
                        limit = 12;
                    }
                }else {
                    limit += tmp.size;
                    _cols.push(tmp);
                }
            });
            this._cols = _cols;
        }
    }
}
</script>

