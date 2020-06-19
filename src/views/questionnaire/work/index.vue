<template>
  <div class="questionnaire-work-index">
    <!-- 底部操作按钮 -->
    <sino-button-group :btns="btns" />

    <!-- 数据列表 -->
    <sino-list
      ref="sinoList"
      v-model="list.data"
      :page-size="list.pageSize"
      min-height="calc(100vh - 96px)"
      placeholder-height="1.33333rem"
      :load="questionnairesListAssessmentWork"
    >
      <!-- 考核工作列表 -->
      <van-cell-group>
        <template v-for="(item, index) in list.data">
          <sino-swipe-cell
            :btns="swipeCellBtns"
            :params="{ id: item.id, index }"
            :key="index"
          >
            <van-cell class="cell" :title="item.title" is-link @click="onClickCell(item.id)">
              <img class="cell__icon" slot="icon" :src="`${baseUrl}images/questionnaire/doc.png`">
            </van-cell>
          </sino-swipe-cell>
        </template>
        <!-- <van-swipe-cell
          class="sino-swipe-cell"
          v-for="(item, index) in list.data"
          :key="index"
          :right-width="130"
        >
          <van-cell class="cell" :title="item.title" is-link @click="onClickCell(item.id)">
            <img class="cell__icon" slot="icon" :src="`${baseUrl}images/questionnaire/doc.png`">
          </van-cell>
          <div class="cell__right cell__right--edit" slot="right" @click="onEditSwipe(index)">
            <span>编辑</span>
          </div>
          <div class="cell__right cell__right--delete" slot="right" @click="onDeleteSwipe(item.id)">
            <span>删除</span>
          </div>
        </van-swipe-cell> -->
      </van-cell-group>
    </sino-list>

    <van-dialog
      v-model="show.dialog"
      title="编辑考核工作"
      show-cancel-button
      :before-close="beforeClose"
    >
      <van-field
        v-model="form.title"
        :error="error"
        label="名称"
        placeholder="请输入名称"
        type="textarea"
        clearable
        rows="1"
        autosize
      />
    </van-dialog>
  </div>
</template>

<script>
import {
  questionnairesListAssessmentWork,
  questionnairesSaveAssessmentWork,
  questionnairesUpdateAssessmentWork,
  questionnairesDelAssessmentWork
} from '@/api/questionnaires/index'

export default {
  name: 'questionnaire-work-index',
  
  components: {
    'sino-list': () => import('@/components/sino-list'),
    'sino-button-group': () => import('@/components/sino-button-group'),
    'sino-swipe-cell': () => import('@/components/sino-swipe-cell')
  },

  data () {
    return {
      baseUrl: process.env.BASE_URL,
      questionnairesListAssessmentWork,
      // 列表数据相关
      list: {
        data: [], // 数据
        pageSize: 20, // 每页条数
      },
      // 考核工作表单
      form: {
        id: '',
        title: ''
      },
      // 显示隐藏
      show: {
        dialog: false
      },
      // 错误
      error: false,
      // 按钮组
      btns: [
        {
          icon: 'plus',
          text: ' 新建考核工作',
          type: 'info',
          handler: this.onCreate
        }
      ],
      // 滑动单元格
      swipeCellBtns: [
        {
          text: '编辑',
          type: 'info',
          handler: this.onEditSwipe,
        },
        {
          text: '删除',
          type: 'danger',
          handler: this.onDeleteSwipe,
        }
      ]
    }
  },

  methods: {
    // 异步保存数据
    async saveData () {
      let data = {}
      if (this.form.id) {
        data = await questionnairesUpdateAssessmentWork({
          id: this.form.id,
          title: this.form.title,
          type: 'task'
        })
      } else {
        data = await questionnairesSaveAssessmentWork({
          title: this.form.title,
          type: 'task'
        })
      }

      if (data.code === 200) {
        this.$toast.success(this.form.id ? '更新成功' : '保存成功')
        this.$refs['sinoList'].onRefresh()
      }
      this.show.dialog = false
    },

    // 异步删除数据
    async deleteData (id) {
      const data = await questionnairesDelAssessmentWork(id)
      if (data.code === 200) {
        this.$toast.success('删除成功')
        this.$refs['sinoList'].onRefresh()
      }
    },

    // 新建考核工作
    onCreate () {
      this.form = {}
      this.show.dialog = true
    },

    // 点击列表数据
    onClickCell (id) {
      this.$router.push({ path: '/questionnaire/work/info', query: { id } })
    },

    // 保存
    beforeClose (action, done) {
      if (action === 'confirm') {
        if (this.form.title !== '') {
          this.error = false
          this.saveData()
          done()
        } else {
          this.error = true
          done(false)
        }
      } else {
        done()
      }
    },

    // 滑动编辑
    onEditSwipe (params) {
      this.form = this.list.data[params.index]
      this.show.dialog = true
    },

    // 滑动删除
    onDeleteSwipe (params) {
      this.$dialog.confirm({
        title: '提醒',
        message: '是否确认删除此考核工作'
      }).then(() => {
        this.deleteData(params.id)
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>
