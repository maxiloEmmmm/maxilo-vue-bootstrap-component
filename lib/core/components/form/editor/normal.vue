<template>
    <div>
        <textarea v-model="content" @input="doInput"></textarea>
        <div class="well well-lg" style="background-color: #f2dede;">
            请升级浏览器, 抛弃IE系列浏览器, 拥抱chrome、 firefox、国内浏览器厂商(极速模式)等高级浏览器, 增加使用体验, 人生苦短.
        </div>
    </div>
</template>

<script>
import commonMix from './prop.vue';
export default {
    mixins: [commonMix],
    methods: {
        setData(val){
            this.content = val;
        },
        doInput(){
            this.change(this.content);
        },
        async _reset(){
            this.content = '';
            this.change('');
            await this.$nextTick();
        }
    }
}
</script>

