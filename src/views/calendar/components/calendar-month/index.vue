<template>
  <div class="calendar-month">
    <v-calendar
      class="v-calendar"
      :theme="calendar.theme"
      locale="zh-CN"
      disable-page-swipe
      @update:from-page="handleUpdatePage"
      @update:to-page="handleUpdatePage"
    >
      <div slot="day-content" slot-scope="slotProp" @click="handleCalendar(slotProp.day.date)">
        <span class="vc-label vc-text-sm text-gray-900">{{ slotProp.day.day }}</span>
        <div class="vc-tag">
          <p
            class="vc-text-xs vc-tag--text"
            :class="item.calendarStatus === '0' && 'waiting'"
            v-for="(item, index) in data[slotProp.day.day]"
            :key="index"
          >
            {{ item.title }}
          </p>
        </div>
      </div>
    </v-calendar>

    <!-- 更多操作弹出框 -->
    <sino-dialog-cell v-model="dialog.show" :title="dialog.title" :cells="dialog.cells" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Sort from '@/components/mixins/sort/sort'
import { listCalendar } from '@/api/calendar'

export default {
  name: 'calendar-month',

  mixins: [ Sort ],

  components: {
    'sino-dialog-cell': () => import('@/components/sino-dialog-cell'),
  },

  props: {
    leader: {
      type: String,
      default: ''
    },
    myLeader: {
      type: Array,
      default () {
        return []
      }
    }
  },

  data () {
    return {
      data: {},
      calendar: {
        theme: {
          container: {
            light: ' van-hairline--bottom vc-text-gray-900 vc-bg-white'
          },
        },
      },
      dialog: {
        show: false,
        title: '',
        cells: []
      },
      sdate: '',
      edate: '',
      flag: false,
    }
  },

  watch: {
    leader () {
      this.getCalendar()
    }
  },

  mounted () {
    this.sdate = this.$route.query.sdate || dayjs(`${dayjs().get('year')}-${dayjs().get('month') + 1}-01`).format('YYYY-MM-DD')
    this.edate = this.$route.query.edate || dayjs(`${dayjs().get('year')}-${dayjs().get('month') + 2}-01`).format('YYYY-MM-DD')
    this.getCalendar()
  },

  methods: {
    // 获取领导日程
    async getCalendar () {
      const { sdate, edate } = this
      !this.flag && (this.flag = true)
      this.$toast.loading({
        message: '加载中...'
      })
      this.data = {}
      const list = await listCalendar({
        leader: this.leader,
        sdate,
        edate,
        myLeader: JSON.stringify(this.myLeader),
        timestamp: dayjs().unix()
      })
      if (list && list.length) {
        const newList = {}
        for(let i = 0; i < list.length; i++) {
          const firstDate = dayjs(sdate)
          const startDate = dayjs(list[i].start.substring(0, 10))
          const endDate = dayjs(list[i].end.substring(0, 10))
          const diff = endDate.diff(startDate, 'day') // 会议开始和结束时间的时间差
          for (let j = 0; j <= diff; j++) {
            const diffDay = dayjs(startDate).add(j, 'day')
            const day = diffDay.get('date')
            // 如果该天为该月内时间
            if ((diffDay.isAfter(firstDate) || diffDay.isSame(firstDate)) && diffDay.isBefore(firstDate.endOf('month'))) {
              if (!Object.prototype.hasOwnProperty.call(newList, day)) {
                newList[day] = []
              }
              const data = list[i]
              // 如果不是第一天，则为跨天会议，开始时间为早上 8:30
              if (j > 0) {
                data.start = dayjs(`${diffDay.get('year')}-${diffDay.get('month')}-${day} 08:30`).format('YYYY/MM/DD HH:mm')
              }
              newList[day].unshift(data)
            }
          }
        }
        for (let key in newList) {
          this.bubbleSort(newList[key], 'start')
        }
        this.data = newList
      }
      this.$toast.clear()
    },
    // 切换日历
    handleUpdatePage (page) {
      this.sdate = dayjs(`${page.year}-${page.month}-01`).format('YYYY-MM-DD')
      this.edate = dayjs(`${page.year}-${page.month + 1}-01`).subtract(1, 'day').format('YYYY-MM-DD')
      this.getCalendar()
      this.$router.replace({ path: '/calendar/index', query: { ...this.$route.query, tab: '0', sdate: this.sdate, edate: this.edate } })
    },
    handleCalendar (val) {
      const day = dayjs(val).get('date')
      if (this.data[day]) {
        this.dialog.cells = []
        for (let i = 0; i < this.data[day].length; i++) {
          this.dialog.cells.push({ text: this.data[day][i].title, handler: this.handleDialog, params: this.data[day][i].id })
        }
        this.dialog.cells.push({ text: '取消' })
        this.dialog.title = `${dayjs(val).format('YYYY年MM月DD日')}`
        this.dialog.show = true 
      }
    },
    handleDialog (id) {
      this.$router.push({ path: '/calendar/edit', query: { id } })
    },
  }
}
</script>

<style lang="less">
.calendar-month {
  // 日历控件
  .v-calendar {
    margin-bottom: @spacing-4;
    width: 100%;
    border-top: 1px solid #b8c2cc;
    border-bottom: 1px solid #b8c2cc;
    .vc-text-lg {
      font-size: @font-size-lg;
    }
    .vc-text-sm {
      font-size: @font-size-sm;
    }
    .vc-text-xs {
      font-size: @font-size-xs;
    }
    .vc-label {
      display: block;
      padding-bottom: @spacing-1;
    }
    .vc-tag {
      width: 44px;
      height: 52px;
      overflow-y: scroll;
      overflow-x: scroll;
      &--text {
        padding: 2px @spacing-1;
        margin:  0 0 @spacing-1;
        width: fit-content;
        color: #fff;
        background-color: @blue;
        border-radius: 2px;
        white-space: nowrap;
        &.waiting {
          background-color: @gray-dark;
        }
      }
    }
    .vc-header {
      padding-bottom: 10px;
      background-color: #f1f5f8;
    }
    .vc-weekday {
      background-color: #f8fafc;
      border-bottom: 1px solid #eaeaea;
      border-top: 1px solid #eaeaea;
    }
    .vc-weeks {
      padding: 0;
    }
    .vc-day-content {
      margin: 6px;
      width: 36px;
      height: 36px;
    }
    .vc-day {
      padding: @spacing-1;
      box-sizing: border-box;
      &:not(.on-right) {
        border-right: 1px solid #b8c2cc;
      }
      &:not(.on-bottom) {
        border-bottom: 1px solid #b8c2cc;
        &.weekday-1 {
          border-bottom: 1px solid #b8c2cc;
        }
      }
    }
    .vc-highlight {
      width: 36px;
      height: 36px;
    }
  }
}
</style>