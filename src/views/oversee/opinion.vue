<template>
    <div class="oversee-opinion">
        <!-- <oversee-vertical-steps></oversee-vertical-steps> -->
        <div class="log">
            <sino-workflow-log recordId="04163cb3100c6cea02752a01c469900b" fileTypeId="09b49ae391ee4744b81b1254b114944c" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "oversee-opinion",
        components: {
            // 'oversee-vertical-steps': ()=>import('./components/oversee-vertical-steps'),
            'sino-workflow-log': () => import('@/components/sino-workflow-log'),
        },
        data: function(){
            return {

            }
        },
        methods: {

        }
    }
</script>

<style lang="less">
.oversee-opinion {
    .log {
        padding-top: @spacing-4;
    }
}
</style>