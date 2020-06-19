<template>
    <div class="meeting-select">
        <div class="list">
            <div class="card" v-for="(item, index) in cardList" :key="index" @click="onClickCard(item.url)">
                <div class="card-icon" :style="{background: item.color}">
                    <van-icon size="35px" color="#fff" :name="item.icon" />
                </div>
                <div class="card-title">{{ item.title }}</div>
                <div class="card-arrow">
                    <img :src="`${baseUrl}images/questionnaire/back.png`" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        //会议-选择
        name: 'meeting-select',
        data(){
            return {
                baseUrl: process.env.BASE_URL,
                cardList:[
                    {title:'公司内会议室', icon:'notes-o', color:'#FFB355', url:'./internal/index'},
                    {title:'公司外活动点', icon:'notes-o', color:'#4FA0FE', url:'./external/index'},
                ]
            }
        },
        mounted(){
            this.settingNavBar()
        },
        methods:{
            onClickCard:function(url){
                this.$router.push({ path:url });
            },
            //重写顶部左侧按钮
            settingNavBar(){
                this.$parent.childClickLeft = true
            },

            //顶部左侧点击事件
            onClickLeft(){
                this.$router.push({
                    path: 'meeting/index',
                    name: 'meeting-index',
                })
            },
        }
    }
</script>
<style lang="less">
    .meeting-select{
        .card-icon{
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
        }
        .banner {
            position: relative;
            padding: 0 @spacing-4;
            height: 200px;
            background-repeat: no-repeat;
            background-size: cover;
            &-info {
                position: absolute;
                margin-top: 60px;
                z-index: 100;
                &--name {
                    padding: @spacing-3 0;
                    color: @white;
                    font-size: @font-size-base;
                    font-weight: 600;
                }
                &--dept1, &--dept2 {
                    padding: @spacing-1 0;
                    color: @white;
                    font-size: @font-size-sm;
                    font-weight: 500;
                }
            }
        }
        .card {
            display: flex;
            align-items: center;
            padding: @spacing-4;
            margin: @spacing-4;
            background-color: @white;
            border-radius: 4px;
            box-shadow: @shadow-bottom;
            transition: all .3s;
            &:active {
                background-color: @active-color;
                transition: all .3s;
            }
            &-icon {
                margin-right: @spacing-4;
                width: 50px;
                height: 50px;
                font-size: 0;
            }
            &-title {
                margin-right: @spacing-1;
                color: @black;
                font-size: @font-size-base;
                font-weight: 500;
            }
            &-arrow {
                margin-left: auto;
                width: 12px;
                height: 20px;
                font-size: 0;
            }
        }
    }

</style>


