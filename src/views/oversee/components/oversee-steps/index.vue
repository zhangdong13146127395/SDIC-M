<template>
    <div class="oversee-steps clearfix" :class="'active'+activeNum">
        <div class="steps steps1 fl" @click="onClick('build-project')">
            <p class="num">1</p>
            <p class="txt">督办立项</p>
        </div>
        <div class="line line1 fl"></div>
        <div class="steps steps2 fl" @click="onClick('formulate-plan')">
            <p class="num">2</p>
            <p class="txt">制定计划</p>
        </div>
        <div class="line line2 fl"></div>
        <div class="steps steps3 fl" @click="onClick('event-feedback')">
            <p class="num">3</p>
            <p class="txt">事项反馈</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: [ "activeNum" ],
        name: "oversee-steps",
        data: function(){
            return {

            }
        },
        methods: {
            onClick (path) {
                this.$router.replace({ path: '/oversee/' + path })
            }
        }
    }
</script>

<style lang="less">
.oversee-steps {
    padding: @spacing-4 @spacing-6;
    background: @white;
    border-bottom: 8px solid @active-color-dark;
    .steps .num {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: @font-size-base;
        border: 2px solid @blue;
        border-radius: 18px;
        color: @text-color;
        margin: 0 auto;
    }
    .steps .txt {
        font-size: @font-size-sm;
        color: @gray-darker;
        height: 28px;
        line-height: 28px;
    }
    .line {
        width: 78px;
        border-top: 2px dotted @blue;
        margin-top: @spacing-4;
    }
}
.oversee-steps.active1 {
    .steps1 .num {
        background: @blue;
        color: @white;
    }
    .steps1 .txt {
        color: @blue;
    }
}
.oversee-steps.active2 {
    .steps1 .num {
        border-color: @gray;
        background: @gray;
        color: @white;
    }
    .steps1 .txt {
        color: @gray-darker;
    }
    .line1 {
        border-color: @gray;
    }
    .steps2 .num {
        background: @blue;
        color: @white;
    }
    .steps2 .txt {
        color: @blue;
    }
}
.oversee-steps.active3 {
    .steps1 .num {
        border-color: @gray;
        background: @gray;
        color: @white;
    }
    .steps1 .txt {
        color: @gray-darker;
    }
    .line1 {
        border-color: @gray;
    }
    .line2 {
        border-color: @gray;
    }
    .steps2 .num {
        border-color: @gray;
        background: @gray;
        color: @white;
    }
    .steps2 .txt {
        color: @gray-darker;
    }
    .steps3 .num {
        background: @blue;
        color: @white;
    }
    .steps3 .txt {
        color: @blue;
    }
}
</style>