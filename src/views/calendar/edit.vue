<template>
  <div class="calendar-edit">
    <van-cell-group>
      <van-field
        v-model="text.leader"
        name="leader"
        v-validate="'required'"
        :error="errors.has('leader')"
        label="参与领导"
        placeholder="请选择参与领导"
        readonly
        required
        is-link
        input-align="right"
        @click="handleFilter('leader', '参与领导')"
      />
      <van-field
        v-model="form.personnel"
        label="参与人员"
        placeholder="请输入参与人员"
        input-align="right"
        right-icon="question-o"
        clearable
        @click-right-icon="$toast('人员或组织机构名称之间请以顿号“、”分割')"
      />
      <van-field
        v-model="text.meetRoom"
        label="活动地点"
        placeholder="请选择或输入活动地点"
        input-align="right"
        clearable
      >
        <van-button slot="button" size="small" type="info" @click="handleFilter('meetRoom', '活动地点')">会议室</van-button>
      </van-field>
      <van-field
        v-model="text.time"
        label="活动时间"
        placeholder="请选择活动时间"
        readonly
        is-link
        input-align="right"
        @click="timePicker.show = true"
      />
      <van-field
        v-model="form.startTime"
        label="开始时间"
        placeholder="请选择开始时间"
        readonly
        is-link
        input-align="right"
        @click="startTimePicker.show = true"
      />
      <van-field
        v-model="form.endTime"
        label="结束时间"
        placeholder="请选择结束时间"
        readonly
        is-link
        input-align="right"
        @click="endTimePicker.show = true"
      />
      <van-field
        v-model="form.content"
        name="content"
        v-validate="'required'"
        :error="errors.has('content')"
        type="textarea"
        label="活动内容"
        placeholder="请输入活动内容"
        input-align="right"
        required
        clearable
        :autosize="{ maxHeight: 72, minHeight: 72 }"
      />
      <van-field
        v-model="form.shortContent"
        label="内网简化活动内容"
        placeholder="如需显示简化活动内容，请填写此处"
        input-align="right"
        label-width="3.2rem"
        clearable
      />
      <van-field
        v-model="form.remark"
        type="textarea"
        label="备注"
        placeholder="请输入备注"
        input-align="right"
        clearable
        :autosize="{ maxHeight: 72, minHeight: 72 }"
      />
      <van-field
        v-model="text.state"
        label="日程状态"
        placeholder="请选择日程状态"
        readonly
        is-link
        input-align="right"
        @click="statePicker.show = true"
      />
      <van-switch-cell v-model="form.isIntranet" title="是否在内网显示" />
      <van-switch-cell v-show="!form.isIntranet" v-model="form.isSecretary" title="是否需授权给具体人员" />
      <van-field
        v-show="!form.isIntranet && form.isSecretary"
        v-model="text.secretary"
        label="授权具体人员"
        placeholder="请选择授权具体人员"
        readonly
        is-link
        input-align="right"
        label-width="2.66667rem"
        @click="handleFilter('secretary', '授权人员')"
      />
    </van-cell-group>

    <!-- 操作按钮 -->
    <div class="btns">
      <van-button type="info" hairline block @click="handleSave">保存</van-button>
    </div>

    <!-- 筛选领导 -->
    <calendar-filter ref="calendarFilter"
      v-model="filter.value"
      :options="filter.data"
      :span="filter.span"
      :max="filter.max"
      :title="filter.title"
      :show-choose-all="filter.showChooseAll"
      @confirm="handleConfirmFilter"
    />

    <!-- 活动时间 -->
    <van-popup
      v-model="timePicker.show"
      position="bottom"
      round
    >
      <van-picker
        show-toolbar
        :columns="timePicker.columns"
        @confirm="handleConfirmTime"
        @cancel="timePicker.show = false"
      >
      </van-picker>
    </van-popup>

    <!-- 选择开始时间 -->
    <van-popup
      v-model="startTimePicker.show" 
      position="bottom"
      round
    >
      <van-datetime-picker
        v-model="startTimePicker.value"
        type="datetime"
        :formatter="formatter"
        :filter="filterMinute5"
        @confirm="handleConfirmStartTime"
        @cancel="startTimePicker.show = false"
      />
    </van-popup>

    <!-- 选择结束时间 -->
    <van-popup
      v-model="endTimePicker.show" 
      position="bottom"
      round
    >
      <van-datetime-picker
        v-model="endTimePicker.value"
        type="datetime"
        :formatter="formatter"
        :filter="filterMinute5"
        @confirm="handleConfirmEndTime"
        @cancel="endTimePicker.show = false"
      />
    </van-popup>

    <!-- 日程状态 -->
    <van-popup
      v-model="statePicker.show"
      position="bottom"
      round
    >
      <van-picker
        show-toolbar
        :columns="statePicker.columns"
        @confirm="handleConfirmStatus"
        @cancel="statePicker.show = false"
      >
      </van-picker>
    </van-popup>

    <!-- 保存提示 -->
    <van-dialog
      v-model="dialog.show"
      title="提醒"
      show-cancel-button
      @confirm="saveData"
    >
      <div class="dialog__message van-dialog__message van-dialog__message--has-title">
        <div v-for="(item, index) in dialog.contents" :key="index">
          <span>{{ index + 1 }}.领导已有<span class="red">{{ item.state }}</span>日程，是否要保存？</span><br>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;活动内容：{{ item.content }}</span><br>
          <span v-if="item.shortContent">&nbsp;&nbsp;&nbsp;&nbsp;简化活动内容：{{ item.shortContent }}<br></span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;时间：{{ item.time }}</span><br>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;参与领导：{{ item.leader }}</span>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import FormatterDate from '@/components/mixins/formatter/formatter-date'
