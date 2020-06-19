<template>
    <div class="oversee-date-tab">
        <h5 class="tit">{{tabTxt}}{{timeTab.length}}个</h5>
        <div class="date-btn clearfix" :style="{height:height}">
            <i
                v-for="(item,index) in timeTab"
                :key="index"
                :class="cur==index?'each cur fl':'each fl'"
                @click="cur=index"
            >{{item}}</i>
        </div>
        <div class="ud-btn">
            <span @click="downUp()">{{clickTxt}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "oversee-date-tab",
        props: [ "timeTab", "tabTxt" ],
        data(){
            return {
                cur: 0,
                height: "2.24rem",
                clickTxt: "点击查看更多",
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
            downUp: function(){
                if (this.clickTxt == "点击查看更多"){
                    this.clickTxt = "点击收起",
                        this.height = "auto"
                } else {
                    this.clickTxt = "点击查看更多",
                        this.height = "2.24rem"
                }
            }
        }
    }
</script>

<style lang="less">
    .oversee-date-tab{
        background-color: @white;
        padding: 0 0 @spacing-3 @spacing-4;
        .van-sticky {
            background-color: #fff;
            overflow-x: auto;
        }
        .van-sticky--fixed {
            left: @spacing-4;
        }
        .tit {
            font-size: @font-size-base;
            color: @gray-darker;
            height: 48px;
            line-height: 48px;
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
            font-size: @spacing-4;
            height: 34px;
            line-height: 34px;
            text-align: center;
            color: @text-color;
            background: @active-color-dark;
            width: 109px;
            margin:0 @spacing-2 @spacing-2 0;
            margin-left: 0;
            border-radius: 4px;
        }
        .date-btn .each.cur {
            color: @white;
            background: @green;
        }
    }
</style>