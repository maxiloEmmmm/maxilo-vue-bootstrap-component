<template>
    <input :type="type" :disabled="disabled" :class="coreClass" :hidden="type==='hidden'"/>
</template>

<script>
    export default {
        name: 'input',
        props: {
            type: {
                default: 'text'
            },
            disabled: {
                default: false
            }
        },
        computed: {
            coreClass(){
                var domClass =['form-control'];
                return domClass;
            }
        }
    };
</script>

<style lang="scss">
    @import '../../asset/sass/core.scss';
</style>
