<template>
    <div class="oversee-list-content">
        <div class="ddd">
            <div class="title-box">
                <h3 class="title">{{listData.title}}</h3>
                <div v-if="listData.timeNumber" class="time-number clearfix">
                    <p v-for="(each,index) in listData.timeNumber" :key="index" :class="'item'+index" class="item fl">{{each}}</p>
                </div>
            </div>
            <van-cell-group>
                <template v-for="(each,index2) in listData.itemCon">
                    <van-cell
                        v-if="each.type == 'TopBottom'"
                        label-class="cell-label"
                        :key="index2"
                        :title="each.txt1"
                        :label="each.txt2"
                    />
                    <van-cell
                        v-else-if="each.type == 'progress'"
                        value-class="cell-value"
                        :key="index2"
                        :title="each.txt1"
                    >
                        <van-progress :percentage="progressNumber" stroke-width="8" />
                    </van-cell>
                    <van-cell
                        v-else
                        :key="index2"
                        :title="each.txt1"
                        :value="each.txt2"
                    />
                </template>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    export default {
        name: "oversee-list-content",
        props: [ "listData" ],
        data: function(){
            return {
                progressNumber: 0,
            }
        },
        mounted: function(){
            this.fnProgress();
        },
        methods: {
            fnProgress () {
                const timer = setInterval(() => {
                    this.progressNumber++
                    if (this.progressNumber === 56) {
                        clearInterval(timer)
                    }
                }, 10)
            }
        }
    }
</script>

<style lang="less">
.oversee-list-content {
    background-color: @white;
    .title-box {
        padding: @spacing-4;
        border-bottom: 1px solid @border-color;
    }
    .title {
        font-size: @font-size-lg;
        color: @text-color;
        height: 36px;
        line-height: 36px;
        text-align: center;
    }
    .time-number {
        .item {
            font-size: @font-size-sm;
            color: @gray-darker;
            height: 24px;
            line-height: 24px;
            width: 50%;
            text-align: center;
        }
    }
    .cell-label {
        font-size: @font-size-sm;
    }
    .cell-value {
        padding-top: @spacing-2;
    }
}
</style>