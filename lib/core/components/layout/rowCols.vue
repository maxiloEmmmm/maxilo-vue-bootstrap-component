<template>
    <mxl-row>
        <mxl-cols :cols="cols" :layoutModel="layoutModel">
            <slot></slot>
        </mxl-cols>
    </mxl-row>
</template>

<script>
export default {
    name: 'rowCols',
    props: {
        cols: {
            type: String,
            default: '12'
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

