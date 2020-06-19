<template>
  <div class="questionnaire-answer-index">
    <!-- 标签页 -->
    <van-tabs
      v-model="tabsActive"
      sticky
      swipeable
      animated
      :border="false"
      @click="onClickTab"
    >
      <!-- 待办 -->
      <van-tab title="待办" name="0">
        <!-- 数据列表 -->
        <sino-list
          ref="sinoList0"
          v-model="list[0].data"
          :page-size="list[0].pageSize"
          min-height="calc(100vh - 90px)"
          :load="questionnairesNoAnsweredAll"
        >
          <van-cell-group>
            <van-cell
              v-for="(item, index) in list[0].data"
              :key="index"
              is-link
              center
              @click="onClickAnswer(item.id, item.questionnaireID, item.respondentId)"
            >
              <template slot="title">
                <span class="custom-title">{{ item.title }}</span>
                <van-tag v-if="item.questionnaireState === 'ended'" type="danger">已结束</van-tag>
              </template>
            </van-cell>
          </van-cell-group>
        </sino-list>
      </van-tab>
      <!-- 已办 -->
      <van-tab title="已办" name="1">
        <!-- 数据列表 -->
        <sino-list
          ref="sinoList1"
          v-model="list[1].data"
          :pageSize="list[1].pageSize"
          minHeight="calc(100vh - 90px)"
          :load="questionnairesListAnswered"
        >
          <van-cell-group>
            <van-cell
              v-for="(item, index) in list[1].data"
              :key="index"
              :title="item.title"
              is-link
              center
              @click="onClickReadOnly(item.id, item.questionnaireID, item.respondentId)"
            />
          </van-cell-group>
        </sino-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { questionnairesListAnswered, questionnairesNoAnsweredAll } from '@/api/questionnaires/index'

export default {
  components: {
    'sino-list': () => import('@/components/sino-list'),
  },

  data () {
    return {
      questionnairesListAnswered,
      questionnairesNoAnsweredAll,
      // 当前 Tab 索引
      tabsActive: '0',
      // 列表数据相关
      list: [
        {
          data: [], // 数据
          pageSize: 20, // 每页条数
        },
        {
          data: [], // 数据
          pageSize: 20, // 每页条数
        }
      ]
    }
  },
  
  mounted () {
    if (this.$route.query.tab) {
      this.$nextTick(() => {
        this.tabsActive = this.$route.query.tab
      })
    }
  },

  methods: {
    // 点击标签时触发	
    onClickTab (index) {
      this.$router.replace({ path: '/questionnaire/answer/index', query: { tab: index } })
    },

    // 答题
    onClickAnswer (id, qid, rid) {
      this.$router.push({ path: '/questionnaire/question/answer', query: { id: id || '', qid, rid } })
    },

    // 只读查看
    onClickReadOnly (id, qid, rid) {
      this.$router.push({ path: '/questionnaire/question/readonly', query: { id: id || '', qid, rid } })
    }
  }
}
</script>


<style lang="less">
.questionnaire-answer-index {
  .van-tab__pane {
    height: calc(100vh - 46px - 44px);
    overflow-y: scroll;
  }
  .custom-title {
    margin-right: 5px;
    vertical-align: middle;
  }
}
</style>
