<template>
    <div class="oversee-test-tab clearfix">
        <span class="test-btn fl" @click="onClick('event-feedback')">普通权限</span>
        <span class="test-btn fr" @click="onClick('event-feedback2')">高级权限</span>
    </div>
</template>

<script>
    export default {
        name: "oversee-test-tab",
        data: function(){
            return {

            }
        },
        methods: {
            onClick: function(path){
                this.$router.replace({ path: '/oversee/' + path });
            }
        }
    }
</script>

<style lang="less">
.oversee-test-tab {
    padding: 15px 65px;
    .test-btn {
        font-size: @font-size-sm;
        width: 90px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        color: @white;
        background-color: #5ca2f8;
        border-radius: 6px;
    }
}
</style>