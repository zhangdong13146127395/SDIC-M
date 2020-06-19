<template>
    <div class="affairs-list">
        <van-cell-group v-for="(item,index) in itemListData" :key="index" @click="onClick(item.id)">
            <van-cell :value="item.creTime&&item.creTime!==''?item.creTime.split(' ')[0]:''">
                <template slot="title">
                    <span>{{item.approvalName}}的工作联系单</span>
                    <van-tag v-if="item.subflag && item.subflag==='01'" type="warning">审批中</van-tag>
                    <van-tag v-else-if="item.subflag && item.subflag==='03'">已撤销</van-tag>
                    <van-tag v-else-if="item.subflag && item.subflag==='04'" type="danger">审批拒绝</van-tag>
                    <van-tag v-else-if="item.subflag && item.subflag==='02'" type="success">审批完成</van-tag>
                </template>
            </van-cell>
            <van-cell title="协作事由：">
                <template slot="default">
                    <span>{{item.reasons}}</span>
                    <van-icon v-if="item.subflag && item.subflag==='01'" name="volume-o" class="urge" />
                </template>
            </van-cell>
            <van-cell title="发起方：" :value="item.creDeptname" />
            <van-cell title="协作方：">
                <span slot="default" v-for="(each,index2) in item.cooperationList" :key="index2">
                    <span v-if="index2==0">{{each.collaboratorName}}</span>
                    <span v-else>、{{each.collaboratorName}}</span>
                </span>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: "affairs-list",
        props: {
            itemListData: Array,
        },
        data(){
            return {

            }
        },
        mounted(){

        },
        methods: {
            onClick(id){
                this.$router.push({
                    path: '/meeting/job-contact-list-readonly',
                    query: {
                        id:id
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    .affairs-list {
        .van-cell-group {
            padding-bottom: @spacing-2;
        }
        .van-cell:not(:last-child)::after {
            border: none;
        }
        .van-cell {
            padding-top: 0;
            padding-bottom: 0;
        }
        .van-cell__title {
            color: @gray-dark;
        }
        .van-cell__value {
            text-align: left;
            -webkit-box-flex: 3.9;
            -webkit-flex: 3.9;
            flex: 3.9;
        }
        .van-cell:first-child {
            padding-top: @spacing-3;
            padding-bottom: @spacing-2;
            .van-cell__title {
                color: @text-color;
                font-size: @font-size-base;
                -webkit-box-flex: 3;
                -webkit-flex: 3;
                flex: 3;
            }
            .van-cell__value {
                text-align: right;
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                flex: 1;
            }
        }
        .urge {
            position: absolute;
            right: 0;
            top: 0;
            color: #F37327;
            font-size: 24px;
        }
    }
</style>