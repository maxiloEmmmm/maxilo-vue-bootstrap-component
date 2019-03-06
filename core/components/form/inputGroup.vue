<template>
    <div :class="['input-group', $slots.prepend ? 'mxl-input-group-prepend' : '', $slots.append ? 'mxl-input-group-append' : '', 'input-group-' + _size_class]">
        <div class="input-group-prepend" v-if="$slots.prepend">
            <slot name="prepend"></slot>
        </div>
        <slot></slot>
        <div class="input-group-append" v-if="$slots.append">
            <slot name="append"></slot>
        </div>
    </div>
</template>

<style>
    .mxl-input-group-prepend input {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    .mxl-input-group-append input {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
</style>


<script>
export default {
    name: 'inputGroup',
    props: {
        size: {
            type: String,
            default: 'md'
        }
    },
    computed: {
        _size_class(){
            return {
                md: '',
                sm: 'sm',
                lg: 'lg'
            }[this.size]
        }
    }
};
</script>

