<template>
    <li>
        <div 
            :draggable="useDrag"
            @mousedown.native="dragRepairIe8"
            @dragstart="dragStart($event)"
            @dragend="dragEnd($event)"
            @drag="drag($event)"
            @dragenter.prevent="dragEnter($event)"
            @dragleave.prevent="dragLeave($event)"
            @dragover.prevent="dragOver($event)"
            @drop.prevent="drop($event)"
            style="margin-bottom: 0.1rem;display:table;width:100%;"
            class="mxlTreeItem" @contextmenu.prevent="rightMenuView($event, data, parentInstance, _self)">
            <div style="display:table-row;">
                <span 
                    :style="{maxWidth: treeContainer + '%'}" 
                    :class="[nodeRender ? 'renderItem' : '']"
                    style="vertical-align: middle;display:table-cell;"
                    :title="getData(data, 'title')">
                    <i 
                        :class="['fa', open ? 'fa-chevron-down' : 'fa-chevron-right']" 
                        @click="toggle()" 
                        v-if="_hasChild"
                        style="width:1rem"
                    ></i>
                    <i v-else style="width: 1rem;display: inline-block;"></i>
                    <i :class="['fa', check ? 'fa-check-square-o' : (half ? 'fa-check-square' : 'fa-square-o')]" aria-hidden="true" @click="checkInput()" v-if="useCheck"></i>
                    <span @click="touch()" style="cursor:pointer;">
                        {{getData(data, 'title')}}<i class="fa fa-cog fa-spin fa-fw" v-show="async_loading"></i>
                    </span>
                </span>
                <div 
                    v-if="nodeRender" 
                    style="display:table-cell;float: right;"
                    :style="{maxWidth: (100-treeContainer) + '%'}" 
                    :class="[nodeRender ? 'renderItem' : '', level === 0 && index === 0 ? 'mxl-tree-first-item' : '']">
                    <mxl-render :render="h => nodeRender({treeNode: data, parentTreeNode: parentInstance, treeNodeVue: _self})"></mxl-render>
                </div>
            </div>
            <!--<div style="clear:both"></div>-->
        </div>
        <ul style="padding-left: 1.5rem;">
            <tree-item 
                v-for="(d, index) in data[_alias.children]" :key="index"
                v-if="Array.isArray(data[_alias.children]) && data[_alias.children].length !== 0" 
                :data.sync="d" 
                :parentInstance="data"
                :level="level+1"
                style="transition:all 0.3s linear 0s;"
                :ref="'item' + index"
                :style="{opacity: open ? 1 : 0, height: open ? 'auto' : '0px'}"
                :useCheck="useCheck"
                :alias="alias"
                :treeContainer="treeContainer"
                :useDrag="useDrag"
                :async="async"
                :useCache="useCache"
                :nodeRender="nodeRender"
                :index="index"
                :url="url"
                @isCheckHalf="tiggerHalf()"
                @isCheckAll="addCheck(true)"
                @isCheckEmpty="removeCheck(true)"
                @tiggerRight="rightMenuView"
                @touch="touch">
            </tree-item>
        </ul>
    </li>
</template>

