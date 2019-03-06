<template>
    <button type="button" :class="['btn', 'btn-' + (outline ? 'outline-' : '') + type, _size, block ? 'btn-block' : '']" @click="touch">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'btn',
    computed: {
        _size(){
            return {
                md: '',
                lg: 'btn-lg',
                sm: 'btn-sm',
            }[this.size];
        }
    },
    props: {
        size: {
            default: 'md'
        },
        type: {
            default: 'primary'
        },
        outline: {
            default: false
        },
        block: {
            default: false
        }
    },
    methods: {
        touch(){
            this.$emit('click');
        }
    }
};
</script>
