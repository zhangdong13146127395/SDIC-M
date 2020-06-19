//会议-人员与部门选择树
export default {
  data() {
    return {
      ztree: {
        //当前选中的值
        value: [],
        active:'',
        //主办部门
        hostDeptValue:[],
        //会议联系人
        creUserValue:[],
        //与会集团领导
        leaderValue:[],
        //通知人员
        informValue:[],
        //通知部门
        informDeptValue:[],
        config: {
          type: 'dept',
          rootId: ''
        }
      },

    }
  },
  components: {
    'sino-ztree': () => import('@/components/sino-ztree')
  },
  methods: {

    //打开人员/部门树
    openTree(flag,type){
      this.ztree.active = flag
      this.ztree.config.type = type
      switch(this.ztree.active) {
        case 'hostDept':      //主办部门
          this.ztree.value = this.ztree.hostDeptValue
          this.ztree.config.max = 1
          break;
        case 'creUser':        //会议联系人
          this.ztree.value = this.ztree.creUserValue
          this.ztree.config.max = 1
          break;
        case 'leader':        //与会集团领导
          this.ztree.value = this.ztree.leaderValue
          this.ztree.config.max = 1
          break;
        case 'inform':        //通知人员
          this.ztree.value = this.ztree.informValue
          break;
        case 'informDept':        //通知部门
          this.ztree.value = this.ztree.informDeptValue
          break;
      }
      this.$refs['zTree'].show = true
    },

    //人员/部门树确定
    zTreeConfirm(){
      let info = this.returnTreeValue(this.ztree.value)

      switch(this.ztree.active) {
        case 'hostDept':      //主办部门
          this.ztree.hostDeptValue = this.ztree.value
          this.formData.hostDeptName = info.names;
          this.formData.hostDeptId = info.ids;
          break;
        case 'creUser':        //会议联系人
          this.ztree.creUserValue = this.ztree.value
          this.formData.creUserName = info.names;
          this.formData.creUserId = info.ids;
          break;
        case 'leader':        //与会集团领导
          this.ztree.leaderValue = this.ztree.value
          this.formData.leaderNames = info.names;
          this.formData.leaderIds = info.ids;
          break;
        case 'inform':        //通知人员
          this.ztree.informValue = this.ztree.value
          this.formData.informNames = info.names;
          this.formData.informIds = info.ids;
          break;
        case 'informDept':        //通知部门
          this.ztree.informDeptValue = this.ztree.value
          this.formData.informDeptNames = info.names;
          this.formData.informDeptIds = info.ids;
          break;
      }
    },

    //格式化人员树的返回值
    returnTreeValue:function(arr){
      let ids = [];
      let names = [];
      arr.filter(item => {
        ids.push(item.id);
        names.push(item.name);
      });
      return { ids:ids.join(','),names:names.join(','), counts:ids.length };
    },

    //将字符串转为tree需要的数组
    mergeTreeValue(names,ids){
      let tempArr = []
      if(typeof(names) != 'undefined' && typeof(ids) != 'undefined' && names !=  null && ids != null){

        let nameArr = names.split(","),
          idArr = ids.split(",")

        if(nameArr.length == idArr.length){
          nameArr.forEach(function(value,index){
            tempArr.push({
              name:value,
              id:idArr[index]
            })
          })
        }

      }
      return tempArr
    },

  }
}