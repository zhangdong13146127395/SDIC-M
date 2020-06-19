<template>
    <div class="oversee-vertical-steps">
        <van-steps direction="vertical" active-color="#5ca2f8">
            <van-step v-for="(item,index) in opinionData" :key="index">
                <div class="item clearfix">
                    <div class="left-box fl">
                        <h3>{{item.draft}}</h3>
                        <p>{{item.draftDate}}</p>
                    </div>
                    <div class="right-box fr">
                        <h3>{{item.name}}</h3>
                        <p>{{item.idea}}</p>
                    </div>
                </div>
            </van-step>
        </van-steps>
    </div>
</template>

<script>
    export default {
        name: "oversee-vertical-steps",
        data: function(){
            return {
                opinionData: [
                    { draft:"普通员工起草", draftDate:"2019-08-02 09:35:27", name:"蔡培", idea:"意见：同意" },
                    { draft:"处长/部门经理级审批", draftDate:"2019-08-02 09:35:27", name:"岳红", idea:"驳回意见：不同意" },
                    { draft:"主任级/子公司领导级副职审批", draftDate:"2019-08-02 09:35:27", name:"王江", idea:"意见：同意" },
                    { draft:"普通员工起草", draftDate:"2019-08-02 09:35:27", name:"蔡培", idea:"意见：同意" },
                    { draft:"处长/部门经理级审批", draftDate:"2019-08-02 09:35:27", name:"岳红", idea:"驳回意见：不同意" },
                    { draft:"主任级/子公司领导级副职审批", draftDate:"2019-08-02 09:35:27", name:"王江", idea:"意见：同意" },
                    { draft:"普通员工起草", draftDate:"2019-08-02 09:35:27", name:"蔡培", idea:"意见：同意" },
                    { draft:"处长/部门经理级审批", draftDate:"2019-08-02 09:35:27", name:"岳红", idea:"驳回意见：不同意" },
                    { draft:"主任级/子公司领导级副职审批", draftDate:"2019-08-02 09:35:27", name:"王江", idea:"意见：同意" },
                ]
            }
        }
    }
</script>

<style lang="less">
.oversee-vertical-steps {
    .item {
        .right-box {
            text-align: right;
            h3 {
                font-size: @font-size-base;
                font-weight: bold;
            }
        }
        h3 {
            color: @text-color;
        }
        p {
            color: @gray-dark;
        }
    }
    .van-step--vertical:not(:last-child)::after {
        border-bottom: 1px solid @border-color;
    }
    .van-step--vertical .van-step__circle-container {
        line-height: normal;
        height: @spacing-2;
        left: -14.55px;
        border-radius: 50%;
    }
    .van-step--vertical .van-step__line {
        background-color: @blue;
    }
    .van-step__circle {
        background-color: @blue;
        width: @spacing-2;
        height: @spacing-2;
    }
    .van-icon {
        width: @spacing-2;
        height: @spacing-2;
        background-color: @blue;
        border-radius: 50%;
    }
    .van-icon-checked:before {
        content: '';
    }
    
}
</style>