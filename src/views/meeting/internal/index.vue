<template>

  <div class="meeting-internal-edit">
    <van-notice-bar left-icon="underway-o" v-show="countDown.isShow">
      请在
      <van-count-down
        ref="countDown"
        :time="countDown.time"
        format="mm 分 ss 秒"
        :auto-start="false"
        @finish="countFinished"
      />
      内完成填写，否则将取消预定
    </van-notice-bar>
    <sino-title title="今日会议活动安排" color="#3494E8" />
    <edit-item >
      <van-cell-group>

        <van-field
          v-show="permission.meetingName"
          v-model="formData.meetingName"
          required
          label="会议活动名称"
          placeholder="请输入会议活动名称"
          input-align="right"
          name="meetingName"
          v-validate="'required'"
          :error="errors.has('meetingName')"
        />
        <van-cell class="view" v-show="!permission.meetingName" title="会议活动名称" :value="formData.meetingName" />

        <van-field
          v-show="permission.room"
          v-model="formData.room"
          required
          label="会议室"
          placeholder="请选择"
          input-align="right"
          is-link
          readonly
          @click="showRoom()"
          name="room"
          v-validate="'required'"
          :error="errors.has('room')"
        />
        <van-cell class="view" v-show="!permission.room" title="会议室" :value="formData.room" />

        <van-field
          v-show="permission.location"
          v-model="formData.location"
          required
          label="会议活动地点"
          placeholder="请输入会议活动名称"
          input-align="right"
          readonly
          name="location"
          v-validate="'required'"
          :error="errors.has('location')"
        />
        <van-cell class="view" v-show="!permission.location" title="会议活动地点" :value="formData.location" />


        <van-field
          v-show="permission.time"
          :value="jointTime(formData.time)"
          required
          label="会议活动时间"
          placeholder="请输入会议活动名称"
          input-align="right"
          readonly
          name="time"
          v-validate="'required'"
          :error="errors.has('time')"
        />
        <van-cell class="view" v-show="!permission.time" title="会议活动时间" :value="jointTime(formData.time)" />
      </van-cell-group>
    </edit-item>

    <edit-item>
      <van-cell-group>

        <van-field
          v-show="permission.subject"
          v-model="formData.subject"
          label="会议主题"
          placeholder="请输入会议主题"
          input-align="right"
        />
        <van-cell class="view" v-show="!permission.subject" title="会议主题" :value="formData.subject" />

        <van-field
          v-show="permission.hostDept"
          v-model="formData.hostDeptName"
          label="主办部门"
          placeholder="请选择"
          input-align="right"
          @click="openTree('hostDept','dept')"
          is-link
          readonly
          required
          name="hostDept"
          v-validate="'required'"
          :error="errors.has('hostDept')"
        />
        <van-cell class="view" v-show="!permission.hostDept" title="主办部门" :value="formData.hostSector" />

        <van-field
          v-show="permission.creUser"
          v-model="formData.creUserName"
          label="会议联系人"
          placeholder="请选择"
          input-align="right"
          @click="openTree('creUser','user')"
          readonly
          is-link
        />
        <van-cell class="view" v-show="!permission.creUser" title="会议联系人" :value="formData.contact" />

        <van-field
          v-show="permission.leader"
          v-model="formData.leaderNames"
          label="与会集团领导"
          placeholder="请选择"
          input-align="right"
          @click="openTree('leader','user')"
          readonly
          isLink
        />
        <van-cell class="view" v-show="!permission.leader" title="与会集团领导" :value="formData.leader" />

        <van-field
          v-show="permission.inform"
          v-model="formData.informNames"
          label="通知人员"
          placeholder="请选择"
          input-align="right"
          @click="openTree('inform','user')"
          readonly
          isLink
        />
        <van-cell class="view" v-show="!permission.inform" title="通知人员" :value="formData.people" />

        <van-field
          v-show="permission.informDept"
          v-model="formData.informDeptNames"
          label="通知部门"
          placeholder="请选择"
          input-align="right"
          @click="openTree('informDept','dept')"
          readonly
          isLink
        />
        <van-cell class="view" v-show="!permission.informDept" title="通知部门" :value="formData.sector" />

        <van-field
          v-show="permission.num"
          v-model="formData.num"
          label="与会人数"
          input-align="right"
          placeholder="请输入"
        />
        <van-cell class="view" v-show="!permission.num" title="与会人数" :value="formData.num" />
      </van-cell-group>
    </edit-item>

    <edit-item>
      <people-item :form-data="formData" :permission=permission.externalData backPath="internal"></people-item>
    </edit-item>

    <sino-title title="会议设备与服务" color="#3494E8" />
    <edit-item>
      <van-cell-group>
        <van-field
          v-show="permission.serviceData"
          label="所需服务"
          placeholder="请选择"
          input-align="right"
          readonly
          isLink
          @click="showService()"
        />
        <van-cell class="view" v-show="!permission.serviceData" title="所需服务"/>
      </van-cell-group>
      <div class="service-item-list">
        <service-item v-for="(item, index) in formData.serviceData" :key="`sam+${index}`" :name="`${item.serviceName}`" :charge="item.isCharge == 'yes' ? true : false" :checked=item.checked :pic=item.serviceIcon :index=index />
      </div>

      <service-car :carData=formData.carData></service-car>

      <van-cell-group>
        <van-field
          v-show="permission.note"
          v-model="formData.note"
          rows="2"
          autosize
          label="备注"
          type="textarea"
          placeholder="其他备注的服务信息内容"
          input-align="right"
        />
        <van-cell class="view" v-show="!permission.note" title="备注" :value="formData.note" />

        <van-switch-cell v-show="permission.video" v-model="formData.video" title="是否视频会议" />
        <van-cell class="view" v-show="!permission.video" title="是否视频会议" :value="formData.video ? '是' : '否' " />

        <van-switch-cell v-show="permission.message" v-model="formData.message" title="是否短信提醒" />
        <van-cell class="view" v-show="!permission.message" title="是否短信提醒" :value="formData.message ? '是' : '否' " />
      </van-cell-group>
    </edit-item>

    <sino-title title="其他" color="#3494E8" />
    <edit-item :last=true>
      <sino-button-group :btns="btns" />
      <van-cell-group>
        <van-field
          v-show="permission.other"
          v-model="formData.other"
          rows="4"
          autosize
          label="备注"
          type="textarea"
          placeholder="请输入备注信息"
        />
        <van-cell class="view" v-show="!permission.other" title="备注" :value="formData.other"/>
      </van-cell-group>
    </edit-item>

    <sino-button-group :btns="btns" />

    <!-- 部门/人员组件  -->
    <sino-ztree
      ref="zTree"
      v-model="ztree.value"
      :config="ztree.config"
      @confirm="zTreeConfirm"
    />

  </div>

