<script>
export default {
    props: {
        rules: {
            default: ''
        },
        baseTip: {
            default: true
        }
    },
    computed: {
        _random_name(){
            return this.$utils.tool.random('rule_name_');
        } 
    }
};
</script>
