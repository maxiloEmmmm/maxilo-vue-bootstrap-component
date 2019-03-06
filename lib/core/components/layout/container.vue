<template>
    <div class="container-fluid"><!-- 栅格划分 -->
        <mxl-row v-for="r in rs" :key="r">
            <mxl-render
                v-for="i in groups" :key="i" v-if="((r-1)*groups + i - 1) < childrenLen"
                :render="(h) => slotRender(h, r, i, {layoutModel, size: limit})"
            >
            </mxl-render>
        </mxl-row>
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
            slotRender(h, r, i, c){
                return h('mxlCol', {
                    props: c
                }, [this.$utils.tool.getSlot(this.$slots.default, (r-1)*this.groups + i - 1, h)]);
            },
            getRs(){
                if(this.$slots.default) {
                    this.labels = this.$slots.default.filter(v => v.tag != undefined);
                    this.rs = Math.ceil(this.labels.length/this.groups);
                }
            },
            render(){
                this.getRs();
            }
        }
    };
</script>