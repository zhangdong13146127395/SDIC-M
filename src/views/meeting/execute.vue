<!-- 执行的会务 -->
<template>
    <div class="execute">
        <!-- 顶部 待办、已办切换 -->
        <div class="top-tab">
            <van-tabbar v-model="topTabsActive" :fixed="false" :border="true" @change="change">
                <van-tabbar-item name="db">待办</van-tabbar-item>
                <van-tabbar-item name="yb">已办</van-tabbar-item>
            </van-tabbar>
        </div>

        <!-- 搜索框 + 筛选弹窗 -->
        <div class="search-screening">
            <van-search
                    v-model="searchValue"
                    placeholder="请输入搜索关键词"
                    show-action
                    shape="round"
                    background="#fff"
                    @search="onSearch"
            >
                <div slot="action" @click="onScreening">
                    <span>筛选</span>
                </div>
            </van-search>
            <van-popup v-model="screeningPopup" position="top" @click-overlay="onCancel">
                <van-cell value="状态" />
                <van-tabs
                        v-model="screeningTabs.active"
                        type="card"
                        title-active-color="#E55B17"
                        title-inactive-color="#333333"
                >
                    <van-tab title="全部" />
                    <van-tab title="审批完成" />
                    <van-tab title="审批中" />
                    <van-tab title="已撤销" />
                </van-tabs>
                <van-row>
                    <van-col span="12">
                        <van-button type="default" @click="onCancel">取消</van-button>
                    </van-col>
                    <van-col span="12">
                        <van-button type="info" @click="onConfirm">确定</van-button>
                    </van-col>
                </van-row>
            </van-popup>
        </div>

        <sino-list
            class="sino-list"
            ref="sinoList"
            v-model="listData"
            :page-size="page.pageSize"
            :head-height="40"
            min-height="calc(100vh - 5.49333rem)"
            placeholder-height="1.33333rem"
            :load="onLoad"
        >
            <!-- 切换列表 -->
            <affairs-list :itemListData="listData"/>
        </sino-list>
    </div>
</template>

<script>
    import request from '@/plugin/axios'
    import { listAffairExecute } from '@/api/meeting/meetingApi.js'
    export default {
        name: "execute",
        components: {
            'sino-list': () => import('@/components/sino-list'),
            'affairs-list': ()=>import('./components/affairs-list'),
        },
        data(){
            return{
                topTabsActive: 'yb',  // 顶部 待办、已办 切换，当前项的 name

                searchValue:'',  // 搜索框内容

                screeningPopup: false,  // 筛选弹窗显示与隐藏

                screeningTabs: {  // 筛选弹窗内部Tab切换
                    active: 0,  // 当前项 索引
                    confirmActive: 0,  // 确定之后的 当前项 索引
                },

                listData: [],  // 列表数据

                page: {
                    pageNum: 1,
                    pageSize: 10,
                }
            }
        },
        mounted(){

        },
        methods: {

            change(){
                this.$refs['sinoList'].onRefresh();
            },

            async onLoad (page) {
                return await listAffairExecute({status:this.topTabsActive, ...page});
            },

            // 点击 筛选按钮
            onScreening(){
                this.screeningPopup=true;
            },

            // 筛选弹窗 点击取消按钮
            onCancel(){
                this.screeningPopup=false;
                this.screeningTabs.active=this.screeningTabs.confirmActive;
            },

            // 筛选弹窗 点击确定按钮
            onConfirm(){
                this.screeningPopup=false;
                this.screeningTabs.confirmActive=this.screeningTabs.active;
            },

            // 搜索
            onSearch(){
                request({
                    method: 'post',
                    url: '',
                    data: {
                        keyWords: this.searchValue,
                    }
                })
            },
        }
    }
</script>

<style lang="less">
    .execute {
        /* 顶部 待办、已办切换 样式开始： */
        .top-tab {
            .van-tabbar-item__text {
                font-size: @font-size-base;
            }
            .van-info {
                margin-top: 0;
                right: -16px;
            }
            .van-tabbar-item {
                border-bottom: 2px solid @white;
            }
            .van-tabbar-item--active {
                border-bottom: 2px solid @blue;
            }
        }
        /* 顶部 待办、已办切换 样式结束。 */

        /* 搜索框+筛选弹窗 样式开始： */
        .search-screening {
            background-color: #fff;
            .van-search {
                background-color: #f7f8fA !important;
            }
            .van-search__content {
                background-color: @white;
            }
            .van-popup {
                padding-top: @spacing-3;
                .van-cell {
                    padding-left: 40px;
                }
                .van-cell:not(:last-child)::after {
                    border: none;
                }
                .van-cell__value {
                    color: @gray-darker;
                    font-size: @font-size-base;
                }
            }
            .van-tabs__wrap {
                height: auto;
                overflow: visible;
            }
            .van-tabs__nav--card {
                border: none;
                margin: 0;
                height: auto;
                display: block;
                overflow: hidden;
                padding-top: @spacing-1;
                padding-bottom: @spacing-2;
                .van-tab {
                    float: left;
                    border: none;
                    padding: 0;
                    width: 125px;
                    flex: 0 1 auto;
                    margin-left: 42px;
                    margin-bottom: @spacing-5;
                    background-color: #F2F2F2;
                    height: 32px;
                    line-height: 32px;
                    border-radius: 4px;
                }
                .van-tab.van-tab--active {
                    background-color: #FFE0D0;
                }
            }
            .van-row {
                border-top: 1px solid @gray-light;
                .van-button {
                    border-radius: 0;
                }
                .van-button--normal{
                    padding: 0;
                    width: 100%;
                    border: none;
                    outline: none;
                    font-size: @font-size-base;
                }
            }
        }
        /* 搜索框+筛选弹窗 样式结束。 */
    }
</style>