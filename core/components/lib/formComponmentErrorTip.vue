<template>
    <div ref="self">
        <slot></slot>
        <transition-group
            enter-active-class="animated bounceIn"
            leave-active-class="animated bounceOut"
        >
            <template v-if="item">
                <p 
                    :class="['text-' + (flags[item.name].validated 
                                            ? (validator.errors.has(item.name) ? 'danger' : 'success') 
                                            : 'muted')
                    ]"
                    style="margin:0.1rem 0 0 0;font-size: 0.1rem;"
                    v-show="baseTip && ved && _hasError"
                    key="errorTip">
                    {{ errorMessage }}
                </p>
            </template>
            <div v-show="tipShow" key="helpTip">
                <slot name="tips"></slot>
            </div>
        </transition-group>
    </div>
</template>

<script>
export default {
    name: 'formComponmentErrorTip',
    data(){
        return {
            item: false,
            tipShow: false
        }
    },
    props: {
        validator: {
            default(){
                return {};
            }
        },
        baseTip: {
            default: true
        }
    },
    mounted(){
        this.getItem();
    },
    computed: {
        locale(){
            return this.validator.dictionary.locale;
        },
        flags(){
            return this.validator.flags;
        },
        errorMessage(){
            let m = this.validator.errors.first(this.item.name);
            return m ? m : '';
        },
        ved(){
            return this.flags[this.item.name].validated;
        },
        _hasValidated(){
            if(!this.flags[this.item.name]) {
                return false;
            }
            return this.flags[this.item.name].validated;
        },
        _hasError(){
            return this._hasValidated && this.validator.errors.has(this.item.name);
        }
    },
    watch: {
        validator() {
            this.getItem();
        },
        _hasError(){
            if(this._hasValidated) {
                this.clo(this.$refs.self, 'form-group', !this._hasError)
            }
        }
    },
    methods: {
        showTip(){
            this.tipShow = true;
        },
        hideTip(){
            this.tipShow = false;
        },
        clo(node, tag, success){
            if(node.parentNode) {
                if(node.parentNode.className && node.parentNode.className.split(' ').indexOf(tag) !== -1) {
                    node.parentNode.classList.remove(success ? 'has-error' : 'has-success');
                    node.parentNode.classList.add(success ? 'has-success' : 'has-error');
                    return ;
                }else {
                    this.clo(node.parentNode, tag, success);
                }
            }
        },
        getMessage(v, key, field){
            let locale = (!this.validator.dictionary.container[this.locale] || !this.validator.dictionary.container[this.locale].messages[key])
                            ? 'en'
                            : this.locale;
            return this.validator.dictionary.container[locale].messages[key] 
                            ? this.validator.dictionary.container[locale].messages[key](field, v) 
                            :  key + ' validate no message';
        },
        async getItem(){
            await this.$nextTick();
            this.item = this.validator.fields.items[0];
        }
    }
};
</script>
