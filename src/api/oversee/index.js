import { stringify } from 'qs'
import request from '@/plugin/axios'

// 获取待办列表
export function listOverseeDb (params) {
  return request({
    url: `/supervision/listDb?${stringify(params)}`,
    method: 'get'
  })
}
