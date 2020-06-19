<template>
  <div class="questionnaire-work-add">
    <!-- 底部操作按钮 -->
    <!-- <van-goods-action class="sino-goods-action">
      <van-goods-action-button class="sino-goods-action-button" hairline square text="取消" @click="onCancel" />
      <van-goods-action-button class="sino-goods-action-button" hairline square text="确认" @click="onSave" />
    </van-goods-action> -->
    <sino-button-group :btns="btns" />

    <!-- 数据列表 -->
    <sino-list
      v-model="list.data"
      :page-size="list.pageSize"
      min-height="calc(100vh - 96px)"
      placeholder-height="1.33333rem"
      :load="questionnairesListChooseQuestionnaire"
    >
      <!-- 可添加问卷列表 -->
      <van-checkbox-group v-model="result.questionnaireIds">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in list.data"
            :key="index"
            is-link
          >
            <template slot="icon">
              <van-checkbox
                ref="checkboxes"
                label-disabled
                shape="square"
                :name="item.id"
              />
            </template>
            <template slot="title">
              <div class="checkobox-title" @click="onClickCell(item.id)">
                {{ item.title }}
              </div>
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </sino-list>
  </div>
</template>

<script>
import {
  questionnairesListChooseQuestionnaire,
  questionnairesSaveQuestionnaireAndAssessmentWorkRelation
} from '@/api/questionnaires/index'

export default {
  name: 'questionnaire-work-add',

  components: {
    'sino-list': () => import('@/components/sino-list'),
    'sino-button-group': () => import('@/components/sino-button-group')
  },

  data () {
    return {
      questionnairesListChooseQuestionnaire,
       // 列表数据相关
      list: {
        data: [], // 数据
        pageSize: 20, // 每页条数
      },
      // 提交数据
      result: {
        assessmentWorkId: this.$route.query.id,
        questionnaireIds: []
      },
      // 按钮组
      btns: [
        {
          text: '取消',
          handler: this.onCancel
        },
        {
          text: '确认',
          type: 'info',
          handler: this.onSave
        }
      ]
    }
  },

  methods: {
    // 保存已勾选数据
    async onSave () {
      const data = await questionnairesSaveQuestionnaireAndAssessmentWorkRelation({
        assessmentWorkId: this.result.assessmentWorkId,
        questionnaireIds: this.result.questionnaireIds.toString()
      })
      if (data.code === 200) {
        this.$toast.success('添加成功')
        this.$router.replace({ path: '/questionnaire/work/info', query: { id: this.$route.query.id } })
      }
    },

    // 取消返回
    onCancel () {
      this.$router.go(-1)
    },

    // 点击列表数据
    onClickCell (id) {
      this.$router.push({ path: '/questionnaire/question/preview', query: { id } })
    }
  }
}
</script>

<style lang="less">
.questionnaire-work-add {
  .pull-refresh {
    min-height: calc(100vh - 50px);
    .van-pull-refresh__track {
      min-height: calc(100vh - 50px);
    }
  }

  .placeholder {
    height: 50px;
  }

  .van-checkbox__label {
    display: inline;
  }
  .checkobox-title {
    margin-left: @spacing-2;
  }
}
</style>
