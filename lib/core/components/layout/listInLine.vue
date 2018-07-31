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
                if(this.$slots.default === undefined) {return ''}
                let s = this.$slots.default.filter(v => v.tag)[i];
                if(!s) {return '';}
                return h('li', {style: {marginBottom: '5px'}}, [...this.$utils.tool.slotDeepClone([s], h)]);
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