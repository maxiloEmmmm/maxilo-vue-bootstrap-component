<template>
    <ul>
        <li v-for="(d, index) in data" :key="index" >
            <div class="mxlTreeItem" @contextmenu.prevent="rightMenuView($event, d, parentInstance, _self)">
                <span 
                    :style="{maxWidth: treeContainer + '%'}" 
                    :class="[itemRender ? 'renderItem' : '']"
                    :title="getData(d, 'title')">
                    <i 
                        :class="['fa', open[index] ? 'fa-chevron-down' : 'fa-chevron-right']" 
                        @click="toggle(index)" 
                        v-if="hasChild(d)"
                        style="width:14px"
                    ></i>
                    <i v-else style="width: 14px;display: inline-block;"></i>
                    <i :class="['fa', checks.includes(index) ? 'fa-check-square-o' : (half[index] ? 'fa-check-square' : 'fa-square-o')]" aria-hidden="true" @click="checkInput(index)" v-if="useCheck"></i>
                    <span @click="touch(d, data)" style="cursor:pointer;">{{getData(d, 'title')}}</span>
                </span>
                <div 
                    v-if="itemRender" 
                    :style="{maxWidth: (100-treeContainer) + '%', float: 'right'}" 
                    :class="[itemRender ? 'renderItem' : '', level === 0 && index === 0 ? 'mxl-tree-first-item' : '']">
                    <keep-alive>
                        <mxl-render :render="itemRender" :data="{treeNode: d, parentTreeNode: parentInstance, treeNodeVue: _self}"></mxl-render>
                    </keep-alive>
                </div>
                <div style="clear:both"></div>
            </div>
            <tree-item 
                v-if="hasChild(d)" 
                :data="getData(d, 'children')" 
                :parentInstance="d"
                :level="level+1"
                v-show="open[index]"
                :ref="'item' + index"
                :style="[{
                    [style.open]: open
                }]"
                :useCheck="useCheck"
                :alias="alias"
                :treeContainer="treeContainer"
                :itemRender="itemRender"
                @isCheckHalf="tiggerHalf(index)"
                @isCheckAll="[addCheck(index, true, false), $set(half, index, false)]"
                @isCheckEmpty="[removeCheck(index, true, false), $set(half, index, false)]"
                @tiggerRight="rightMenuView"
                @touch="touch">
            </tree-item>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'treeItem',
    data(){
        return {
            /* 节点展开情况 */
            open: [],
            /* 已选择节点 */
            checks: [],
            half: []
        };
    },
    props: {
        /* 数据 */
        data: {
            default(){
                return [];
            }
        },
        /* 当前树深度 */
        level: {
            default: 0
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
        rightMenu: {
            default(){
                return {};
            }
        },
        spreadLevel: {
            default: 0
        },
        treeContainer: {
            default(){
                return {};
            }
        },
        itemRender: {
            default: false
        },
        parentInstance: {
           default(){
                return {};
            } 
        }
    },
    watch: {
        data: {
            deep: true,
            handler(){
                this.initData();
            }
        }
    },
    created(){
        this.initData();
    },
    computed: {
        /* 计算样式 */
        style(){
            return {
                /* 展开 */
                open: {
                    display: 'block'
                },
                /* 关闭 */
                close: {
                    display: 'none'
                }
            };
        },
        /* 合并后的数据别名 */
        _alias(){
            let tmp = {
                primaryKey: 'id',
                searchKey: 'pid',
                children: 'children',
                title: 'title'
            };
            Object.keys(this.alias).forEach(k => {
                if(tmp[k]) {
                    tmp[k] = this.alias[k];
                }
            });
            return tmp;
        }
    },
    methods: {
        /* 单击 */
        touch(d, data){
            this.$emit('touch', d, data);
        },
        /* 触发右键菜单 */
        rightMenuView(event, node, parentNode, nodeVue){
            this.$emit('tiggerRight', event, node, parentNode, nodeVue);
        },
        /* 手动设置选中状态 */
        setCheck(checks){
            let tmp = [];
            this.data.forEach((v, i) => {
                let primaryKey = this.getData(v, 'primaryKey');
                if(primaryKey) {
                    tmp.push(primaryKey);
                    if(checks.includes(primaryKey)) {
                        this.addCheck(i, true, false);
                    }else {
                        this.removeCheck(i, true, false);
                    }
                }
            });
            checks = checks.filter(v => !tmp.includes(v));
            Object.keys(this.$refs).forEach(v => this.$refs[v][0].setCheck(checks));
        },
        /* 获取数据 */
        getData(d, key){
            let str = Object.prototype.toString.call(this._alias[key]);
            return str.slice(8, str.length-1) === 'Function' ? this._alias[key](d) : d[this._alias[key]];
        },
        /* 通知上级节点选中 */
        noticeParentCheck(){
            let csLen = this.checks.length;
            if(csLen === this.data.length) {
                this.$emit('isCheckAll');
            }else {
                this.$emit(csLen === 0 ? 'isCheckEmpty' : 'isCheckHalf');
            }
        },
        /* 选中节点 */
        addCheck(index, toNoticeParent = true, toNoticeChild = true){
            if(!this.checks.includes(index)) {
                this.checks.push(index);
                toNoticeParent && this.noticeParentCheck();
            }
        },
        /* 选空节点 */
        removeCheck(index, toNoticeParent = true, toNoticeChild = true){
            if(this.checks.includes(index)) {
                this.checks = this.checks.filter((v, i) => v !== index);
                //this.$set(this.half, index, false);
                toNoticeParent && this.noticeParentCheck();
            }
        },
        /* 设置半选状态 */
        tiggerHalf(index){
            this.$set(this.half, index, true);
            this.removeCheck(index, true, false);
        },
        /* 检测存在子节点 */
        hasChild(d){
            let c = this.getData(d, 'children');
            return Array.isArray(c) && c.length !== 0;
        },
        /* 初始化数据 */
        initData(){
            let isOpen = this.spreadLevel >= (this.level+1)
            this.data.forEach(($v, $index) => {
                this.$set(this.open, $index, isOpen || $v.spread);
                if($v.isCheck) {
                    this.check.push($index);
                }
            });
        },
        /* 反转展开状态 */
        toggle(index){
            //todo
            this.$set(this.open, index, !this.open[index]);
        },
        /* 递归全选 */
        check(){
            this.half = [];
            this.checks = this.data.map((v, i) => i);
            Object.keys(this.$refs).forEach(v => this.$refs[v][0].check());
        },
        /* 递归全不选 */
        noCheck(){
            this.half = [];
            this.checks = [];
            Object.keys(this.$refs).forEach(v => this.$refs[v][0].noCheck());
        },
        /* 递归处理选则 */
        checkInput(index){
            let tmp = 'item' + index;
            let isCheck = this.checks.includes(index);
            this.$set(this.half, index, false);
            if(!isCheck) {
                this.$set(this.checks, this.checks.length, index);
            }else {
                this.checks = this.checks.filter(v => v !== index);
            }
            if(this.$refs[tmp]) {
                if(isCheck) {
                    this.$refs[tmp][0].noCheck();
                }else {
                    this.$refs[tmp][0].check();
                }
            }
            this.noticeParentCheck();
        },
        /* 递归获取所有选中项 */
        getChecks(){
            let tmp = [];
            /* 递归获取子节点选中项 */
            Object.keys(this.$refs).forEach(v => {
                let checks = this.$refs[v][0].getChecks();
                if(checks != 0) {
                    tmp[v] = checks;
                }
            });
            return this.data.map((v, i) => {
                if(tmp['item' + i]) {
                    /* 存储子节点选中项 */
                    v.checks = tmp['item' + i];
                    /* 当前节点是否半选 */
                    if(!this.checks.includes(i)) {
                        v.half = true;
                    }
                }
                return v;
            }).filter((v, i) => this.checks.includes(i) || v.checks);
        }
    }
};
</script>

<style>
    li {
        list-style: none;
    }

    .renderItem {
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .mxlTreeItem:hover {
        background-color: #cecece;
    }
</style>


