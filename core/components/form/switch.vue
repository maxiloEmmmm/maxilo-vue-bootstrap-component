<template>
    <label :class="[_class,iSwitch]" :for="tag" :style="[core ? {background:'#007bff',border:'1px solid #007bff',
        transition:'.1s linear',} : {}]">
        <input :id="tag" type="checkbox" @change="change($event)" v-model="core">
        <i :style="[core ? {position:' absolute',left: '4px',} : {marginLeft: '2px'}]"></i>
        <span v-show="!core" style="color: #fff;">{{ closeText }}</span>
        <span class="open" v-show="core" style="color: #fff;border-color: #fff;">{{ openText }}</span>
    </label>
</template>

<script>
    export default {
        data(){
            return {
                core: false,
                tag: this.$utils.tool.random('mxl-switch-'),
                iSwitch:'iSwitch',
            }
        },
        name: 'switch',
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            size: {
                default: 'md',
                type: String
            },
            value: {
                default: false,
            },
            openText: {
                default: '',
            },
            closeText: {
                default: '',
            }
        },
        computed: {
            _class(){
                let layout = ['xs','sm', 'md', 'lg'].includes(this.size) ? `${this.size}` : '';
                return `${layout}`;
            }
        },
        watch: {
            value: {
                handler(){
                    let t = !!this.value;
                    if(t !== this.core) {
                        this.core = t;
                        this.input();
                    }
                },
                immediate: true
            }
        },
        methods: {
            change(){
                this.$emit('change', this.core);
            },
            input(){
                this.$emit('input', this.core)
            }
        }
    }
</script>

<style>
    .iSwitch {
        margin-bottom: 0;
        text-align: left !important;
        position: relative;
        display: inline-block;
        overflow: hidden;
        vertical-align: middle;
        border-radius: 15px;
        border: 1px solid rgb(255, 73, 73);
        cursor: pointer;
    }

    .iSwitch input {
        width: 0;
        visibility: hidden;
    }

    .iSwitch i {
        display: inline-block;
        border-radius: 100%;
        background: #fff;
        transition: all .3s;
        -webkit-transition: all .3s;
        position: absolute;
        top: 1px;
    }

    .iSwitch span {
        padding: 0!important;
        text-align: center!important;
        font-style: normal!important;
        position: absolute;
        top: -1px;
    }

    .iSwitch input:checked+i {
        transform: translateX(100%);
        -webkit-transform: translateX(100%);
    }

    .iSwitch input:checked+i:before {
        display: inline-block;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
    }
    /*-------xs---------------------*/
    .xs {
        width: 40px !important;
        height: 20px;
        background-color: rgb(255, 73, 73);
        line-height: 20px;
        min-width: 22px;
        border: 1px solid rgb(255, 73, 73);
    }

    .xs span {
        margin-left: 22px;
        font-size: 10px;
    }

    .xs i {
        width:16px;
        height: 16px;
        margin-left: 1px !important;
    }
    .xs .open{
        margin-left: 6px;
    }

    /*-------sm---------------------*/
    .sm {
        width: 48px !important;
        height: 26px;
        background-color: rgb(255, 73, 73);
        line-height: 26px;
        min-width: 35px;
        border: 1px solid rgb(255, 73, 73);
    }

    .sm span {
        margin-left:28px;
        font-size: 12px;
    }

    .sm i {
        width: 20px;
        height: 20px;
        top:2px !important;
    }
    .sm .open{
        margin-left: 7px;
    }
    /*----md------*/
    .md {
        width: 56px !important;
        height:30px;
        line-height: 30px;
        min-width: 35px;
        background: rgb(255, 73, 73);
    }

    .md span {
        font-size: 13px;
        margin-left:33px;
    }

    .md i {
        width: 24px;
        height: 24px;
        top:2px !important;
    }

    .md .open{
        margin-left: 9px !important;
    }
    /*----lg------*/
    .lg {
        width: 70px !important;
        height: 31px;
        line-height: 31px;
        min-width: 35px;
        background: rgb(255, 73, 73);
    }

    .lg span {
        font-size: 15px;
        margin-left:40px;
    }

    .lg i {
        width: 25px;
        height: 25px;
        margin-left: 12px;
        top:2px !important;
    }

    .lg .open{
        margin-left: 12px !important;
    }
</style>