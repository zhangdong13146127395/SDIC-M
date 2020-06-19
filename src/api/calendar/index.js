import { stringify } from 'qs'
import request from '@/plugin/axios'

// 获取公司领导
export function listLeader () {
  return request({
    url: `/calendar/listLeader`,
    method: 'get'
  })
}

// 获取授权秘书人员
export function listSecretary () {
  return request({
    url: `/calendar/listSecretary`,
    method: 'get'
  })
}

// 获取会议室
export function listMeetRoom () {
  return request({
    url: `/calendar/listMeetRoom`,
    method: 'get'
  })
}

// 获取我的领导
export function listMyLeader () {
  return request({
    url: `/calendar/listMyLeader`,
    method: 'get'
  })
}

// 获取领导日程
export function listCalendar (params) {
  return request({
    url: `/calendar/listCalendar?${stringify(params)}`,
    method: 'get'
  })
}

// 根据 id 获取领导日程
export function getCalendar (id) {
  return request({
    url: `/calendar/getCalendar?id=${id}`,
    method: 'get'
  })
}

// 保存数据
export function saveCalendar (data) {
  return request({
    url: '/calendar/saveCalendar',
    method: 'post',
    data
  })
}

// 验证日程是否存在冲突
export function checkConflict (data) {
  return request({
    url: '/calendar/checkConflict',
    method: 'post',
    data
  })
}

// 假删除数据
export function delCalendar (id) {
  return request({
    url: `/calendar/delCalendar/${id}`,
    method: 'get'
  })
}