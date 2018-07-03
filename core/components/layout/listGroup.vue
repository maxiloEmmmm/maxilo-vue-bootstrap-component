<template>
    <ul class="list-group">
        <mxl-render
            v-for="i in itemLen"
            :key="i"
            :render="h => {return slotRender(h, i-1);}"
        ></mxl-render>
    </ul>
</template>

<script>
export default {
    name: 'listGroup',
    data(){
        return {
            itemLen: 0
        };
    },
    mounted(){
        this.render();
    },
    methods: {
        slotRender(h, index){
            if(this.$slots.default === undefined) {return ''}
            let s = this.$slots.default.filter(v => v.tag)[index];
            if(!s) {return ;}
            return h('li', {
                class: ['list-group-item']
            }, [...this.$utils.tool.slotDeepClone([s], h)]);
        },
        render(){
            this.getItemLen();
        },
        getItemLen(){
            if(this.$slots.default === undefined) {return ''}
            this.itemLen = this.$slots.default.filter(v => v.tag).length;
        }
    }
};
</script>