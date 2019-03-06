<template>
    <div class="list-inline">
        <mxl-render
            :render="(h) => slotRender(h, index)"
            v-for="(item, index) in childrenLen"
            :key="index"
        >
        </mxl-render>
    </div>
</template>

<script>
    export default {
        name: 'listInLine',
        data() {
            return {
                labels: 0
            };
        },
        mounted(){
            this.getRs();
        },
        computed: {
            childrenLen(){
                return this.labels.length;
            }
        },
        methods: {
            slotRender(h, i){
                return h('a', {class: 'list-inline-item', style: {marginBottom: '5px'}}, [this.$utils.tool.getSlot(this.$slots.default, i, h)]);
            },
            getRs(){
                if(this.$slots.default) {
                    this.labels = this.$slots.default.filter(v => v.tag != undefined);
                }
            },
            render(){
                this.getRs();
            }
        }
    };
</script>