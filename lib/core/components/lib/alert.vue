<template>
    <div :class="['alert', 'alert-' + type]" role="alert"><slot></slot></div>
</template>

<script>
export default {
    name: 'alert',
    props: {
        type: {
            default: 'info'
        }
    }
};
</script>