//权限判断，根据不同权限，控制表单页面某一项目是否可以编辑
export default {
  data() {
    return {
      //默认权限
      permission:{
        meetingName:true,
        room:true,
        location:true,
        time:true,
        subject:true,
        hostDept:true,
        creUser:true,
        leader:true,
        inform:true,
        informDept:true,
        num:true,
        externalData:true,
        serviceData:true,
        carData:true,
        note:true,
        video:true,
        message:true,
        other:true,
      },
      //外部会议权限
      externalPermissio:[
        {
          meetingName:false,
          time:false,
          location:false,
          subject:false,
          hostDept:false,
          creUser:false,
          leader:false,
          inform:false,
          informDept:false,
          num:false,
          externalData:false,
          note:false,
          video:false,
          message:false,
          other:false,
        },
        {
          meetingName:true,
          time:true,
          location:true,
          subject:true,
          hostDept:true,
          creUser:true,
          leader:true,
          inform:true,
          informDept:true,
          num:true,
          externalData:true,
          note:true,
          video:true,
          message:true,
          other:true,
        }
      ],
      //内部会议权限
      internalPermission:[
        {
          meetingName:false,
          room:false,
          location:false,
          time:false,
          subject:false,
          hostDept:false,
          creUser:false,
          leader:false,
          inform:false,
          informDept:false,
          num:false,
          externalData:false,
          serviceData:false,
          carData:false,
          note:false,
          video:false,
          message:false,
          other:false,
        },
        {
          meetingName:true,
          room:true,
          location:true,
          time:true,
          subject:true,
          hostDept:true,
          creUser:true,
          leader:true,
          inform:true,
          informDept:true,
          num:true,
          externalData:true,
          serviceData:true,
          carData:true,
          note:true,
          video:true,
          message:true,
          other:true,
        },
      ],
    }
  },
  mounted(){
    this.permissionEvent()
  },
  methods: {

    //处理权限相关
    permissionEvent(){
      let p
      if( typeof(this.$route.query.permission) != 'undefined') {
        p = this.$route.query.permission
        this.permission = this.handlePermission('internal',p)
      }
    },

    //根据身份ID,返回对应权限可编辑的数组
    handlePermission(flag,id){
      let arr
      //外部会议
      if(flag == 'external'){
        arr = this.externalPermissio[id]
      }else{
        arr = this.internalPermission[id]
      }
      return arr
    }
  }
}