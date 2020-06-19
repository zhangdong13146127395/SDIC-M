<template>
  <van-popup
    class="workflow-submit"
    v-model="show"
    :overlay="false"
  >
    <template v-if="info.nextOperation !== 'end'">
      <div class="content">
        <!-- 标题 -->
        <sino-title :title="isLoading ? '加载中...' : info.title" />

        <!-- 信息 -->
        <div class="info-now" v-if="!isLoading && info.message">当前流程节点：{{ info.message }}</div>

        <!-- 选择节点 -->
        <template v-if="!isLoading && info.operation === 'selectOperation'">
          <workflow-radio
            v-model="selectedRadio"
            :options="info.data"
            border
          />
        </template>

        <!-- 选择用户 -->
        <template v-if="!isLoading && info.operation === 'selectRole'">
          <template v-for="(item, index) in info.data">
            <van-panel :title="`${item.text} (${item.nodes ? item.nodes.length : 0})`" :key="index">
              <!-- 会签多选 -->
              <template v-if="item.ishj">
                <workflow-checkbox v-model="selectedCheckbox" :options="item.nodes" />
              </template>

              <!-- 普通单选 -->
              <template v-else>
                <workflow-radio v-model="selectedRadio" :options="item.nodes" />
              </template>
            </van-panel>
          </template>
        </template>
      </div>

      <!-- 底部操作按钮 -->
      <!-- <van-goods-action class="sino-goods-action">
        <van-goods-action-button class="sino-goods-action-button" hairline square text="取消" @click="onCancel" />
        <van-goods-action-button class="sino-goods-action-button" hairline square text="提交" @click="onConfirm" />
      </van-goods-action> -->
      <sino-button-group :btns="btns1" />
    </template>
    
    <!-- 提交结果 -->
    <template v-if="info.nextOperation === 'end' || error">
      <!-- 结果信息 -->
      <div class="result">
        <van-icon :name="error ? 'info' : 'checked'" size="2rem" :color="error ? '#ff976a' : '#009944'" />
        <div class="success">{{ error || info.title }}</div>
        <div class="remark" v-if="info.message">
          下一节点办理人：<br>
          <template v-for="(msg, index) in messages">
            <span class="blue" :key="index">{{ msg.name }}</span>{{ msg.dept }}{{ messages.length > 1 ? ',' : '' }}
          </template>
        </div>
      </div>

      <!-- 底部操作按钮 -->
      <!-- <van-goods-action class="sino-goods-action">
        <van-goods-action-button class="sino-goods-action-button" hairline square text="关闭" @click="onClose" />
      </van-goods-action> -->
      <sino-button-group :btns="btns2" />
    </template>
  </van-popup>
</template>

<script>
import { postWorkflow } from '@/api/system'

