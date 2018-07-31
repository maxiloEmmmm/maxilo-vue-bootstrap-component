<template>
    <mxl-form-componment-error-tip :validator="$validator" :baseTip="baseTip" ref="tip">
        <template slot="tips">
            <slot name="tips"></slot>
        </template>
        <mxl-input-status 
            :currentStatus="!$validator.flags[_random_name] || !$validator.flags[_random_name].validated 
                ? '' 
                : (errors.has(_random_name) ? 'error' : 'success')">
            <input 
                v-validate="rules" 
                :name="_random_name" 
                v-model="ds" 
                @input="$emit('input', ds)" 
                :type="type" 
                :disabled="disabled" 
                :class="coreClass" 
                @focus="$refs.tip.showTip()"
                @blur="$refs.tip.hideTip()"
                :hidden="type==='hidden'"/>
        </mxl-input-status>
    </mxl-form-componment-error-tip>
</template>

<script>
    import ruleMix from '../mixs/ruleMix.vue';

    export default {
        mixins: [ruleMix],
        name: 'input',
        data(){
            return {
                ds: ''
            }
        },
        props: {
            type: {
                default: 'text'
            },
            disabled: {
                default: false
            },
            value: {
                default: ''
            }
        },
        watch: {
            value() {
                this.ds = this.value;
            }
        },
        computed: {
            coreClass(){
                var domClass =['form-control'];
                return domClass;
            }
        },
        methods: {
            async reset(){
                this.ds = '';
                this.$emit('input', '');
                await this.$nextTick();
            }
        }
    };
</script>