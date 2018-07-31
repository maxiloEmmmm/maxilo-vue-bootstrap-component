<template>
    <table class="table table-hover table-bordered table-condensed">
        <!-- 表头 -->
        <thead v-show="!isCard">
            <!-- 表头渲染 -->
            <tr class="active">
                <!-- 存在展开 或 复选 -->
                <th :style="_th_tool_style"></th>
                <!-- 表头列渲染 -->
                <th v-for="(th, thIndex) in _show_ths" :key="thIndex"
                    :style="th._style">
                    <template v-if="th.thSlot">
                        <mxl-render :render="h => fieldRender(th.thSlot, th, {})"></mxl-render>
                    </template>
                    <template v-else>
                        {{ th.title }}
                    </template>
                    <!-- sort -->
                    <div style="display: inline-block" v-if="th.sort">
                        <div>
                            <i :class="['fa', 'fa-caret-up', 'hand', 'noActiveSort', {activeSort: sort[0] === th.field && sort[1] === 'asc'}]" aria-hidden="true" @click="toSort(th.field, 'asc')"></i>
                        </div>
                        <div>
                            <i :class="['fa', 'fa-caret-down', 'hand', 'noActiveSort', {activeSort: sort[0] === th.field && sort[1] === 'desc'}]" aria-hidden="true" @click="toSort(th.field, 'desc')"></i>
                        </div>
                    </div>
                </th>
            </tr>
        </thead>
        <!-- 表 -->
        <tbody>
            <tr v-show="loading">
                <td :colspan="_th_len" class="text-center">
                    <mxl-loading ref="treeLoading" v-model="loading">加载数据中...</mxl-loading>
                </td>
            </tr>
            <tr v-show="!loading && !_has_viewer">
                <td :colspan="_th_len" class="text-center">
                    <mxl-alert class="mxl-table-no-data-alert">暂无数据</mxl-alert>
                </td>
            </tr>
            <!-- 行渲染 -->
            <template v-for="(view, viewIndex) in viewer">
                <tr :key="viewIndex + '_show_th'">
                    <!-- 存在展开 或 复选 -->
                    <td>
                        <i 
                            :class="[
                                'fa', 
                                'fa-chevron-' + (hideTrShow[viewIndex] ? 'down' : 'right')
                            ]" 
                            style="cursor: pointer"
                            aria-hidden="true"
                            :title="'点击' + (hideTrShow[viewIndex] ? '收起' : '展开') + ' yo~'"
                            @click="toggleHide(viewIndex)"
                            v-show="_needHelpTh">
                        </i>
                        <input type="checkbox" v-model="checks" :value="view[token]">
                    </td>
                    <!-- 列渲染 -->
                    <td v-for="(th, thIndex) in _show_ths" :key="thIndex" 
                        :style="th._style">
                        <template v-if="th.tdSlot">
                            <mxl-render :render="h => fieldRender(th.tdSlot, th, view)"></mxl-render>
                        </template>
                        <template v-else>
                            {{ view[th.field] }}
                        </template>
                    </td>
                </tr>
                <!-- 处理隐藏数据列 -->
                <tr v-if="_hasHideThs" v-show="hideTrShow[viewIndex]" :key="viewIndex + '_hide_th'">
                    <td :colspan="_th_len">
                        <!-- 自定义渲染 -->
                        <template v-if="tdHideSlot">
                            <mxl-render :render="h => fieldRender(tdHideSlot, _hide_ths, view)"></mxl-render>
                        </template>
                        <!-- 规规矩矩来 -->
                        <template v-else>
                            <dl class="dl-horizontal">
                                <template v-for="(th, thIndex) in _hide_ths">
                                    <!-- 标题渲染 -->
                                    <dt :key="thIndex + '_dt'">
                                        <template v-if="th.thSlot">
                                            <mxl-render :render="h => fieldRender(th.thSlot, th, view)"></mxl-render>
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
                                            <mxl-render :render="h => fieldRender(th.tdSlot, th, view)"></mxl-render>
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
                    <!-- 分页 -->
                    <mxl-paginate
                        v-if="dsTotal"
                        :page-count="_pageCount"
                        :prev-text="'Prev'"
                        :next-text="'Next'"
                        :initial-page="currentPage-1"
                        :click-handler="changePage"
                        containerClass="pagination pagination-sm mxl-table-pagination-no-m"
                        :page-link-class="isCard ? 'mxl-table-pagination-xs' : ''"
                        :prev-link-class="isCard ? 'mxl-table-pagination-xs' : ''"
                        :next-link-class="isCard ? 'mxl-table-pagination-xs' : ''">
                    </mxl-paginate>
                </td>
            </tr>
        </tfoot>
    </table>
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
            token: this.$utils.tool.random('table')
        };
    },
    computed: {
        /* 展示数据 */
        viewer(){
            let len = (this.currentPage - 1) * this.listItemSize;
            let ds = this.ds.slice(len, len + this.listItemSize);
            return ds;
        },
        _has_viewer(){
            return this.viewer.length !== 0;
        },
        /* 最终别名 */
        _alias(){
            let baseAlias = {
                align: 'align',
                title: 'title',
                primaryKey: 'id'
            };
            Object.keys(baseAlias).forEach(v => {
                if(this.alias[v]) {
                    baseAlias[v] = this.alias[v];
                }
            });
            return baseAlias;
        },
        /* 表头基础样式 */
        _th_style(){
            return {
                background: '#fff'
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
                    textAlign: v[this._alias.align] ? v[this._alias.align] : 'center',
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
            return this._hasHideThs;
        },
        /* 表头数 */
        _th_len(){
            return this._show_ths.length + 1
        },
        /* 是否存在已展开 */
        _hasOpening(){
            return Object.keys(this.hideTrShow).filter(v => this.hideTrShow[v]).length !== 0;
        },
        /* 根据显示条数计算页数 */
        _pageCount(){
            return Math.ceil(this.dsTotal / this.listItemSize);
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
        /* 别名 */
        alias: {
            default(){
                return {};
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
            this.render(await this.getData());
        }
        window.addEventListener('resize', this.listenCard);
    },
    methods: {
        /* 刷新表格 */
        async refresh(){
            this.render(await this.getData());
        },
        /* 排序刷新 */
        async toSort(field, order) {
            this.sort = [field, order];
            this.render(await this.getData());
        },
        /* 获取数据 */
        async getData(){
            /* 异步获取 */
            if(this.url !== '') {
                this.ds = [];
                return await this.$refs.treeLoading.wait(async () => {
                    return await this.fetch();
                });
            }
            /* 本地数据 */
            return this.data;
        },
        /* 用于async模块获取请求参数 */
        getParams(){
            return {
                orderField: this.sort[0],
                orderBy: this.sort[1],
                page: this.currentPage
            };
        },
        /* 切换页 */
        async changePage(n){
            this.currentPage = n;
            await this.$nextTick();
            this.render(await this.getData());
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
            this.ds = tmp.ds.map((v, i) => {
                v[this.token] = i;
                v.isCheck !== undefined && !!v.isCheck && this.checks.push(i);
                return v;
            });
            this.dsTotal = tmp.dsTotal;
            this.listenCard();
        },
        /* 表格自渲染 */
        fieldRender(slot, th, view){
            return this.$scopedSlots[slot]({th, view});
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

<style>
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
    /* 激活的排序 */
    .activeSort {
        color: #33CC33;
    }

    .mxl-table-pagination-no-m {
        margin: 0;
    }

    .mxl-table-no-data-alert {
        margin-bottom: 0;
    }
</style>


