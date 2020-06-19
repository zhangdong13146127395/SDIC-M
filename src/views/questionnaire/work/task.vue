<template>
  <div class="questionnaire-work-task questionnaire-work-index">
    <!-- 底部操作按钮 -->
    <!-- <van-goods-action class="sino-goods-action">
      <van-goods-action-button class="sino-goods-action-button" hairline square @click="onCreate">
        <van-icon class="sino-goods-action-button__icon" name="plus" size="16px" />
        <span class="sino-goods-action-button__text"> 新建考核任务</span>
      </van-goods-action-button>
    </van-goods-action> -->
    <sino-button-group :btns="btns" />

    <!-- 下拉刷新 -->
    <van-pull-refresh
      class="pull-refresh"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <!-- 加载更多列表 -->
      <van-list
        v-show="list.length"
        class="list"
        v-model="listStatus.loading"
        :finished="listStatus.finished"
        :offset="50"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 考核任务列表 -->
        <van-cell-group>
          <template v-for="(item, index) in list">
            <sino-swipe-cell
              :btns="swipeCellBtns"
              :key="index"
            >
              <van-cell class="cell" :title="item.title" is-link @click="onClickCell(item.id)">
                <img class="cell__icon" slot="icon" src="/images/questionnaire/task.png">
              </van-cell>
            </sino-swipe-cell>
          </template>
          <!-- <van-swipe-cell
            class="sino-swipe-cell"
            v-for="(item, index) in list"
            :key="index"
            :right-width="130"
          >
            <van-cell class="cell" :title="item.title" is-link @click="onClickCell(item.id)">
              <img class="cell__icon" slot="icon" src="/images/questionnaire/task.png">
            </van-cell>
            <div class="cell__right cell__right--edit" slot="right" @click="onEdit">
              <span>编辑</span>
            </div>
            <div class="cell__right cell__right--delete" slot="right" @click="onDelete">
              <span>删除</span>
            </div>
          </van-swipe-cell> -->
        </van-cell-group>
      </van-list>

      <!-- 无内容 -->
      <div v-show="!list.length" class="van-list__finished-text">暂无内容</div>
    </van-pull-refresh>

    <van-dialog
      v-model="show.dialog"
      title="编辑考核任务"
      show-cancel-button
      :before-close="beforeClose"
    >
      <van-field
        v-model="form.name"
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
export default {
  name: 'questionnaire-work-index',

  components: {
    'sino-button-group': () => import('@/components/sino-button-group'),
    'sino-swipe-cell': () => import('@/components/sino-swipe-cell')
  },
  
  data () {
    return {
      // 下拉刷新状态
      isLoading: false,
      // 列表加载更多状态
      listStatus: {
        loading: false,
        finished: false
      },
      // 列表数据
      list: [],
      // 考核工作表单
      form: {
        id: '',
        name: ''
      },
      // 显示隐藏
      show: {
        dialog: false
      },
      // 按钮组
      btns: [
        {
          icon: 'plus',
          text: ' 新建考核任务',
          type: 'info',
          handler: this.onCreate
        }
      ]
    }
  },

  mounted () {
    this.getData()
  },

  methods: {
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },

    // 加载更多
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        console.log(this.list)
        // 加载状态结束
        this.listStatus.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.listStatus.finished = true
        }
      }, 500)
    },

    // 异步获取数据
    async getData () {
      const data = []
      this.list.push(...data.list)
      console.log(this.list)
    },

    // 新建考核任务
    onCreate () {

    },

    // 点击列表数据
    onClickCell (id) {
      this.$router.push({ path: '/questionnaire/work/info', query: { id } })
    },

    // 保存
    beforeClose (action, done) {
      if (action === 'confirm') {
        this.show.dialog = false
        this.$toast.success('保存成功')
        done()
      } else {
        done()
      }
    },

    // 编辑
    onEdit () {
      this.show.dialog = true
    },

    // 删除
    onDelete () {
      this.show.dialog = false
      this.$dialog.confirm({
        title: '提醒',
        message: '是否确认删除此考核任务'
      }).then(() => {
        this.$toast.success('删除成功')
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>

<style lang="less">
.questionnaire-task-index {
  
}
</style>
