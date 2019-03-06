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
            try {
                this.instance = await this.relation.create(this.$refs.core);
                this.setDisabled();
                this.repairHeight();
            } catch (error) {
                console.log(error);
            }
            
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
            this.instance.getData() !== v && this.instance.setData(v);
        },
        setDisabled(){
            if(this.instance) {
                this.instance.isReadOnly = this.disabled;
            }
        },
        async _reset(){
            this.setData('');
            this.change('');
            await this.$nextTick();
        },
        repairHeight(){
            if(this.height !== false) {
                this.instance.ui.view.editable.editableElement.style.height = this.height
            }
        }
    },
    async mounted(){
        await this.init();
    },
    watch: {
        height: {
            handler(){
                if(this.instance) {
                    this.repairHeight();
                }
            },
            immediate: true
        }
    }
}
</script>
