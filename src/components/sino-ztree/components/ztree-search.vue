<template>
  <!-- 搜索列表 -->
  <van-popup
    class="popup ztree-search-popup"
    ref="searchPopup"
    :value="show"
    position="top"
    transition="van-fade"
    :overlay="false"
  >
    <!-- 选项列表 -->
    <ztree-list
      ref="ztreeList"
      v-if="data.length"
      v-model="ids"
      :obj-value="objValue"
      :options="data"
      full-name
      :config="config"
      @change="onChange"
    />
  </van-popup>
</template>

<script>
import ZtreeList from './ztree-list'
import { listSearchTree } from '@/api/system'

export default {
  name: 'ztree-search',

  components: {
    ZtreeList
  },

  props: {
    // 选中值
    value: {
      type: Array,
      default () {
        return []
      }
    },
    // 选中值的对象
    objValue: {
      type: Object,
      default () {
        return {}
      }
    },
    search: {
      type: String,
      default: ''
    },
    // 设置
    config: Object
  },

  data () {
    return {
      show: false,
      data: [],
      // 最新已选择的 id
      ids: this.value
    }
  },

  watch: {
    value (val) {
      this.ids = val
    },
    ids (val) {
      this.$emit('input', val)
    }
  },

  methods: {
    async getData () {
      const data = await listSearchTree(this.config.type, { deptId: this.config.rootId, name: this.search })
      if (data) {
        this.data = data
        this.$refs.searchPopup.$el.scrollTo(0, '0px')
      }
    },

    // 勾选
    onChange () {
      this.$emit('change')
    },
  }
}
</script>

<style lang="less">
.ztree-search-popup {
  top: 54px !important;
  height: calc(100vh - 96px - 54px) !important;
  overflow-y: auto;
}
</style>