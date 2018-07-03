<template>
    <mxl-form-componment-error-tip :baseTip="baseTip" v-validate:ds="rules" :name="_random_name" :validator="$validator">
        <template slot="tips">
            <slot name="tips"></slot>
        </template>
        <div class="form-control" :id="tag"></div>
    </mxl-form-componment-error-tip>
</template>

<script>
import ruleMix from '../mixs/ruleMix.vue';

export default {
    mixins: [ruleMix],
    name: 'date',
    data(){
        return {
            tag: this.$utils.tool.random('date'),
            instance: '',
            ds: ''
        };
    },
    props: {
        range: {
            default: false
        },
        format: {
            default: 'yyyy-MM-dd'
        },
        value: {
            default: ''
        },
        type: {
            default: 'date'
        }
    },
    async mounted(){
        window.laydate = await import('layui-laydate');
        await import('layui-laydate/src/theme/default/laydate.css');
        this.render();
    },
    watch: {
        value(){
            this.render();
        }
    },
    methods: {
        render(){
            this.instance = laydate.render({
                elem: '#' + this.tag,
                type: this.type,
                range: this.range,
                format: this.format,
                value: this.value,
                done: (value, date, endDate) => {
                    this.touch(value, date, endDate);
                }
            });
        },
        touch(val, dateObject, endDataObject){
            this.ds = val;
            this.$emit('input', val);
            this.$emit('touch', val, dateObject, endDataObject);
        },
        async reset() {
            this.ds = '';
            this.$emit('input', '');
            await this.$nextTick();
        }
    }
}
</script>

