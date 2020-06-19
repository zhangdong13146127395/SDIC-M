<template>
  <div class="calendar-day">
    <van-row class="switch" gutter="16">
      <van-col class="switch-prev" span="8">
        <van-button type="info" size="small" block @click="handleWeekPrev">上一周</van-button>
      </van-col>
      <van-col class="switch-now" span="8">
        <van-button type="info" size="small" block @click="handleWeekNow">本周</van-button>
      </van-col>
      <van-col class="switch-next" span="8">
        <van-button type="info" size="small" block @click="handleWeekNext">下一周</van-button>
      </van-col>
    </van-row>
    <van-steps class="steps" direction="vertical" :active="-1">
      <van-step v-for="index in 7" :key="index">
        <p class="step-title">{{ dayjs(dayjs(sdate).add(index - 1, 'day')).format('YYYY-MM-DD').substring(5, 10).replace('-', '月') }}日 星期{{ weeks[index - 1] }}</p>
        <div class="step-contents">
          <div class="step-content" v-for="(item2, index2) in data[Number(sdate.substring(8, 10)) + index - 1]" :key="index2" @click="handleView(item2.id)">
            <van-icon class="step-content--icon" slot="icon" name="stop" :color="item2.calendarStatus === '1' ? '#5ca2f8' : '#969799'" />
            <span class="step-content--time">{{ item2.day === '1' ? '全天' : item2.day === '2' ? '上午' : item2.day === '3' ? '下午' : item2.start.substring(11, 16) }}</span>
            <span class="step-content--title">{{ item2.title }}</span>
          </div>
        </div>
      </van-step>
    </van-steps>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import zhCnLocale from 'dayjs/locale/zh-cn'
import Sort from '@/components/mixins/sort/sort'
import { listCalendar } from '@/api/calendar'

dayjs.locale(zhCnLocale)

export default {
  name: 'calendar-day',

  mixins: [ Sort ],

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
      dayjs,
      data: {},
      sdate: '',
      edate: '',
      weeks: [ '一', '二', '三', '四', '五', '六', '日' ]
    }
  },

  watch: {
    leader () {
      this.getCalendar()
    }
  },

  mounted () {
    this.sdate = this.$route.query.sdate || dayjs(dayjs().startOf('week')).format('YYYY-MM-DD')
    this.edate = this.$route.query.edate || dayjs(dayjs().add(7, 'day').startOf('week')).format('YYYY-MM-DD')
    this.getData()
  },

  methods: {
    async getCalendar () {
      this.$toast.loading({
        message: '加载中...'
      })
      this.data = {}
      const list = await listCalendar({
        leader: this.leader,
        sdate: this.sdate,
        edate: this.edate,
        myLeader: JSON.stringify(this.myLeader),
        timestamp: dayjs().unix()
      })
      if (list && list.length) {
        const newList = {}
        for(let i = 0; i < list.length; i++) {
          const firstDate = dayjs(this.sdate).startOf('week')
          const startDate = dayjs(list[i].start.substring(0, 10))
          const endDate = dayjs(list[i].end.substring(0, 10))
          const diff = endDate.diff(startDate, 'day') // 会议开始和结束时间的时间差
          for (let j = 0; j <= diff; j++) {
            const diffDay = dayjs(startDate).add(j, 'day')
            let day = diffDay.get('date')
            // 如果该天为该周内时间
            if ((diffDay.isAfter(firstDate) || diffDay.isSame(firstDate)) && diffDay.isBefore(firstDate.add(7, 'day'))) {
              if (diffDay.month() > firstDate.month()) {
                day = firstDate.endOf('month').date() + diffDay.date()
              }
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

    handleView (id) {
      this.$router.push({ path: '/calendar/edit', query: { id } })
    },

    handleWeekNow () {
      this.sdate = dayjs(dayjs().startOf('week')).format('YYYY-MM-DD')
      this.edate = dayjs(dayjs().add(7, 'day').startOf('week')).format('YYYY-MM-DD')
      this.getData()
    },

    handleWeekPrev () {
      this.sdate = dayjs(this.sdate).subtract(7, 'day').format('YYYY-MM-DD')
      this.edate = dayjs(this.edate).subtract(7, 'day').format('YYYY-MM-DD')
      this.getData()
    },

    handleWeekNext () {
      this.sdate = dayjs(this.sdate).add(7, 'day').format('YYYY-MM-DD')
      this.edate = dayjs(this.edate).add(7, 'day').format('YYYY-MM-DD')
      this.getData()
    },
    
    getData () {
      this.getCalendar()
      this.$router.replace({ path: '/calendar/index', query: { ...this.$route.query, tab: '1', sdate: this.sdate, edate: this.edate } })
    }
  }
}
</script>

<style lang="less">
.calendar-day {
  .switch {
    margin: @spacing-4 @spacing-2 !important;
    &-prev {
      font-size: 0;
      text-align: left;
    }
    &-now {
      font-size: 0;
      text-align: center;
    }
    &-next {
      font-size: 0;
      text-align: right;
    }
  }
  .steps {
    height: calc(100vh - 108px);
    overflow-y: auto;
  }
  .step-title {
    margin: 0 0 @spacing-2;
    font-size: @font-size-base;
    font-weight: 700;
  }
  .step-content {
    padding: @spacing-1 @spacing-2;
    color: @text-color;
    font-size: @font-size-sm;
    &--icon {
      margin-right: @spacing-1;
      vertical-align: middle;
    }
    &--time {
      margin-right: @spacing-2;
    }
    &--title {
      line-height: @line-height-zh;
    }
    &:active {
      background-color: @active-color-dark;
    }
  }
}
</style>