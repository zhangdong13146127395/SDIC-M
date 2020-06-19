<template>
  <div class="questionnaire-question-index">
    <!-- 筛选 -->
    <van-dropdown-menu class="dropdown-menu">
      <van-dropdown-item v-model="dropdownMenu.status.value" :options="dropdownMenu.status.options" @change="onDropdownMenu" />
      <van-dropdown-item v-model="dropdownMenu.time.value" :options="dropdownMenu.time.options" @change="onDropdownMenu" />
    </van-dropdown-menu>

    <!-- 数据列表 -->
    <sino-list
      class="sino-list"
      ref="sinoList"
      v-model="list.data"
      :page-size="list.pageSize"
      min-height="calc(100vh - 2.56rem)"
      :load="onLoad"
    >
      <!-- 问卷列表 -->
      <question-collapse v-model="list.data" @click="onClickCollapse" />
    </sino-list>

    <!-- 更多操作弹出框 -->
    <sino-dialog-cell v-model="moreDialog.show" title="更多操作" :cells="moreDialog.cells" />

  </div>
</template>

<script>
import {
  questionnairesListQuestionnaire,
  questionnairesUpdateEndSurveyQuestionnaire,
  questionnairesDelQuestionnaire
} from '@/api/questionnaires/index'

export default {
  name: 'questionnaire-question-index',

  components: {
    'sino-dialog-cell': () => import('@/components/sino-dialog-cell'),
    'sino-list': () => import('@/components/sino-list'),
    'question-collapse': () => import('../components/question-collapse'),
  },

  data () {
    return {
      questionnairesListQuestionnaire,
      // 列表数据相关
      list: {
        data: [], // 数据
        pageSize: 20, // 每页条数
      },
      // 更多操作模态窗
      moreDialog: {
        show: false,
        cells: [
          {
            text: '回收设置',
            handler: this.onMoreSetting
          },
          {
            text: '预览问卷',
            handler: this.onMorePreview
          },
          {
            text: '终止调查',
            handler: this.onMoreStop,
            isHidden: true
          },
          {
            text: '删除问卷',
            handler: this.onMoreDelete
          },
          {
            text: '取消'
          }
        ]
      },
      // 操作的问卷 id
      selectedId: '',
      // 筛选
      dropdownMenu: {
        time: {
          value: '',
          options: [
            { value: '', text: '默认排序' },
            { value: 0, text: '从新到旧' },
            { value: 1, text: '从旧到新' },
          ]
        },
        status: {
          value: '',
          options: [
            { value: '', text: '全部' },
            { value: 'unreleased', text: '未发布' },
            { value: 'release', text: '收集中' },
            { value: 'ended', text: '已结束' }
          ]
        }
      }
    }
  },

  methods: {
    async onLoad (page) {
      const orderByColumn = 'createTime';
      let isAsc;
      let state;
      this.dropdownMenu.time.value ? isAsc = 'ASC' : isAsc = 'DESC'
      this.dropdownMenu.status.value !== '' && (state = this.dropdownMenu.status.value)
      return await questionnairesListQuestionnaire({
        orderByColumn,
        isAsc,
        state,
        ...page
      })
    },
    // 异步删除数据
    async deleteData (id) {
      const data = await questionnairesDelQuestionnaire(id)
      if (data.code === 200) {
        this.$toast.success('删除成功')
        this.$refs['sinoList'].onRefresh()
      }
    },

    // 异步更新终止问卷调查
    async updateData (id) {
      const data = await questionnairesUpdateEndSurveyQuestionnaire(id)
      if (data.code === 200) {
        this.$toast.success('终止成功')
        this.$refs['sinoList'].onRefresh()
      }
    },

    // 排序菜单 状态菜单
    onDropdownMenu () {
      this.$refs['sinoList'].onRefresh()
    },

    // 点击更多按钮
    onClickCollapse (data) {
      this.selectedId = data.id
      this.moreDialog.cells[2].isHidden = !(data.state === 'release')
      this.moreDialog.show = true
    },

    // 点击回收设置
    onMoreSetting () {
      this.moreDialog.show = false
      this.$router.push({ path: '/questionnaire/question/setting', query: { id: this.selectedId } })
    },

    // 点击预览问卷
    onMorePreview () {
      this.moreDialog.show = false
      this.$router.push({ path: '/questionnaire/question/preview', query: { id: this.selectedId } })
    },

    // 点击终止调查
    onMoreStop () {
      this.moreDialog.show = false
      this.$dialog.confirm({
        title: '提醒',
        message: '是否确认终止此问卷调查'
      }).then(() => {
        this.updateData(this.selectedId)
      }).catch(() => {
        // on cancel
      })
    },

    // 点击删除问卷
    onMoreDelete () {
      this.moreDialog.show = false
      this.$dialog.confirm({
        title: '提醒',
        message: '是否确认删除此问卷'
      }).then(() => {
        this.deleteData(this.selectedId)
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>

<style lang="less">
.questionnaire-question-index {
  .dropdown-menu {
    position: fixed;
    width: 100%;
    z-index: 999;
  }
  .sino-list {
    padding-top: 50px;
  }
  .sino-goods-action {
    position: fixed;
    top: 46px;
    bottom: unset;
    z-index: 1000;
    width: 100%;
    &-button {
      color: @text-color !important;
      background-color: @white !important;
      border-color: @border-color !important;
    }
  }
}
</style>
