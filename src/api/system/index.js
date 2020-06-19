import { stringify } from 'qs'
import request from '@/plugin/axios'

// 获取部门树信息
export function listDeptTree (params) {
  return request({
    url: `/common/tree/depts?${stringify(params)}`,
    method: 'get'
  })
}

// 获取用户树信息
export function listUserTree (params) {
  return request({
    url: `/common/tree/users?${stringify(params)}`,
    method: 'get'
  })
}

// 获取树的查询信息
export function listSearchTree (type, params) {
  return request({
    url: `/common/tree/${type}/search?${stringify(params)}`,
    method: 'get'
  })
}

// 获取用户信息
export function getCurrentUser () {
  return request({
    url: `/common/currentUser`,
    method: 'get'
  })
}

// 切换部门角色
export function settingDefaultDept (deptId) {
  return request({
    url: `/common/settingDefaultDept?deptId=${deptId}`,
    method: 'get'
  })
}

// 根据类型获取码表数据
export function getDictDataByType (dictType) {
  return request({
    url: `/common/getDictDataByType?dictType=${dictType}`,
    method: 'get'
  })
}

// 提交流程信息
export function postWorkflow (data) {
  return request({
    url: '/workflow/submitworkflow',
    method: 'post',
    data: stringify(data)
  })
}

// 办结流程
export function postWorkflowKill (data) {
  return request({
    url: '/workflow/killWorkflow',
    method: 'post',
    data: stringify(data)
  })
}

// 执行退回流程节点
export function postWorkflowBack (data) {
  return request({
    url: '/workflow/jumpBack',
    method: 'post',
    data: stringify(data)
  })
}

// 撤回流程
export function postWorkflowCancel (data) {
  return request({
    url: '/workflow/cancelFlow',
    method: 'post',
    data: stringify(data)
  })
}

// 获取是否可撤回
export function getCancelInfo (alreadyTemId) {
  return request({
    url: `/workflow/canCancel?alreadytemid=${alreadyTemId}`,
    method: 'get'
  })
}

// 获取按钮信息
export function listButton (workitemId) {
  return request({
    url: `/workflow/listButton?workitemid=${workitemId}`,
    method: 'get'
  })
}

// 获取流程跳转节点信息
export function listWorkflowNode (params) {
  return request({
    url: `/workflow/listWorkflowNode?${stringify(params)}`,
    method: 'get'
  })
}

// 获取流程跳转节点用户信息
export function listWorkflowNodeUser (params) {
  return request({
    url: `/workflow/listWorkflowNodeUser?${stringify(params)}`,
    method: 'get'
  })
}

// 获取流转和意见信息
export function listWorkflowLog (params) {
  return request({
    url: `/workflow/listCirculationLog?${stringify(params)}`,
    method: 'get'
  })
}

// 获取当前用户的常用意见
export function listCommonIdea () {
  return request({
    url: '/commonIdea/list',
    method: 'get'
  })
}

// 获取节点意见信息
export function getWorkflowInfo (workitemId) {
  return request({
    url: `/workflow/getWfleveIdeaInfo?workitemid=${workitemId}`,
    method: 'get'
  })
}

// 获取临时意见
export function getTempIdea (params) {
  return request({
    url: `/workflow/getTempIdea?${stringify(params)}`,
    method: 'get'
  })
}

