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
            return `col-${this.layoutModel}-${this.size}`;
        }
    }
}
</script>

