<template>
  <div class="questionnaire-question-setting" v-if="$route.query.id">
    <!-- 标题 -->
    <sino-title title="问卷回收设置" />
    
    <!-- 问卷回收设置列表 -->
    <van-cell-group>

      <van-cell title="回收方式设定">
        <toggle-button
          class="toggle-button"
          v-model="flag.isRegister"
          :sync="true"
          :disabled="questionnaire.state !== 'unreleased'"
          :labels="{ checked: '记名', unchecked: '匿名' }"
          :color="{ checked: '#5ca2f8' }"
          :font-size="14"
          :width="66"
          :height="26"
          @change="onChangeRegister"
        />
      </van-cell>

      <van-cell title="问卷回收截止时间" label="满足问卷回收截止时间即问卷停止收集">
        <toggle-button
          class="toggle-button"
          v-model="flag.isDeadline"
          :sync="true"
          :disabled="questionnaire.state !== 'unreleased'"
          :labels="{ checked: '是', unchecked: '否' }"
          :color="{ checked: '#5ca2f8' }"
          :font-size="14"
          :width="66"
          :height="26"
          @change="onChangeDeadline"
        />
      </van-cell>

      <van-field
        v-if="flag.isDeadline"
        v-model="form.settings.recoveryEndTime"
        name="recoveryEndTime"
        v-validate="'required|date_format:yyyy-MM-dd'"
        :error="errors.has('recoveryEndTime')"
        label="设定问卷回收截止时间"
        placeholder="请选择回收截止时间"
        readonly
        required
        :is-link="questionnaire.state === 'unreleased'"
        label-width="3.78667rem"
        input-align="right"
        @click="questionnaire.state === 'unreleased' ? deadlinePicker.show = true : ''"
      />

      <van-cell :class="flag.isAllFinish && 'no-hairline'" title="问卷全部回收后截止">
        <toggle-button
          class="toggle-button"
          v-model="flag.isAllFinish"
          :sync="true"
          :disabled="questionnaire.state !== 'unreleased'"
          :labels="{ checked: '是', unchecked: '否' }"
          :color="{ checked: '#5ca2f8' }"
          :font-size="14"
          :width="66"
          :height="26"
          @change="onChangeAllFinish"
        />
      </van-cell>

      <van-field
        v-if="!flag.isAllFinish"
        v-model="form.settings.recoveryNumber"
        name="recoveryNumber"
        v-validate="'required|numeric'"
        :error="errors.has('recoveryNumber')"
        :readonly="questionnaire.state !== 'unreleased'"
        label="设定问卷回收上限"
        placeholder="请输入回收上限"
        required
        clearable
        label-width="3.78667rem"
        input-align="right"
        type="number"
        right-icon="question-o"
        @click-right-icon="$toast('设定问卷回收的数量，当达到设定问卷回收数量时，即问卷停止回收。后续如果有其他人提交问卷即不再接受问卷，也不进入数据统计。')"
      />

    </van-cell-group>

    <!-- 标题 -->
    <sino-title title="问卷人提醒设置" />

    <!-- 问卷人提醒设置列表 -->
    <van-cell-group>

      <van-cell :class="!flag.isRemind && 'no-hairline'" title="是否开启提醒">
        <toggle-button
          class="toggle-button"
          v-model="flag.isRemind"
          :sync="true"
          :disabled="questionnaire.state !== 'unreleased'"
          :labels="{ checked: '是', unchecked: '否' }"
          :color="{ checked: '#5ca2f8' }"
          :font-size="14"
          :width="66"
          :height="26"
          @change="onChangeRemind"
        />
      </van-cell>

      <van-field
        v-if="flag.isRemind"
        v-model="form.settings.remindContent"
        name="remindContent"
        v-validate="'required'"
        :error="errors.has('remindContent')"
        :readonly="questionnaire.state !== 'unreleased'"
        label="提醒内容"
        placeholder="请输入提醒内容"
        required
        clearable
        input-align="right"
      />

      <van-field
        v-if="flag.isRemind"
        v-model="getCycle"
        label="提醒周期"
        placeholder="请选择提醒周期"
        readonly
        :is-link="questionnaire.state === 'unreleased'"
        input-align="right"
        @click="questionnaire.state === 'unreleased' ? cyclePicker.show = true : ''"
      />

      <van-field
        v-if="flag.isRemind"
        :class="!flag.cycle && 'no-hairline'"
        v-model="form.settings.remindTime"
        name="remindTime"
        v-validate="'required|date_format:yyyy-MM-dd'"
        :error="errors.has('remindTime')"
        label="提醒时间"
        placeholder="请选择提醒时间"
        required
        readonly
        :is-link="questionnaire.state === 'unreleased'"
        label-width="3.78667rem"
        input-align="right"
        @click="questionnaire.state === 'unreleased' ? remindDatePicker.show = true : ''"
      />
      
      <van-field
        v-if="flag.isRemind && flag.cycle"
        v-model="form.settings.remindCycle"
        name="remindCycle"
        v-validate="'required|numeric'"
        :error="errors.has('remindCycle')"
        :readonly="questionnaire.state !== 'unreleased'"
        label="提醒周期间隔天数"
        placeholder="请输入提醒周期"
        required
        clearable
        type="number"
        label-width="3.78667rem"
        input-align="right"
      >
        <div slot="right-icon">天</div>
      </van-field>
      
    </van-cell-group>

    <!-- 操作按钮 -->
    <div class="btns" v-if="questionnaire.state === 'unreleased'">
      <van-button type="info" hairline block @click="onSave">保存</van-button>
    </div>

    <!-- 选择回收截止时间 -->
    <van-popup
      v-model="deadlinePicker.show" 
      position="bottom"
      round
    >
      <van-datetime-picker
        v-model="deadlinePicker.value"
        type="date"
        :formatter="formatter"
        @confirm="onConfirmDeadline"
        @cancel="deadlinePicker.show = false"
      />
    </van-popup>

    <!-- 选择提醒周期 -->
    <van-popup
      v-model="cyclePicker.show" 
      position="bottom"
      round
    >
      <van-picker
        :default-index="flag.cycle"
        show-toolbar
        :columns="cyclePicker.columns"
        @confirm="onConfirmCycle"
        @cancel="cyclePicker.show = false"
      />
    </van-popup>

    <!-- 选择提醒时间 -->
    <van-popup
      v-model="remindDatePicker.show" 
      position="bottom"
      round
    >
      <van-datetime-picker
        v-model="remindDatePicker.value"
        type="date"
        :formatter="formatter"
        @confirm="onConfirmRemindDate"
        @cancel="remindDatePicker.show = false"
      />
    </van-popup>

    <!-- 保存提示弹出框 -->
    <van-dialog
      v-model="show.dialog"
      class="dialog"
      title="提醒"
      show-cancel-button
      close-on-click-overlay
      @confirm="onConfirmSave"
    >
      <div class="dialog__message van-dialog__message van-dialog__message--has-title">
        <span>您选择的回收方式为：{{ flag.isRegister ? '记名' : '匿名' }}</span>
        <span>回收截止时间为：{{ flag.isDeadline ? form.settings.recoveryEndTime : '无' }}</span>
        <span v-if="flag.isAllFinish">全部回收后截止：是</span>
        <span v-else>回收上限为：{{ form.settings.recoveryNumber }} 份</span>
        <span v-if="flag.isAllFinish" class="red">问卷回收截止时间和问卷回收上限条件满足其一即停止收集问卷。</span>
      </div>
    </van-dialog>

  </div>
