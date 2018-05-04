<script>
export default {
    props: {
        value: {
            default: ''
        }
    },
    methods: {
        change(v){
            this.$emit('input', v);
        },
        setData(){
            alert('请重写富文本编辑器填充数据函数.');
        },
        async reset(){
            this.content = '';
            this.change('');
            await this.$nextTick();
        }
    },
    data(){
        return {
            content: ''
        };
    },
    watch: {
        value: {
            handler(){
                this.content = this.value;
                this.setData(this.value);
            },
            immediate: true
        }
    }
};
</script>
