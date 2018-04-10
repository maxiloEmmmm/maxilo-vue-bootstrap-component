<template>
    <button type="button" :class="['btn', 'btn-' + type, _size]">
        <i v-if="icon" :class="icon"></i><slot></slot>
    </button>
</template>

<script>
export default {
    name: 'btn',
    computed: {
        _size(){
            return {
                xs: 'btn-group-xs',
                md: '',
                lg: 'btn-group-lg',
                sm: 'btn-group-sm',
            }[this.size];
        }
    },
    props: {
        icon: {
            default: ''
        },
        size: {
            default: 'md'
        },
        type: {
            default: 'default'
        }
    }
};
</script>
