<template>
    <div>
        <mxl-alert v-show="_no_data && !async_loading">暂无数据</mxl-alert>
        <mxl-loading theme="cog" v-model="async_loading">数据初始化</mxl-loading>
        <ul>
            <tree-item 
                v-for="(d, dIndex) in ds"
                :key="dIndex"
                :data.sync="d" 
                :ref="'tree'+dIndex"
                :alias="alias"
                :useCheck="useCheck"
                :treeContainer="_treeView.container"
                :rightMenu="rightMenu"
                :spreadLevel="spreadLevel"
                :parentInstance="{}"
                :useDrag="useDrag"
                :async="async"
                :index="dIndex"
                :useCache="useCache"
                :url="url"
                :nodeRender="!nodeRenderName ? false : $scopedSlots[nodeRenderName]"
                @tiggerRight="tiggerRight"
                @touch="touch">
            </tree-item>
        </ul>
        <div :style="[style.rightMenu]" class="maixlo-tree-right-menu list-group" v-if="hasRightMenu" v-show="rightPosition.show">
            <a v-for="(menu, menuKey) in rightMenu" :key="menuKey" @click="rightMenuHandler(menu)" class="list-group-item">
                {{menuKey}}
            </a>
        </div>
    </div>
</template>

<script>
import async from '../mixs/async.vue';
import treeItem from './treeItem.vue';
export default {
    mixins: [async],
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
            rightHandler: null,
            ds: []
        };
    },
    async created(){
        if(this.url !== '' && this.init) {
            this.ds = await this.fetch();
        }else {
            this.ds = this.data;
        }
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
            return this.ds.length === 0;
        },
        /* todo merge alias tree and treeItem */
        _alias(){
            let tmp = {
                primaryKey: 'id',
                searchKey: 'pid',
                children: 'children',
                title: 'title',
                hasChild: 'hasChild'
            };
            Object.keys(this.alias).forEach(k => {
                if(tmp[k]) {
                    tmp[k] = this.alias[k];
                }
            });
            return tmp;
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
        useDrag: {
            default: 'false'
        },
        nodeRenderName: {
            default: ''
        },
        init: {
            default: true
        }
    },
    methods: {
        touch(d, data){
            this.$emit('touch', d, data, this.ds);
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
            handler(this.rightNode, this.rightParentNode, this.rightNodeVue);
        },
        getChecks(){
            let tmp = [];
            Object.keys(this.$refs).forEach(v => {
                let cs = this.$refs[v][0].getChecks();
                if(cs) {
                    tmp.push(cs);
                }
            });
            return tmp;
        },
        getChecksList(item = [], alone = false, half = true, fullNoChild = false){
            item = Array.isArray(item) ? item : (this.$utils.base.getType(item) == 'String' ?  [item] : []);
            return this.getChecksPrimary(this.getChecks(), item, alone, half, fullNoChild);
        },
        getChecksPrimary(checks, item, alone, half = true, fullNoChild = false){
            let tmp = [];
            checks.forEach(v => {
                /* 半选成立 或者 不是半选 */
                if(half || !v.half) {
                    if(alone) {
                        if(item.length == 0) {
                            tmp.push(v[this._alias.primaryKey]);
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
                }
                if(v.checks && v.checks.length != 0) {
                    /* 如果当前不为半选切不需要子节点 则不继续获取 */
                    if(fullNoChild && !v.half) {
                        return true;
                    }
                    tmp.push(...this.getChecksPrimary(v.checks, item, alone, half, fullNoChild));
                }
            });
            return tmp;
        },
        checkAll(){
            this.$refs.tree.doCheck();
        },
        noCheckAll(){
            this.$refs.tree.noCheck();
        },
        /* 获取事件位置 */
        getPosition(e){
            let ev = e;
            let flag = ev.pageX || ev.pageY;
            return {
                x: flag ? ev.pageX : (ev.clientX + document.body.scrollLeft - document.body.clientLeft),
                //(event.pageX || (event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)))
                y: flag ? ev.pageY : (ev.clientY + document.body.scrollTop - document.body.clientTop)
                //(event.pageY || (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop)))
            };
        },
        setCheck(checks){
            this.$refs.tree.setCheck(checks);
        },
        async refresh() {
            if(this.url) {
                this.ds = [];
                await this.$nextTick();
                this.ds = await this.fetch(true);
            }
        }
    }
};
</script>

<style>
    .maixlo-tree-right-menu {
        position: fixed;
        background: #fff;
        margin-top: 0;
        border-radius: 4px;
    }
</style>
