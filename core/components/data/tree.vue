<template>
    <div>
        <mxl-alert v-if="_no_data">暂无数据</mxl-alert>
        <tree-item 
            :data="data" 
            ref="tree"
            :alias="alias"
            :useCheck="useCheck"
            :treeContainer="_treeView.container"
            :itemRender="itemRender"
            :rightMenu="rightMenu"
            :spreadLevel="spreadLevel"
            :parentInstance="{}"
            @tiggerRight="tiggerRight"
            @touch="touch">
        </tree-item>
        <div :style="[style.rightMenu]" class="maixlo-tree-right-menu list-group" v-if="hasRightMenu" v-show="rightPosition.show">
            <a v-for="(menu, menuKey) in rightMenu" :key="menuKey" @click="rightMenuHandler(menu)" class="list-group-item">
                {{menuKey}}
            </a>
        </div>
    </div>
</template>

<script>
import treeItem from './treeItem.vue';
export default {
    components: {
        treeItem  
    },
    name: 'tree',
    data(){
        return {
            rightPosition: {
                show: false,
                x: 0,
                y: 0
            },
            rightNode: null,
            rightParentNode: null,
            rightHandler: null
        };
    },
    computed: {
        style(){
            return {
                rightMenu: {
                    top: this.rightPosition.y + 'px',
                    left: this.rightPosition.x + 'px'
                }
            };
        },
        hasRightMenu(){
            return Object.keys(this.rightMenu) !== 0;
        },
        _treeView(){
            let tmp = {
                container: 40
            };
            Object.keys(this.treeView).forEach(k => {
                if(tmp[k]) {
                    tmp[k] = this.treeView[k];
                }
            });
            return tmp;
        },
        _no_data(){
            return this.data.length === 0;
        }
    },
    props: {
        /* 数据 */
        data: {
            default(){
                return [];
            }
        },
        /* 开启选择 */
        useCheck: {
            default: false
        },
        /* 数据别名 */
        alias: {
            default(){
                return {};
            }
        },
        /* 右菜单 */
        rightMenu: {
            default(){
                return {};
            }
        },
        /* 展开等级 */
        spreadLevel: {
            default: 0
        },
        /* treeView */
        treeView: {
            default(){
                return {};
            }
        },
        itemRender: {
            default: false
        }
    },
    methods: {
        touch(d, data){
            this.$emit('touch', d, data, this.data);
        },
        tiggerRight(event, node, rightParentNode, nodeVue){
            let position = this.getPosition(event)
            this.rightPosition = {
                show: true,
                x: position.x,
                y: position.y
            };
            this.rightNode = node;
            this.rightParentNode = rightParentNode;
            this.rightNodeVue = nodeVue;

            let removeHandler = function(){
                this.$set(this.rightPosition, 'show', false);
                document.body.removeEventListener('click', removeHandler);
            }.bind(this);
            document.body.addEventListener('click', removeHandler);
        },
        rightMenuHandler(handler){
            if(!handler) {
                console.log('[maxilo-tree warning] right menu\'s is not define.');
                return ;
            }
            handler(this.$utils._.cloneDeep(this.rightNode), this.$utils._.cloneDeep(this.rightParentNode), this.$utils._.cloneDeep(this.rightNodeVue));
        },
        getChecks(){
            return this.$refs.tree.getChecks();
        },
        getChecksList(item = [], alone = false){
            item = Array.isArray(item) ? item : (this.$utils.base.getType(item) == 'String' ?  [item] : []);
            alone = item.length === 1 && alone;
            return this.getChecksPrimary(this.$refs.tree.getChecks(), item, alone);
        },
        getChecksPrimary(checks, item, alone){
            let tmp = [];
            let alias = this.$refs.tree._alias;
            checks.forEach(v => {
                if(alone) {
                    if(item.length == 0) {
                        tmp.push(v[alias.primaryKey]);
                    }else {
                        tmp.push(v[item[0]]);
                    }
                }else {
                    if(item.length == 0) {
                        tmp.push(v);
                    }else {
                        tmp.push(this.$utils._.pick(v, item));
                    }
                }
                if(v.checks && v.checks.length != 0) {
                    tmp.push(...this.getChecksPrimary(v.checks, item, alone));
                }
            });
            return tmp;
        },
        checkAll(){
            this.$refs.tree.check();
        },
        noCheckAll(){
            this.$refs.tree.noCheck();
        },
        /* 获取事件位置 */
        getPosition(event){
            return {
                x: (event.pageX || (event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft))),
                y: (event.pageY || (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop)))
            };
        },
        setCheck(checks){
            this.$refs.tree.setCheck(checks);
        }
    }
};
</script>

<style>
    .maixlo-tree-right-menu {
        position: absolute;
        background: #fff;
        margin-top: 0;
        border-radius: 4px;
    }
</style>
