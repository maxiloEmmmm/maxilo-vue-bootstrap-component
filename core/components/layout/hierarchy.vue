<template>
    <mxl-box :groups="options.length" ref="core">
        <ul class="list-group hierarchy" v-for="(option, index) in options" :key="index" :style="[overflow]">
            <li 
                :class="['list-group-item', itemIndex == active[index] ? 'hierarchyLi' : '']" 
                v-for="(item, itemIndex) in option" :key="itemIndex" 
                @click.stop="touch(index, itemIndex)"
            >
                <a href="javascript:void(0)" style="padding-right:1rem">{{ item[_alias.label] }}<span style="position: absolute;right:0;"><slot name="icon" :item="item"></slot></span></a>
            </li>
        </ul>
    </mxl-box>
</template>

<script>
export default {
    name: 'hierarchy',
    data(){
        return {
            overflow: {
                maxHeight: '200px',
                overflowY: 'scroll',
                minWidth: '160px',
            },
            active: []
        };
    },
    props: {
        options: {
            default(){
                return [];
            }
        },
        alias: {
            default(){
                return {};
            }
        }
    },
    computed:{
        _alias(){
            return this.$utils._.merge({}, {label: 'label'}, this.alias);
        },
        children(){
            return {
                left: '100%',
                top: 0,
                margin: 0
            };
        },
        current(){
            let tmp = [];
            this.active.forEach((val, index) => {
                tmp[index] = this.options[index][val];
            });
            return tmp;
        }
    },
    methods: {
        touch(i, itemI){
            this.$set(this.active, i, itemI);

            /* 修复跨级选中, 清空后续选中 */
            if(i+1 < this.active.length) {
                this.active = this.active.slice(0, i+1);
            } 
            this.$emit('touch', this.current, i)
        },
        setActive(a){
            this.active = a;
        }
    }
};
</script>

<style>
    .mxl-select-item {
        padding: 1px 5px;
        border-radius: 4px;
        color: #fff;
        background: #ccc;
        margin: 1px;
        display: inline-block;
    }

    .hierarchy {
        margin-bottom: 0;
    }

    .hierarchy > li {
        border: none;
        padding: 0;
    }

    .hierarchy>li>a{
        display: block;
        padding: 3px 20px;
        clear: both;
        font-weight: 400;
        line-height: 1.42857143;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .hierarchyLi>a {
        color: #409eff !important;
        background-color: #f5f5f5;
    }

    .hierarchy>li>a:focus, .hierarchy>li>a:hover {
        color: #262626;
        text-decoration: none;
        background-color: #f5f5f5;
    }
</style>

