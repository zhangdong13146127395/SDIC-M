<template>
    <div class="oversee-downup">
        <van-cell-group>
            <van-cell label-class="cell-label" :title="downupData.tit">
                <template v-slot:label>
                    <!-- <p class="summary" :style="{height:height}"> -->
                        {{downupData.summary}}
                        <!-- <i class="du-btn" @click="tabBtn()">{{btnTxt}}</i> -->
                    <!-- </p> -->
                </template>
            </van-cell>
        </van-cell-group>
        
    </div>
</template>

<script>
    export default {
        name: "oversee-downup",
        props: [ "downupData" ],
        data: function (){
            return {
                btnTxt: "展开",
                height: "0.96rem"
            }
        },
        methods: {
            tabBtn: function(){
                if (this.btnTxt=='展开') {
                    this.btnTxt='收起';
                    this.height="auto";
                } else {
                    this.btnTxt='展开';
                    this.height="0.96rem";
                }
            }
        }
    }
</script>

<style lang="less">
.oversee-downup {
    background-color: @white;
    .cell-label {
        font-size: @font-size-sm;
    }
    .summary {
        position: relative;
        overflow: hidden;
        .du-btn {
            position: absolute;
            right: 6px;
            bottom: 1px;
            width: 36px;
            height: 16px;
            line-height: 16px;
            text-align: right;
            background-color: @white;
            color: @green;
            font-size: @font-size-sm;
        }
    }
}
</style>