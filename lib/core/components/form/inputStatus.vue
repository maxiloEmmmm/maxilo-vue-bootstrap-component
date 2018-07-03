<template>
    <div class="has-feedback">
        <slot></slot>
        <span class="form-control-feedback" aria-hidden="true">
            <i :class="coreClass"></i>
        </span>
    </div>
</template>

<script>
export default {
    name: 'inputStatus',
    computed: {
        coreClass(){
            let domClass =['fa'];

            if(this.currentStatus && this.status[this.currentStatus]) {
                domClass.push(this.status[this.currentStatus]);
            }

            return domClass;
        }
    },
    props: {
        status: {
            default(){
                return {};
            }
        },
        currentStatus: {
            default: false
        }
    }
};
</script>

