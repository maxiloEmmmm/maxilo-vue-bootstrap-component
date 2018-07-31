<template>
    <!-- power by maxilo. -->
    <div class="container-fluid">
        <mxl-row-col>
            <!-- 区域划分 -->
            <mxl-row v-for="(area, areak) in areas" :key="areak">
                <mxl-col
                    :cols="`${block.layoutModel}-${block.col}`"
                    v-for="(block, blockK) in area.blocks"
                    :key="blockK"
                >
                    <!-- 块，块以ibox 或 panel划分 -->
                    <mxl-panel>
                        <template slot="header" v-if="block.title !== undefined">
                            {{ block.title }}
                        </template>
                        {{ drawModel ? '区域: ' + area.tag + '#' + block.tag : ''}}
                        <slot :name="area.tag + '#' + block.tag"></slot>
                    </mxl-panel>
                </mxl-col>
            </mxl-row>
            <!-- 暂定区域划分样式 -->
            <hr :style="[drawModel ? {
            backgroundColor: '#ccc',
            padding: '2px 0'
        } : '']">
        </mxl-row-col>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'map',
        data() {
            return {
                areas: []
            };
        },
        props: {
            params: {
                default(){
                    return {};
                }
            },
            template: {
                default: ''
            },
            drawModel: {
                default: false
            }
        },
        async created(){
            this.mergeParams();
            this.areas = this.areas.map((v) => {
                v.blocks = v.blocks.map((b) => {
                    if(!b.col) {
                        b.col = '12';
                    }
                    b.col = parseInt(b.col).toString();
                    return b;
                });
                return v;
            });
        },
        watch:{
            async template(){
                this.loadTemplate();
            }
        },
        methods: {
            async loadTemplate(){
                this.areas = this.$utils._.cloneDeep(await import(`${templateDir}/${this.template}.js`)).default;
            },
            mergeParams(){
                Object.keys(this.params).filter((v) => {
                    let tmp = v.split('#');
                    if(this.$utils._.isArray(tmp)) {
                        let indexs = [];
                        let index = -1;
                        if((index = this.areas.findIndex((area) => area.tag == tmp[0])) != -1) {
                            indexs.push(index);

                            if((index = this.areas[index].blocks.findIndex((block) => block.tag == tmp[1])) != -1) {
                                indexs.push(index);
                            }else {
                                return false;
                            }
                        }else {return false;}

                        this.$utils._.merge(this.areas[indexs[0]].blocks[indexs[1]], this.params[v]);
                    }
                    return true;
                });
            }
        }
    };
</script>

<style>
    .b {
        border: 1px solid #ccc;
        text-align: center;
        width: 100%;
    }
</style>
