<template>
    <div :class="['modal', 'fade', show ? 'in' : '']" :style="{display: show ? 'block' : 'none'}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header" v-if="$slots.header">
                    <slot name="header"></slot>
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
</template>

<script>
export default {
    name: 'modal',
    props: {
        show: {
            default: false
        }
    },
    watch: {
        show(){
            this.relation();
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

