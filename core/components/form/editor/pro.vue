<template>
    <div ref="core"></div>
</template>


<script>
import commonMix from './prop.vue';
export default {
    mixins: [commonMix],
    data(){
        return {
            relation: null,
            instance: null
        };
    },
    methods: {
        async getRelation(){
            this.relation = await this.$store.dispatch('maxilo-bootstrap-component/getRelation', 'editor');
        },
        async init(){
            await this.getRelation();
            this.instance = await this.relation.create(this.$refs.core);

            this.setData(this.value);

            /* event */
            this.instance.model.document.on('change', () => {
                this.content = this.instance.getData();
                this.change(this.content);
            });
        },
        setData(v){
            if(!this.instance) {
                return ;
            }
            this.instance.setData(v);
        }
    },
    async mounted(){
        await this.init();
    }
}
</script>
