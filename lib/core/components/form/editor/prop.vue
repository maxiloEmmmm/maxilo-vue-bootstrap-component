<script>
export default {
    props: {
        value: {
            default: ''
        },
        height: {
            default: false
        },
        disabled: {
            default: false
        }
    },
    methods: {
        change(v){
            this.$emit('input', v);
        },
        setData(){
            alert('请重写富文本编辑器填充数据函数.');
        },
        setDisabled(){
            alert('请重写富文本编辑器禁用函数.');
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
        },
        disabled: {
            handler(){
                this.setDisabled();
            }
        }
    }
};
</script>
