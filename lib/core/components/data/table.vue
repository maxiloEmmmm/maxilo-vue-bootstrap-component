<template>
    <div class="mxl-table-wrapper">
        <div class="__edit-area">
            <mxl-btn :class="newRowBtnClass" @click="editNewRow">新的一行</mxl-btn>
        </div>
        <table class="table table-hover table-condensed table-bordered" :class="tableClass"  ref="loading" v-mxl-loading:w10="loading" mxl-loading-text="加载数据中...">
            <!-- 表头 -->
            <thead v-show="!isCard">
                <!-- 表头渲染 -->
                <tr class="active" style="cursor: pointer">
                    <!-- 存在展开 或 复选 -->
                    <th :style="_th_tool_style" v-if="_needHelpTh"></th>
                    <!-- 表头列渲染 -->
                    <th v-for="(th, thIndex) in _show_ths" :key="thIndex"
                        @click="() => !th.sort ? '' : toSort(th.field, sort[0] === th.field ? (sort[1] == 'desc' ? 'asc' : 'desc') : 'asc')"
                        :style="th._style" :class="[th.sort ? 'mxl-table-th-sort' : '', sort[0] === th.field ? (sort[1] === 'asc' ? 'mxl-table-sort-asc' : 'mxl-table-sort-desc') : '']">
                        <template v-if="th.thSlot">
                            <mxl-render :render="h => fieldRender(th.thSlot, th, {})"></mxl-render>
                        </template>
                        <template v-else>
                            {{ th.title }}
                        </template>
                    </th>
                </tr>
            </thead>
            <!-- 表 -->
            <tbody class="mxl-table-tbody">
                <!-- 行渲染 -->
                <template v-for="(view, viewIndex) in viewer">
                    <tr :key="viewIndex + '_show_th'" @click.="">
                        <!-- 存在展开 或 复选 -->
                        <td v-if="_needHelpTh">
                            <i 
                                :class="[
                                    'fa', 
                                    'fa-chevron-' + (hideTrShow[viewIndex] ? 'down' : 'right')
                                ]" 
                                style="cursor: pointer"
                                aria-hidden="true"
                                :title="'点击' + (hideTrShow[viewIndex] ? '收起' : '展开') + ' yo~'"
                                @click="toggleHide(viewIndex)"
                                v-if="_hasHideThs">
                            </i>
                            <input v-if="useCheck" type="checkbox" v-model="checks" :value="view[token]">
                        </td>
                        <!-- 列渲染 -->
                        <td v-for="(th, thIndex) in _show_ths" :key="thIndex" :style="th._style">
                            <!-- fix ds[viewIndex] not view: v-model need data not computed. -->
                            <componment :is="view.__td_wrapper_tpl && th.type ? 'a-popover' : 'div'" style="width:100%;height:100%;">
                                <template v-if="th.tdSlot">
                                    <mxl-render :render="h => fieldRender(th.tdSlot, th, view, viewIndex, thIndex)"></mxl-render>
                                </template>
                                <template v-else>
                                    {{ view[th.field] }}
                                </template>
                                <div slot="content" v-if="view.__td_wrapper_tpl && th.type">
                                    <component :is="'mxl-'+th.type" v-model="ds[viewIndex][th.field]"></component>
                                </div>
                            </componment>
                        </td>
                    </tr>
                    <!-- 处理隐藏数据列 -->
                    <tr v-if="_hasHideThs" v-show="hideTrShow[viewIndex]" :key="viewIndex + '_hide_th'">
                        <td :colspan="_th_len">
                            <!-- 自定义渲染 -->
                            <template v-if="tdHideSlot">
                                <mxl-render :render="h => fieldRender(tdHideSlot, _hide_ths, view, viewIndex)"></mxl-render>
                            </template>
                            <!-- 规规矩矩来 -->
                            <template v-else>
                                <dl class="dl-horizontal">
                                    <template v-for="(th, thIndex) in _hide_ths">
                                        <!-- 标题渲染 -->
                                        <dt :key="thIndex + '_dt'">
                                            <template v-if="th.thSlot">
                                                <mxl-render :render="h => fieldRender(th.thSlot, th, view, viewIndex)"></mxl-render>
                                            </template>
                                            <template v-else>
                                                {{ th.title }}
                                            </template>
                                            <!-- sort -->
                                            <template v-if="th.sort">
                                                <i :class="['fa', 'fa-caret-up', 'hand', 'noActiveSort', {activeSort: sort[0] === th.field && sort[1] === 'asc'}]" aria-hidden="true" @click="toSort(th.field, 'asc')"></i>
                                                <i :class="['fa', 'fa-caret-down', 'hand', 'noActiveSort', {activeSort: sort[0] === th.field && sort[1] === 'desc'}]" aria-hidden="true" @click="toSort(th.field, 'desc')"></i>
                                            </template>
                                        </dt>
                                        <!-- 数据渲染 -->
                                        <dd :key="thIndex + '_dd'">
                                            <template v-if="th.tdSlot">
                                                <mxl-render :render="h => fieldRender(th.tdSlot, th, view, viewIndex)"></mxl-render>
                                            </template>
                                            <template v-else>
                                                {{ view[th.field] }}
                                            </template>
                                        </dd>
                                    </template>
                                    <dt></dt>
                                    <dd class="text-right"><mxl-btn size="xs" @click="toggleHide(viewIndex)">收起</mxl-btn></dd>
                                </dl>
                            </template>
                        </td>
                    </tr>
                </template>
            </tbody>
            <!-- 表脚 - - -->
            <tfoot>
                <tr>
                    <td :colspan="_th_len" class="text-center">
                        <mxl-alert v-show="!loading && !_has_viewer" class="mxl-table-no-data-alert">暂无数据</mxl-alert>
                        <!-- 分页 -->
                        <mxl-paginate
                            v-if="dsTotal"
                            :page-count="_pageCount"
                            :prev-text="'上一页'"
                            :next-text="'下一页'"
                            :initial-page="currentPage-1"
                            :click-handler="changePage"
                            containerClass="pagination pagination-sm mxl-table-pagination-no-m"
                            :page-link-class="isCard ? 'mxl-table-pagination-xs page-link' : 'page-link'"
                            :prev-link-class="isCard ? 'mxl-table-pagination-xs page-link' : 'page-link'"
                            page-class="page-item"
                            prev-class="page-item"
                            next-class="page-item"
                            :next-link-class="isCard ? 'mxl-table-pagination-xs page-link' : 'page-link'">
                        </mxl-paginate>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
