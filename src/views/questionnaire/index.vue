<template>
  <div class="questionnaire-index">
    <div class="banner" :style="`background-image: url('${baseUrl}images/questionnaire/bg.png');`">
      <div class="banner-info">
        <div class="banner-info--name" @click="chooseDept">
          <span>{{ user.userName }}</span>
          <van-icon v-if="user.depts && user.depts.length > 1" class="icon" name="arrow-down" />
        </div>
        <div class="banner-info--dept1">
          {{ user.dept ? user.dept.companyNameDept : '' }}
        </div>
        <div class="banner-info--dept2">
          {{ user.dept ? user.dept.deptName : '' }}
        </div>
      </div>
    </div>
    <div class="list">
      <div
        class="card"
        v-for="(item, index) in cardList"
        :key="index"
        @click="onClickCard(item.url)"
      >
        <div class="card-icon">
          <img :src="`${baseUrl}images/questionnaire/${item.icon}.png`" />
        </div>
        <div class="card-title">{{ item.title }}</div>
        <van-tag v-if="index === 0 && dbNumber" round type="danger">{{ dbNumber }}</van-tag>
        <div class="card-arrow">
          <img :src="`${baseUrl}images/questionnaire/back.png`" />
        </div>
      </div>
    </div>
    <sino-setting-dept ref="sinoSettingDept" v-model="user" :actions="actions" @select="getDbInfo" />
  </div>
</template>

<script>
import { getCurrentUser } from '@/api/system'
import { questionnairesNoAnswered } from '@/api/questionnaires/index'

const cardList = [
  {
    icon: 'icon1',
    title: '请您回答',
    url: '/questionnaire/answer/index'
  },
  {
    icon: 'icon2',
    title: '我要发卷',
    url: '/questionnaire/question/index'
  },
  {
    icon: 'icon3',
    title: '我的考核工作',
    url: '/questionnaire/work/index'
  }
]

export default {
  name: 'questionnaire-index',

  data () {
    return {
      baseUrl: process.env.BASE_URL,
      user: {},
      cardList: cardList,
      dbNumber: 0,
      actions: []
    }
  },

  components: {
    'sino-setting-dept': () => import('@/components/sino-setting-dept')
  },

  mounted () {
    this.getData()
  },

  methods: {
    // 异步获取数据
    async getData () {
      const user = await getCurrentUser()
      if (user) {
        this.user = user
        if (user.depts && user.depts.length > 1) {
          this.actions = []
          user.depts.map(dept => {
            this.actions.push({ id: dept.deptId, name: dept.deptName })
          })
        }
      }
      this.getDbInfo()
    },

    // 获取待办信息
    async getDbInfo () {
      const data = await questionnairesNoAnswered()
      if (data) {
        this.dbNumber = data.total
      }
    },
    
    onClickCard (path) {
      this.$router.push({ path })
    },

    // 切换部门
    chooseDept () {
      if (this.user && this.user.depts.length > 1) {
        this.$refs.sinoSettingDept.show = true
      }
    }
  }
}
</script>


<style lang="less">
.questionnaire-index {
  .banner {
    position: relative;
    padding: 0 @spacing-4;
    height: 200px;
    background-repeat: no-repeat;
    background-size: cover;
    &-info {
      position: absolute;
      margin-top: 60px;
      &--name {
        display: flex;
        padding: @spacing-3 0;
        color: @white;
        font-weight: 600;
        span {
          font-size: @font-size-base;
          line-height: @font-size-lg;
        }
        .icon {
          margin-left: 4px;
          font-size: @font-size-base;
          line-height: @font-size-base;
        }
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
