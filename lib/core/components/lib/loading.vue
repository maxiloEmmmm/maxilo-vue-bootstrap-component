<template>
    <div v-if="running" class="text-center" :style="{display: block ? 'block' : 'inline'}">
        <i :class="['fa', 'fa-'+theme, 'fa-spin', 'fa-fw', _size]"></i><br>
        <small><slot></slot></small>
    </div>
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
        },
        theme: {
            default: 'circle-o-notch'
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
        value: {
            handler(){
                this.running = this.value;
            },
            immediate: true
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

