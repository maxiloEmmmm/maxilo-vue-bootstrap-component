<template>
    <mxl-row>
        <mxl-col :size="size" :layoutModel="layoutModel">
            <slot></slot>
        </mxl-col>
    </mxl-row>
</template>

<script>
export default {
    name: 'rowCol',
    props: {
        size: {
            type: Number,
            default: 12
        },
        layoutModel: {
            type: String,
            default: 'md'
        }
    },
    render(){
        this.$forceUpdate();
    }
}
</script>

