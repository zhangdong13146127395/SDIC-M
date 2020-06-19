<template>
    <div class="oversee-build-project">
        <oversee-steps :activeNum="activeNum"></oversee-steps>
        <oversee-list-content :listData="listData"></oversee-list-content>
        <oversee-date-tab :timeTab="timeTabs" tabTxt="反馈时间节点"></oversee-date-tab>
        <oversee-downup :downupData="downupDate"></oversee-downup>
        <!--<oversee-task :taskInfo="taskInfo" title="任务计划"></oversee-task>-->
        <oversee-speed :speedInData="speedInData" :padding="true" />
        <sino-workflow />
    </div>
</template>

<script>
    import MixinsLog from './components/mixins/log'
    export default {
        name: "oversee-build-project",
        mixins: [ MixinsLog ],
        components: {
            'oversee-steps': ()=> import('./components/oversee-steps'),
            'oversee-list-content': ()=> import('./components/oversee-list-content'),
            'oversee-date-tab': ()=> import('./components/oversee-date-tab'),
            'oversee-downup': ()=> import('./components/oversee-downup'),
            'oversee-task': ()=> import('./components/oversee-task'),
            'oversee-speed': ()=> import('./components/oversee-speed'),
            'sino-workflow': () => import('@/components/sino-workflow'),
        },
        data: function(){
            return {
                baseUrl: process.env.BASE_URL,
                activeNum: 1,
                downupDate: {
                    tit: "事项备注",
                    summary: "事项备注事项备注事项备注事项备注事项备注事项备注事项项备注事项备注事项备注事项备项备注事项备注事项备注事项备备注事项备注事项备注事项备注事项备注"
                },
                listData: {
                    title: "督办事项立项单",
                    timeNumber: [ "立项时间：2019-07-21", "督办编号：2019024032" ],
                    itemCon: [
                        {
                            type: "TopBottom",
                            txt1: "事项内容",
                            txt2: "努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸港区有协同效应的铁路运输专线并购",

                        },
                        {
                            txt1: "督办类型",
                            txt2: "年度计划督办"
                        },
                        {
                            txt1: "督办联络员",
                            txt2: "张力"
                        },
                        {
                            txt1: "主承办单位",
                            txt2: "综合部"
                        },
                        {
                            txt1: "督办来源",
                            txt2: "公司决议"
                        },
                        {
                            txt1: "公文关联",
                            txt2: "关于xxxx会议决议的决定"
                        },
                        {
                            txt1: "协承办单位",
                            txt2: "国投智能，国投xx"
                        },
                        {
                            txt1: "办结期限",
                            txt2: "2019-11-01"
                        },
                        {
                            type: "LeftRight",
                            txt1: "制定计划",
                            txt2: "是"
                        },
                        {
                            txt1: "事项级别",
                            txt2: "A-月度反馈"
                        }
                    ]
                },
                timeTabs: [
                    "2019-07-09",
                    "2019-07-09",
                    "2019-07-09",
                    "2019-07-09",
                    "2019-07-09",
                    "2019-07-09",
                    "2019-07-09",
                    "2019-07-09",
                    "2019-07-09",
                    "2019-07-09"
                ],
                speedInData: [
                    {
                        type: "fujian",
                        con: [
                            {
                                type: "word",
                                info: "附件内容附件内容附件内容附件内容附件内容附件内容附件内容"
                            },
                            {
                                type: "excel",
                                info: "表格附件表格附件表格附件表格附件表格附件表格附件表格附件表格附件"
                            }
                        ]
                    }
                ]
            }
        },
        methods: {

        },
        mounted(){

        },
        computed:{

        },
    }
</script>

<style lang="less">

</style>