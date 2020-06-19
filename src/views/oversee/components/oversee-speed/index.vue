<template>
    <div class="oversee-speed" :style="speedStyle">
        <div class="speed-info" v-for="(item,index) in speedInData" :key="index">
            <div v-if="item.type == 'jindu'" :class="'jindu item-box'">
                <h3 class="tit">
                    <span class="num">{{item.number}}</span>
                    进度
                </h3>
                <div class="con">{{item.con}}</div>
            </div>
            <div v-if="item.type == 'fujian'" :class="'fujian item-box'">
                <h3 class="tit clearfix">
                    <span class="tit-icon fl">
                        <img :src="`${baseUrl}images/oversee/icon1.jpg`" alt="">
                    </span>
                    <span class="fl">附件</span>
                </h3>
                <div class="con" v-for="(each,index2) in item.con" :key="index2">
                    <span class="con-icon" v-if="each.type == 'word'">
                        <img :src="`${baseUrl}images/oversee/icon3.jpg`" alt="">
                    </span>
                    <span class="con-icon" v-else-if="each.type == 'excel'">
                        <img :src="`${baseUrl}images/oversee/icon4.jpg`" alt="">
                    </span>
                    <div>{{each.info}}</div>
                </div>
            </div>
            <div v-if="item.type == 'guanlian'" :class="'guanlian item-box'">
                <h3 class="tit clearfix">
                    <span class="tit-icon fl">
                        <img :src="`${baseUrl}images/oversee/icon2.jpg`" alt="">
                    </span>
                    <span class="fl">关联公文</span>
                </h3>
                <div class="con" v-for="(each,index3) in item.con" :key="index3">
                    <p>{{each.info}}</p>
                    <p class="idnum">【{{each.id}}】</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "oversee-speed",
        props: [ "speedInData", 'padding' ],
        data: function(){
            return {
                baseUrl: process.env.BASE_URL,
            }
        },
        computed: {
            speedStyle () {
                return this.padding ? {
                    padding: '0.42667rem'
                } : {
                    paddingTop: '0.42667rem'
                }
            }
        }
    }
</script>

<style lang="less">
.oversee-speed {
    .speed-info {
        padding: @spacing-2 @spacing-4;
        background: @white;
        border-radius: 8px;
        margin-bottom: @spacing-4;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .item-box {
        .tit {
            font-size: @font-size-sm;
            color: @text-color;
            height: 32px;
            line-height: 32px;
            .num {
                color: @blue;
                font-weight: bold;
            }
            img {
                display: block;
                width: 100%;
            }
        }
        .tit-icon {
            width: 18px;
            margin-top: 6px;
            margin-right: 6px;
        }
        .con {
            font-size: @font-size-sm;
            color: @gray-dark;
            line-height: @line-height-zh;
            position: relative;
            padding-bottom: @spacing-2;
            .idnum {
                color: @text-color;
            }
        }
        .con-icon {
            width: @spacing-7;
            position: absolute;
            left: 0;
            top: 2px;
        }
    }
    .fujian {
        .con {
            padding-left: @spacing-8;
        }
    }
}
</style>