</template>

<script>
import FormatterDate from '@/components/mixins/formatter/formatter-date'
import Permission from '../components/mixins/permission.js'
import Ztree from '../components/mixins/ztree.js'
import Edit from '../components/mixins/edit.js'
export default {
  //会议-会议通知单-编辑页面
  name: 'meeting-internal-index',
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      countDown:{
        isShow:false,
        time:60*15*1000,
      }

    }
  },
  mixins: [ FormatterDate , Permission , Ztree , Edit ],
  components: {
    'SinoTitle': () => import('@/components/sino-title'),
    'editItem': () => import('../components/meeting-edit-item'),
    'serviceItem': () => import('../components/meeting-service-item'),
    'serviceCar': () => import('../components/meeting-service-car'),
    'peopleItem': () => import('../components/meeting-people-item'),
    'sino-button-group': () => import('@/components/sino-button-group'),
  },
  mounted(){

    this.formData.isLocal = 'local'
    //获取地址栏传来的数据
    this.getQueryData()
    //获取其他页面传来的数据
    this.getParentData()
    if(!this.formData.load){
      //通过接口获取数据
      this.getApiData()
    }

  },
  methods: {

    //倒计时结束
    countFinished(){
      this.$dialog.alert({
        message: '填写时间已过，该会议时间段已自动取消。'
      }).then(() => {
        this.formData.room = ''
        this.formData.location = ''
        this.formData.time = ''
        this.countDown.isShow = false
      });
    },

    //提交预定
    submitForm(){
      this.jump('meeting/meeting-list/index','meeting-list-index')
    },

    //跳转到会议设备和服务
    showService(){
      this.jump('meeting/service/index','meeting-service-index',this.formData)
    },

    //跳转到会议室
    showRoom(){
      this.jump('meeting/room/index','meeting-room-index',this.formData)
    },


  }

}
</script>

<style lang="less">

  .meeting-internal-edit{

    .van-count-down{
      display: inline-block;
      color: #ed6a0c;
    }

    .service-item-list{
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
    }

  }

</style>