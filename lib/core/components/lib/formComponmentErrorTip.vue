<template>
    <div>
        <slot></slot>
        <slot name="tips"></slot>
        <transition
            enter-active-class="animated bounceIn"
            leave-active-class="animated bounceOut"
        >
            <template v-if="baseTip && item && ved">
                <p 
                    :class="['text-' + (flags[item.name].validated 
                                            ? (validator.errors.has(item.name) ? 'danger' : 'success') 
                                            : 'muted')
                    ]"
                    style="margin:0;font-size: 0.1rem;">
                    {{ errorMessage }}
                </p>
            </template>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'formComponmentErrorTip',
    data(){
        return {item: false}
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
            return m ? m : '非常好!';
        },
        ved(){
            return this.flags[this.item.name].validated;
        }
    },
    watch: {
        validator() {
            this.getItem();
        }
    },
    methods: {
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
