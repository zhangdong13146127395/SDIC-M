import { stringify } from 'qs'
import request from '@/plugin/axios'

// 获取问卷列表
export function questionnairesListQuestionnaire(params) {
  return request({
    url: `/questionnaire/listQuestionnaire?${stringify(params)}`,
    method: 'get'
  })
}

// 获取当前用户未答列表
export function questionnairesNoAnswered (params) {
  return request({
    url: `/questionnaire/listNoAnswered?${stringify(params)}`,
    method: 'get'
  })
}

// 获取当前用户未答列表（包含已结束问卷）
export function questionnairesNoAnsweredAll (params) {
  return request({
    url: `/questionnaire/listNoAnsweredAll?${stringify(params)}`,
    method: 'get'
  })
}

// 获取当前用户已答列表
export function questionnairesListAnswered (params) {
  return request({
    url: `/questionnaire/listAnswered?${stringify(params)}`,
    method: 'get'
  })
}

// 答题问卷状态管理
export function questionnairesProcessing (id) {
  return request({
    url: `/questionnaire/processing/${id}`,
    method: 'get'
  })
}

// 获取考核任务列表
export function questionnairesListAssessmentWork (params) {
  return request({
    url: `/questionnaire/listAssessmentWork?${stringify(params)}`,
    method: 'get'
  })
}

// 获取考核任务已关联的问卷列表
export function questionnairesListQuestionnaireForAssessmentWork (id, params) {
  return request({
    url: `/questionnaire/listQuestionnaireForAssessmentWork/${id}?${stringify(params)}`,
    method: 'get'
  })
}

// 获取考核任务可以关联的问卷列表
export function questionnairesListChooseQuestionnaire (params) {
  return request({
    url: `/questionnaire/listChooseQuestionnaire?${stringify(params)}`,
    method: 'get'
  })
}

// 获取答卷人管理列表
export function questionnairesListRespondent (params) {
  return request({
    url: `/questionnaire/listRespondent?${stringify(params)}`,
    method: 'get'
  })
}

// 获取答题管理列表
export function questionnairesListAnswerDetails (id, params) {
  return request({
    url: `/questionnaire/listAnswerDetails/${id}?${stringify(params)}`,
    method: 'get'
  })
}

// 获取问卷设置
export function questionnairesGetQuestionnaireSettings (id) {
  return request({
    url: `/questionnaire/getQuestionnaireSettings/${id}`,
    method: 'get'
  })
}

// 获取单个问卷信息
export function questionnairesGetQuestionnaire (id) {
  return request({
    url: `/questionnaire/getQuestionnaire/${id}`,
    method: 'get'
  })
}

// 获取单个获取考核工作
export function questionnairesGetAssessmentWork (id) {
  return request({
    url: `/questionnaire/getAssessmentWork/${id}`,
    method: 'get'
  })
}

// 获取问卷统计信息
export function questionnairesGetQuestionnaireStatistics (id) {
  return request({
    url: `/questionnaire/questionnaireStatistics/${id}`,
    method: 'get'
  })
}

// 获取考核工作的设置
export function questionnairesGetAssessmentWorkSettings (id) {
  return request({
    url: `/questionnaire/getAssessmentWorkSettings/${id}`,
    method: 'get'
  })
}

// 获取答题详情
export function questionnairesGetQuestionnaireAndAnswer (id, qid) {
  return request({
    url: `/questionnaire/getQuestionnaireAndAnswer/${qid}/${id}`,
    method: 'get'
  })
}

// 判断答案是否存在
export function questionnairesGetAnswerByQuestionnaireIdAndRespondentId (qid, rid) {
  return request({
    url: `/questionnaire/getAnswerByQuestionnaireIdAndRespondentId/${qid}/${rid}`,
    method: 'get'
  })
}

// 撤回答题人信息
export function questionnairesWithdrawRespondent (id) {
  return request({
    url: `/questionnaire/withdrawRespondent/${id}`,
    method: 'get'
  })
}

// 创建答题信息
export function questionnairesCreateAnswer (data) {
  return request({
    url: '/questionnaire/createAnswer',
    method: 'post',
    data
  })
}

// 修改答题内容
export function questionnairesUpdateAnswer (data) {
  return request({
    url: '/questionnaire/updateAnswer',
    method: 'put',
    data
  })
}

// 保存问卷设置
export function questionnairesSaveQuestionnaireSettings (data) {
  return request({
    url: '/questionnaire/saveQuestionnaireSettings',
    method: 'post',
    data
  })
}

// 添加问卷答卷人（指定）
export function questionnairesSaveQuestionnaireSpecifiedRespondent (data) {
  return request({
    url: '/questionnaire/saveQuestionnaireSpecifiedRespondent',
    method: 'post',
    data
  })
}

