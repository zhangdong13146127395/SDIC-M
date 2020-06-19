<template>
  <div class="questionnaire-question-release" v-if="$route.query.id">

    <!-- 底部操作按钮 -->
    <!-- <van-goods-action class="sino-goods-action">
      <van-goods-action-button
        class="sino-goods-action-button"
        hairline
        square
        :text="questionnaire.state === 'unreleased' ? form.type === 2 ? '添加' : '通讯录' : form.type === 2 ? '追加' : '通讯录追加'"
        @click="onClickAdd"
      />
      <van-goods-action-button
        class="sino-goods-action-button"
        v-if="questionnaire.state === 'unreleased'"
        hairline
        square
        text="确定发布"
        @click="onClickRelease"
      />
    </van-goods-action> -->
    <sino-button-group :btns="btns" />

    <!-- 标题 -->
    <sino-title title="受访者设定" />
    
    <!-- 问卷受访者设定列表 -->
    <van-cell-group>
      <van-cell
        :class="form.type !== 0 && 'no-hairline'"
        title="受访者类型"
        :value="typePicker.columns[form.type].text"
        is-link
        @click="typePicker.show = true"
      />
      <van-field
        v-show="form.type === 0"
        v-model="form.random.number"
        name="number"
        v-validate="'required|numeric'"
        :error="errors.has('number')"
        label="受访者人数"
        placeholder="请输入受访者人数"
        input-align="right"
        type="number"
        clearable
      >
        <div slot="right-icon">人</div>
      </van-field>
    </van-cell-group>

    <!-- 标题 -->
    <sino-title title="发送人员列表" />

    <div class="list-title van-hairline--top-bottom text-center">
      <van-row>
        <van-col span="6">姓名</van-col>
        <van-col span="6">部门</van-col>
        <van-col span="6">添加类型</van-col>
        <van-col span="6">手机号</van-col>
      </van-row>
    </div>

    <!-- 数据列表 -->
    <sino-list
      class="sino-list"
      :style="sinoListStyle"
      ref="sinoList"
      v-model="list.data"
      :page-size="list.pageSize"
      :min-height="form.type === 0 ? 'calc(100vh - 333px)' : 'calc(100vh - 289px)'"
      :load="onLoad"
    >
       <!-- 考核任务列表 -->
      <van-cell-group>
        <template v-for="(item, index) in list.data">
          <sino-swipe-cell
            :btns="swipeCellBtns"
            :params="item.id"
            :key="index"
          >
            <div class="list-content van-hairline--bottom text-center">
              <van-row v-if="item.addType === 'phone'">
                <van-col span="6">-</van-col>
                <van-col span="6">-</van-col>
                <van-col span="6">手机号码</van-col>
                <van-col span="6">{{ item.phone }}</van-col>
              </van-row>
              <van-row v-else-if="item.addType === 'specified'">
                <van-col span="6">{{ item.userName }}</van-col>
                <van-col span="6">{{ item.deptName }}</van-col>
                <van-col span="6">指定人员</van-col>
                <van-col span="6">{{ item.phone || '-' }}</van-col>
              </van-row>
              <van-row v-else-if="item.addType === 'random'">
                <van-col span="6">{{ item.userName }}</van-col>
                <van-col span="6">{{ item.deptName }}</van-col>
                <van-col span="6">部门随机</van-col>
                <van-col span="6">{{ item.phone || '-' }}</van-col>
              </van-row>
            </div>
          </sino-swipe-cell>
        </template>
        <!-- <van-swipe-cell
          class="sino-swipe-cell"
          v-for="(item, index) in list.data"
          :key="index"
          :right-width="65"
        >
          <div class="list-content van-hairline--bottom text-center">
            <van-row v-if="item.addType === 'phone'">
              <van-col span="6">-</van-col>
              <van-col span="6">-</van-col>
              <van-col span="6">手机号码</van-col>
              <van-col span="6">{{ item.phone }}</van-col>
            </van-row>
            <van-row v-else-if="item.addType === 'specified'">
              <van-col span="6">{{ item.userName }}</van-col>
              <van-col span="6">{{ item.deptName }}</van-col>
              <van-col span="6">指定人员</van-col>
              <van-col span="6">{{ item.phone || '-' }}</van-col>
            </van-row>
            <van-row v-else-if="item.addType === 'random'">
              <van-col span="6">{{ item.userName }}</van-col>
              <van-col span="6">{{ item.deptName }}</van-col>
              <van-col span="6">部门随机</van-col>
              <van-col span="6">{{ item.phone || '-' }}</van-col>
            </van-row>
          </div>
          <div class="cell__right cell__right--delete" slot="right" @click="onDelete(item.id)">
            <span>删除</span>
          </div>
        </van-swipe-cell> -->
      </van-cell-group>
    </sino-list>

    <!-- 选择受访者类型 -->
    <van-popup
      v-model="typePicker.show" 
      position="bottom"
      round
    >
      <van-picker
        show-toolbar
        :columns="typePicker.columns"
        @confirm="onConfirmType"
        @cancel="typePicker.show = false"
      />
    </van-popup>

    <!-- 编辑手机信息 -->
    <van-dialog
      v-model="show.dialog"
      title="编辑手机号码"
      show-cancel-button
      :before-close="beforeClose"
    >
      <van-field
        v-model="form.phone.phone"
        :error="errorPhone"
        label="手机号"
        placeholder="请输入手机号"
        clearable
      />
    </van-dialog>

    <sino-ztree
      ref="sinoZtreeDept"
      v-model="ztree.dept.value"
      :config="ztree.dept.config"
      @confirm="onConfirmZtreeDept"
    />

    <sino-ztree
      ref="sinoZtreeUser"
      v-model="ztree.user.value"
      :config="ztree.user.config"
      @confirm="onConfirmZtreeUser"
    />

  </div>
