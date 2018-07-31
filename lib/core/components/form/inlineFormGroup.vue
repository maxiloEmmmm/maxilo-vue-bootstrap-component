<template>
    <div class="form-group">
        <label :for="tag" ref="core">{{ label }}</label>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'inlineFormGroup',
        data() {
            return {
                tag: this.$utils.tool.random(),
                label: '',
                s: null
            };
        },
        mounted () {
            this.render();
        },
        methods: {
            render(){
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