// 添加问卷答卷人（随机）
export function questionnairesSaveQuestionnaireRandomRespondent (data) {
  return request({
    url: '/questionnaire/saveQuestionnaireRandomRespondent',
    method: 'post',
    data
  })
}

// 添加问卷答卷人（手机号）
export function questionnairesSaveQuestionnairePhoneRespondent (data) {
  return request({
    url: '/questionnaire/saveQuestionnairePhoneRespondent',
    method: 'post',
    data
  })
}

// 添加考核工作答卷人（指定）
export function questionnairesSaveAssessmentWorkSpecifiedRespondent (data) {
  return request({
    url: '/questionnaire/saveAssessmentWorkSpecifiedRespondent',
    method: 'post',
    data
  })
}

// 添加考核工作答卷人（随机）
export function questionnairesSaveAssessmentWorkRandomRespondent (data) {
  return request({
    url: '/questionnaire/saveAssessmentWorkRandomRespondent',
    method: 'post',
    data
  })
}

// 添加考核工作答卷人（手机号）
export function questionnairesSaveAssessmentWorkPhoneRespondent (data) {
  return request({
    url: '/questionnaire/saveAssessmentWorkPhoneRespondent',
    method: 'post',
    data
  })
}

// 保存考核工作设置
export function questionnairesSaveAssessmentWorkSettings (data) {
  return request({
    url: '/questionnaire/saveAssessmentWorkSettings',
    method: 'post',
    data
  })
}

// 保存考核工作
export function questionnairesSaveAssessmentWork (data) {
  return request({
    url: '/questionnaire/saveAssessmentWork',
    method: 'post',
    data
  })
}

// 保存考核任务的关联问卷
export function questionnairesSaveQuestionnaireAndAssessmentWorkRelation (data) {
  return request({
    url: '/questionnaire/saveQuestionnaireAndAssessmentWorkRelation',
    method: 'post',
    data
  })
}

// 更新问卷设置
export function questionnairesUpdateQuestionnaireSettings (data) {
  return request({
    url: '/questionnaire/updateQuestionnaireSettings',
    method: 'put',
    data
  })
}

// 更新考核工作设置
export function questionnairesUpdateAssessmentWorkSettings (data) {
  return request({
    url: '/questionnaire/updateAssessmentWorkSettings',
    method: 'put',
    data
  })
}

// 更新发布问卷
export function questionnairesUpdateReleaseQuestionnaire (id) {
  return request({
    url: `/questionnaire/releaseQuestionnaire/${id}`,
    method: 'put'
  })
}

// 更新终止发布问卷
export function questionnairesUpdateEndSurveyQuestionnaire (id) {
  return request({
    url: `/questionnaire/endSurveyQuestionnaire/${id}`,
    method: 'put'
  })
}

// 更新发布考核工作
export function questionnairesUpdateReleaseAssessmentWork (id) {
  return request({
    url: `/questionnaire/releaseAssessmentWork/${id}`,
    method: 'put'
  })
}

// 更新考核工作
export function questionnairesUpdateAssessmentWork (data) {
  return request({
    url: '/questionnaire/updateAssessmentWork',
    method: 'put',
    data
  })
}

// 更新终止考核工作
export function questionnairesUpdateEndSurveyAssessmentWork (id) {
  return request({
    url: `/questionnaire/endSurveyAssessmentWork/${id}`,
    method: 'put'
  })
}

// 删除考核工作
export function questionnairesDelAssessmentWork (ids) {
  return request({
    url: `/questionnaire/delAssessmentWork?assessmentWorkIds=${ids}`,
    method: 'delete'
  })
}

// 删除问卷答卷人
export function questionnairesDelRespondent (ids) {
  return request({
    url: `/questionnaire/delRespondent?respondentIds=${ids}`,
    method: 'delete'
  })
}

// 删除问卷
export function questionnairesDelQuestionnaire (ids) {
  return request({
    url: `/questionnaire/delQuestionnaire?questionnaireIds=${ids}`,
    method: 'delete'
  })
}

// 删除考核任务的关联问卷
export function questionnairesDelQuestionnaireAndAssessmentWorkRelation (ids) {
  return request({
    url: `/questionnaire/delQuestionnaireAndAssessmentWorkRelation?relationIds=${ids}`,
    method: 'delete'
  })
}



export function questionnairesShow (id) {
  return request({
    url: `/questionnaires/${id}`,
    method: 'get'
  })
}

export function questionnairesCreate (data) {
  return request({
    url: '/questionnaires',
    method: 'post',
    data: stringify(data)
  })
}

export function questionnairesUpdate (data) {
  return request({
    url: `/questionnaires/${data.comic_id}`,
    method: 'put',
    data: stringify(data)
  })
}

export function questionnairesDestroy (id) {
  return request({
    url: `/questionnaires/${id}`,
    method: 'delete'
  })
}