import async from '../mixs/async.vue';
export default {
    mixins: [async],
    name: 'mxlTable',
    data(){
        return {
            /* 数据仓库 */
            ds: [],
            /* 总数据数目 */
            dsTotal: 1,
            /* 隐藏数据显示控制 */
            hideTrShow: [],
            /* 卡片模式 */
            isCard: false,
            /* 已选数据 */
            checks: [],
            /* 排序字段及排序方法 */
            sort: [],
            /* 当前页 */
            currentPage: 1,
            /* 数据等待状态 */
            loading: false,
            token: this.$utils.tool.random('table'),
            edit_item: ''
        };
    },
    computed: {
        /* 展示数据 */
        viewer(){
            let ds = [];
            if(!this.url) {
                let len = (this.currentPage - 1) * this._list_item_size;
                ds = this.ds.slice(len, len + this._list_item_size);
            }else {
                ds = this.ds;
            }
            return ds;
        },
        _has_viewer(){
            return this.viewer.length !== 0;
        },
        /* 表头基础样式 */
        _th_style(){
            return {
                //background: '#fff'
            };
        },
        /* 工具列样式 */
        _th_tool_style(){
            return this.$utils._.merge({}, {
                width: this.toolColWidth
            }, this._th_style);
        },
        /* 最终表头 */
        _ths(){
            return this.ths.map(v => {
                let tmp = {
                    textAlign: v.align ? v.align : 'center',
                    position: 'relative'
                };
                if(v.width !== undefined) {
                    tmp.width = v.width;
                }
                /* 表头样式 */
                v._style = this.$utils._.merge({}, tmp, this._th_style);
                return v;
            });
        },
        /* 需隐藏列 */
        _hide_ths(){
            return this.isCard ? this._ths : this._ths.filter(v => v.hide);
        },
        /* 需显示列 */
        _show_ths(){
            return this.isCard ? [] : this._ths.filter(v => !v.hide);
        },
        /* 存在需隐藏的列 */
        _hasHideThs(){
            return this.isCard || this._hide_ths.length !== 0;
        },
        /* 是否添加帮助列: 复选 及 展开隐藏开关 */
        _needHelpTh(){
            return this._hasHideThs || this.useCheck;
        },
        /* 表头数 */
        _th_len(){
            return this._show_ths.length + (this._needHelpTh ? 1 : 0)
        },
        /* 是否存在已展开 */
        _hasOpening(){
            return Object.keys(this.hideTrShow).filter(v => this.hideTrShow[v]).length !== 0;
        },
        _list_item_size(){
            return this.is_edit ? this.dsTotal : this.listItemSize
        },
        /* 根据显示条数计算页数 */
        _pageCount(){
            return this._list_item_size == 0 ? this.dsTotal : Math.ceil(this.dsTotal / this._list_item_size);
        }
    },
    props: {
        /* 表头 */
        ths: {
            default(){
                return [];
            }
        },
        /* 基础数据 */
        data: {
            default(){
                return [];
            }
        },
        /* 隐藏列自渲染槽名 */
        tdHideSlot: {
            default: ''
        },
        /* 每页显示多少条 */
        listItemSize: {
            default: 3
        },
        /* 复选、展开列宽度占比 */
        toolColWidth: {
            default: 'auto'
        },
        /* 是否初始化 */
        init: {
            default: true
        },
        /* 数据等待model */
        value: {
            default: false
        },
        useCheck: {
            default: false
        },
        is_edit: {
            default: false
        },
        newRowBtnClass: {
            default: ''
        },
        tableClass: {
            default: ''
        }
    },
    watch: {
        data: {
            deep: true,
            handler(){
                this.render(this.data);
            }
        },
        loading(){
            this.$emit('input', this.loading);
        },
        value(){
            this.loading = this.value;
        }
    },
    async mounted () {
        if(this.init) {
            this.render(await this.fetchData());
        }
        window.addEventListener('resize', this.listenCard);
    },
    methods: {
        editNewRow(){
            let tmp = {};
            this.ths.forEach(v => {
                if(v.field) {
                    tmp[v.field] = v.default_value;
                }
            });
            this.ds.push(this.itemInit(tmp, this.dsTotal));
            this.dsTotal++;
        },
        /* 刷新表格 */
        async refresh(){
            this.render(await this.fetchData());
        },
        /* 排序刷新 */
        async toSort(field, order) {
            this.sort = [field, order];
            this.render(await this.fetchData());
        },
        /* 获取数据 */
        async fetchData(){
            /* 异步获取 */
            if(this.url !== '') {
                this.ds = [];
                this.loading = true;
                let data = await this.fetch();
                this.loading = false;
                return data;
            }
            /* 本地数据 */
            return this.data;
        },
        /* 用于async模块获取请求参数 */
        getParams(){
            return {
                orderField: this.sort[0],
                orderBy: this.sort[1],
                page: this.currentPage,
                start: (this.currentPage - 1) * this._list_item_size,
                limit: this._list_item_size
            };
        },
        /* 切换页 */
        async changePage(n){
            this.currentPage = n;
            await this.$nextTick();
            this.render(await this.fetchData());
        },
        itemInit(item, index){
            item[this.token] = index;
            item.isCheck !== undefined && !!item.isCheck && this.checks.push(index);
            
            item.__td_wrapper_tpl = this.is_edit ? 'a-popover' : 'div';
            return item;
        },
        /* 渲染 */
        async render(ds){
            this.checkNone();

            let tmp = {};
            if(this.$utils.base.getType(ds) === 'Array') {
                tmp.dsTotal = ds.length;
                tmp.ds = ds;
            }else {
                tmp.ds = ds.rows;
                tmp.dsTotal = ds.total;
            }
            tmp.ds = tmp.ds.map((v, i) => this.itemInit(v, i));
            if(this.url == '' && this.sort[0] !== undefined) {
                let field = this.ths.filter(v => {
                    return v.field == this.sort[0]
                });
                let baseFunc = field.sortHandler ? field.sortHandler : () => (pre, next) => {
                    let r = pre[this.sort[0]] > next[this.sort[0]]
                    return !this.sort[1] ||this.sort[1] == 'asc' ? r : !r;
                };
                tmp.ds = tmp.ds.sort(baseFunc(this.sort));
            }
            this.ds = tmp.ds;
            this.dsTotal = tmp.dsTotal;
            this.listenCard();
        },
        /* 表格自渲染 */
        fieldRender(slot, th, view, index, thIndex){
            return this.$scopedSlots[slot]({th, view, index, thIndex});
        },
        /* 反转隐藏数据列显示 */
        toggleHide(index){
            this.$set(this.hideTrShow, index, !this.hideTrShow[index]);
        },
        /* 监听卡片视图 */
        async listenCard(){
            await this.$nextTick();
            let len = document.body.clientWidth < 768;
            let tmp = {};
            this.viewer.forEach((v, k) => {
                tmp[k] = len;
            });
            this.hideTrShow = tmp;
            this.isCard = len;
        },
        /* 获取勾选数据接口
         * [{id: 1, n: 'x'}, {id: 2, n: 'x2'}]
         * getCheckData('id') || getCheckData(['id']) -> [{id: 1}, {id: 2}]
         * getCheckData('id', true) || getCheckData(['id'], true) -> [1, 2]
         * */
        getCheckData(keys = [], only = false){
            if(this.$utils.base.getType(keys) === 'String') {
                keys = [keys];
            }
            return this.viewer.filter((v, k) => this.checks.includes(k)).map(v => {
                if(keys.length !== 0 && keys.length !== Object.keys(v).length && !only) {
                    let tmp = {};
                    Object.keys(v).forEach((key) => {
                        if(keys.includes(key)) {
                            tmp[key] = v[key];
                        }
                    });
                    return tmp;
                }else if(keys.length === 1 && only) {
                    return v[keys[0]];
                }else {
                    return v;
                }
            });
        },
        getData(){
            return this.ds;
        },
        /* 全选接口 */
        checkAll(){
            this.checks = this.viewer.map((v, i) => i);
        },
        /* 清空选择接口 */
        checkNone(){
            this.checks = [];
        },
        /* 反选接口 */
        checkToggle(){
            this.checks = this.viewer.map((v, i) => !this.checks.includes(i));
        }
    }
};
</script>

