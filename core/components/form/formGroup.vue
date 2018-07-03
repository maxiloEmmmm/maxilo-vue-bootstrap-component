<template>
    <div class="form-group">
        <label :for="tag" :class="labelClass" ref="core">{{ label }}</label>
        <div :class="[flow ? 'col-md-' + l[1] : '']">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'formGroup',
        data() {
            return {
                tag: this.$utils.tool.random(),
                flow: true,
                s: [],
                l: [],
                label: ''
            };
        },
        props: {
            layout: {
                default: '3-9'
            }
        },
        mounted(){
            this.render();
        },
        computed: {
            labelClass(){
                return this.flow ? ['col-md-' + this.l[0], 'control-label'] : []
            }
        },
        watch: {
            layout(){
                this.render();
            }
        },
        methods: {
            resetFlow(flow){
                this.flow = flow;
                this.c = flow ? ['col-md-' + this.l[0], 'control-label'] : [];
            },
            render(){
                let t = this.layout.split('-');
                if(t.length == 1) {
                    this.l = [t[0], 12-t[0]];
                }else {
                    this.l = [t[0], t[1]];
                }

                if(this.$slots.default) {
                    this.s = this.$slots.default[0];
                    let labelApi = this.s.componentInstance.getLabel ? this.s.componentInstance.getLabel() : '';
                    this.label = labelApi 
                                    ? labelApi 
                                    : (this.s.componentOptions && this.s.componentOptions.children 
                                        ? this.s.componentOptions.children[0].text
                                        : '');
                    this.$nextTick(() => {
                        this.s.elm.id = this.tag;
                    });
                }
            }
        }
    };
</script>