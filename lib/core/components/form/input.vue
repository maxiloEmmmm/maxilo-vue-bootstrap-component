<template>
    <mxl-form-componment-error-tip :validator="$validator" :baseTip="baseTip" ref="tip">
        <template slot="tips">
            <slot name="tips"></slot>
        </template>
        <input 
            v-validate="rules" 
            :name="_random_name" 
            v-model="ds" 
            @input="$emit('input', ds)" 
            :type="type" 
            :disabled="disabled" 
            :class="coreClass" 
            :placeholder="placeholder"
            :readonly="readonly"
            @focus="() => {$refs.tip.showTip();$emit('focus')}"
            @blur="() => {$refs.tip.hideTip();$emit('blur')}"
            :hidden="type==='hidden'"/>
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
            readonly: {
                default: false
            },
            static: {
                default: false
            },
            value: {
                default: ''
            },
            placeholder: {

            }
        },
        watch: {
            value: {
                handler() {
                    this.ds = this.value;
                },
                immediate: true
            }
        },
        computed: {
            coreClass(){
                let currentStatus = !this.$validator.flags[this._random_name] || !this.$validator.flags[this._random_name].validated 
                ? '' 
                : (this.errors.has(this._random_name) ? 'is-invalid' : 'is-valid');
                let domClass =[currentStatus, this.static ? 'form-control-plaintext' : 'form-control'];
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