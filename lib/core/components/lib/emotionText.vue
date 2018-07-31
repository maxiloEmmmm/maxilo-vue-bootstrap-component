<template>
    <span :class="['label', 'label-' + type]"><slot></slot></span>
</template>

<script>
export default {
    name: 'emotionText',
    props: {
        type: {
            type: String,
            default: 'info'
        }
    }
};
</script>

