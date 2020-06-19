<template>
  <div class="questionnaire-question-check" v-if="$route.query.id">
    <!-- 问卷信息 -->
    <question-header
      :title="questionnaire.title"
      :updatetime="questionnaire.updateTime"
      :numbers="[ statistics.respondentNumber, statistics.answerNumber ]"
    />

    <!-- 标签页 -->
    <van-tabs
      v-model="tabsActive"
      sticky
      swipeable
      animated
    >
      <!-- 查看回收情况 -->
      <van-tab title="查看回收情况">
        <!-- 数据列表 -->
        <sino-list
          class="sino-list"
          ref="sinoList1"
          v-model="answerList.data"
          :page-size="answerList.pageSize"
          min-height="calc(100vh - 266px)"
          :load="onLoadAnswer"
        >
          <div
            class="list-content van-hairline--bottom text-center"
            v-for="(item, index) in answerList.data"
            :key="index"
          >
            <van-row>
              <van-col span="3">{{ index + 1 }}</van-col>
              <van-col span="10">{{ item.startTime || '-' }}</van-col>
              <van-col span="8">{{ item.userName || item.phone }}</van-col>
              <van-col class="blue" span="3">
                <span @click="onLook(item.answerId, item.questionnaireId, item.respondentId)">查看</span>
              </van-col>
            </van-row>
          </div>
        </sino-list>
      </van-tab>

      <!-- 查看发送人员列表 -->
      <van-tab title="查看发送人员列表">
        <!-- 数据列表 -->
        <sino-list
          class="sino-list"
          ref="sinoList2"
          v-model="sendList.data"
          :page-size="sendList.pageSize"
          min-height="calc(100vh - 266px)"
          :load="onLoadSend"
        >
          <div
            class="list-content van-hairline--bottom text-center"
            :class="index === 0 && 'van-hairline--top'"
            v-for="(item, index) in sendList.data"
            :key="index"
          >
            <van-row>
              <van-col span="3">{{ index + 1 }}</van-col>
              <van-col span="9">{{ item.deptName || '-' }}</van-col>
              <van-col span="9">{{ item.answerType === 'phone' ? item.phone : item.userName || '-' }}</van-col>
              <van-col class="blue" span="3">
                <span @click="onWithdraw(item.id)">撤回</span>
              </van-col>
            </van-row>
          </div>
        </sino-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {
  questionnairesGetQuestionnaire,
  questionnairesGetQuestionnaireStatistics,
  questionnairesListAnswerDetails,
  questionnairesListRespondent,
  questionnairesWithdrawRespondent
} from '@/api/questionnaires/index'

export default {
  name: 'questionnaire-question-check',

  components: {
    'sino-list': () => import('@/components/sino-list'),
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
      questionnaire: {},
      statistics: {},
      // 答卷人列表数据
      answerList: {
        data: [], // 数据
        pageSize: 20, // 每页条数
      },
      // 发送人员列表数据
      sendList: {
        data: [], // 数据
        pageSize: 20, // 每页条数
      },
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
    },

    // 列表加载数据
    async onLoadAnswer (page) {
      const data = await questionnairesListAnswerDetails(this.$route.query.id, {
        orderByColumn: 'startTime',
        isAsc: 'DESC',
        ...page
      })
      return data
    },

    // 列表加载数据
    async onLoadSend (page) {
      const data = await questionnairesListRespondent({
        pId: this.$route.query.id,
        pType: 'questionnaire',
        orderByColumn: 'createTime',
        isAsc: 'DESC',
        ...page
      })
      return data
    },

    // 撤回数据
    async onWithdrawData (id) {
      const data = await questionnairesWithdrawRespondent(id)
      if (data.code === 200) {
        this.$toast(data.msg)
        this.$refs['sinoList2'].onRefresh()
      }
    },

    // 撤回
    onWithdraw (id) {
      this.$dialog.confirm({
        title: '提醒',
        message: '是否确认撤回'
      }).then(() => {
        this.onWithdrawData(id)
      }).catch(() => {
        // on cancel
      })
    },

    // 查看答题内容
    onLook (id, qid, rid) {
      this.$router.push({ path: '/questionnaire/question/readonly', query: { id, qid, rid } })
    }
  }
}
</script>

<style lang="less">
.questionnaire-question-check {
  .pull-refresh {
    min-height: calc(100vh - 46px - 220px);
    .van-pull-refresh__track {
      min-height: calc(100vh - 46px - 220px);
    }
  }

  .van-tab__pane {
    height: calc(100vh - 46px - 220px);
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
  
  .blue {
    color: @blue;
  }
}
</style>