<style lang="scss">
    .mxl-table-wrapper {
        & .__edit-area {
            display: flex;
            margin-bottom: 10px;
        }
    }
    .ant-popover {
        //fix: bootstrap modal.
        z-index:1050 !important;
    }
    /* 收起按钮 */
    .hideToggleBtn {
        text-align: right;
    }
    /* 小型分页 */
    .mxl-table-pagination-xs {
        padding: 3px 6px !important;
    }
    /* 手型 */
    .hand {
        cursor: pointer;
    }
    /* 没激活的排序 */
    .noActiveSort {
        color: #cecece;
    }

    .mxl-table-pagination-no-m {
        margin: 0;
    }

    .mxl-table-no-data-alert {
        margin-bottom: 0;
    }

    .mxl-table-tbody td {
        vertical-align: middle !important;
    }

    .mxl-table-th-sort:after, .mxl-table-th-sort:before {
        position: absolute;
        bottom: .9em;
        display: block;
        opacity: .3;
    }

    .mxl-table-th-sort:before {
        right: 1em;
        content: "\2191";
    }

    .mxl-table-th-sort:after {
        right: .5em;
        content: "\2193";
    }

    /* 激活的排序 */
    .mxl-table-sort-desc:after, .mxl-table-sort-asc:before{
        opacity: 1;
    }
</style>


