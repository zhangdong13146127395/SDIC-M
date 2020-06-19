
<template>
    <div class="oversee-tab">
        <h5 class="tit">{{tabTxt}}{{timeTab.length}}个</h5>
        <van-sticky :offset-top="otop">
            <div class="date-btn clearfix" :style="{width:(timeTab.length*2.54)+'rem'}">
                <i
                    v-for="(item,index) in timeTab"
                    :key="index"
                    :class="cur==index?'each cur fl':'each fl'"
                    @click="cur=index"
                >{{item}}</i>
            </div>
        </van-sticky>
    </div>
</template>

<script>
    export default {
        name: "oversee-tab",
        props: [ "timeTab", "tabTxt" ],
        data: function(){
            return {
                cur: 0,
                // timeTabLength: timeTab.length,
                // height: "2.34667rem",
                // clickTxt: "点击查看更多",
                otop: 0
            }
        },
        mounted () {
            this.resetTop()
        },
        methods: {
            resetTop () {
                let nObj = document.getElementById('navbar')
                this.otop = nObj.offsetHeight
            },
            // downUp: function(){
            //     if (this.clickTxt == "点击查看更多"){
            //         this.clickTxt = "点击收起",
            //         this.height = "auto"
            //     } else {
            //         this.clickTxt = "点击查看更多",
            //         this.height = "2.34667rem"
            //     }
            // }
        }
    }
</script>

<style lang="less">
.oversee-tab {
    background-color: @white;
    padding: 0 @spacing-4;
    .van-sticky {
        background-color: #fff;
        overflow-x: auto;
    }
    .van-sticky--fixed {
        margin: 0 @spacing-4;
    }
    .tit {
        padding: @spacing-4 0 @spacing-2;
        font-size: @font-size-sm;
        font-weight: 500;
        color: @text-color;
    }
    .date-btn {
        overflow: hidden;
    }
    .ud-btn {
        text-align: center;
        color: @blue;
        font-size: @font-size-sm;
        padding-top: @spacing-1;
    }
    .date-btn .each{
        padding: @spacing-1;
        font-size: @font-size-sm;
        line-height: @line-height-zh;
        text-align: center;
        color: @text-color;
        background: @active-color-dark;
        width: 80px;
        margin: @spacing-2;
        margin-left: 0;
        border-radius: 4px;
        &:last-child {
            margin-right: 0;
        }
    }
    .date-btn .each.cur {
        color: @white;
        background: @green;
    }
}
</style>