<script>
export default {
    name: 'render',
    functional: true,
    props: {
        render: Function,
        data: {
        	default(){
                return {};
            }
        }
    },
    render: (h, ctx) => {
        return ctx.props.render(h, ctx.props.data, ctx);
    }
};
</script>