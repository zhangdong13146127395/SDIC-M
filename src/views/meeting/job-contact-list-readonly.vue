<!-- 只读的工作联系单 -->
<template>
    <div class="job-contact-list-readonly">
        <van-cell-group class="user-name" :border="false">
            <van-cell :value="`${listData.approvalName}的工作联系单`" :border="false" />
            <van-cell title="审批编号" :value="listData.number" :border="false" />
            <van-cell title="所在部门" :value="listData.department" :border="false" />
            <van-cell title="协作事由" :value="listData.reasons" :border="false" />
            <van-cell title="发起方" :value="listData.creDeptname" :border="false" />
        </van-cell-group>
        <van-cell-group
            v-for="(item,index) in listData.cooperationList"
            :key="index"
            :border="false"
        >
            <van-cell :value="`协作事项${index+1}`" :border="false" />
            <van-cell title="协作方" :value="item.collaboratorName" :border="false" />
            <van-cell
                title="协作事由"
                :border="false"
            >
                <span slot="default" v-for="(each,index2) in item.mattersList" :key="index2">
                    <span v-if="index2==0">{{each.matterContent}}</span>
                    <span v-else>、{{each.matterContent}}</span>
                </span>
            </van-cell>
            <van-cell title="完成日期" :value="item.completionDate" :border="false" />
        </van-cell-group>
        <van-steps direction="vertical" :active="stepsData.length-1" inactive-icon="checked">
            <van-step v-for="(item,index) in stepsData" :key="index" class="item">
                <div class="clearfix">
                    <span class="tit fl">{{item.tit}}</span>
                    <span class="time fr">{{item.time}}</span>
                </div>
                <p class="name">{{item.name}}</p>
                <p class="summary">{{item.summary}}</p>
            </van-step>
        </van-steps>
    </div>
</template>

<script>
    import { getJobConnect } from '@/api/meeting/meetingApi.js'
    export default {
        name: "job-contact-list-readonly",
        components: {},
        data(){
            return {
                listData: {},
                stepsData: [],
            }
        },
        mounted(){
            this.getData();
            this.getSteps();

        },
        methods: {
            async getData () {
                if(this.$route.query.id && this.$route.query.id!==''){
                    this.listData=await getJobConnect(this.$route.query.id);
                }
            },

            getSteps(){
                let data=[
                    {
                        tit: '发起申请',
                        time: '2018-10-23 16:21',
                        name: '张三',
                    },
                    {
                        tit: '已转',
                        time: '2018-10-23 16:21',
                        name: '张三',
                        summary: '忙处理下@李四',
                    },
                    {
                        tit: '审批中',
                        time: '2018-10-23 16:21',
                        name: '李四',
                    },
                ];
                this.stepsData=data;
            }
        }
    }
</script>

<style lang="less">
    .job-contact-list-readonly {
        .van-cell:first-child .van-cell__value {
            background-color: #efefef;
        }
        .user-name .van-cell:first-child .van-cell__value {
            background-color: #fff;
            font-size: 18px;
            line-height: 36px;
            border-bottom: 1px solid #efefef;
        }
        .van-cell {
            padding-top: @spacing-1;
            padding-bottom: @spacing-2;
        }
        .van-cell__title {
            padding-left: @spacing-1;
            color: @gray-dark;
        }
        .van-cell__value {
            -webkit-box-flex: 4;
            -webkit-flex: 4;
            flex: 4;
            text-align: left;
            color: @text-color;
            padding-left: @spacing-1;
        }
        [class*='van-hairline']::after {
            border: none;
        }
        .van-steps {
            margin-top: @spacing-3;
            .van-step {
                color: #07C160;
            }
            .tit {
                color: @blue;
            }
            .time {
                color: @gray-dark;
            }
            .name {
                color: @text-color;
            }
            .summary {
                color: @gray-dark;
            }
            .van-step--finish .van-step__line {
                background-color: #ebedf0;
            }
            .van-step--process {
                .tit {
                    color: #E55B17;
                }
            }
        }
    }
</style>