//会议-内部、外部通用方法
import { getMeeting , saveMeeting , delMeeting } from '@/api/meeting'
export default {
  data() {
    return {
      //页面需要的数据
      formData:{
        isnew:false,      //是否是新增
        load:false,       //是否已通过接口获取数据
        isLocal:'',       //会议位置
        subflag:'00',
        meetingId:'',     //会议ID
        backAct:'',       //返回列表页的tab类型
        backPag:'',       //返回哪个列表页
        type:0,           //活动类型 0:公司内 1:公司外
        countDown:false,  //是否开启倒计时
        name:'',          //会议活动名称
        room:'',          //会议室
        location:'',      //会议活动地点
        beginTime:'',     //会议开始时间
        endTime:'',       //会议开始时间
        time:[],
        subject:'',       //会议主题
        hostSector:'',    //主办部门
        contact:'',       //会议联系人
        leader:'',        //与会集团领导
        people:'',        //通知人员
        sector:'',        //通知部门
        num:'',           //与会人数
        externalData:[],  //公司外参会人员
        serviceData:[],   //服务项目
        carData:{         //车位信息
          //预留车位数量
          carSum:0,
          //车牌号列表
          carNumData:[]
        },
        note:'',          //备注
        video:false,      //是否视频会议
        message:false,    //是否短信提醒
        other:''          //其他
      },
      //api获取的数据
      listData:{},
      //表单提交需要的数据
      saveData:{
        id: '',
        isLocal: '',
        orgId: '',
        coordinate: '',
        subflag: '',
        filetypeid: '',
        workitemid: '',
        meetingName: '',
        meetingTitle: '',
        meetingTimeDataStr: '',
        meetingTimeId: '',
        beginTime: '',
        endTime: '',
        meetId: '',
        meetName: '',
        hostDeptId: '',
        hostDeptName: '',
        meetAddress: '',
        hostUserId: '',
        hostUserName: '',
        leaderIds: '',
        leaderNames: '',
        recordUserId: '',
        recordUserName: '',
        attendingNum: '',
        informIds: '',
        informNames: '',
        informDeptIds: '',
        informDeptNames: '',
        creUserId: '',
        creUserName: '',
        creTime: '',
        meetingOutUserDataStr: [],
        meetingOutUserId: '',
        meetingId: '',
        outUserCreTime: '',
        outUserCreUserId: '',
        outUserCreUserName: '',
        outUserName: '',
        outUserTel: '',
        outUserCompany: '',
        parkingNum: '',
        plateNum: '',
        otherService: '',
        isMessage: '',
        isEmail: '',
        remark: '',
      },
      btns: [
        {
          text: '删除',
          handler: this.delBtn,
          show:false
        },
        {
          text: '保存',
          type: 'primary',
          handler: this.saveBtn,
        },
        {
          text: '提交',
          type: 'info',
          handler: this.submitForm,
        }
      ],

    }
  },
  components: {

  },
  mounted(){
    this.settingNavBar()
    this.getQueryData()
  },
  methods: {

    //获取地址栏传来的数据
    getQueryData(){
      //获取meetingId
      if( typeof(this.$route.query.meetingId) != 'undefined' && this.$route.query.meetingId != '') {
        this.formData.meetingId = this.$route.query.meetingId
        this.btns[0].show = true
      }
      //返回哪个列表页
      if( typeof(this.$route.query.backPag) != 'undefined') {
        this.formData.backPag = this.$route.query.backPag
      }
      //返回列表页的tab类型
      if( typeof(this.$route.query.backAct) != 'undefined') {
        this.formData.backAct = this.$route.query.backAct
      }
    },

    //接收其他页面传来的数据
    getParentData(){
      if( typeof(this.$route.params.formData) != 'undefined') {

        this.formData = this.$route.params.formData

        //车辆信息
        if( typeof(this.$route.params.formData.carData) == 'undefined') {
          this.formData.carData = {carSum:0, carNumData:[]}
        }
        //公司外参会人员
        if( typeof(this.$route.params.formData.externalData) == 'undefined') {
          this.formData.externalData = []
        }
        //得到会议室信息后，开始倒计时
        if( typeof(this.$route.params.formData.room) != 'undefined' && this.$route.params.formData.room !== null) {
          if(this.formData.room.length > 0 && this.formData.countDown){
            this.countDown.isShow = true
            this.$refs.countDown.start();
          }
        }

      }
    },

    //处理要保存的数据
    handleSaveData(){
      this.saveData.creUserId = this.formData.creUserId
      this.saveData.creUserName = this.formData.creUserName

      this.saveData.id = this.formData.meetingId
      this.saveData.isLocal = this.formData.isLocal
      this.saveData.subflag = this.formData.subflag
      this.saveData.meetId = this.formData.meetId
      this.saveData.roomId = this.formData.roomId
      this.saveData.meetingName = this.formData.meetingName
      this.saveData.meetName = this.formData.room
      this.saveData.meetAddress = this.formData.location

      this.saveData.meetingTitle = this.formData.subject


      let time = [{
        id:this.formData.time[0].id,
        beginTime:this.formData.time[0].beginTime,
        endTime:this.formData.time[0].endTime,
      }]
      this.saveData.meetingTimeDataStr = JSON.stringify(time)

      /* 另外一种时提交的方式，不确定之后是否使用
      let meetingTimeId = this.formData.time[0].id
      if(typeof (meetingTimeId) != 'undefined' && meetingTimeId != ''){
        this.saveData.meetingTimeId =meetingTimeId
        this.saveData[meetingTimeId+'beginTime'] = this.formData.time[0].beginTime
        this.saveData[meetingTimeId+'endTime'] = this.formData.time[0].endTime
      }
      */

      this.saveData.hostDeptName = this.formData.hostDeptName
      this.saveData.hostDeptId = this.formData.hostDeptId
      this.saveData.creUserName = this.formData.creUserName
      this.saveData.creUserId = this.formData.creUserId
      this.saveData.leaderNames = this.formData.leaderNames
      this.saveData.leaderIds = this.formData.leaderIds
      this.saveData.informNames = this.formData.informNames
      this.saveData.informIds = this.formData.informIds
      this.saveData.informDeptNames = this.formData.informDeptNames
      this.saveData.informDeptIds = this.formData.informDeptIds
      this.saveData.attendingNum = this.formData.num

      let outUsers = this.formData.externalData,
        tempArr = [],
        _this = this

      outUsers.forEach(function (value) {
        tempArr.push({
          outUserName:value.outUserName,
          outUserTel:value.outUserTel,
          outUserCompany:value.outUserCompany,
          creUserId:_this.formData.creUserId,
          creUserName:_this.formData.creUserName,
          meetingId:_this.formData.meetingId
        })
      })
      this.saveData.meetingOutUserDataStr = JSON.stringify(tempArr)

      let serviceData = this.formData.serviceData,
        tempArr2 = ''
      serviceData.forEach(function (value) {
        tempArr2 += value.id+','
      })
      this.saveData.serviceId = tempArr2


      this.saveData.parkingNum = this.formData.carData.carSum
      let carNumData = this.formData.carData.carNumData,
        temp = ''
      carNumData.forEach(function (value,index) {
        if(index == carNumData.length-1){
          temp += value
        }else{
          temp += value+','
        }

      })
      this.saveData.plateNum = temp
      this.saveData.otherService = this.formData.note

      this.saveData.isVideo = this.formData.video ? 'yes' : 'no'
      this.saveData.isMessage = this.formData.message ? 'yes' : 'no'
      this.saveData.remark = this.formData.other

      //表单验证
      this.$validator.validate().then(valid => {

        if(valid){
          this.saveForm()
        }

      })
    },

    //根据接口获取数据
    async getApiData() {

      this.$toast.loading({ duration:0, message: '加载中...', forbidClick: true });

      let listData = await getMeeting(this.formData.meetingId),
        data

      //判断新增还是修改
      if(this.formData.meetingId != ''){
        data = listData
        this.formData.isnew = false
      }else{
        data = listData.list[0]
        this.formData.isnew = true
      }

      //防止重复通过API获取数据，只获取1次
      this.formData.load = true

      this.formData.subflag = data.subflag
      this.formData.creUserId = data.creUserId
      this.formData.creUserName = data.creUserName

      //是因为使用验证插件，操作数据后会造成进入页面就标红的情况，所以再新增页面，不进行赋值
      if(this.formData.meetingId != ''){
        this.formData.meetingName = data.meetingName
        this.formData.meetId = data.meetId
        this.formData.room = data.meetName
        this.formData.location = data.meetAddress
      }


      if(data.meetingTimeList !== null){
        //修改页面时间
        //提交数据用
        this.formData.time = data.meetingTimeList
        //外部会议显示用
        this.formData.beginTime = data.meetingTimeList[0].beginTime
        this.formData.endTime = data.meetingTimeList[0].endTime
      }else{
        //新增页面时间
        this.formData.time = [{beginTime:'',endTime:''}]
      }

      this.formData.subject = data.meetingTitle

      //主办部门
      this.formData.hostDeptName = data.hostDeptName
      this.formData.hostDeptId = data.hostDeptId
      this.ztree.hostDeptValue = this.mergeTreeValue(data.hostDeptName,data.hostDeptId)
      //会议联系人
      this.formData.creUserName = data.creUserName
      this.formData.creUserId = data.creUserId
      this.ztree.creUserValue = this.mergeTreeValue(data.creUserName,data.creUserId)
      //与会集团领导
      this.formData.leaderNames = data.leaderNames
      this.formData.leaderIds = data.leaderIds
      this.ztree.leaderValue = this.mergeTreeValue(data.leaderNames,data.leaderIds)
      //通知人员
      this.formData.informNames = data.informNames
      this.formData.informIds = data.informIds
      this.ztree.informValue = this.mergeTreeValue(data.informNames,data.informIds)
      //通知部门
      this.formData.informDeptNames = data.informDeptNames
      this.formData.informDeptIds = data.informDeptIds
      this.ztree.informDeptValue = this.mergeTreeValue(data.informDeptNames,data.informDeptIds)

      this.formData.num = data.attendingNum

      //公司外参会人员
      let outUsers = data.meetingOutUserList,
        tempArr = []
      if(typeof (outUsers) != 'undefined' && outUsers != null && outUsers != ''){
        outUsers.forEach(function (value) {
          tempArr.push({
            outUserName:value.outUserName,
            outUserTel:value.outUserTel,
            outUserCompany:value.outUserCompany
          })
        })
      }
      this.formData.externalData = tempArr

      //服务项目
      let serviceData = data.meetingServiceList
      tempArr = []
      if(typeof (serviceData) != 'undefined' && serviceData != null && serviceData != ''){
        serviceData.forEach(function (value) {
          tempArr.push({
            serviceName:value.serviceName,
            serviceIcon:value.serviceIcon,
            isCharge:value.isCharge,
            id:value.id,
            checked:true
          })
        })
      }
      this.formData.serviceData = tempArr

      //车辆服务
      this.formData.carData.carSum = data.parkingNum == null || data.parkingNum == '' ? 0 : data.parkingNum
      if(data.plateNum != '' && data.plateNum != null){

        let plateNum = data.plateNum.split(",")
        this.formData.carData.carNumData =plateNum
      }

      this.formData.note = data.otherService
      this.formData.video = data.isVideo == 'yes' ? true : false
      this.formData.message = data.isMessage == 'yes' ? true : false
      this.formData.other = data.remark

      this.$toast.clear()
    },

    //保存表单
    async saveForm(){

      const data = await saveMeeting(this.saveData)

      if (data.code === 200) {
        this.$toast.success(data.msg)
        this.formData.meetingId = data.data.id
        this.btns[0].show = true
        this.countDown.isShow = false
        this.$refs.countDown.stop();
      } else {
        this.$toast(data.msg)
      }

    },

    //删除表单
    async delForm(){

      const data = await delMeeting(this.formData.meetingId)

      if (data.code === 200) {
        this.$toast.success(data.msg)
        this.onClickLeft()

      } else {
        this.$toast(data.msg)
      }

    },

    //保存表单
    saveBtn(){
      this.handleSaveData()
    },

    //删除表单
    delBtn(){
      this.$dialog.confirm({
        title: '',
        message: '确定要删除？'
      }).then(() => {
        this.delForm()
      }).catch(() => {
        // on cancel
      });
    },

    //重写顶部左侧按钮
    settingNavBar(){
      this.$parent.childClickLeft = true
    },

    //顶部左侧点击事件
    onClickLeft(){
      let src,name,query={}
      if(typeof (this.formData.meetingId) != 'undefined' && this.formData.meetingId != '' ){
        if(this.formData.backPag == 'apply'){
          src='meeting-list/apply'
          name='meeting-list-apply'
        }else if(this.formData.backPag == 'approval'){
          src='meeting-list/approval'
          name='meeting-list-approval'
        }else{
          src='meeting/select'
          name='meeting-select'
        }
        query = {
          active:this.formData.backAct
        }
      }else{
        src='meeting/select'
        name='meeting-select'
      }
      this.$router.push({
        path: src,
        name: name,
        query:query
      })
    },

    /**
     * 页面跳转
     * @param path
     * @param name
     * @param params
     * @param query
     */
    jump(path,name){

      this.$router.push({
        path: path,
        name: name,
        params: {
          formData:this.formData,
        }
      })
    }

  }
}