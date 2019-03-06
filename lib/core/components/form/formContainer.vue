<template>
<form class="form-horizontal"><!-- 浮动表单 -->
    <div class="container-fluid"><!-- 栅格划分 -->
        <div class="row" v-for="r in Math.ceil(($slots.default 
                ? $slots.default.filter(v => v.tag).length
                : 0) / groups)" :key="r">
            <div :class="['col-'+ layoutModel +'-' + limit]" v-for="i in groups" :key="i">
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
        computed: {
            limit(){
                return 12/this.groups;
            }
        },
        methods: {
            slotRender(h, r, i){
                let index = (r-1)*this.groups + i - 1;
                return h('mxlFormGroup', {
                    props: {
                        layout: this.layout,
                        reLabel: this.$slots.default.filter(v => v.tag != undefined).map(v => v.componentOptions && v.componentOptions.children ? v.componentOptions.children[0].text : '')[index]
                    }
                }, [this.$utils.tool.getSlot(this.$slots.default, index, h)]);
            },
            render(){
            }
        }
    };
</script>