<template>
    <transition
        name="custom-classes-transition"
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut"
        :duration="{ enter: 1500, leave: 600 }">`
        <div v-if="running" class="text-center" :style="{display: block ? 'block' : 'inline'}">
            <i :class="['fa', 'fa-circle-o-notch', 'fa-spin', 'fa-fw', _size]"></i><br>
            <small><slot></slot></small>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'loading',
    data(){
        return {
            running: false
        }
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        size: {
            default: 'md'
        },
        block: {
            default: true
        }
    },
    computed: {
        _size(){
            return {
                xs: 'fa-lg',
                sm: 'fa-2x',
                md: 'fa-3x',
                lg: 'fa-4x'
            }[this.size]
        }
    },
    watch: {
        value(){
            this.running = this.value;
        }
    },
    methods: {
        show(){
            this.running = true;
            this.$emit('input', true);
        },
        hide(){
            this.running = false;
            this.$emit('input', false);
        },
        wait(fn){
            this.show();
            return new Promise(async ok => {
                let ds = await fn();
                this.hide();
                ok(ds);
            });
        }
    }
};
</script>

