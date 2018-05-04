<template>
    <table style="max-width:100%;width:100%;">
        <tr v-for="(row, index) in _rows" :key="index">
            <td
                v-for="(group, i) in _groups"
                :key="i"
                v-if="_groups*(row-1)+group <= _count"  
                :style="{width: _percent, maxWidth: _percent}"
            >
                <mxl-input></mxl-input>
            </td>
        </tr>
    </table>
</template>

<script>
    export default {
        name: 'editTable',
        data(){
            return {
            };
        },
        props: {
            range: {
                default() {
                    return [4, 4]
                }
            }
        },
        mounted(){
        },
        computed: {
            _range(){
                if(Array.isArray(this.range)) {
                    return this.range;
                }else if(this.$utils.base.getType(this.range) === 'Number') {
                    let _r = parseInt(this.range);
                    return [_r, _r];
                }else {
                    return [4, 4];
                }
            },
            _count(){
                return this._range[0] * this._range[1];            
            },
            _groups(){
                return this._range[0];
            },
            _percent(){
                return Math.floor(100/this._groups) + '%';
            },
            _rows(){
                return this._range[1];
            }
        },
    };
</script>


<style>
    .mxl-box-rules > * {
        width: 100%;
        max-width:100%;
        word-break: break-all;
    }
</style>