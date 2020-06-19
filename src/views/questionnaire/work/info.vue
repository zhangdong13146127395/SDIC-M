<template>
  <div class="questionnaire-work-info">
    <!-- 底部操作按钮 -->
    <!-- <van-goods-action class="sino-goods-action">
      <van-goods-action-button
        class="sino-goods-action-button"
        v-if="assessmentWork.state === 'unreleased'"
        hairline
        square
        text="添加问卷"
        @click="onAdd"
      />
      <van-goods-action-button class="sino-goods-action-button" hairline square text="回收设置" @click="onSetting" />
      <van-goods-action-button
        class="sino-goods-action-button"
        v-if="assessmentWork.state === 'release'"
        hairline
        square
        text="终止考核任务"
        @click="onStopAssessmentWork"
      />
      <van-goods-action-button
        class="sino-goods-action-button"
        v-if="assessmentWork.state === 'unreleased'"
        hairline
        square
        text="发布问卷"
        @click="onRelease"
      />
    </van-goods-action> -->
    <sino-button-group :btns="btns" />

    <!-- 考核工作信息 -->
    <question-header class="question-header" :title="assessmentWork.title" />

    <!-- 数据列表 -->
    <sino-list
      class="sino-list"
      ref="sinoList"
      v-model="list.data"
      :page-size="list.pageSize"
      :head-height="34"
      min-height="calc(100vh - 165px)"
      :load="onLoad"
    >
      <!-- 问卷列表 -->
      <question-collapse class="question-collapse" v-model="list.data">
        <template slot="btns" slot-scope="slotProps">
          <van-button
            class="button"
            v-if="slotProps.data.state !== 'unreleased'"
            hairline
            type="default"
            size="small"
            @click="onCount(slotProps.data.questionnaireId)"
          >
            统计结果
          </van-button>
          <van-button
            class="button"
            v-if="slotProps.data.state !== 'unreleased'"
            hairline
            type="default"
            size="small"
            @click="onCheck(slotProps.data.questionnaireId)"
          >
            查看数据
          </van-button>
          <van-button
            class="button"
            v-if="assessmentWork.state === 'release'"
            hairline
            type="default"
            size="small"
            @click="onStopQuestionnaire(slotProps.data.questionnaireId)"
          >
            终止调查
          </van-button>
          <van-button
            class="button"
            v-if="assessmentWork.state === 'unreleased'"
            hairline
            type="default"
            size="small"
            @click="onDelete(slotProps.data.relationId)"
          >
            删除问卷
          </van-button>
        </template>
      </question-collapse>
    </sino-list>

  </div>
</template>

<script>
import {
  questionnairesGetAssessmentWork,
  questionnairesListQuestionnaireForAssessmentWork,
  questionnairesUpdateEndSurveyQuestionnaire,
  questionnairesUpdateEndSurveyAssessmentWork,
  questionnairesDelQuestionnaireAndAssessmentWorkRelation
} from '@/api/questionnaires/index'

export default {
  name: 'questionnaire-work-info',

  components: {
    'sino-list': () => import('@/components/sino-list'),
    'question-header': () => import('../components/question-header'),
    'question-collapse': () => import('../components/question-collapse'),
    'sino-button-group': () => import('@/components/sino-button-group')
  },

  data () {
    return {
      // 列表数据相关
      list: {
        data: [], // 数据
        pageSize: 20, // 每页条数
      },
      // 考核工作信息
      assessmentWork: {},
      // 操作的问卷 id
      selectedId: ''
    }
  },

  computed: {
    // 按钮组
    btns () {
      const btns = []
      if (this.assessmentWork.state === 'unreleased') {
        btns.push({
          text: '添加问卷',
          handler: this.onAdd
        })
      }
      if (this.assessmentWork.state === 'release') {
        btns.push({
          text: '终止考核任务',
          type: 'danger',
          handler: this.onStopAssessmentWork
        })
      }
      if (this.assessmentWork.state === 'unreleased') {
        btns.push({
          text: '发布问卷',
          type: 'info',
          handler: this.onRelease
        })
      }
      return btns
    }
  },

  mounted () {
    this.getDataAssessmentWork()
  },

  methods: {
    // 列表加载数据
    async onLoad (page) {
      const data = await questionnairesListQuestionnaireForAssessmentWork(this.$route.query.id, page)
      return data
    },

    // 异步获取数据
    async getDataAssessmentWork () {
      this.assessmentWork = await questionnairesGetAssessmentWork(this.$route.query.id)
    },
    
    // 异步更新终止问卷调查
    async updateDataQuestionnaire (id) {
      const data = await questionnairesUpdateEndSurveyQuestionnaire(id)
      if (data.code === 200) {
        this.$toast.success('终止成功')
        this.$refs['sinoList'].onRefresh()
        this.getDataAssessmentWork()
      }
    },

    // 异步更新终止考核工作
    async updateDataAssessmentWork () {
      const data = await questionnairesUpdateEndSurveyAssessmentWork(this.$route.query.id)
      if (data.code === 200) {
        this.$toast.success('终止成功')
        this.$refs['sinoList'].onRefresh()
        this.getDataAssessmentWork()
      }
    },

    // 异步删除数据
    async deleteData (id) {
      const data = await questionnairesDelQuestionnaireAndAssessmentWorkRelation(id)
      if (data.code === 200) {
        this.$toast.success('删除成功')
        this.$refs['sinoList'].onRefresh()
      }
    },

    // 点击添加问卷
    onAdd () {
      this.$router.push({ path: '/questionnaire/work/add', query: { id: this.$route.query.id } })
    },

    // 点击回收设置
    onSetting () {
      this.$router.push({ path: '/questionnaire/question/setting', query: { id: this.$route.query.id, type: 'assessment' } })
    },

    // 点击发布问卷
    onRelease () {
      this.$router.push({ path: '/questionnaire/question/release', query: { id: this.$route.query.id, type: 'assessment' } })
    },

    // 点击统计结果
    onCount (id) {
      this.$router.push({ path: '/questionnaire/question/count', query: { id } })
    },

    // 点击查看数据
    onCheck (id) {
      this.$router.push({ path: '/questionnaire/question/check', query: { id } })
    },

    // 点击终止调查
    onStopQuestionnaire (id) {
      this.$dialog.confirm({
        title: '提醒',
        message: '是否确认终止此问卷调查'
      }).then(() => {
        this.updateDataQuestionnaire(id)
      }).catch(() => {
        // on cancel
      })
    },

    // 点击终止考核工作
    onStopAssessmentWork () {
      this.$dialog.confirm({
        title: '提醒',
        message: '是否确认终止此考核任务'
      }).then(() => {
        this.updateDataAssessmentWork()
      }).catch(() => {
        // on cancel
      })
    },

    // 点击删除
    onDelete (id) {
      this.$dialog.confirm({
        title: '提醒',
        message: '是否确认删除此问卷'
      }).then(() => {
        this.deleteData(id)
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>

<style lang="less">
.questionnaire-work-info {
  .sino-list {
    height: calc(100vh - 149px);
    overflow-y: scroll;
  }
  .question-collapse {
    margin-top: @spacing-4;
  }
}
</style>
