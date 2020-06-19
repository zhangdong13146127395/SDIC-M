<template>
  <div class="sino-ztree">
    <van-popup
      class="popup"
      v-model="show"
      :overlay="false"
    >
      <template v-if="show">
        <!-- 搜索框 -->
        <van-search
          v-model="search.text"
          :show-action="search.showAction"
          clearable
          placeholder="请输入搜索关键词"
          @search="handleSearch"
          @cancel="handleSearchCancel"
          @clear="handleSearchClear"
        />

        <!-- 选择树 -->
        <van-tabs
          v-model="tabsActive"
          :line-height="0"
          :swipe-threshold="2"
          :ellipsis="false"
          animated
          @click="onClickTabs"
        >
          <van-tab v-for="(item, index) in treeData" :key="index">
            <!-- 滚动标题栏 -->
            <div slot="title" class="tab-title">
              <van-icon
                class="tab-title__icon"
                :class-prefix="index === 0 ? 'iconfont' : 'van-icon'"
                :name="index === 0 ? 'iconhomefill' : 'play'"
                color="#969799"
                :size="index === 0 ? '20px' : '14px'"
              />
              <span class="tab-title__text">{{ item.name }}</span>
            </div>

            <!-- 选项列表 -->
            <ztree-list
              ref="ztreeList"
              v-model="ids"
              :obj-value="objValue"
              :options="item.children"
              :config="treeConfig"
              @click="onClick"
              @change="onChange"
            />
          </van-tab>
        </van-tabs>

        <!-- 已选列表 -->
        <ztree-selected
          ref="ztreeSelected"
          v-model="ids"
          :new-value="newValue"
          :obj-value="objValue"
          :show="showSelected"
          @change="onChange"
        />

        <!-- 搜索列表 -->
        <ztree-search
          ref="ztreeSearch"
          v-model="ids"
          :obj-value="objValue"
          :search="search.text"
          :config="treeConfig"
          @click="onClick"
          @change="onChange"
        />

        <!-- 已选 -->
        <div class="chosen">
          <div class="chosen--text">
            已选数量：{{ newValue.length || 0 }}
            <span>{{ treeConfig.max !== 500 ? `（最大值：${treeConfig.max}）` : '' }}</span>
          </div>
          <div class="chosen--btn">
            <van-button v-if="newValue.length > 0" size="small" type="danger" plain hairline @click="onDeleteAll">取消全部</van-button>
            <van-button size="small" hairline @click="showSelected = !showSelected">{{ showSelected ? '返回列表' : '查看已选'}}</van-button>
          </div>
        </div>

        <!-- 底部操作按钮 -->
        <!-- <van-goods-action class="sino-goods-action">
          <van-goods-action-button class="sino-goods-action-button" hairline square text="取消" @click="onClose" />
          <van-goods-action-button class="sino-goods-action-button" hairline square text="确认" @click="onConfirm" />
        </van-goods-action> -->
        <sino-button-group :btns="btns" />
      </template>
    </van-popup>
  </div>
</template>

<script>

import { listDeptTree, listUserTree } from '@/api/system'

