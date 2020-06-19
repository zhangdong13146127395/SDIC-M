<template>
  <div class="questionnaire-question-answer" v-if="id">
    <template v-if="questionnaire.state === 'ended'">
      <div class="result">
        <van-icon name="info" size="2rem" color="#ff976a" />
        <div class="success">问卷已结束答题</div>
        <div class="remark">本次问卷调查已结束答题，感谢您的参与！</div>
        <div class="remark">
          <van-button plain round type="danger" @click="handleEnd">确认结束</van-button>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-if="answer.state !== 'answered'">
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
              :name="item.isRequired === 'yes' ? `answer${index}` : ''"
              v-validate="item.isRequired === 'yes' ? 'required' : ''"
              :error="item.isRequired === 'yes' ? errors.has(`answer${index}`) : false"
              :title="`Q${index + 1}：${item.title}（${item.questionType === 'radio' ? '单选题' : '判断题'}）`"
              :required="item.isRequired === 'yes'"
              :options="item.content"
              :disabled="answer.state === 'answered'"
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
              :name="item.isRequired === 'yes' ? `answer${index}` : ''"
              :error="item.isRequired === 'yes' ? errors.has(`answer${index}`) : false"
              v-validate="item.isRequired === 'yes' ? 'required' : ''"
              :title="`Q${index + 1}：${item.title}（多选题）`"
              :required="item.isRequired === 'yes'"
              :options="item.content"
              :disabled="answer.state === 'answered'"
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
              :name="item.isRequired === 'yes' ? `answer${index}` : ''"
              v-validate="item.isRequired === 'yes' ? 'required' : ''"
              :error="item.isRequired === 'yes' ? errors.has(`answer${index}`) : false"
              :title="`Q${index + 1}：${item.title}（简答题）`"
              :required="item.isRequired === 'yes'"
              :disabled="answer.state === 'answered'"
              :evaluation="{
                userName: item.evaluationUserName,
                deptName: item.evaluationDeptName,
                companyName: item.evaluationCompanyName,
                remarks: item.evaluationRemarks
              }"
            />
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="btns" v-if="answer.state && answer.state !== 'answered' && questionnaire.content">
          <van-button type="info" hairline block @click="onSave">提交问卷</van-button>
        </div>
      </div>
      <div v-else>
        <div class="result">
          <van-icon name="checked" size="2rem" color="#009944" />
          <div class="success">提交成功</div>
          <div class="remark">本次问卷调查已答题完毕，感谢您的参与！</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {
  questionnairesGetQuestionnaireAndAnswer,
  questionnairesCreateAnswer,
  questionnairesUpdateAnswer,
  questionnairesGetAnswerByQuestionnaireIdAndRespondentId,
  questionnairesProcessing
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
      id: '',
      // 数据
      questionnaire: {},
      // 结果
      result: [],
      answer: {},
    }
  },

  mounted () {
    if (this.$route.query.sms === 'true') {
      this.$parent.showNavBar = false
    }
    this.getData()
  },

  methods: {
    // 异步获取数据
    async getData () {
      if (!this.$route.query.id) {
        let answer
        answer = await questionnairesGetAnswerByQuestionnaireIdAndRespondentId(this.$route.query.qid, this.$route.query.rid);
        if (answer.data === null) {
          answer = await questionnairesCreateAnswer({ questionnaireId: this.$route.query.qid, respondentId: this.$route.query.rid })
        }
        this.$router.replace({ path: '/questionnaire/question/answer', query: { id: answer.id, qid: this.$route.query.qid, rid: this.$route.query.rid } })

        if (answer.content) {
          answer.content = JSON.parse(answer.content)
        }
        this.answer = answer
        this.id = answer.id
      } else {
        this.id = this.$route.query.id
      }
      const data = await questionnairesGetQuestionnaireAndAnswer(this.id, this.$route.query.qid)
      if (data) {
        if (data.answer.content) {
          data.answer.content = JSON.parse(data.answer.content)
        }
        this.answer = data.answer
        if (data.questionnaire.content) {
          data.questionnaire.content = JSON.parse(data.questionnaire.content)
          for (let i = 0; i < data.questionnaire.content.length; i++) {
            const questionType = data.questionnaire.content[i].questionType
            if (questionType === 'radio' || questionType === 'judge') {
              for(let j = 0; j < data.questionnaire.content[i].content.length; j++) {
                data.questionnaire.content[i].content[j].id = Number(data.questionnaire.content[i].content[j].id)
              }
            }
          }
        }
        this.questionnaire = data.questionnaire
      } else {
        this.$toast('问卷不存在')
      }

      if (this.answer && this.questionnaire.content && this.questionnaire.content.length > 0) {
        for (let i = 0; i < this.questionnaire.content.length; i++) {
          const questionType = this.questionnaire.content[i].questionType
          const answer =  this.answer.content && this.answer.content.length > 0 ? this.answer.content[i].answer : ''
          const obj = { questionId: this.questionnaire.content[i]._q_id }
          if (answer) {
            if (questionType === 'radio' || questionType === 'judge') {
              obj.answer = Number(answer.split(',')[0])
            } else if (questionType === 'checkbox') {
              obj.answer = answer.split(',').map(val => { return Number(val) })
            } else if (questionType === 'shortAnswer') {
              obj.answer = answer
            }
          } else {
            if (questionType === 'checkbox') {
              obj.answer = []
            } else {
              obj.answer = null
            }
          }
          this.$set(this.result, i, obj)
        }
      }
    },

    // 异步保存数据
    async saveData () {
      for (let i = 0; i < this.result.length; i++) {
        this.result[i] = {
          questionId: this.result[i].questionId,
          answer: this.result[i].answer ? this.result[i].answer.toString() : ''
        }
      }

      const data = await questionnairesUpdateAnswer({
        answerId: this.id,
        state: 'answered',
        answerContent: JSON.stringify(this.result)
      })

      if (data.code === 200) {
        this.answer.state = 'answered'
      }
    },

    // 点击保存
    onSave () {
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$dialog.confirm({
            title: '提醒',
            message: '是否确认提交问卷'
          }).then(() => {
            this.saveData()
          }).catch(() => {
            // on cancel
          })
        } else {
          this.$toast('您有必答题未答，请填写。')
        }
      })
    },

    // 结束
    async handleEnd () {
      const data = await questionnairesProcessing(this.$route.query.rid)
      if (data.code === 200) {
        this.$toast.success('结束成功')
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="less">
.questionnaire-question-answer {
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
}
</style>
