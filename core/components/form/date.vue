<template>
    <div class="form-control" :id="tag"></div>
</template>

<script>
export default {
    name: 'date',
    data(){
        return {
            tag: this.$utils.tool.random('date'),
            instance: ''
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
            this.$emit('input', val);
            this.$emit('touch', val, dateObject, endDataObject);
        }
    }
}
</script>

