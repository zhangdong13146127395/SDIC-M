<template>
  <div class="calendar-index">
    <!-- 月程 -->
    <calendar-month ref="calendarMonth" v-if="isMonth === '0'" :leader="filter.text" :myLeader="myLeader" />

    <!-- 日程 -->
    <calendar-day ref="calendarDay" v-if="isMonth === '1'" :leader="filter.text" :myLeader="myLeader" />

    <!-- 筛选领导 -->
    <calendar-filter ref="calendarFilter"
      v-model="filter.value"
      :options="filter.data"
      :span="8"
      title="参与领导"
      :show-choose-all="filter.showChooseAll"
      @confirm="handleConfirmFilter"
    />

    <!-- 悬浮按钮 -->
    <div class="fixed-btns">
      <transition name="van-fade">
        <div class="fixed-btns-more" v-show="show.btn">
          <van-button class="fixed-btns-icon fixed-btns-icon--sm" color="#7232dd" @click="handleTab">{{ isMonth === '1' ? '月' : '周' }}</van-button>
          <van-button class="fixed-btns-icon fixed-btns-icon--sm" icon="filter-o" type="warning" @click="handleFilter" />
          <van-button class="fixed-btns-icon fixed-btns-icon--sm" icon="plus" type="primary" @click="handleCreate" />
        </div>
      </transition>
      <van-button class="fixed-btns-icon" icon="setting-o" type="info" @click="show.btn = !show.btn" />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import zhCnLocale from 'dayjs/locale/zh-cn'
import { listLeader, listMyLeader } from '@/api/calendar'

dayjs.locale(zhCnLocale)

export default {
  name: 'calendar-index',

  components: {
    'calendar-month': () => import('./components/calendar-month'),
    'calendar-day': () => import('./components/calendar-day'),
    'calendar-filter': () => import('./components/calendar-filter')
  },

  data () {
    return {
      show: {
        btn: false,
      },
      isMonth: '-1',
      data: {},
      myLeader: [],
      filter: {
        text: '',
        value: [],
        data: [],
        showChooseAll: false
      }
    }
  },

  mounted () {
    if (this.$route.query.tab) {
      this.$nextTick(() => {
        this.isMonth = this.$route.query.tab === '1' ? '1' : '0'
      })
    } else {
      this.isMonth = '1'
    }
    this.init()
  },

  methods: {
    // 初始化
    async init () {
      const leader = await listLeader()
      if (leader && leader.length) {
        this.filter.data = leader
      }
      const myLeader = await listMyLeader()
      if (myLeader && myLeader.length) {
        this.filter.value = myLeader
        this.myLeader = [ ...myLeader ]
        this.filterText(myLeader)
      }
    },

    // 新建日程
    handleCreate () {
      this.$router.push({ path: '/calendar/edit' })
    },

    // 筛选领导
    handleFilter () {
      this.filter.showChooseAll = true
      this.$refs.calendarFilter.show = true
      this.show.btn = false
    },

    // 确定筛选
    handleConfirmFilter (value) {
      this.filterText(value)
      this.$nextTick(() => {
        this.isMonth ? this.$refs.calendarMonth.getCalendar() : this.$refs.calendarDay.getCalendar()
      })
    },

    // 筛选值
    filterText (value) {
      this.filter.text = ''
      for (let i = 0; i < value.length; i++) {
        this.filter.text = (i ? `${value[i].id},` : value[i].id) + this.filter.text
      }
    },

    // 切换 日 月 日程表
    handleTab () {
      this.isMonth = this.isMonth === '1' ? '0' : '1'
      this.show.btn = false
      const date = {}
      if (this.isMonth === '1') {
        date.sdate = dayjs(dayjs().startOf('week')).format('YYYY-MM-DD')
        date.edate = dayjs(dayjs().add(7, 'day').startOf('week')).format('YYYY-MM-DD')
      } else {
        date.sdate = dayjs(`${dayjs().year()}-${dayjs().month() + 1}-01`).format('YYYY-MM-DD')
        date.edate = dayjs(`${dayjs().year()}-${dayjs().month() + 2}-01`).subtract(1, 'day').format('YYYY-MM-DD')
      }
      this.$router.replace({ path: '/calendar/index', query: { ...this.$route.query, ...date, tab: this.isMonth ? '0' : '1' } })
    }
  }
}
</script>

<style lang="less">
.calendar-index {
  // 悬浮按钮
  .fixed-btns {
    position: fixed;
    bottom: @spacing-4;
    right: @spacing-4;
    z-index: 999;
    &-more {
      flex-direction: column-reverse;
      align-items: center;
      display: flex;
      justify-content: center;
    }
    &-icon {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
      &--sm {
        margin-bottom: @spacing-2;
        width: 40px;
        height: 40px;
        line-height: @font-size-base !important;
        .van-icon {
          margin-left: -6px;
          font-size: @font-size-xl !important;
        }
        .van-button__text {
          margin-left: -4px;
          font-size: @font-size-base !important;
        }
      }
      .van-icon {
        font-size: @font-size-xxl;
      }
    }
  }
}
</style>