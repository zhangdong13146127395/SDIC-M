<template>
    <div class="oversee-task">
        <van-cell-group>
            <template>
                <van-cell :title="title" label-class="cell-label">
                    <template v-slot:label>
                        <div class="task-item" v-for="(item,index) in taskInfo" :key="index">
                            <h4 class="tit-h4 clearfix">
                                <span class="txt fl">{{item.title}}</span>
                                <span class="bfb fr">{{item.number}}</span>
                            </h4>
                            <p v-if="item.date" class="date-txt">起止时间：{{item.date}}</p>
                            <!--<p class="info-inner">{{item.con}}</p>-->
                            <p v-for="(each,index2) in item.con" :key="index2" class="info-inner">{{each}}</p>
                            <div v-if="item.name" class="name clearfix">
                                <span class="icon fl">
                                    <img :src="`${baseUrl}images/oversee/icon.jpg`" >
                                </span>
                                <span class="name-txt fl">{{item.name}}</span>
                            </div>
                            <div v-if="item.speedInData">
                                <oversee-speed :speedInData="item.speedInData" padding></oversee-speed>
                            </div>
                        </div>
                    </template>
                </van-cell>
            </template>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: "oversee-task",
        props: [ "taskInfo", "title" ],
        components: {
            'oversee-speed': ()=> import('../oversee-speed'),
        },
        data: function(){
            return {
                baseUrl: process.env.BASE_URL,
            }
        }
    }
</script>

<style lang="less">
.oversee-task {
    background-color: @white;
    .cell-label {
        padding: @spacing-2 0;
    }
    .task-item {
        background: @active-color-dark;
        border-radius: 8px;
        padding: @spacing-4;
        margin-bottom: @spacing-4;
        &:last-child {
            margin-bottom: 0;
        }
        .tit-h4 .txt {
            font-size: @font-size-lg;
            color: @text-color;
            height: 30px;
            line-height: 30px;
        }
        .tit-h4 .bfb {
            font-size: @font-size-lg;
            color: @red;
            width: 65px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background: @white;
            border-radius: 15px;
            font-weight: bold;
        }
        .date-txt {
            font-size: @font-size-sm;
            color: @gray-dark;
            height: @spacing-7;
            line-height: @spacing-7;
        }
        .info-inner {
            font-size: @font-size-sm;
            color: @text-color;
            line-height: @line-height-zh;
        }
        .name {
            padding-top: @spacing-2;
        }
        .name-txt {
            color: @gray-dark;
            font-size: @font-size-sm;
            height: @spacing-6;
            line-height: @spacing-6;
        }
        .name .icon {
            width: 24px;
            margin-right: 12px;
        }
    }
    .oversee-speed {
        border-top: 1px dashed @border-color;
    }
}
</style>