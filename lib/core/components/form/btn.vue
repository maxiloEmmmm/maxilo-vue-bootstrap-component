<template>
    <button type="button" :class="['btn', 'btn-' + type, _size]" @click="touch">
        <i v-if="icon" :class="icon"></i><slot></slot>
    </button>
</template>

<script>
export default {
    name: 'btn',
    computed: {
        _size(){
            return {
                xs: 'btn-xs',
                md: '',
                lg: 'btn-lg',
                sm: 'btn-sm',
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
    },
    methods: {
        touch(){
            this.$emit('click');
        }
    }
};
</script>
