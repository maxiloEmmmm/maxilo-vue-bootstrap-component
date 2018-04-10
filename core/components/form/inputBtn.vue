<template>
    <div class="input-group">
        <span class="input-group-addon" v-show="$slots.left"><slot name="left"></slot></span>
        <slot></slot>
        <span class="input-group-addon" v-show="$slots.right"><slot name="right"></slot></span>
    </div>
</template>

<script>
export default {
    name: 'inputBtn'
};
</script>

