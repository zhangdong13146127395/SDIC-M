<template>

  <div class="meeting-external-edit">
    <sino-title title="基础活动信息" color="#3494E8" />
    <editItem>
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
          v-show="permission.time"
          :value="formData.beginTime"
          required
          label="开始时间"
          placeholder="请选择开始时间"
          input-align="right"
          @click="datePopup.startShow = true"
          name="beginTime"
          v-validate="'required'"
          :error="errors.has('beginTime')"
        />
        <van-cell class="view" v-show="!permission.time" title="开始时间" :value="formData.beginTime" />

        <van-field
          v-show="permission.time"
          :value="formData.endTime"
          required
          label="结束时间"
          placeholder="请选择结束时间"
          input-align="right"
          @click="datePopup.endShow = true"
          name="endTime"
          v-validate="'required'"
          :error="errors.has('endTime')"
        />
        <van-cell class="view" v-show="!permission.time" title="结束时间" :value="formData.endTime" />

        <van-field
          required
          readonly
          v-show="permission.location"
          v-model="formData.location"
          label="会议地点"
          placeholder="请选择"
          input-align="right"
          @click="meetingMap.isShow = true"
          name="location"
          v-validate="'required'"
          :error="errors.has('location')"
        />
        <van-cell class="view" v-show="!permission.location" title="会议地点" :value="formData.location" />

      </van-cell-group>
    </editItem>

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

    <editItem>
      <people-item :formData="formData"  :permission="permission.externalData" backPath="external"></people-item>
    </editItem>

    <sino-title title="会议设备与服务" color="#3494E8" />
    <editItem>
      <van-cell-group>
        <van-field
          v-show="permission.note"
          v-model="formData.note"
          rows="2"
          autosize
          type="textarea"
          placeholder="请输入所需要的服务"
        />
        <van-cell class="view" v-show="!permission.note" title="所需要的服务" :value="formData.note" />

        <van-switch-cell v-show="permission.video" v-model="formData.video" title="是否视频会议" />
        <van-cell class="view" v-show="!permission.video" title="是否视频会议" :value="formData.video ? '是' : '否' " />

        <van-switch-cell v-show="permission.message" v-model="formData.message" title="是否短信提醒" />
        <van-cell class="view" v-show="!permission.message" title="是否视频会议" :value="formData.message ? '是' : '否' " />
      </van-cell-group>
    </editItem>

    <sino-title title="其他" color="#3494E8" />
    <edit-item :last=true>
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

    <!-- 开始时间选择 -->
    <van-popup v-model="datePopup.startShow"  position="bottom" :style="{ height: 'auto',width:'100%' }">
      <van-datetime-picker
        v-model="datePopup.currentStartDate"
        type="datetime"
        :formatter="formatter"
        :filter="filterMinute5"
        @cancel="datePopup.startShow = false"
        @confirm="confirmStartTime"
      />
    </van-popup>

    <!-- 结束时间选择 -->
    <van-popup v-model="datePopup.endShow"  position="bottom" :style="{ height: 'auto',width:'100%' }">
      <van-datetime-picker
        v-model="datePopup.currentEndDate"
        type="datetime"
        :formatter="formatter"
        :filter="filterMinute5"
        @cancel="datePopup.endShow = false"
        @confirm="confirmEndTime"
      />
    </van-popup>

    <!-- 地图选择 -->
    <van-popup v-model="meetingMap.isShow"  position="bottom" :style="{ height: '100%',width:'100%' }">
      <van-nav-bar
        title="位置选择"
        left-text="返回"
        right-text="确定"
        left-arrow
        @click-left="meetingMap.isShow = false"
        @click-right="setMap"
      />
      <meeting-map v-on:location="setLocation"></meeting-map>
    </van-popup>

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
import dayjs from 'dayjs'
import FormatterDate from '@/components/mixins/formatter/formatter-date'
import Permission from '../components/mixins/permission.js'
import Ztree from '../components/mixins/ztree.js'
import Edit from '../components/mixins/edit.js'
export default {
  //会议-会议通知单-编辑页面
  name: 'meeting-external-index',
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      //时间选择
      datePopup: {
        startShow:false,
        endShow:false,
        currentStartDate: new Date(),
        currentEndDate: new Date(),
      },
      //地图
      meetingMap:{
        isShow:false,
        location:{
          //城市名
          cityname:'',
          //坐标
          latlng:{},
          //定位地址
          poiaddress:'',
          //定位地址名称
          poiname:''
        }
      }

    }
  },
  mixins: [ FormatterDate , Permission , Ztree , Edit ],
  components: {
    'SinoTitle': () => import('@/components/sino-title'),
    'editItem': () => import('../components/meeting-edit-item'),
    'editBtn': () => import('../components/meeting-edit-btn'),
    'peopleItem': () => import('../components/meeting-people-item'),
    'meetingMap': () => import('../components/meeting-map'),
    'sino-button-group': () => import('@/components/sino-button-group'),
  },
  mounted(){

    this.formData.isLocal = 'external'
    this.getParentData()
    if(!this.formData.load){
      //通过接口获取数据
      this.getApiData()
    }

  },
  methods: {


    //选择开始时间
    confirmStartTime(v){

      let timeStamp = dayjs(v).valueOf(),
          endTime = this.formData.endTime

      if(timeStamp >= endTime && endTime !=''){
        this.$toast('开始时间不能晚于结束时间');
      }else{
        let d = dayjs(v).format('YYYY-MM-DD H:mm');
        this.formData.time[0].beginTime = d   //提交数据用
        this.formData.beginTime = d           //显示用
        this.datePopup.startShow = false
      }

    },

    //选择结束时间
    confirmEndTime(v){
      let timeStamp = dayjs(v).valueOf(),
          startTime = this.formData.startTime
      if(timeStamp <= startTime){
        this.$toast('结束时间不能早于开始时间');
      }else{
        let d = dayjs(v).format('YYYY-MM-DD H:mm');
        this.formData.time[0].endTime = d   //提交数据用
        this.formData.endTime = d           //显示用
        this.datePopup.endShow = false
      }

    },

    //将从自组件传来的数据设置到本页面
    setLocation(location){
      this.meetingMap.location = location
    },

    //位置选择完成后，点击右上角确定按钮
    setMap(){
      let poiname = this.meetingMap.location.poiname,
          poiaddress = this.meetingMap.location.poiaddress
      if(poiname.length > 0){
        this.formData.location = poiname +'('+ poiaddress +')'
      }
      this.meetingMap.isShow = false
    },

    //提交预定
    submitForm(){
      this.jump('meeting/meeting-list/index','meeting-list-index')
    }

  }

}
</script>

<style lang="less">

  .meeting-external-edit{


  }

</style>