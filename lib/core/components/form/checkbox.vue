<template>
    <mxl-form-componment-error-tip :baseTip="baseTip" v-validate:model="rules" :name="_random_name" :validator="$validator">
        <template slot="tips">
            <slot name="tips"></slot>
        </template>
        <mxl-container :groups="groups" ref="container" layoutModel="xs">
            <div :class="[radio ? 'radio' : 'checkbox']" v-for="c in count" :key="c">
                <mxl-render
                    :render="(h) => slotRender(h, c - 1)"
                >
                </mxl-render>
            </div>
        </mxl-container>
    </mxl-form-componment-error-tip>
</template>

<script>
import ruleMix from '../mixs/ruleMix.vue';

export default {
    mixins: [ruleMix],
    name: 'checkbox',
    data(){
        return {
            count: 0
        };
    },
    props: {
        label: {
            default: ''
        },
        groups: {
            default: 3
        },
        radio: {
            default: false
        },
        model: {
            default: ''
        }
    },
    watch: {
        groups(){
            this.getRs();
        }
    },
    mounted(){
        this.getRs();
    },
    methods: {
        getLabel(){
            return this.label;
        },
        slotRender(h, index){
            let s = this.$slots.default.filter(v => v.tag)[index];
            if(!s) {return '';}
            return h('label', {style: {overflow: 'hidden', textOverflow: 'ellipsis'}}, [...this.$utils.tool.slotDeepClone([s], h), s.data.attrs.label ? s.data.attrs.label : '']);
        },
        async getRs(){
            this.count = this.$slots.default.filter(v => v.tag).length;
            await this.$nextTick();
            this.$refs.container.render();
        },
        render(){
            this.getRs();
        }
    }
};
</script>

