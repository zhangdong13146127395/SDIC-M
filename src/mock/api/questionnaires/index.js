export default [
  // 获取考核任务已关联的问卷列表
  {
    path: '/api/questionnaire/listQuestionnaireForAssessmentWork',
    method: 'get',
    handle ({ params, Repeat }) {
      const { pageSize } = params
      return {
        code: 0,
        msg: '获取数据成功',
        data: {
          list: Repeat(pageSize, {
            'answerNumber': '@integer(60, 100)',
            'category': '@string',
            'content': '@string',
            'createBy': '@string',
            'createCompanyId': '@string',
            'createCompanyName': '@string',
            'createDeptId': '@string',
            'createDeptName': '@string',
            'createTime': '@datetime',
            'createUserId': '@string',
            'createUserName': '@string',
            'description': '@string',
            'evaluationUnitsId': '@string',
            'evaluationUnitsName': '@string',
            'evaluationUserId': '@string',
            'evaluationUserName': '@string',
            'fullMarks': '@integer(60, 100)',
            'id': '@string',
            'isPercentileSystem': '@string',
            'isQuote': '@string',
            'isRespondentCheck': '@string',
            'isTemplate': '@string',
            'params': {},
            'remark': '@string',
            'removeState': '@string',
            'respondentNumber': '@integer(60, 100)',
            'searchValue': '@string',
            'state': '@string',
            'statisticsType': '@string',
            'title': '@string',
            'updateBy': '@string',
            'updateTime': '@datetime'
          }),
          'total': pageSize * 3,
        },
      }
    }
  },

  // 获取问卷列表
  {
    path: '/api/questionnaire/listQuestionnaire',
    method: 'get',
    handle ({ params, Repeat }) {
      const { pageSize } = params
      return {
        code: 0,
        msg: '获取数据成功',
        data: {
          list: Repeat(pageSize, {
            'answerNumber': '@integer(60, 100)',
            'category': '@string',
            'content': '@string',
            'createBy': '@string',
            'createCompanyId': '@string',
            'createCompanyName': '@string',
            'createDeptId': '@string',
            'createDeptName': '@string',
            'createTime': '@datetime',
            'createUserId': '@string',
            'createUserName': '@string',
            'description': '@string',
            'evaluationUnitsId': '@string',
            'evaluationUnitsName': '@string',
            'evaluationUserId': '@string',
            'evaluationUserName': '@string',
            'fullMarks': '@integer(60, 100)',
            'id': '@string',
            'isPercentileSystem': '@string',
            'isQuote': '@string',
            'isRespondentCheck': '@string',
            'isTemplate': '@string',
            'params': {},
            'remark': '@string',
            'removeState': '@string',
            'respondentNumber': '@integer(60, 100)',
            'searchValue': '@string',
            'state': '@string',
            'statisticsType': '@string',
            'title': '@string',
            'updateBy': '@string',
            'updateTime': '@datetime'
          }),
          'total': pageSize * 3,
        }
      }
    }
  },

  // 获取当前用户未答列表
  {
    path: '/api/questionnaire/listNoAnswered',
    method: 'get',
    handle ({ params, Repeat }) {
      const pageSize = params.pageSize || 20 
      return {
        code: 0,
        msg: '获取数据成功',
        data: {
          list: Repeat(pageSize, {
            'answerState': '@string',
            'category': '@string',
            'content': '@string',
            'createBy': '@string',
            'createCompanyId': '@string',
            'createCompanyName': '@string',
            'createDeptId': '@string',
            'createDeptName': '@string',
            'createTime': '@datetime',
            'createUserId': '@string',
            'createUserName': '@string',
            'description': '@string',
            'evaluationUnitsId': '@string',
            'evaluationUnitsName': '@string',
            'evaluationUserId': '@string',
            'evaluationUserName': '@string',
            'fullMarks': '@integer(60, 100)',
            'id': '@string',
            'isPercentileSystem': '@string',
            'isQuote': '@string',
            'isRespondentCheck': '@string',
            'isTemplate': '@string',
            'params': {},
            'questionnaireID': '@string',
            'remark': '@string',
            'removeState': '@string',
            'respondentID': '@string',
            'searchValue': '@string',
            'state': '@string',
            'statisticsType': '@string',
            'title': '@string',
            'updateBy': '@string',
            'updateTime': '@datetime'
          }),
          'total': pageSize * 3,
        },
      }
    }
  },

  // 获取当前用户已答列表
  {
    path: '/api/questionnaire/listAnswered',
    method: 'get',
    handle ({ params, Repeat }) {
      const { pageSize } = params
      return {
        code: 0,
        msg: '获取数据成功',
        data: {
          list: Repeat(pageSize, {
            'answerState': '@string',
            'category': '@string',
            'content': '@string',
            'createBy': '@string',
            'createCompanyId': '@string',
            'createCompanyName': '@string',
            'createDeptId': '@string',
            'createDeptName': '@string',
            'createTime': '@datetime',
            'createUserId': '@string',
            'createUserName': '@string',
            'description': '@string',
            'evaluationUnitsId': '@string',
            'evaluationUnitsName': '@string',
            'evaluationUserId': '@string',
            'evaluationUserName': '@string',
            'fullMarks': '@integer(60, 100)',
            'id': '@string',
            'isPercentileSystem': '@string',
            'isQuote': '@string',
            'isRespondentCheck': '@string',
            'isTemplate': '@string',
            'params': {},
            'questionnaireID': '@string',
            'remark': '@string',
            'removeState': '@string',
            'respondentID': '@string',
            'searchValue': '@string',
            'state': '@string',
            'statisticsType': '@string',
            'title': '@string',
            'updateBy': '@string',
            'updateTime': '@datetime'
          }),
          'total': pageSize * 3,
        },
      }
    }
  },

  // 获取考核任务列表
  {
    path: '/api/questionnaire/listAssessmentWork',
    method: 'get',
    handle ({ params, Repeat }) {
      const { pageSize } = params
      return {
        code: 0,
        msg: '获取数据成功',
        data: {
          list: Repeat(pageSize, {
            'createBy': '@string',
            'createCompanyId': '@string',
            'createCompanyName': '@string',
            'createDeptId': '@string',
            'createDeptName': '@string',
            'createTime': '@datetime',
            'createUserId': '@string',
            'createUserName': '@string',
            'id': '@string',
            'method': '@string',
            'pId': '@string',
            'params': {},
            'remark': '@string',
            'removeState': '@string',
            'searchValue': '@string',
            'state': '@string',
            'title': '@string',
            'type': '@string',
            'updateBy': '@string',
            'updateTime': '@datetime'
          }),
          'total': pageSize * 3,
        },
      }
    }
  },

  // 获取考核任务可以关联的问卷列表
  {
    path: '/api/questionnaire/listChooseQuestionnaire',
    method: 'get',
    handle ({ params, Repeat }) {
      const { pageSize } = params
      return {
        code: 0,
        msg: '获取数据成功',
        data: {
          list: Repeat(pageSize, {
            'answerNumber': '@integer(60, 100)',
            'category': '@string',
            'content': '@string',
            'createBy': '@string',
            'createCompanyId': '@string',
            'createCompanyName': '@string',
            'createDeptId': '@string',
            'createDeptName': '@string',
            'createTime': '@datetime',
            'createUserId': '@string',
            'createUserName': '@string',
            'description': '@string',
            'evaluationUnitsId': '@string',
            'evaluationUnitsName': '@string',
            'evaluationUserId': '@string',
            'evaluationUserName': '@string',
            'fullMarks': '@integer(60, 100)',
            'id': '@string',
            'isPercentileSystem': '@string',
            'isQuote': '@string',
            'isRespondentCheck': '@string',
            'isTemplate': '@string',
            'params': {},
            'qType': '@string',
            'remark': '@string',
            'removeState': '@string',
            'respondentNumber': '@integer(60, 100)',
            'searchValue': '@string',
            'state': '@string',
            'statisticsType': '@string',
            'title': '@string',
            'updateBy': '@string',
            'updateTime': '@datetime'
          }),
          'total': pageSize * 3,
        },
      }
    }
  },

  // 获取考核任务
  {
    path: '/api/questionnaire/getAssessmentWork',
    method: 'get',
    handle ({ Repeat }) {
      return {
        code: 0,
        msg: '获取数据成功',
        data: Repeat(1, {
          'createBy': '@string',
          'createCompanyId': '@string',
          'createCompanyName': '@string',
          'createDeptId': '@string',
          'createDeptName': '@string',
          'createTime': '@datetime',
          'createUserId': '@string',
          'createUserName': '@string',
          'id': '@string',
          'method': '@string',
          'pId': '@string',
          'params': {},
          'remark': '@string',
          'removeState': '@string',
          'searchValue': '@string',
          'state': '@string',
          'title': '@string',
          'type': '@string',
          'updateBy': '@string',
          'updateTime': '@datetime'
        }),
      }
    }
  },

  // 获取问卷设置
  {
    path: '/api/questionnaire/getQuestionnaireSettings',
    method: 'get',
    handle ({ Repeat }) {
      return {
        code: 0,
        msg: '获取数据成功',
        data: Repeat(1, {
          'createBy': '@string',
          'createTime': '@datetime',
          'id': '@string',
          'isAllRecoveryEnd': '@string',
          'isRecoveryEnd': '@string',
          'isRemind': '@string',
          'params': {},
          'recoveryEndTime': '@datetime',
          'recoveryNumber': '@integer(60, 100)',
          'recoveryType': '@string',
          'remark': '@string',
          'remindContent': '@string',
          'remindCycle': '@integer(60, 100)',
          'remindTime': '@datetime',
          'remindType': '@string',
          'searchValue': '@string',
          'updateBy': '@string',
          'updateTime': '@datetime'
        }),
      }
    }
  },

  // 获取单个问卷信息
  {
    path: '/api/questionnaire/getQuestionnaire',
    method: 'get',
    handle ({ Repeat }) {
      return {
        code: 0,
        msg: '获取数据成功',
        data: Repeat(1, {
          'category': '@string',
          'content': '@string',
          'createBy': '@string',
          'createCompanyId': '@string',
          'createCompanyName': '@string',
          'createDeptId': '@string',
          'createDeptName': '@string',
          'createTime': '@datetime',
          'createUserId': '@string',
          'createUserName': '@string',
          'description': '@string',
          'evaluationUnitsId': '@string',
          'evaluationUnitsName': '@string',
          'evaluationUserId': '@string',
          'evaluationUserName': '@string',
          'fullMarks': '@integer(60, 100)',
          'id': '@string',
          'isPercentileSystem': '@string',
          'isQuote': '@string',
          'isRespondentCheck': '@string',
          'isTemplate': '@string',
          'params': {},
          'qType': '@string',
          'remark': '@string',
          'removeState': '@string',
          'searchValue': '@string',
          'state': '@string',
          'statisticsType': '@string',
          'title': '@string',
          'updateBy': '@string',
          'updateTime': '@datetime'
        }),
      }
    }
  },

  // 获取问卷统计信息
  {
    path: '/api/questionnaire/getQuestionnaireStatistics',
    method: 'get',
    handle ({ Repeat }) {
      return {
        code: 0,
        msg: '获取数据成功',
        data: Repeat(1, {
          'answerNumber': '@string',
          'description': '@string',
          'evaluationUnitsName': '@string',
          'questionContent': '@string',
          'respondentNumber': '@string',
          'statisticsType': '@string',
          'title': '@string'
        }),
      }
    }
  },

  // 获取考核工作的设置
  {
    path: '/api/questionnaire/getAssessmentWorkSettings',
    method: 'get',
    handle ({ Repeat }) {
      return {
        code: 0,
        msg: '获取数据成功',
        data: Repeat(1, {
          'createBy': '@string',
          'createTime': '@datetime',
          'id': '@string',
          'isAllRecoveryEnd': '@string',
          'isRecoveryEnd': '@string',
          'isRemind': '@string',
          'params': {},
          'recoveryEndTime': '@datetime',
          'recoveryNumber': '@integer(60, 100)',
          'recoveryType': '@string',
          'remark': '@string',
          'remindContent': '@string',
          'remindCycle': '@integer(60, 100)',
          'remindTime': '@datetime',
          'remindType': '@string',
          'searchValue': '@string',
          'updateBy': '@string',
          'updateTime': '@datetime'
        }),
      }
    }
  },

  // 保存考核工作
  {
    path: '/api/questionnaire/saveAssessmentWork',
    method: 'post',
    handle () {
      return {
        code: 200,
        msg: '保存数据成功'
      }
    }
  },

  // 保存考核任务的关联问卷
  {
    path: '/api/questionnaire/saveQuestionnaireAndAssessmentWorkRelation',
    method: 'post',
    handle () {
      return {
        code: 200,
        msg: '保存数据成功'
      }
    }
  },

  // 更新考核工作
  {
    path: '/api/questionnaire/updateAssessmentWork',
    method: 'put',
    handle () {
      return {
        code: 200,
        msg: '更新数据成功'
      }
    }
  },

  // 删除考核工作
  {
    path: '/api/questionnaire/delAssessmentWork',
    method: 'delete',
    handle () {
      return {
        code: 200,
        msg: '删除数据成功'
      }
    }
  },

  // 删除问卷
  {
    path: '/api/questionnaire/delQuestionnaire',
    method: 'delete',
    handle () {
      return {
        code: 200,
        msg: '删除数据成功'
      }
    }
  }
]
