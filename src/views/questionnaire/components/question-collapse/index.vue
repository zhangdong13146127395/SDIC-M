<template>
  <div class="question-collapse">
    <van-collapse
      class="collapse"
      v-model="activeCollapse"
    >
      <van-collapse-item
        class="collapse-item"
        v-for="(item, index) in value"
        :key="index"
        :name="index"
        :is-link="false"
      >
        <div class="card" slot="title">
          <div class="card-title">{{ item.title }}</div>
          <div class="card-info">
            <div class="card-info--time">创建时间：{{ item.createTime }}</div>
            <div class="card-info__flex">
              <div class="card-info--status">
                <van-tag
                  :type="item.state === 'release' ? 'success' : item.state === 'ended' ? 'danger' : 'primary'"
                  plain
                >
                  {{ item.state === 'release' ? '已发布' : item.state === 'ended' ? '已结束' : '未发布' }}
                </van-tag>
              </div>
              <div class="card-info--number">已收集：{{ item.answerNumber }}</div>
            </div>
          </div>
        </div>
        <div class="btns">
          <slot name="btns" :data="item">
            <van-button
              class="button"
              v-if="item.state !== 'ended'"
              hairline
              type="default"
              size="small"
              @click="onRelease(item.id)"
            >
              {{ item.state === 'unreleased' ? '发布问卷' : item.state === 'release' ? '追加人员' : '' }}
            </van-button>
            <van-button
              class="button"
              v-if="item.state !== 'unreleased'"
              hairline
              type="default"
              size="small"
              @click="onCount(item.id)"
            >
              统计结果
            </van-button>
            <van-button
              class="button"
              v-if="item.state !== 'unreleased'"
              hairline
              type="default"
              size="small"
              @click="onCheck(item.id)"
            >
              查看数据
            </van-button>
            <van-button class="button" hairline type="default" size="small" @click="onMore(item)">更多操作</van-button>
          </slot>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
export default {
  name: 'question-collapse',

  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    }
  },

  data () {
    return {
      // 折叠面板
      activeCollapse: []
    }
  },

  methods: {
    // 点击发布问卷
    onRelease (id) {
      this.$router.push({ path: '/questionnaire/question/release', query: { id } })
    },

    // 点击统计结果
    onCount (id) {
      this.$router.push({ path: '/questionnaire/question/count', query: { id } })
    },

    // 点击查看数据
    onCheck (id) {
      this.$router.push({ path: '/questionnaire/question/check', query: { id } })
    },

    // 点击更多操作
    onMore (id) {
      this.$emit('click', id)
    }
  }
}
</script>

<style lang="less">
.question-collapse {
  .collapse {
    &.van-hairline--top-bottom {
      &:after {
        border-width: 0;
      }
    }
    &-item {
      &.van-hairline--top {
        &:after {
          border-width: 0;
        }
      }
      padding-bottom: @spacing-4;
      &:last-child {
        padding-bottom: 0;
      }
      .card {
        &-title {
          padding-bottom: @spacing-2;
          width: 100%;
          color: @text-color;
          font-size: @font-size-lg;
          font-weight: 700;
        }
        &-info {
          display: flex;
          flex-direction: column;
          width: 100%;
          &--time {
            padding-bottom: @spacing-1;
          }
          &--time, &--status, &--number {
            flex: 1;
            color: @gray-darker;
            font-size: @font-size-sm;
          }
          &--number {
            text-align: right;
          }
          &__flex {
            display: flex;
          }
        }
      }
      .btns {
        position: relative;
        display: flex;
        .button {
          margin-right: @spacing-2;
          padding: 0;
          width: 100%;
          &:last-child  {
            margin-right: 0;
          }
        }
      }
    }
  }

  .van-collapse-item__content {
    padding-top: @spacing-2;
    padding-bottom: @spacing-2;
  }
}
</style>
