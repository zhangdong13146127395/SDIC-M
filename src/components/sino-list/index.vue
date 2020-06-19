<template>
  <div class="sino-list">
    <!-- 下拉刷新 -->
    <van-pull-refresh
    v-model="refreshing"
    :head-height="isNull ? 50 : headHeight"
    :style="pullRefreshStyle"
    @refresh="onRefresh"
    >
      <!-- 加载更多列表 -->
      <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      :finished-text="isNull ? '暂无内容' : '没有更多了'"
      error-text="请求失败，点击重新加载"
      :immediate-check="isKeepAlive"
      :style="listStyle"
      @load="onLoad"
      >
        <slot v-if="!isNull && value.length" />
      </van-list>
      <!-- 占位，防止底部悬浮遮挡 -->
      <div v-show="!isNull && placeholderHeight" :style="placeholderStyle"></div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'sino-list',

  props: {
    // 数据
    value: {
      type: Array,
      default () {
        return []
      }
    },
    // 顶部内容高度
    headHeight: {
      type: Number,
      default: 50
    },
    // 每页条数
    pageSize: {
      type: Number,
      default: 20
    },
    // 距离顶部距离
    marginTop: {
      type: String,
      default: '0'
    },
    // 列表最小高度
    minHeight: {
      type: String,
      default: '100vh'
    },
    // 占位栏高度
    placeholderHeight: {
      type: String,
      default: '0'
    },
    load: {
      type: Function,
      Required: true
    }
  },

    data () {
      return {
        data: this.value, // 数据
        type: 0, // 0: 加载更多 1: 下拉刷新
        isNull: false, // 数据为空
        refreshing: false, // 是否下拉刷新加载中
        loading: false, // 是否处于加载状态
        finished: false, // 是否已加载完成
        error: false, // 是否加载失败
        page: {
          pageNum: 1, // 当前页数
          pageSize: this.pageSize, // 每页条数
          pageTotal: 0, // 总条数
        }
      }
    },

  computed: {
    ...mapState('sino', {
      isKeepAlive: state => state.page.isKeepAlive
    }),
    pullRefreshStyle () {
      return {
        marginTop: this.marginTop,
        minHeight: this.minHeight
      }
    },
    listStyle () {
      return {
        minHeight: this.minHeight
      }
    },
    placeholderStyle () {
      return {
        height: this.placeholderHeight
      }
    }
  },

  activated () {
    if (!this.isKeepAlive) {
      this.setKeepAlive(true)
      this.onRefresh()
    }
  },

  methods: {
    ...mapMutations('sino', {
      setKeepAlive: 'page/setKeepAlive'
    }),
    
    // 下拉刷新
    onRefresh () {
      this.type = 1
      this.refreshing = true
      this.page.pageNum = 1
      this.getData()
    },

    // 加载更多
    onLoad () {
      this.type = 0
      this.getData()
    },
    
    // 请求数据
    async getData () {
      try {
        const data = await this.load(this.page)
        this.onCheckData(data)
      } catch {
        this.refreshing = false
        this.loading = false
        this.error = true
      }
    },

    // 检查数据
    onCheckData (temp) {
      const { type, page } = this

      if (temp.list && temp.list.length) {
        page.pageNum = page.pageNum + 1
      }

      if (type) {
        this.data = temp.list || []
        this.refreshing = false
        this.error = false
      } else {
        temp.list && temp.list.length && this.data.push(...temp.list)
        this.loading = false
      }

      page.pageTotal = temp.total
      this.finished = this.data.length >= page.pageTotal
      this.isNull = page.pageNum === 1 && !this.data.length

      this.$emit('input', this.data)
    }
  }
}
</script>
