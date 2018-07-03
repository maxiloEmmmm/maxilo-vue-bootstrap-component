<template>
<form class="form-horizontal"><!-- 浮动表单 -->
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
</form>
</template>

<script>
    export default {
        name: 'formContainer',
        data() {
            return {
                rs: 0,
                gs: [],
                labels: []
            };
        },
        props: {
            groups: {
                default: 1
            },
            layoutModel: {
                default: 'md'
            },
            layout: {
                default: '3-9'
            }
        },
        mounted(){
            this.getRs();
        },
        computed: {
            limit(){
                return 12/this.groups;
            },
            childrenLen(){
                return this.labels.length;
            }
        },
        methods: {
            slotRender(h, r, i){
                if(this.$slots.default === undefined) {return ''}
                let s = this.$slots.default.filter(v => v.tag != undefined)[(r-1)*this.groups + i - 1];
                if(!s) {return '';}
                return h('mxlFormGroup', {
                    props: {
                        layout: this.layout,
                        label: this.labels[(r-1)*this.groups + i - 1]
                    }
                }, [...this.$utils.tool.slotDeepClone([s], h)]);
            },
            getRs(){
                if(this.$slots.default === undefined) {return ''}
                this.labels = this.$slots.default.filter(v => v.tag != undefined).map(v => v.componentOptions && v.componentOptions.children ? v.componentOptions.children[0].text : '');
                this.rs = Math.ceil(this.childrenLen/this.groups);
            },
            render(){
                this.getRs();
            }
        }
    };
</script>