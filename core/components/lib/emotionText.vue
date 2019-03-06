<template>
    <span @click="$emit('click')" :class="['badge', 'badge-' + type]"><slot></slot></span>
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

