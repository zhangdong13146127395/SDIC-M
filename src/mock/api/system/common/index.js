export default [
  {
    path: '/api/workflow/submit_over',
    method: 'post',
    handle () {
      let ret = {message:'测试数据，到这里就结束了'};
      return ret
    }
  },
  {
    path: '/api/workflow/submit',
    method: 'post',
    handle () {
      let nextOperation = [
        {nextOperation: '/api/workflow/select/start'},
        {nextOperation: '/api/workflow/select/start'},
        {nextOperation: '/api/workflow/select/operation'}
      ];
      return {
        code: 0,
        msg: '获取数据成功',
        data: nextOperation[0]
      }
    }
  },
  {
    path: '/api/workflow/select/start',
    method: 'post',
    handle () {
      let ret = {
        operation:'selectOperation',
        title: '请选择启动节点',
        nextOperation: '/api/workflow/select/operation',
        data: [
          {text:'开始', value:'start'},
          {text:'办公室起草', value:'create'},
          {text:'测试流程', value:'test'},
        ],
      };
      return ret
    }
  },
  {
    path: '/api/workflow/select/operation',
    method: 'post',
    handle () {
      let ret = {
        operation: 'selectOperation',
        title:'请选择下一步操作',
        nextOperation: '/api/workflow/select/role',
        data:[
          {text:'item1', value:'item1'},
          {text:'item2', value:'item2'},
          {text:'item3', value:'item3'},
          {text:'返回文书', value:'item4'},
          {text:'送会签', value:'item5'},
          {text:'送领导审批', value:'item6'},
        ],
      };
      return ret
    }
  },
  {
    path: '/api/workflow/select/role',
    method: 'post',
    handle () {
      let data2 = [
        {id:'aaaa1',text:'办公室/北京子公司', value:'office'},
        {id:'aaaa2',text:'风险管理处/北京子公司', value:'risk'},
        {id:'aaaa3',text:'法行事务办公室/北京子公司', value:'legal'},
        {id:'sub1',pid:'aaaa1',text:'子部门1',value:'sub1'},
        {id:'sub2',pid:'aaaa1',text:'子部门2',value:'sub2'},
        {id:'sub3',pid:'aaaa1',text:'子部门3',value:'sub3'},
        {id:'sub4',pid:'aaaa1',text:'子部门4',value:'sub4'},
        {id:'sub5',pid:'sub1',text:'子部门5',value:'sub5'},
      ];
      let ret = {
        operation: 'selectRole',
        title:'请选择办理人',
        nextOperation: '/api/workflow/submit_over',
        data: data2,
      };
      return ret
    }
  }
]
