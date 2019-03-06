<template>
    <mxl-form-componment-error-tip :baseTip="baseTip" :validator="$validator">
        <template slot="tips">
            <slot name="tips"></slot>
        </template>
        <component :is="model" v-validate:model="rules" :name="_random_name" v-model="content" ref="editorInstance" @input="doInput" :height="height" :disabled="disabled"></component>
    </mxl-form-componment-error-tip>
</template>

<script>
import normalModel from './editor/normal.vue';
import proModel from './editor/pro.vue';
import commonMix from './editor/prop.vue';
import ruleMix from '../mixs/ruleMix.vue';
export default {
    mixins: [commonMix, ruleMix],
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
        },
        async reset(){
            await this._reset();
            await this.$nextTick();
        },
        async setDisabled(){
            await this.$nextTick();
            this.$refs.editorInstance.setDisabled();
        }
    },
    components: {
        normalModel,
        proModel
    }
}
</script>
