<template>
    <div>
        <div v-for="(row, index) in rows" :key="index" class="row">
            <mxl-render
                v-for="(group, i) in groups"
                :key="i"
                :render="h => {return slotRender(h, index, i);}"
                v-if="groups*(row-1)+group <= slotNum"
            ></mxl-render>
        </div>
    </div>
</template>

<script>
export default {
    name: 'box',
    props: {
        groups: {
            default: 4
        }
    },
    data(){
        return {
            rows: 0,
            slotNum: 0
        };
    },
    async mounted(){
        this.render();
    },
    computed: {
        cols(){
            return Math.floor(12 / this.groups);
        }
    },
    methods: {
        slotRender(h, row, col){
            return h('div', {
                class: ['col-xs-' + this.cols]
            }, [...this.$utils.tool.slotDeepClone([this.$slots.default.filter(v => v.tag)[this.groups*row+col]], h)]);
        },
        async getRowLength(){
            await this.$nextTick();
            if(this.$slots.default) {
                this.rows = Math.ceil(this.$slots.default.filter(v => v.tag).length / this.groups);
            }
        },
        async getSlotNum(){
            await this.$nextTick();
            if(this.$slots.default) {
                this.slotNum = this.$slots.default.filter(v => v.tag).length;
            }
        },
        render(){
            this.getRowLength();
            this.getSlotNum();
        }
    }
}
</script>