</template>

<script>
import {
  questionnairesListRespondent,
  questionnairesGetQuestionnaire,
  questionnairesGetAssessmentWork,
  questionnairesSaveQuestionnaireSpecifiedRespondent,
  questionnairesSaveAssessmentWorkSpecifiedRespondent,
  questionnairesSaveQuestionnairePhoneRespondent,
  questionnairesSaveAssessmentWorkPhoneRespondent,
  questionnairesSaveQuestionnaireRandomRespondent,
  questionnairesSaveAssessmentWorkRandomRespondent,
  questionnairesUpdateReleaseQuestionnaire,
  questionnairesUpdateReleaseAssessmentWork,
  questionnairesDelRespondent
} from '@/api/questionnaires/index'

const typePicker = {
  show: false,
  columns: [
    {
      value: 0,
      text: '随机人员选择'
    },
    {
      value: 1,
      text: '指定人员选择'
    },
    {
      value: 2,
      text: '填写手机号码'
    }
  ]
}

export default {
  name: 'questionnaire-question-release',

  components: {
    'sino-title': () => import('@/components/sino-title'),
    'sino-ztree': () => import('@/components/sino-ztree'),
    'sino-list': () => import('@/components/sino-list'),
    'sino-button-group': () => import('@/components/sino-button-group'),
    'sino-swipe-cell': () => import('@/components/sino-swipe-cell')
  },

  data () {
    return {
      // 列表数据相关
      list: {
        data: [], // 数据
        pageSize: 20, // 每页条数
      },
      // 问卷信息
      questionnaire: {},
      // 表单
      form: {
        type: 0,
        result: [],
        specified: {
          questionnaireId: this.$route.query.id,
          assessmentWorkId: this.$route.query.id,
          userIds: [],
          deptIds: []
        },
        random: {
          questionnaireId: this.$route.query.id,
          assessmentWorkId: this.$route.query.id,
          deptId: '',
          number: '',
          error: false
        },
        phone: {
          questionnaireId: this.$route.query.id,
          assessmentWorkId: this.$route.query.id,
          phone: ''
        },
      },
      // 错误
      errorPhone: false,
      // 受访者类型
      typePicker: typePicker,
      // 显示隐藏
      show: {
        dialog: false
      },
      // 选人选部门树
      ztree: {
        status: '',
        dept: {
          value: [],
          config: {
            type: 'dept',
            max: 1
          }
        },
        user: {
          value: [],
          config: {
            type: 'user'
          }
        }
      },
      // 滑动单元格
      swipeCellBtns: [
        {
          text: '删除',
          type: 'danger',
          handler: this.onDelete,
        }
      ]
    }
  },

  computed: {
    sinoListStyle () {
      return {
        height: this.form.type === 0 ? 'calc(100vh - 333px)' : 'calc(100vh - 289px)'
      }
    },
    // 按钮组
    btns () {
      const btns = [
        {
          text: this.questionnaire.state === 'unreleased' ? this.form.type === 2 ? '添加' : '通讯录' : this.form.type === 2 ? '追加' : '通讯录追加',
          handler: this.onClickAdd
        }
      ]
      if (this.questionnaire.state === 'unreleased') {
        btns.push({
          text: '确定发布',
          type: 'info',
          handler: this.onClickRelease
        })
      }
      return btns
    }
  },

  mounted () {
    this.getData()
  },

  methods: {
    // 列表加载数据
    async onLoad (page) {
      const data = await questionnairesListRespondent({
        pId: this.$route.query.id,
        pType: this.$route.query.type && this.$route.query.type === 'assessment' ? 'assessmentWork' : 'questionnaire',
        orderByColumn: 'createTime',
        isAsc: 'DESC',
        ...page
      })
      return data
    },

    // 异步获取问卷数据
    async getData () {
      let data
      if (this.$route.query.type && this.$route.query.type === 'assessment') {
        data = await questionnairesGetAssessmentWork(this.$route.query.id)
      } else {
        data = await questionnairesGetQuestionnaire(this.$route.query.id)
      }

      if (data) {
        this.questionnaire = data
      }
    },

    // 异步保存指定人员
    async saveDataSpecified () {
      let data
      if (this.$route.query.type && this.$route.query.type === 'assessment') {
        data = await questionnairesSaveAssessmentWorkSpecifiedRespondent({
          assessmentWorkId: this.form.specified.assessmentWorkId,
          userIds: this.form.specified.userIds.toString(),
          deptIds: this.form.specified.deptIds.toString()
        })
      } else {
        data = await questionnairesSaveQuestionnaireSpecifiedRespondent({
          questionnaireId: this.form.specified.questionnaireId,
          userIds: this.form.specified.userIds.toString(),
          deptIds: this.form.specified.deptIds.toString()
        })
      }
      
      if (data.code === 200) {
        data.msg === '保存成功'
          ? this.$toast.success(data.msg)
          : this.$toast(data.msg)
        this.$refs['sinoList'].onRefresh()
      }
      this.show.dialog = false
    },

    // 异步保存随机人员
    async saveDataRandom () {
      let data
      if (this.$route.query.type && this.$route.query.type === 'assessment') {
        data = await questionnairesSaveAssessmentWorkRandomRespondent(this.form.random)
      } else {
        data = await questionnairesSaveQuestionnaireRandomRespondent(this.form.random)
      }
      
      if (data.code === 200) {
        data.msg === '保存成功'
          ? this.$toast.success(data.msg)
          : this.$toast(data.msg)
        this.$refs['sinoList'].onRefresh()
      }
      this.show.dialog = false
    },

    // 异步保存手机号
    async saveDataPhone () {
      let data;
      if (this.$route.query.type && this.$route.query.type === 'assessment') {
        data = await questionnairesSaveAssessmentWorkPhoneRespondent(this.form.phone)
      } else {
        data = await questionnairesSaveQuestionnairePhoneRespondent(this.form.phone)
      }
      
      if (data.code === 200) {
        data.msg === '保存成功'
          ? this.$toast.success(data.msg)
          : this.$toast(data.msg)
        this.$refs['sinoList'].onRefresh()
      }
      this.show.dialog = false
    },

    // 异步更新发布问卷
    async updateDataRelease () {
      let data;
      if (this.$route.query.type && this.$route.query.type === 'assessment') {
        data = await questionnairesUpdateReleaseAssessmentWork(this.$route.query.id)
      } else {
        data = await questionnairesUpdateReleaseQuestionnaire(this.$route.query.id)
      }

      if (data.code === 200) {
        this.$toast.success('发布成功')
        this.getData()
      }
    },

    // 异步删除答卷人
    async deleteData (id) {
      const data = await questionnairesDelRespondent(id)
      if (data.code === 200) {
        this.$toast.success('删除成功')
        this.$refs['sinoList'].onRefresh()
      }
    },

    // 确定选择受访者类型
    onConfirmType (obj) {
      this.form.type = obj.value
      this.typePicker.show = false
      if (obj.value === 0) {
        this.ztree.dept.value = []
        this.ztree.status = 'dept'
      } else if (obj.value === 1) {
        this.ztree.user.value = []
        this.ztree.status = 'user'
      }
    },

    // 删除
    onDelete (id) {
      this.show.dialog = false
      this.$dialog.confirm({
        title: '提醒',
        message: '是否确认删除此条信息'
      }).then(() => {
        this.deleteData(id)
      }).catch(() => {
        // on cancel
      })
    },

    // 点击通讯录 / 添加
    async onClickAdd () {
      if (this.form.type === 2) { // 手机号
        this.form.phone = {
          questionnaireId: this.$route.query.id,
          assessmentWorkId: this.$route.query.id,
          phone: ''
        }
        this.show.dialog = true
      } else if (this.form.type === 1) { // 指定人员
        this.$refs['sinoZtreeUser'].show = true
      } else if (this.form.type === 0) { // 随机人员
        this.$validator.validate().then(valid => {
          if (valid) {
            this.$refs['sinoZtreeDept'].show = true
          }
        })
      }
    },

    // 点击发布
    onClickRelease () {
      this.$dialog.confirm({
        title: '提醒',
        message: `是否确认发布此${this.$route.query.type && this.$route.query.type === 'assessment' ? '考核任务' : '问卷'}`
      }).then(() => {
        this.updateDataRelease()
      }).catch(() => {
        // on cancel
      })
    },

    // 保存手机号
    beforeClose (action, done) {
      if (action === 'confirm') {
        if (this.form.phone.phone !== '' && this.form.phone.phone.length === 11) {
          this.errorPhone = false
          this.saveDataPhone()
          done()
        } else {
          this.errorPhone = true
          done(false)
        }
      } else {
        this.errorPhone = false
        done()
      }
    },

    // 确认部门树
    onConfirmZtreeDept () {
      if (this.ztree.dept.value.length) {
        this.form.random.deptId = this.ztree.dept.value[0].id
        this.saveDataRandom()
      }
    },

    // 确认用户树
    onConfirmZtreeUser () {
      for (let i = 0; i < this.ztree.user.value.length; i++) {
        const value = this.ztree.user.value[i]
        this.form.specified.userIds.push(value.id)
        this.form.specified.deptIds.push(value.parentId)
      }
      this.saveDataSpecified()
    }
  }
}
</script>

<style lang="less">
.questionnaire-question-release {
  .sino-list {
    overflow-y: scroll;
  }
  .list {
    &-title, &-content {
      padding: @spacing-3 @spacing-4;
      font-size: @font-size-sm;
    }
    &-title {
      background-color: #f6fbff;
    }
    &-content {
      background-color: @white;
    }
  }
}
</style>
