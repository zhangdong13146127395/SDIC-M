<template>
    <div class="oversee-establish">
        <oversee-tab :timeTab="timeTab" tabTxt="反馈时间节点"></oversee-tab>
        <oversee-task :taskInfo="taskInfo"></oversee-task>
    </div>
</template>

<script>
    export default {
        name: "oversee-establish",
        components: {
            'oversee-tab': () => import('./components/oversee-tab'),
            'oversee-task': () => import('./components/oversee-task'),
        },
        data: function(){
            return {
                baseUrl: process.env.BASE_URL,
                cur: 0,
                timeTab: [ '2019-07-03', '2019-07-04', '2019-0705' ],
                taskInfo: [
                    {
                        title: "任务1",
                        number: "26%",
                        date: "2019/09/23-2019/09/29",
                        con: "计划说明计划说明计划说明计划说明计划说明计划说明计划说明计计划说明计划说明计划说明",
                        name: "奚望（信息化一部）"
                    },
                    {
                        title: "任务2",
                        number: "34%",
                        date: "2019/09/23-2019/09/29",
                        con: "计划说明计划说明计划说明计划说明计划说明计划说明计划说明计计划说明计划说明计划说明",
                        name: "奚望（信息化一部）"
                    }
                ],
            }
        }
    }
</script>

<style lang="less">

</style>