</template>

<script>
import dayjs from 'dayjs'
import { ToggleButton } from 'vue-js-toggle-button'
import FormatterDate from '@/components/mixins/formatter/formatter-date'
import {
  questionnairesGetQuestionnaire,
  questionnairesGetAssessmentWork,
  questionnairesGetQuestionnaireSettings,
  questionnairesGetAssessmentWorkSettings,
  questionnairesSaveQuestionnaireSettings,
  questionnairesSaveAssessmentWorkSettings,
  questionnairesUpdateQuestionnaireSettings,
  questionnairesUpdateAssessmentWorkSettings
} from '@/api/questionnaires/index'

// 回收截止时间
const deadlinePicker = {
  show: false,
  value: new Date()
}

// 提醒周期
const cyclePicker = {
  show: false,
  columns: [
    {
      value: 0,
      text: '单次'
    },
    {
      value: 1,
      text: '周期'
    }
  ]
}

const remindDatePicker = {
  show: false,
  value: new Date()
}

export default {
  name: 'questionnaire-question-setting',

  mixins: [ FormatterDate ],

  components: {
    [ToggleButton.name]: ToggleButton,
    'sino-title': () => import('@/components/sino-title'),
  },

  data () {
    return {
      // 问卷信息
      questionnaire: {},
      // 表单
      flag: {
        isRegister: false,
        isDeadline: false,
        isAllFinish: true,
        isRemind: false,
        cycle: 0,
      },
      // 表单
      form: {
        pId: '', // 问卷 id
        settings: {
          id: '', // 设置 id
          recoveryType: 'anonymous', // 回收方式 registered: 记名 anonymous: 匿名
          isRecoveryEnd: 'no', // 是否设置回收截止时间 yes: 是 no: 否
          recoveryEndTime: '', // 回收截止日期 yyyy-MM-dd
          isAllRecoveryEnd: 'yes', // 是否全部回收后截止 yes: 是 no: 否
          recoveryNumber: '', // 回收截止数量
          isRemind: 'no', // yes: 是 no: 否
          remindTime: '', // 提醒日期 yyyy-MM-dd
          remindContent: '', // 提醒内容
          remindType: 'once', // once: 一次 cycle: 周期
          remindCycle: '', // 提醒周期天数
        }
      },
      // 回收截止时间选择
      deadlinePicker,
      // 提醒周期
      cyclePicker,
      // 提醒时间
      remindDatePicker,
      // 显示隐藏
      show: {
        dialog: false
      }
    }
  },

  computed: {
    // 提醒周期
    getCycle () {
      return this.flag.cycle === 0 ? '单次' : '周期'
    }
  },

  mounted () {
    if (this.$route.query.id) {
      this.getData()
    } else {
      this.$toast.fail('参数错误')
    }
  },

  methods: {
    // 异步获取数据
    async getData () {
      let data = {}
      let questionnaire = {}
      if (this.$route.query.type && this.$route.query.type === 'assessment') {
        data = await questionnairesGetAssessmentWorkSettings(this.$route.query.id)
        questionnaire = await questionnairesGetAssessmentWork(this.$route.query.id)
      } else {
        data = await questionnairesGetQuestionnaireSettings(this.$route.query.id)
        questionnaire = await questionnairesGetQuestionnaire(this.$route.query.id)
      }

      if (data) {
        this.form.settings = data
        this.form.settings.recoveryEndTime = dayjs(data.recoveryEndTime).format('YYYY-MM-DD')
        this.form.settings.remindTime = dayjs(data.remindTime).format('YYYY-MM-DD')
        this.flag.isRegister = this.form.settings.recoveryType === 'registered'
        this.flag.isDeadline = this.form.settings.isRecoveryEnd === 'yes'
        this.flag.isAllFinish = this.form.settings.isAllRecoveryEnd === 'yes'
        this.flag.isRemind = this.form.settings.isRemind === 'yes'
        this.flag.cycle = this.form.settings.remindType === 'once' ? 0 : 1
      }
      this.form.pId = this.$route.query.id
      if (questionnaire) {
        this.questionnaire = questionnaire
      }
    },

    // 异步保存数据
    async saveData() {
      let data = {}
      if (this.$route.query.type && this.$route.query.type === 'assessment') {
        if (this.form.settings.id) {
          data = await questionnairesUpdateAssessmentWorkSettings(this.form.settings)
        } else {
          data = await questionnairesSaveAssessmentWorkSettings(this.form)
        }
        
      } else {
        if (this.form.settings.id) {
          data = await questionnairesUpdateQuestionnaireSettings(this.form.settings)
        } else {
          data = await questionnairesSaveQuestionnaireSettings(this.form)
        }
      }

      if (data.code === 200) {
        this.$toast.success(this.form.settings.id ? '更新成功' : '保存成功')
      } else {
        this.$toast.fail(this.form.settings.id ? '更新失败' : '保存失败')
      }
    },

    // 点击保存按钮
    onSave () {
      this.$validator.validate().then(valid => {
        if (valid) {
          this.show.dialog = true
        }
      })
    },

    // 确定选择截止时间
    onConfirmDeadline (value) {
      this.form.settings.recoveryEndTime = dayjs(value).format('YYYY-MM-DD')
      this.deadlinePicker.show = false
    },

    // 确定选择提醒周期
    onConfirmCycle (obj) {
      this.flag.cycle = obj.value
      this.form.settings.remindType = obj.value ? 'cycle' : 'once'
      this.cyclePicker.show = false
    },

    // 确定选择提醒时间
    onConfirmRemindDate (value) {
      this.form.settings.remindTime = dayjs(value).format('YYYY-MM-DD')
      this.remindDatePicker.show = false
    },

    // 确定保存
    onConfirmSave () {
      this.saveData()
    },

    // 回收方式开关
    onChangeRegister ({ value }) {
      this.form.settings.recoveryType = value ? 'registered' : 'anonymous'
    },

    // 回收截止时间开关
    onChangeDeadline ({ value }) {
      this.form.settings.isRecoveryEnd = value ? 'yes' : 'no'
    },

    // 全部回收截止开关
    onChangeAllFinish ({ value }) {
      this.form.settings.isAllRecoveryEnd = value ? 'yes' : 'no'
    },

    // 开启提醒开关
    onChangeRemind ({ value }) {
      this.form.settings.isRemind = value ? 'yes' : 'no'
    }
  }
}
</script>

<style lang="less">
.questionnaire-question-setting {
  .toggle-button {
    margin-right: 5px;
  }
  .btns {
    padding: @spacing-4;
  }
  .dialog {
    &__message {
      text-align: left;
      span {
        display: block;
        padding: @spacing-1 0;
        &.red {
          color: @red;
        }
      }
    }
  }
}
</style>