export default {
  components: {
    'sino-title': () => import('@/components/sino-title'),
    'workflow-radio': () => import('./workflow-radio'),
    'workflow-checkbox': () => import('./workflow-checkbox'),
    'sino-button-group': () => import('@/components/sino-button-group')
  },
  props: {
    // 显示流程提交弹出层
    show: {
      type: Boolean,
      default: false,
    },
    /**
     * 流程提交参数
     * 
     * filetypeid - 流程类型 id
     * workitemid - 待办 id
     * title - 标题
     * recordid - 业务主键 id
     * deptid - 部门 id
     * userid - 用户 id
     * subflag - 流程状态
     * sysid - 系统 id
     * flag - 写死 selectoption
     */
    data: Object,
    // 意见信息
    idea: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      finish: false, // 流程提交完毕
      error: '', // 错误信息
      isLoading: false, // 加载中
      info: {}, // 流程节点信息
      messages: [], // 下一节点办理人信息
      selectedRadio: '', // 已选择 单选
      selectedCheckbox: [], // 已选择 多选
      // 按钮组
      btns1: [
        {
          text: '取消',
          handler: this.onCancel
        },
        {
          text: '确定',
          type: 'info',
          handler: this.onConfirm
        }
      ],
      btns2: [
        {
          text: '关闭',
          handler: this.onClose
        }
      ]
    }
  },
  watch: {
    // 显示流程提交弹出层时
    show: {
      handler (val) {
        if (val) {
          const { data, idea } = this
          this.submit({ ...data, idea })
        }
      }
    },
  },
  methods: {
    // 提交异步请求数据
    submit (param) {
      this.isLoading = true
      postWorkflow(param).then(data => {
        this.isLoading = false
        const { operation, nextOperation } = data
        this.info = data
        if (operation) {
          if (nextOperation === 'end') {
            this.finish = true
            // 获取下一节点办理人信息
            const messages = this.info.message ? this.info.message.split(',') : ''
            if (messages && messages.length) {
              for (let i = 0; i < messages.length; i++) {
                this.messages.push({
                  name: messages[i].split('/')[0],
                  dept: `/${messages[i].split('/')[1]}/${messages[i].split('/')[2]}`
                })
              }
            }
          }
        } else if (nextOperation) {
          this.submit()
        } else {
          if (data.exception) {
            this.error = data.exception
          } else {
            this.error = '数据请求失败，或数据格式错误'
          }
        }
      }).catch(data => {
        this.error = data.exception
      })
    },
    // 取消
    onCancel () {
      this.info = {}
      this.selectedRadio = ''
      this.selectedCheckbox = []
      this.$emit('show', false)
    },
    // 关闭
    onClose () {
      // 有错误关闭
      if (this.error) {
        this.onCancel()
      } else {
        // 成功返回信息
        this.$emit('finish', this.info)
        this.$emit('show', false)
      }
    },
    // 确认
    onConfirm () {
      const { operation, nextOperation, flag, nodes, data } = this.info
      if (nextOperation) {
        if (operation === 'selectOperation' && !this.selectedRadio) {
          this.$toast.fail('请选择下一步')
          return
        }
        if (operation === 'selectRole' && (data[0] && data[0].ishj ? !this.selectedCheckbox.length : !this.selectedRadio)) {
          this.$toast.fail('请选择人员')
          return
        }
        const result = operation === 'selectOperation' ? this.selectedRadio : data[0] && data[0].ishj ? this.selectedCheckbox.join(',') : this.selectedRadio
        let param = {}
        param.flag = flag
        param.json = JSON.stringify(this.data)
        if (flag === 'selectoperate') {
          param.wfleveid = result
        } else if (flag === 'selectdept') {
          param.wfoperateid = result
        } else if (flag === 'flowinstance') {
          param.flowuser = result
          param.nextWfleveId = nodes.length > 0 ? nodes[0].nextWfleveId : ''
          param.nodeDept = JSON.stringify(nodes)
        } 
        this.selectedRadio = ''
        this.selectedCheckbox = []
        this.submit(param)
      }else{
        this.$toast('返回数据中不包含下一步操作内容')
        this.$emit('show', false)
      }
    }
  }
}
</script>

<style lang="less">
.workflow-submit {
  width: 100%;
  height: 100vh;
  transition: 0s;
  .content {
    height: calc(100vh - 50px);
    overflow: auto;
  }
  .info-now {
    padding: 0 @spacing-4 @spacing-4;
    font-size: @font-size-sm;
    color: @gray-dark;
  }
  .result {
    padding-top: 20vh;
    height: calc(80vh - 50px);
    overflow: auto;
    text-align: center;
    .success {
      padding: 0 @spacing-4;
      color: @text-color;
      font-size: @font-size-xl;
      font-weight: 700;
    }
    .remark {
      padding: @spacing-2 @spacing-4;
      color: @gray-darker;
      font-size: @font-size-sm;
      line-height: @line-height-zh;
      .blue {
        color: @blue;
      }
    }
  }
}
</style>