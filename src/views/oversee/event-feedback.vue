<template>
    <div class="oversee-event-feedback">
        <oversee-steps :activeNum="activeNum"></oversee-steps>
        <oversee-list-content :listData="listData"></oversee-list-content>
        <oversee-test-tab></oversee-test-tab>
        <oversee-tab :timeTab="timeTabs" tabTxt="反馈时间节点"></oversee-tab>
        <oversee-task :taskInfo="taskInfo" title="任务计划"></oversee-task>
        <sino-workflow />
    </div>
</template>

<script>
    import MixinsLog from './components/mixins/log'
    export default {
        name: "oversee-event-feedback",
        mixins: [ MixinsLog ],
        components: {
            'oversee-steps': ()=> import('./components/oversee-steps'),
            'oversee-list-content': ()=> import('./components/oversee-list-content'),
            'oversee-test-tab': ()=> import('./components/oversee-test-tab'),
            'oversee-tab': ()=> import('./components/oversee-tab'),
            'oversee-task': ()=> import('./components/oversee-task'),
            'sino-workflow': () => import('@/components/sino-workflow')
        },
        data: function(){
            return {
                baseUrl: process.env.BASE_URL,
                activeNum: 3,
                listData: {
                    title: "督办事项反馈",
                    itemCon: [
                        {
                            type: "TopBottom",
                            txt1: "事项内容",
                            txt2: "努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸港区有协同效应的铁路运输专线并购",

                        },
                        {
                            type: "progress",
                            txt1: "事项总进度",
                            number: 56
                        },
                        {
                            txt1: "本次反馈进度",
                            txt2: "22%"
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
                taskInfo: [
                    {
                        title: "任务1",
                        number: "26%",
                        date: "2019/09/23-2019/09/29",
                        con: [ "计划说明计划说明计划说明计划说明计划说明计划说明计划说明计计划说明计划说明计划说明" ],
                        name: "奚望（信息化一部）",
                        speedInData: [
                            {
                                type: "jindu",
                                number: "25%",
                                con: "反馈内容反馈内容反馈内容反馈内容馈内容反馈内容反馈内容反馈内容反馈内容反馈内容"
                            },
                            {
                                type: "fujian",
                                con: [
                                    {
                                        type: "word",
                                        info: "附件内容附件内容附件内容附件内容附件内容附件内容附件内容"
                                    },
                                ]
                            },
                            {
                                type: "guanlian",
                                con: [
                                    {
                                        info: "关联公文关联公文关联公文关联公文关联公文关联公文关联公文关联公文",
                                        id: "32815893414986816"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    }
</script>

<style lang="less">

</style>