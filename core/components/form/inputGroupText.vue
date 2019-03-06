<template>
    <span class="input-group-text" :class="[_color, 'bg-' + type]"><slot></slot></span>
</template>

<script>
export default {
    name: 'inputGroupText',
    props: {
        type: {
            type: String,
            default: 'primary'
        }
    },
    computed: {
        _color(){
            return ['light', 'white'].includes(this.type) ? 'text-dark' : 'text-white';
        }
    }
}
</script>