import { listLeader, listMeetRoom, listSecretary, saveCalendar, checkConflict, getCalendar, delCalendar } from '@/api/calendar'

// 活动时间
const timePicker = {
  show: false,
  columns: [
    { value: 0, text: '手动选择' },
    { value: 1, text: '全天' },
    { value: 2, text: '上午' },
    { value: 3, text: '下午' },
    { value: 4, text: '晚上' },
  ]
}
// 开始时间
const startTimePicker = {
  show: false,
  value: new Date()
}
// 结束时间
const endTimePicker = {
  show: false,
  value: new Date()
}
// 日程状态
const statePicker = {
  show: false,
  columns: [
    { value: 0, text: '筹备中' },
    { value: 1, text: '确定事项' },
  ]
}

export default {
  name: 'calendar-edit',

  mixins: [ FormatterDate ],

  components: {
    'sino-title': () => import('@/components/sino-title'),
    'calendar-filter': () => import('./components/calendar-filter')
  },

  data () {
    return {
      // 表单显示内容
      text: {
        leader: '',
        meetRoom: '',
        secretary: '',
        time: '全天',
        state: '确定事项',
      },
      // 表单
      form: {
        id: '',
        leader: [],
        personnel: '',
        meetRoom: [],
        time: 1,
        startTime: dayjs().set('hour', 8).set('minute', 30).format('YYYY-MM-DD HH:mm'),
        endTime: dayjs().set('hour', 17).set('minute', 0).format('YYYY-MM-DD HH:mm'),
        content: '',
        shortContent: '',
        remark: '',
        state: 1,
        isIntranet: true,
        isSecretary: false,
        secretary: [],
        status: '1',
      },
      // 提交表单数据
      submitForm: {},
      // 数据
      data: {
        filter: [],
        leader: [],
        meetRoom: [],
        secretary: [],
      },
      // 筛选
      filter: {
        type: '',
        value: [],
        data: [],
        span: 8,
        max: 0,
        title: '',
        showChooseAll: false
      },
      // 保存提示框
      dialog: {
        show: false,
        contents: []
      },
      // 活动时间
      timePicker,
      // 开始时间
      startTimePicker,
      // 结束时间
      endTimePicker,
      // 日程状态
      statePicker,
    }
  },

  mounted () {
    this.$parent.childClickLeft = true
    this.init()
  },

  methods: {
    // 点击返回按钮
    onClickLeft () {
      this.$dialog.confirm({
        title: '提示',
        message: '是否确认已保存，并返回上一页？'
      }).then(() => {
        this.$router.go(-1)
      }).catch(() => {
        // on cancel
      })
    },
    // 点击删除按钮
    onClickRight () {
      this.$dialog.confirm({
        title: '提示',
        message: '是否确认删除？'
      }).then(() => {
        delCalendar(this.form.id).then(data => {
          if (data.code === 200) {
            this.$toast.success('删除成功')
            this.$router.go(-1)
          } else {
            this.$toast.fail('删除失败')
          }
        })
      }).catch(() => {
        // on cancel
      })
    },
    // 初始化
    async init () {
      if (this.$route.query.id) {
        const calendar = await getCalendar(this.$route.query.id)
        const leaderIds = calendar.leaderIds.split(',')
        const leaderNames = calendar.leaderName.split('，')
        const secretaryIds = calendar.impowerUserid.split(',')
        const secretaryNames = calendar.impowerUsername.split(',')
        const leader = []
        for (let i = 0; i < leaderIds.length; i++) {
          if (leaderIds[i]) {
            leader.push({ id: leaderIds[i], name: leaderNames[i] })
          }
        }
        const secretary = []
        for (let i = 0; i < secretaryIds.length; i++) {
          if (secretaryIds[i]) {
            secretary.push({ id: secretaryIds[i], name: secretaryNames[i] })
          }
        }
        this.form = {
          id: calendar.id,
          leader,
          personnel: calendar.personNames,
          meetRoom: [],
          time: Number(calendar.allday),
          startTime: dayjs(`${calendar.beginTime} ${calendar.shour[0]}:${calendar.shour[1]}`).format('YYYY-MM-DD HH:mm'),
          endTime: dayjs(`${calendar.endTime} ${calendar.ehour[0]}:${calendar.ehour[1]}`).format('YYYY-MM-DD HH:mm'),
          content: calendar.activityContent,
          shortContent: calendar.activityContentShort,
          remark: calendar.remark,
          state: Number(calendar.calendarStatus),
          isIntranet: calendar.innerWeb === 'Y' ? true : false,
          isSecretary: calendar.powerflag === 'Y' ? true : false,
          secretary,
          status: calendar.status,
        }
        const alldayNum = Number(calendar.allday)
        this.text = {
          leader: calendar.leaderName.replace(/，/g, ','),
          meetRoom: calendar.meetAddress,
          secretary: calendar.impowerUsername,
          time: alldayNum === 1 ? '全天' : alldayNum === 2 ? '上午' : alldayNum === 3 ? '下午' : alldayNum === 4 ? '晚上' : '手动选择',
          state: Number(calendar.calendarStatus) ? '确定事项' : '筹备中',
        }
      }
      const leader = await listLeader()
      if (leader && leader.length) {
        for (let i = 0; i < leader.length; i++) {
          leader[i].key = i
        }
        this.data.leader = leader
      }
      const meetRoom = await listMeetRoom()
      if (meetRoom && meetRoom.length) {
        this.data.meetRoom = meetRoom
      }
      const secretary = await listSecretary()
      if (secretary && secretary.length) {
        for (let i = 0; i < secretary.length; i++) {
          secretary[i].key = i
        }
        this.data.secretary = secretary
      }

      this.onShowDelete()
    },

    // 验证日程是否存在冲突
    async getCheckConflict () {
      const data = await checkConflict(this.submitForm)
      let list = []
      if (data.yes && data.yes.length) {
        list = data.yes
      } else if (data.no && data.no.length) {
        list = data.no
      }
      this.dialog.contents = []
      for (let i = 0; i < list.length; i++) {
        this.dialog.contents.push({
          state: list[i].calendarStatus === '1' ? '确定事项' : '筹备中',
          content: list[i].activityContent,
          shortContent: list[i].activityContentShort,
          time: `${list[i].beginTime.substring(5, 16)} 至 ${list[i].endTime.substring(5, 16)}`,
          leader: list[i].leaderName,
        })
      }
      if (list.length) {
        this.dialog.show = true
      } else {
        this.saveData()
      }
    },

    // 保存数据
    async saveData () {
      const data = await saveCalendar(this.submitForm)
      if (data.code === 200) {
        this.form.id = data.data.id
        this.$toast.success(data.msg)
        this.onShowDelete()
      } else {
        this.$toast(data.msg)
      }
    },
    
    // 保存
    handleSave () {
      this.$validator.validate().then(valid => {
        if (valid) {
          const { form, text } = this
          if (dayjs(form.startTime).isAfter(dayjs(form.endTime))) {
            this.$toast.fail('选择时间有误请重新选择')
            return
          }
          let leaderId = '', leaderName = '', secretaryId = '', secretaryName = ''
          for (let i = 0; i < form.leader.length; i++) {
            leaderId = leaderId + `${form.leader[i].id},`
            leaderName = leaderName + `${form.leader[i].name},`
          }
          for (let i = 0; i < form.secretary.length; i++) {
            secretaryId = secretaryId + `${form.secretary[i].id},`
            secretaryName = secretaryName + `${form.secretary[i].name},`
          }
          leaderId = leaderId.substring(0, leaderId.length - 1)
          leaderName = leaderName.substring(0, leaderName.length - 1)
          secretaryId = secretaryId.substring(0, secretaryId.length - 1)
          secretaryName = secretaryName.substring(0, secretaryName.length - 1)
          this.submitForm = {
            id: form.id,
            leaderIds: leaderId,
            leaderName: leaderName,
            personNames: form.personnel,
            meetAddress: text.meetRoom,
            allday: form.time,
            beginTime: form.startTime.substring(0, 10),
            shour: [ form.startTime.substring(11, 13), form.startTime.substring(14, 16) ],
            endTime: form.endTime.substring(0, 10),
            ehour: [ form.endTime.substring(11, 13), form.endTime.substring(14, 16) ],
            activityContent: form.content,
            activityContentShort: form.shortContent,
            remark: form.remark,
            calendarStatus: form.state,
            innerWeb: form.isIntranet ? 'Y' : 'N',
            powerflag: form.isSecretary ? 'Y' : 'N',
            impowerUserid: secretaryId,
            impowerUsername: secretaryName,
            status: form.status,
          }
          this.getCheckConflict()
        }
      })
    },

    // 显示删除按钮
    onShowDelete () {
      // 显示删除按钮
      if (this.form.id && this.form.status !== '2') {
        this.$parent.childClickRight = true
        this.$parent.rightIcon = 'delete'
        this.$parent.rightColor = '#d7001d'
      }
    },

    // 筛选数据
    handleFilter (type, title) {
      this.filter.type = type
      this.filter.title = title
      this.filter.value = [ ...this.form[type] ]
      this.filter.data = this.data[type]
      this.filter.showChooseAll = true
      if (type === 'meetRoom') {
        this.filter.span = 24
        this.filter.max = 1
        this.filter.showChooseAll = false
      } else {
        this.filter.span = 8
        this.filter.max = 0
      }
      this.$refs.calendarFilter.show = true
    },

    // 确定活动时间
    handleConfirmTime (value) {
      this.form.time = value.value
      this.text.time = value.text
      this.timePicker.show = false
      if (value.value === 0) {
        return
      }
      let startTime = '', endTime = ''
      switch (value.value) {
        case 1:
          startTime = (this.form.startTime ? this.form.startTime.substring(0, 10) : dayjs().format('YYYY-MM-DD')) + '08:30'
          endTime = (this.form.endTime ? this.form.endTime.substring(0, 10) : dayjs().format('YYYY-MM-DD')) + '17:00'
          break
        case 2:
          startTime = (this.form.startTime ? this.form.startTime.substring(0, 10) : dayjs().format('YYYY-MM-DD')) + '08:30'
          endTime = (this.form.endTime ? this.form.endTime.substring(0, 10) : dayjs().format('YYYY-MM-DD')) + '11:30'
          break
        case 3:
          startTime = (this.form.startTime ? this.form.startTime.substring(0, 10) : dayjs().format('YYYY-MM-DD')) + '13:00'
          endTime = (this.form.endTime ? this.form.endTime.substring(0, 10) : dayjs().format('YYYY-MM-DD')) + '17:00'
          break
        case 4:
          startTime = (this.form.startTime ? this.form.startTime.substring(0, 10) : dayjs().format('YYYY-MM-DD')) + '18:00'
          endTime = (this.form.endTime ? this.form.endTime.substring(0, 10) : dayjs().format('YYYY-MM-DD')) + '21:00'
          break
      }
      this.form.startTime = dayjs(startTime).format('YYYY-MM-DD HH:mm')
      this.form.endTime = dayjs(endTime).format('YYYY-MM-DD HH:mm')
    },

    // 确定选择开始时间
    handleConfirmStartTime (value) {
      this.form.startTime = dayjs(value).format('YYYY-MM-DD HH:mm')
      const startHour = this.form.startTime.substring(11, 13)
      const startMinute = this.form.startTime.substring(14, 16)
      let flag = false
      switch (this.form.time) {
        case 1:
          if (startHour !== '08' || startMinute !== '30') {
            flag = true
          }
          break
        case 2:
          if (startHour !== '08' || startMinute !== '30') {
            flag = true
          }
          break
        case 3:
          if (startHour !== '13' || startMinute !== '00') {
            flag = true
          }
          break
        case 4:
          if (startHour !== '18' || startMinute !== '00') {
            flag = true
          }
          break
      }
      if (flag) {
        this.form.time = 0
        this.text.time = '手动选择'
        this.timePicker.value = 0
      }
      this.startTimePicker.show = false
    },

    // 确定选择结束时间
    handleConfirmEndTime (value) {
      this.form.endTime = dayjs(value).format('YYYY-MM-DD HH:mm')
      const endHour = this.form.endTime.substring(11, 13)
      const endMinute = this.form.endTime.substring(14, 16)
      let flag = false
      switch (this.form.time) {
        case 1:
          if (endHour !== '17' || endMinute !== '00') {
            flag = true
          }
          break
        case 2:
          if (endHour !== '11' || endMinute !== '30') {
            flag = true
          }
          break
        case 3:
          if (endHour !== '17' || endMinute !== '00') {
            flag = true
          }
          break
        case 4:
          if (endHour !== '21' || endMinute !== '00') {
            flag = true
          }
          break
      }
      if (flag) {
        this.form.time = 0
        this.text.time = '手动选择'
        this.timePicker.value = 0
      }
      this.endTimePicker.show = false
    },

    // 日程状态
    handleConfirmStatus (value) {
      this.form.state = value.value
      this.text.state = value.text
      this.statePicker.show = false
    },

    // 确定参与领导
    handleConfirmFilter (value) {
      let text = ''
      const compare = (property) => {
        return (a, b) => {
          var value1 = a[property]
          var value2 = b[property]
          return value1 - value2
        }
      }
      const result = value.sort(compare('key'))
      for (let i = 0; i < result.length; i++) {
        text = text + `${result[i].name},`
      }
      this.text[this.filter.type] = text.substring(0, text.length - 1)
      this.form[this.filter.type] = value
    }
  }
}
</script>

<style lang="less">
.calendar-edit {
  margin: @spacing-2 0;
  .btns {
    padding: @spacing-4;
  }
  .dialog {
    &__message {
      text-align: left;
      span {
        display: inline-block;
        padding: @spacing-1 0;
        &.red {
          color: @red;
          font-weight: 700;
        }
      }
    }
  }
}
</style>