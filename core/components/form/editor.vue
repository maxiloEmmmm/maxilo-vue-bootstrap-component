<template>
    <component :is="model" v-model="content" ref="editorInstance" @input="doInput"></component>
</template>

<script>
import normalModel from './editor/normal.vue';
import proModel from './editor/pro.vue';
import commonMix from './editor/prop.vue';

export default {
    mixins: [commonMix],
    name: 'editor',
    data(){
        return {
        };
    },
    computed: {
        model(){
            let {broswer} = this.$utils.tool.getBroswer();
            return (broswer == '' || broswer == 'IE') ? 'normalModel' : 'proModel';
        }
    },
    watch: {
        content(){
            this.change(this.content);
        }
    },
    methods: {
        async setData(v){
            await this.$nextTick();
            this.$refs.editorInstance.setData(v);
        },
        doInput(){
            this.change(this.content);
        }
    },
    components: {
        normalModel,
        proModel
    }
}
</script>
