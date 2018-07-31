<template>
    <div ref="feedback">
        <slot></slot>
        <transition
            enter-active-class="animated bounceIn"
            leave-active-class="animated bounceOut"
        >
            <span :style="[_bc]" class="form-control-feedback" aria-hidden="true" v-show="_ok">
                <i :class="_class"></i>
            </span>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'inputStatus',
    mounted(){
        this.clo(this.$refs.feedback, 'form-group');
    },
    computed: {
        _class(){
            let domClass =['fa'];

            if(this._ok) {
                domClass.push(this.status[this.currentStatus].icon);
            }

            return domClass;
        },
        _bc(){
            return this._ok ? {color: this.status[this.currentStatus].color} : {};
        },
        _ok(){
            return this.status[this.currentStatus] !== undefined;
        }
    },
    methods: {
        clo(node, tag){
            if(node.parentNode) {
                if(node.parentNode.className && node.parentNode.className.split(' ').indexOf(tag) !== -1) {
                    node.parentNode.classList.add('has-feedback');
                    return ;
                }else {
                    this.clo(node.parentNode, tag);
                }
            }
        }
    },
    props: {
        status: {
            default(){
                return {
                    success: {
                        color: '#3c763d',
                        icon: 'fa-check'
                    },
                    error: {
                        color: '#a94442',
                        icon: 'fa-times'
                    }
                };
            }
        },
        currentStatus: {
            type: String,
            default: ''
        }
    }
};
</script>

