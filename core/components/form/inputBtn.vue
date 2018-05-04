<template>
    <mxl-input-group>
        <span class="input-group-btn" v-show="$slots.left"><slot name="left"></slot></span>
        <slot></slot>
        <span class="input-group-btn" v-show="$slots.right"><slot name="right"></slot></span>
    </mxl-input-group>
</template>

<script>
export default {
    name: 'inputBtn'
};
</script>

