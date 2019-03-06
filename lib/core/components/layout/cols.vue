<script>
export default {
    name: 'cols',
    data(){
        return {
            _cols: [{
                layoutModel: this.layoutModel,
                size: 12
            }]
        };
    },
    props: {
        cols: {
            type: String,
            default: '12'
        },
        layoutModel: {
            type: String,
            default: 'md'
        },
        limit: {
            type: Boolean,
            default: true
        },
    },
    functional: true,
    render(h, instance) {
        let cols = instance.props.cols.split('-');
        let _cols = [];
        let limit = 0;
        cols.forEach(v => {
            let tmp = v.split(',');
            tmp = tmp.length == 1 ? {
                layoutModel: instance.props.layoutModel,
                size: parseInt(tmp[0])
            } : {
                layoutModel: tmp[0],
                size: parseInt(tmp[1])
            };
            if(instance.props.limit && limit + tmp.size > 12) {
                if(12 - limit > 0) {
                    _cols.push({
                        layoutModel: tmp.layoutModel,
                        size: 12 - limit
                    });
                    limit = 12;
                }
            }else {
                limit += tmp.size;
                _cols.push(tmp);
            }
        });
        return _cols.map((val, k) => h('mxlCol', {
            props: val
        }, [instance.parent.$utils.tool.getSlot(instance.children, k, h)]));
    }
}
</script>

