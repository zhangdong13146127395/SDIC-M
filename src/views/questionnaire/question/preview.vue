<template>
  <div class="questionnaire-question-preview" v-if="$route.query.id">
    <div class="title">{{ questionnaire.title }}</div>
    <div class="extra">{{ questionnaire.description }}</div>
    <div class="evaluation" v-if="questionnaire.evaluationUnitsName">被巡视单位：{{ questionnaire.evaluationUnitsName }}</div>
    <div class="question">
      <div
        v-for="(item, index) in questionnaire.content"
        :key="index"
      >
        <!-- 单选题 -->
        <question-radio
          v-if="item.questionType === 'radio' || item.questionType === 'judge'"
          v-model="result[index]"
          :title="`Q${index + 1}：${item.title}（${item.questionType === 'radio' ? '单选题' : '判断题'}）`"
          :options="item.content"
          :required="item.isRequired === 'yes'"
          disabled
          :evaluation="{
            userName: item.evaluationUserName,
            deptName: item.evaluationDeptName,
            companyName: item.evaluationCompanyName,
            remarks: item.evaluationRemarks
          }"
        />
        <!-- 多选题 -->
        <question-checkbox
          v-if="item.questionType === 'checkbox'"
          v-model="result[index]"
          :title="`Q${index + 1}：${item.title}（多选题）`"
          :options="item.content"
          :required="item.isRequired === 'yes'"
          disabled
          :evaluation="{
            userName: item.evaluationUserName,
            deptName: item.evaluationDeptName,
            companyName: item.evaluationCompanyName,
            remarks: item.evaluationRemarks
          }"
        />
        <!-- 填空题 -->
        <question-textarea
          v-if="item.questionType === 'shortAnswer'"
          v-model="result[index]"
          :title="`Q${index + 1}：${item.title}（简答题）`"
          :required="item.isRequired === 'yes'"
          disabled
          :evaluation="{
            userName: item.evaluationUserName,
            deptName: item.evaluationDeptName,
            companyName: item.evaluationCompanyName,
            remarks: item.evaluationRemarks
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  questionnairesGetQuestionnaire
} from '@/api/questionnaires/index'

export default {
  name: 'questionnaire-question-preview',

  components: {
    'question-radio': () => import('../components/question-radio'),
    'question-checkbox': () => import('../components/question-checkbox'),
    'question-textarea': () => import('../components/question-textarea'),
  },

  data () {
    return {
      // 数据
      questionnaire: {},
      // 结果
      result: {},
    }
  },

  mounted () {
    this.getData()
  },

  methods: {
    // 异步获取数据
    async getData () {
      const data = await questionnairesGetQuestionnaire(this.$route.query.id)
      if (data) {
        if (data.content) {
          data.content = JSON.parse(data.content)
        }
        this.questionnaire = data
      } else {
        this.$toast('问卷不存在')
      }
    }
  }
}
</script>

<style lang="less">
.questionnaire-question-preview {
  .title {
    padding: @spacing-3;
    color: @text-color;
    font-size: @font-size-xl;
    font-weight: 700;
  }
  .extra {
    padding: 0 @spacing-3;
    color: @text-color;
    font-size: @font-size-sm;
  }
  .evaluation {
    padding: @spacing-1 @spacing-3 0;
    font-size: @font-size-sm;
    color: @blue;
  }
  .question {
    padding-bottom: @spacing-4;
    .van-radio__label--disabled, .van-checkbox__label--disabled {
      color: @text-color;
    }
  }
}
</style>
