<template>
    <div :class="['btn-group', _size]">
        <mxl-btn v-for="(i, index) in btns" :key="index" :type="i.type ? i.type:'default'" :size="size">
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
        }
    },
    methods: {
    }
};
</script>
