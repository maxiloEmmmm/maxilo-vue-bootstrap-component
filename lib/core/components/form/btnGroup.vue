<template>
    <div :class="[input ? 'input-group-btn' : 'btn-group', _size]">
        <mxl-btn v-for="(i, index) in btns" :key="index" :type="i.type ? i.type:'default'" :icon="i.icon" :size="size">
            {{i.text ? i.text : ($utils._.isString(i + '') ? i : '')}}
        </mxl-btn>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'btnGroup',
    data(){
        return {
        };
    },
    mounted(){
    },
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
        btns: {
            default(){
                return [];
            }
        },
        size: {
            default: 'md'
        },
        input: {
            default: false
        }
    },
    methods: {
    }
};
</script>
