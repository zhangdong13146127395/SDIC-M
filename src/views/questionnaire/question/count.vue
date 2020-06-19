<template>
  <div class="questionnaire-question-count" v-if="$route.query.id">
    <!-- 问卷信息 -->
    <question-header
      :title="questionnaire.title"
      :updatetime="questionnaire.updateTime"
      :numbers="[ statistics.respondentNumber, statistics.answerNumber ]"
    />

    <van-tabs
      v-if="statistics.answerNumber > 0"
      v-model="tabsActive"
      sticky
      swipeable
      animated
    >
      <van-tab
        class="tab"
        v-for="(item, index) in statistics.questionContent"
        :title="`Q${index + 1}`"
        :key="index"
      >
          <!-- 标题 -->
          <sino-title class="sino-title" :title="questionTitle(index, item)" />

          <template v-if="item.questionType !== 'shortAnswer'">
            <ve-pie class="ve-pie" :data="chartDatas[index]" />

            <!-- 答卷人信息 -->
            <div class="list-title van-hairline--top-bottom text-center">
              <van-row>
                <van-col span="12">选项</van-col>
                <van-col span="12">回复情况</van-col>
              </van-row>
            </div>

            <!-- 统计列表 -->
            <div
              class="list-content van-hairline--bottom text-center"
              v-for="(item2, index2) in item.content"
              :key="index2"
            >
              <van-row>
                <van-col span="12">{{ item2.title }}</van-col>
                <van-col span="12">{{ item2.pickNumber }}</van-col>
              </van-row>
            </div>

            <!-- 无内容 -->
            <div v-show="!item.content || !item.content.length" class="van-list__finished-text">暂无内容</div>
          </template>
          <template v-else>
            <template v-for="(item2, index2) in item.content">
            <div
              class="textarea van-hairline--surround"
              v-if="item2 !== ''"
              :key="index2"
            >
                <van-field
                  :value="item2"
                  type="textarea"
                  disabled
                  rows="3"
                  :autosize="{ maxHeight: 72, minHeight: 72 }"
                />
              </div>
            </template>
          </template>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {
  questionnairesGetQuestionnaire,
  questionnairesGetQuestionnaireStatistics
} from '@/api/questionnaires/index'

export default {
  name: 'questionnaire-question-count',

  components: {
    've-pie': () => import('v-charts/lib/pie.common'),
    'sino-title': () => import('@/components/sino-title'),
    'question-header': () => import('../components/question-header'),
  },
  
  data () {
    return {
      // 当前 Tab 索引
      tabsActive: 0,
      // 下拉刷新状态
      isLoading: false,
      // 列表加载更多状态
      listStatus: {
        loading: false,
        finished: false
      },
      // 数据
      questionnaire: {},
      statistics: {},
      list: [],
      // 统计图数据
      chartDatas: []
    }
  },

  mounted () {
    this.getData()
  },

  methods: {
    // 异步获取数据
    async getData () {
      this.questionnaire = await questionnairesGetQuestionnaire(this.$route.query.id)
      this.statistics = await questionnairesGetQuestionnaireStatistics(this.$route.query.id)
      this.statistics.questionContent = JSON.parse(this.statistics.questionContent)
      for (let i = 0; i < this.statistics.questionContent.length; i++) {
        this.chartDatas.push({ columns: [ '选项', '数量' ], rows: [] })
        for (let j = 0; j < this.statistics.questionContent[i].content.length; j++) {
          this.chartDatas[i].rows.push({
            '选项': this.statistics.questionContent[i].content[j].title,
            '数量': this.statistics.questionContent[i].content[j].pickNumber
          })
        }
      }
    },

    // 问卷标题
    questionTitle (index, item) {
      const number = `Q${index + 1}: `
      const name = item.title
      let type = ''
      if (item.questionType === 'radio') {
        type = '单选题'
      } else if (item.questionType === 'checkbox') {
        type = '多选题'
      } else if (item.questionType === 'judge') {
        type = '判断题'
      } else if (item.questionType === 'shortAnswer') {
        type = '简答题'
      }
      return `${number + name}（${type}）`
    }
  }
}
</script>

<style lang="less">
.questionnaire-question-count {
  .pull-refresh {
    min-height: calc(100vh - 46px - 220px);
    .van-pull-refresh__track {
      min-height: calc(100vh - 46px - 220px);
    }
  }

  .van-tab__pane {
    .sino-title, .ve-pie {
      background-color: #fff;
    }
  }

  .tab {
    padding-bottom: @spacing-4;
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
  
  .textarea {
    margin: @spacing-2;
    .van-cell {
      border-radius: 4px;
    }
    &:after {
      border-radius: 4px;
    }
  }
  .van-field__control:disabled {
    color: @text-color;
  }
}
</style>
