<template>
  <div class="questionnaire-question-readonly" v-if="$route.query.id">
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
          v-model="result[index].answer"
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
          v-model="result[index].answer"
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
          v-model="result[index].answer"
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
  questionnairesGetQuestionnaireAndAnswer
} from '@/api/questionnaires/index'

export default {
  name: 'questionnaire-question-answer',

  components: {
    'question-radio': () => import('../components/question-radio'),
    'question-checkbox': () => import('../components/question-checkbox'),
    'question-textarea': () => import('../components/question-textarea'),
  },

  data () {
    return {
      id: this.$route.query.id,
      // 数据
      questionnaire: {},
      // 结果
      result: {},
      answer: {},
    }
  },

  mounted () {
    this.getData()
  },

  methods: {
    // 异步获取数据
    async getData () {
      const data = await questionnairesGetQuestionnaireAndAnswer(this.id, this.$route.query.qid)
      if (data) {
        if (data.answer && data.answer.content) {
          data.answer.content = JSON.parse(data.answer.content)
        }
        this.answer = data.answer
        if (data.questionnaire && data.questionnaire.content) {
          data.questionnaire.content = JSON.parse(data.questionnaire.content)
        }
        this.questionnaire = data.questionnaire
      } else {
        this.$toast('问卷不存在')
      }

      if (this.answer) {
        for (let i = 0; i < this.answer.content.length; i++) {
          const questionType = this.questionnaire.content[i].questionType
          const answer =  this.answer.content[i].answer
          const obj = { questionId: this.answer.content[i].questionId }
          if (questionType === 'radio' || questionType === 'judge') {
            obj.answer = Number(answer.split(',')[0])
          } else if (questionType === 'checkbox') {
            const answerArr = answer.split(',');
            const newArr = []
            for (let i = 0; i < answerArr.length; i++) {
              if (answerArr[i]) {
                newArr.push(Number(answerArr[i]))
              }
            }
            obj.answer = newArr
            console.log(newArr)
          } else if (questionType === 'shortAnswer') {
            obj.answer = answer
          }
          this.$set(this.result, i, obj)
        }
      }
    }
  }
}
</script>

<style lang="less">
.questionnaire-question-readonly {
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
  }
  .btns {
    padding: 0 @spacing-4 @spacing-4;
  }
  .result {
    margin-top: 40%;
    text-align: center;
    .success {
      color: @text-color;
      font-size: @font-size-xl;
      font-weight: 700;
    }
    .remark {
      padding: @spacing-2;
      color: @gray-darker;
      font-size: @font-size-sm;
    }
  }
  .van-radio__icon--disabled.van-radio__icon--checked .van-icon {
    color: @white;
    border-color: @blue;
    background-color: @blue;
  }
  .van-checkbox__icon--disabled.van-checkbox__icon--checked .van-icon {
    color: @white;
    border-color: @blue;
    background-color: @blue;
  }
  .van-field--disabled .van-field__control, .van-field__right-icon {
    color: @text-color;
  }
  .van-radio__label--disabled, .van-checkbox__label--disabled {
    color: @text-color;
  }
}
</style>
