<template>
    <div class="oversee-formulate-plan">
        <oversee-steps :activeNum="activeNum"></oversee-steps>
        <oversee-list-content :listData="listData"></oversee-list-content>
        <oversee-task :taskInfo="taskInfo" title=""></oversee-task>
        <sino-workflow />
    </div>
</template>

<script>
    import MixinsLog from './components/mixins/log'
    export default {
        name: "oversee-formulate-plan",
        mixins: [ MixinsLog ],
        components: {
            'oversee-steps': ()=> import('./components/oversee-steps'),
            'oversee-list-content': ()=> import('./components/oversee-list-content'),
            'oversee-task': ()=> import('./components/oversee-task'),
            'sino-workflow': () => import('@/components/sino-workflow')
        },
        data: function(){
            return {
                baseUrl: process.env.BASE_URL,
                activeNum: 2,
                listData: {
                    title: "督办工作计划",
                    itemCon: [
                        {
                            type: "TopBottom",
                            txt1: "事项内容",
                            txt2: "努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸港区有协同效应的铁路运输专线并购",

                        },
                        {
                            txt1: "任务分解方式",
                            txt2: "按任务权重"
                        },
                        {
                            txt1: "事项办结期限",
                            txt2: "2020-02-01"
                        },
                        {
                            type: "TopBottom",
                            txt1: "计划制定说明",
                            txt2: "计划制定说明；计划制定说明计划制定说明；计划制定说明计划制定说明；计划制定说明计划制定说明；计划制定说明",

                        }
                    ]
                },
                taskInfo: [
                    {
                        title: "任务1",
                        number: "26%",
                        date: "2019/09/23-2019/09/29",
                        con: [ "计划说明计划说明计划说明计划说明计划说明计划说明计划说明计计划说明计划说明计划说明", ],
                        name: "奚望（信息化一部）",
                    },
                    {
                        title: "任务2",
                        number: "34%",
                        date: "2019/09/23-2019/09/29",
                        con: [ "计划说明计划说明计划说明计划说明计划说明计划说明计划说明计计划说明计划说明计划说明", ],
                        name: "奚望（信息化一部）"
                    },
                    {
                        title: "任务3",
                        number: "55%",
                        date: "2019/09/23-2019/09/29",
                        con: [ "计划说明计划说明计划说明计划说明计划说明计划说明计划说明计计划说明计划说明计划说明", ],
                        name: "奚望（信息化一部）"
                    }
                ],
            }
        }
    }
</script>

<style lang="less">

</style>