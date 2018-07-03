<template>
<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
    <div :class="['modal', 'fade', show ? 'in' : '', _fullScreen ? 'fullScreen' : '']" :style="{display: show ? 'block' : 'none'}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header" v-if="_fullScreen || $slots.header">
                    <slot name="header"></slot>
                    <button type="button" class="close" aria-label="Close" @click="hide">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer" v-if="$slots.footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
export default {
    name: 'modal',
    data(){
        return {
            min: false
        };
    },
    props: {
        show: {
            default: false
        },
        fullScreen: {
            default: true
        },
    },
    watch: {
        show(){
            this.relation();
        }
    },
    computed: {
        _fullScreen(){
            return !this.min && this.fullScreen;
        }
    },
    mounted () {
        this.relation();
    },
    methods: {
        relation(){
            if(this.show) {
                document.body.classList.add('modal-open');
            }else {
                document.body.classList.remove('modal-open');
            }
        },
        hide(){
            this.$emit('update:show', false);
        },
        open(){
            this.$emit('update:show', true);
        }
    }
}
</script>

<style>
    .fullScreen .modal-content {
        height: 100%;
        border-radius: 0px;
        overflow-x: scroll;
    }

    .fullScreen .modal-dialog {
        margin: 0;
        height: 100%;
        width: 100%;
    }
</style>


