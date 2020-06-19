<template>
  <div class="calendar-filter">
    <!-- 筛选 -->
    <van-popup
      class="filter"
      v-model="show"
      position="right"
    >
      <!-- 筛选栏目 -->
      <van-cell-group>
        <van-cell :title="title" size="large" />
        <van-cell class="filter-list">
          <template v-slot="label">
            <van-row class="filter-row" gutter="24">
              <van-col class="filter-col" v-for="(item, index) in options" :key="index" :span="span">
                <div class="filter-tag" :class="ids.includes(item.id) ? 'active' : ''" @click="handleChooseOne(item)">{{ item.name }}</div>
              </van-col>
            </van-row>
            <!-- 全选 -->
            <div class="filter-choose">
              <van-button v-show="showChooseAll && value.length !== options.length" block @click="handleChooseAll">全选</van-button>
              <van-button v-show="showChooseAll && value.length === options.length" block @click="handleChooseCancel">取消全选</van-button>
            </div>
          </template>
        </van-cell>
      </van-cell-group>

      <!-- 底部操作按钮 -->
      <!-- <van-goods-action class="sino-goods-action">
        <van-goods-action-button class="sino-goods-action-button" hairline square @click="handleCancel">
          <span class="sino-goods-action-button__text">取消</span>
        </van-goods-action-button>
        <van-goods-action-button class="sino-goods-action-button" hairline square @click="handleConfirm">
          <span class="sino-goods-action-button__text">确认</span>
        </van-goods-action-button>
      </van-goods-action> -->
      <sino-button-group :btns="btns" />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'calendar-filter',

  components: {
    'sino-button-group': () => import('@/components/sino-button-group')
  },

  props: {
    value: Array,
    // 最大可选值，0 为无限制
    max: {
      type: Number,
      default: 0
    },
    // 每行列宽度
    span: {
      type: [ String, Number ],
      default: 8
    },
    // 选项，对象格式为 { id: '', name '' }
    options: {
      type: Array,
      default () {
        return []
      }
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 显示全选按钮
    showChooseAll: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      show: false,
      ids: [],
      oldValue: [],
      // 按钮组
      btns: [
        {
          text: '取消',
          handler: this.handleCancel
        },
        {
          text: '确认',
          type: 'info',
          handler: this.handleConfirm
        }
      ]
    }
  },

  watch: {
    show (val) {
      if (val) {
        this.oldValue = [ ...this.value ]
      }
    },
    value (val) {
      this.ids = []
      if (val && val.length) {
        val.map(v => this.ids.push(v.id))
      }
    }
  },

  methods: {
    // 单选
    handleChooseOne (obj) {
      const index = this.ids.findIndex(val => val === obj.id)
      if (index > -1) {
        this.value.splice(index, 1)
      } else {
        if (this.max) {
          if (this.max === 1) {
            this.value.splice(0, this.value.length)
          }
          if (this.max > this.value.length) {
            this.value.push(obj)
          } else {
            this.$toast(`最大可选值为 ${this.max}`)
          }
        } else {
          this.value.push(obj)
        }
      }
    },
    // 全选
    handleChooseAll () {
      const values = JSON.parse(JSON.stringify(this.options))
      this.$emit('input', values)
    },
    // 取消全选
    handleChooseCancel () {
      this.$emit('input', [])
    },
    // 确认
    handleConfirm () {
      this.show = false
      this.$emit('confirm', this.value)
    },
    // 取消
    handleCancel () {
      this.show = false
      this.$emit('input', this.oldValue)
      this.$emit('cancel', this.oldValue)
    }
  }
}
</script>

<style lang="less">
.calendar-filter {
  // 领导筛选
  .filter {
    width: 85%;
    height: 100%;
    background-color: @background-color;
    &-list {
      height: calc(100vh - 98px);
      overflow-y: auto;
      .van-cell__value {
        overflow-y: auto;
      }
    }
    &-row {
      margin-bottom: -@spacing-2;
    }
    &-col {
      margin-bottom: @spacing-2;
    }
    &-tag {
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: @background-color;
      border-radius: 2px;
      &.active {
        color: @white;
        background-color: @blue;
      }
    }
    &-choose {
      margin: @spacing-4 0;
    }
  }
}
</style>