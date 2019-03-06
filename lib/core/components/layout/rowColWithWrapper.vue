<template>
    <div :class="'container'+ (fluid ? '-fluid' : '')">
        <mxl-row-col :size="size" :layoutModel="layoutModel"><slot></slot></mxl-row-col>
    </div>   
</template>

<script>
    export default {
        name: 'rowColWithWrapper',
        props: {
            fluid: {
                default: true
            },
            size: {
                type: Number,
                default: 12
            },
            layoutModel: {
                type: String,
                default: 'md'
            }
        }
    }
</script>