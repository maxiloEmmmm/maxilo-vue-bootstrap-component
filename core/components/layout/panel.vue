<template>
    <div class="panel panel-default">
        <div class="panel-heading" v-if="$slots['header'] !== undefined">
            <slot name="header"></slot>
        </div>
        <div class="panel-body" v-if="!withOutAfterBody">
            <slot></slot>
        </div>
        <slot name="afterBody"></slot>
        <div class="panel-footer" v-if="$slots['footer'] !== undefined">
            <slot name="footer"></slot>
            <div class="clearfix"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'panel',
    props: {
        withOutAfterBody: {
            type: Boolean,
            default: false
        }
    }
};
</script>