<script>
import async from '../mixs/async.vue';
export default {
    mixins: [async],
    name: 'treeItem',
    data(){
        return {
            /* 是否展开 */
            open: false,
            /* 是否已初始化选择 */
            opened: false,
            /* 是否选择 */
            check: false,
            /* 是否半选 */
            half: false,
            /* 是否根据实际情况修复节点 */
            repairCheck: false
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
        /* 右键菜单 */
        rightMenu: {
            default(){
                return {};
            }
        },
        /* 默认展开等级 */
        spreadLevel: {
            default: 0
        },
        treeContainer: {
            default(){
                return {};
            }
        },
        /* 上级数据 */
        parentInstance: {
           default(){
                return {};
            } 
        },
        /* 是否启用拖动 */
        useDrag: {
            default: 'false'
        },
        /* 节点功能区渲染函数 */
        nodeRender: {
            default: false
        },
        /* 在父节点中的索引 */
        index: {
            default: 0
        }
    },
    watch: {
        /* 修复本地数据、拖拽数据及异步数据 */
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
                    //display: 'block',
                    visibility: 'visible'
                },
                /* 关闭 */
                close: {
                    //display: 'none',
                    visibility: 'hidden'
                }
            };
        },
        /* 合并后的数据别名 */
        _alias(){
            let tmp = {
                primaryKey: 'id',
                searchKey: 'pid',
                children: 'children',
                title: 'title',
                hasChild: 'hasChild',
                isCheck: 'isCheck'
            };
            Object.keys(this.alias).forEach(k => {
                if(tmp[k]) {
                    tmp[k] = this.alias[k];
                }
            });
            return tmp;
        },
        /* 计算是否存在子节点 */
        _hasChild(){
            if(!!this.getData(this.data, 'hasChild')) {
                return !!this.url;
            }else {
                let c = this.getData(this.data, 'children');
                return Array.isArray(c) && c != 0;
            }
        },
        _need_fetch() {
            if(this.url == '') {
                return false;
            }

            if(!!this.getData(this.data, 'hasChild')) {
                let c = this.getData(this.data, 'children');
                if(!c) {
                    return true;
                }else if(Array.isArray(c) && c.length == 0){
                    return true;
                }
            }
            return false;
        }
    },
    methods: {
        /* async start */
        getParams() {
            return {pid: this.getData(this.data, 'primaryKey')};
        },
        /* async end */
        dragRepairIe8: function(){
            if(this.dragDrop){
                this.dragDrop();
            }
        },
        dragRepairFirfox(e){},
        dragStart(e, i){
            let ev = e;
            this.$store.commit('maxilo-bootstrap-component/addRelation', {
                key: 'dropVueInstance',
                relation: {
                    instance: this
                }
            });
        },
        dragEnd(e){},
        drag(e){},
        dragEnter(e){
        },
        dragLeave(e){
            let ev = e;
            this.removeDragStyle(ev);
        },
        removeDragStyle(ev){
            ev.currentTarget.classList.remove('mxlTreeDropUp');
            ev.currentTarget.classList.remove('mxlTreeDropDown');
            ev.currentTarget.classList.remove('mxlTreeDrop');
        },
        getPosition(event){
            return {
                x: (event.pageX || (event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft))),
                y: (event.pageY || (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop)))
            };
        },
        async dragOver(e){
            let ev = e;
            this.removeDragStyle(ev);
            let position = this.getPosition(ev)
            let item = ev.currentTarget;
            let fromX = {
                top: position.y,
                bottom: position.y
            };
            let itemX = item.getBoundingClientRect();
            let half = parseInt((itemX.bottom - itemX.top) / 2);
            let half2 = parseInt(half / 2);
            let range = parseInt(fromX.bottom - itemX.top);
            if(range >= half2 && range <= (half+half2)) {
                ev.currentTarget.classList.add('mxlTreeDrop');
            }else {
                if(range > (half+half2)) {
                    ev.currentTarget.classList.add('mxlTreeDropDown');
                }else if(range < half2){
                    ev.currentTarget.classList.add('mxlTreeDropUp');
                }
            }
        },
        drop(e){
            let ev = e;
            ev.currentTarget.classList.remove('mxlTreeDropUp');
            ev.currentTarget.classList.remove('mxlTreeDropDown');
            ev.currentTarget.classList.remove('mxlTreeDrop');
        },
        /* 单击 */
        touch(d = null){
            this.$emit('touch', !d ? this.data : d);
        },
        /* 触发右键菜单 */
        rightMenuView(event, node, parentNode, nodeVue){
            let ev = event;
            this.$emit('tiggerRight', ev, node, parentNode, nodeVue);
        },
        /* 手动设置选中状态 */
        setCheck(checks){
            let flag = false;
            let primaryKey = this.getData(v, 'primaryKey');
            if(checks.includes(primaryKey)) {
                flag = true;
                this.addCheck(false);
            }else {
                this.removeCheck(false);
            }
            if(flag) {
                //todo 优化删除元素
                checks = checks.filter(v => primaryKey != v);
            }
            //todo 优化传入的checks
            Object.keys(this.$refs).forEach(v => this.$refs[v][0].setCheck(checks));
        },
        /* 获取数据 */
        getData(d, key){
            let str = Object.prototype.toString.call(this._alias[key]);
            return str.slice(8, str.length-1) === 'Function' ? this._alias[key](d) : d[this._alias[key]];
        },
        /* 通知上级节点选中 */
        noticeParentCheck(){
            if(this.check) {
                this.$emit('isCheckAll');
            }else {
                this.$emit(!this.half ? 'isCheckEmpty' : 'isCheckHalf');
            }
        },
        /* 选中节点 */
        addCheck(all = false){
            let checkAll = Object.keys(this.$refs).every(v => this.$refs[v][0].check);
            this.check = checkAll;
            this.half = !checkAll;
            this.noticeParentCheck();
        },
        /* 选空节点 */
        removeCheck(empty = false){
            let refs = Object.keys(this.$refs);
            this.check = false;
            /* 存在选中节点 或 存在半选节点 */
            this.half = !refs.every(v => !this.$refs[v][0].check) || refs.findIndex(v => this.$refs[v][0].half) != -1;
            this.noticeParentCheck();
        },
        /* 设置半选状态 */
        tiggerHalf(index){
            this.half = true;
            this.removeCheck(true, false);
        },
        /* 初始化数据 */
        initData(){
            if(!this.opened) {
                this.open = (this.spreadLevel >= (this.level+1)) || !!this.data.spread;
                this.opened = true;
            }
            if(this.getData(this.data, 'isCheck')) {
                this.check = true;
            }else if(this.getData(this.parentInstance, 'isCheck')) {
                this.repairCheck = true;
                this.check = true;
            }
            this.noticeParentCheck();
        },
        /* 反转展开状态 */
        async toggle(){
            //todo
            if(!this.open) {
                if(this._need_fetch) {
                    try {
                        //let tmp = this.$utils._.cloneDeep(this.data);
                        //todo $set 改变对象属性和 sync 哪个render效率更高呢？
                        this.$set(this.data, this._alias.children, await this.fetch());
                        this.$emit('update:data', this.$utils._.cloneDeep(this.data));
                    }catch(e) {
                        console.log(`fetch tree children error: {${e}}, tree node info:`);
                        try {
                            console.dir(this.data);
                        }catch(ec) {
                            console.log(this.data);
                        }
                    }
                }
            }
            this.open = !this.open;
        },
        /* 递归全选 */
        doCheck(){
            this.half = false;
            this.check = true;
            Object.keys(this.$refs).forEach(v => this.$refs[v][0].doCheck());
        },
        /* 递归全不选 */
        noCheck(){
            this.half = false;
            this.check = false;
            Object.keys(this.$refs).forEach(v => this.$refs[v][0].noCheck());
        },
        /* 递归处理选则 */
        checkInput(){
            this.half = false;
            this.check = !this.check;
            Object.keys(this.$refs).forEach(v => this.check ? this.$refs[v][0].doCheck() : this.$refs[v][0].noCheck());
            this.noticeParentCheck();
        },
        /* 递归获取所有选中项 */
        getChecks(){
            let tmpData = this.$utils._.cloneDeep(this.data);
            tmpData.checks = [];
            if(!this.check && !this.half) {
                return false;
            }

            /* 递归获取子节点选中项 */
            let refs = Object.keys(this.$refs);
            refs.forEach(v => {
                if(this.$refs[v][0].check || this.$refs[v][0].half) {
                    let child = tmpData[this._alias.children][parseInt(v.replace('item', ''))];
                    let childCs = this.$refs[v][0].getChecks();
                    tmpData.checks.push(childCs ? childCs : child);
                }
            });

            tmpData.half = this.half;

            return tmpData.checks.length != 0 || this.check ? tmpData : false;
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
        background-color: #ebedf2;
    }

    .mxlTreeDrop {
        border: 0.3rem dashed #fd7e14;
    }

    .mxlTreeDropUp {
        border-top: 0.5rem dashed #fd7e14;
    }

    .mxlTreeDropDown {
        border-bottom: 0.5rem dashed #fd7e14;
    }
</style>


