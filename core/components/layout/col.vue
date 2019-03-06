<template>
    <div :class="_class"><slot></slot></div>
</template>

<script>
export default {
    name: 'col',
    props: {
        layoutModel: {
            default: 'md',
            type: String
        },
        size: {
            default: 12,
            type: Number
        }
    },
    computed: {
        _class(){
            let layout = ['sm', 'md', 'lg', 'xl'].includes(this.layoutModel) ? `-${this.layoutModel}` : ''
            return `col${layout}-${this.size}`;
        }
    }
}
</script>

