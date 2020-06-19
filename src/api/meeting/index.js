import { stringify } from 'qs'
import request from '@/plugin/axios/form'

// 获取申请会议列表
export function istMeetingApply (params) {
  return request({
    url: `/meeting/listMeetingApply?${stringify(params)}`,
    method: 'get'
  })
}

// 获取会议服务项目列表
export function listService () {
  return request({
    url: `/meeting/listService`,
    method: 'get'
  })
}

// 获取会议服务项目类型
export function listServiceType () {
  return request({
    url: `/meeting/listServiceType`,
    method: 'get'
  })
}

// 获取审批会议列表
export function listMeetingApproval (params) {
  return request({
    url: `/meeting/listMeetingApproval?${stringify(params)}`,
    method: 'get'
  })
}

// 获取会议信息
export function getMeeting (params) {
  return request({
    url: `/meeting/getMeeting/${params}`,
    method: 'get'
  })
}

// 获取会议服务已选项目列表
export function listServiceSelected (params) {
  return request({
    url: `/meeting/listServiceSelected/${params}`,
    method: 'get'
  })
}

// 获取公司外参会人员历史数据列表
export function listOutUserHistory () {
  return request({
    url: `/meeting/listOutUserHistory/`,
    method: 'get'
  })
}

// 获取今日会议活动列表
export function listMeetingToday () {
  return request({
    url: `/meeting/listMeetingToday/`,
    method: 'get'
  })
}

// 获取会议室列表
export function listMeetingRoom (params) {
  return request({
    url: `/meeting/listMeetingRoom/?${stringify(params)}`,
    method: 'get'
  })
}

//保存会议
export function saveMeeting (data) {
  return request({
    url: '/meeting/saveMeeting',
    method: 'post',
    data:stringify(data)
  })
}

// 删除会议室列表
export function delMeeting (params) {
  return request({
    url: `/meeting/delMeeting/${params}`,
    method: 'delete'
  })
}