export default {
  name: 'sino-ztree',

  components: {
    'ztree-list': () => import ('./components/ztree-list'),
    'ztree-search': () => import ('./components/ztree-search'),
    'ztree-selected': () => import ('./components/ztree-selected'),
    'sino-button-group': () => import('@/components/sino-button-group')
  },

  props: {
    // 选中值
    value: {
      type: Array,
      default () {
        return []
      }
    },
    // 设置参数
    config: Object
  },

  data () {
    return {
      // 弹出层是否显示
      show: false,
      // 已选列表是否显示
      showSelected: false,
      // 点击每行数据的状态
      isClick: false,
      // 选中 tab
      tabsActive: 0,
      // 树结构设置
      treeConfig: {},
      // 树结构数据
      treeData: [],
      // 最新已选择的 id
      ids: [],
      // 传入的已选值
      oldValue: [],
      // 最新选择的值
      newValue: [],
      // 选中值的对象
      objValue: {},
      // 搜索
      search: {
        text: '',
        showAction: false
      },
      // 按钮组
      btns: [
        {
          text: '取消',
          handler: this.onClose
        },
        {
          text: '确认',
          type: 'info',
          handler: this.onConfirm
        }
      ]
    }
  },

  watch: {
    show: {
      handler (val) {
        if (val) {
          for (let i = 0; i < this.value.length; i++) {
            const value = this.value[i]
            this.ids.push(value.id)
            this.objValue[value.id] = value
          }
          this.oldValue = this.value
          this.newValue = this.value
          this.init()
        }
      }
    },
    treeData: {
      handler (val) {
        this.$nextTick(() => {
          this.tabsActive = val.length - 1
        })
      },
      deep: true
    }
  },

  methods: {
    // 获取数据
    async getData (deptId, value) {
      const { treeConfig } = this
      let data = []
      if (treeConfig.type === 'dept') {
        data = await listDeptTree({ rootId: treeConfig.rootId, deptId: deptId || '' })
      } else if (treeConfig.type === 'user') {
        data = await listUserTree({ rootId: treeConfig.rootId, deptId: deptId || '' })
      }
      if (deptId) {
        value.children = data
        this.treeData.push(value)
        this.isClick = false
      } else {
        this.treeData.push(...data)
      }
    },
    
    // 初始化
    init () {
      const { config } = this
      // 初始化设置信息
      this.treeConfig = {
        ...config,
        rootId: config.rootId || '162812',
        max: config.max ? (config.max > 500 || config.max === 0) ? 500 : config.max : 500, // 最大值
      }
      this.treeData = []
      this.getData()
    },

    // 点击 tab 栏返回某层
    onClickTabs (index) {
      if (index < this.treeData.length - 1) {
        this.treeData.splice(index + 1, this.treeData.length - index)
      }
    },

    // 点击选项
    onClick (val) {
      if (!this.isClick) {
        this.isClick = true
        this.getData(val.id, val)
      }
    },

    // 搜索
    handleSearch () {
      if (this.search.text !== '') {
        this.search.showAction = true
        this.$refs.ztreeSearch.show = true
        this.$refs.ztreeSearch.getData()
      }
    },

    // 搜索清除
    handleSearchClear () {
      this.search.showAction = false
      this.$refs.ztreeSearch.show = false
    },

    // 搜索取消
    handleSearchCancel () {
      this.search.showAction = false
      this.$refs.ztreeSearch.show = false
    },

    // 勾选
    onChange () {
      this.newValue = []
      for (let key in this.objValue) {
        this.newValue.push(this.objValue[key])
      }
    },

    // 删除全部
    onDeleteAll () {
      this.ids = []
      this.arrayValue = {}
      this.objValue = {}
      this.$emit('input', [])
    },

    // 取消
    onClose () {
      this.$emit('input', this.oldValue)
      this.$emit('cancel')
      Object.assign(this.$data, this.$options.data.call(this))
    },

    // 确认
    onConfirm () {
      this.$emit('input', this.newValue)
      this.$emit('confirm', this.newValue)
      Object.assign(this.$data, this.$options.data.call(this))
    },
  }
}
</script>

<style lang="less">
.sino-ztree {
  .popup {
    width: 100%;
    height: 100vh;
    transition: 0s;
    .van-tabs__wrap {
      padding: 0 @spacing-4;
      .van-tab {
        padding: 0;
      }
      &--scrollable {
        &:after {
          border-bottom: 0;
        }
        .van-tab--complete {
          flex: none;
          .tab-title {
            flex: 0 0 auto;
            &__icon {
              vertical-align: middle;
              width: 14px;
            }
            &__text {
              display: inline-block;
              vertical-align: middle;
              margin: 0 @spacing-2;
              font-size: @font-size-sm;
            }
          }
        }
      }
    }
    .van-tab__pane {
      height: calc(100vh - 193px);
      overflow-y: scroll;
    }
    .chosen {
      display: flex;
      align-items: center;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 50px;
      padding: @spacing-2 @spacing-4;
      background-color: @background-color;
      &--text {
        width: 200px;
        color: @text-color;
        font-size: @font-size-sm;
        span {
          color: @gray-darker;
          font-size: @font-size-xs;
        }
      }
      &--btn {
        flex: 1;
        font-size: 0;
        text-align: right;
        .van-button:not(:last-child) {
          margin-right: @spacing-1;
        }
      }
    }
  }
}
</style>
