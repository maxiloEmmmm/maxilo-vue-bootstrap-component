<template>
    <div class="card">
        <div class="card-header text-white bg-primary" v-if="$slots.header">
            <slot name="header"></slot>
        </div>
        <div class="card-body">
            <slot></slot>
        </div>
        <slot name="other"></slot>
        <div class="card-footer text-white bg-primary" v-if="$slots.footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "card"
    };
</script>