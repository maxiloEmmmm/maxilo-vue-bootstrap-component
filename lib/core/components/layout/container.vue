<template>
    <div class="container-fluid"><!-- 栅格划分 -->
        <div class="row" v-for="r in rs" :key="r">
            <div :class="['col-'+ layoutModel +'-' + limit]" v-for="i in groups" :key="i" v-if="((r-1)*groups + i - 1) < childrenLen">
                <mxl-render
                    :render="(h) => slotRender(h, r, i)"
                >
                </mxl-render>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'container',
        data() {
            return {
                rs: 0,
                gs: [],
                labels: 0
            };
        },
        props: {
            groups: {
                default: 1
            },
            layoutModel: {
                default: 'md'
            }
        },
        mounted(){
            this.getRs();
        },
        computed: {
            limit(){
                return Math.floor(12/this.groups);
            },
            childrenLen(){
                return this.labels.length;
            }
        },
        methods: {
            slotRender(h, r, i){
                if(this.$slots.default === undefined) {return ''}
                let s = this.$slots.default.filter(v => v.tag)[(r-1)*this.groups + i - 1];
                if(!s) {return '';}
                return h('div', [...this.$utils.tool.slotDeepClone([s], h)]);
            },
            getRs(){
                if(this.$slots.default) {
                    this.labels = this.$slots.default.filter(v => v.tag != undefined);
                    this.rs = Math.ceil(this.childrenLen/this.groups);
                }
            },
            render(){
                this.getRs();
            }
        }
    };
</script>