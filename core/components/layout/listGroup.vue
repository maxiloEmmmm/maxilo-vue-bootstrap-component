<template>
    <ul :class="['list-group', card ? 'list-group-flush' : '']">
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
    props: {
        align: {
            type: String,
            default: 'left'
        },
        card: {
            default: false,
            type: Boolean
        }
    },
    mounted(){
        this.render();
    },
    methods: {
        slotRender(h, index){
            return h('li', {
                class: ['list-group-item'],
                style: {
                    textAlign: this.align
                }
            }, [this.$utils.tool.getSlot(this.$slots.default, index, h)]);
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