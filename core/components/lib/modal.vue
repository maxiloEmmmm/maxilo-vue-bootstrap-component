<template>
<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
    <div :class="['modal', 'fade', show ? 'show' : '', _fullScreen ? 'fullScreen' : '']" :style="{display: show ? 'block' : 'none'}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" :style="{maxWidth: size + '%'}" role="document">
            <div class="modal-content">
                <div class="modal-header" v-if="_fullScreen || $slots.header">
                    <slot name="header"></slot>
                    <button type="button" class="close" aria-label="Close" @click="hide">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body" ref="loading" v-mxl-loading:w10="loading">
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
            min: false,
            _loading: false
        };
    },
    props: {
        show: {
            default: false
        },
        fullScreen: {
            default: true
        },
        useShadow: {
            default: true
        },
        size: {
            default: 65
        },
        loading: {
            default: false
        }
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
                if(this.useShadow) {
                    let node = document.createElement('div');
                    node.classList.add('modal-backdrop', 'fade', 'show');
                    document.body.appendChild(node)
                }
            }else {
                document.body.classList.remove('modal-open');
                if(this.useShadow) {
                    let tmp = document.getElementsByClassName('modal-backdrop');
                    if(tmp.length != 0) {
                        document.body.removeChild(document.getElementsByClassName('modal-backdrop')[0]);
                    }
                }
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
        height: 100% !important;
        border-radius: 0px;
        overflow-x: scroll;
    }

    .fullScreen .modal-dialog {
        margin: 0;
        height: 100% !important;
        width: 100% !important;
        max-width: 100% !important;
    }
</style>


