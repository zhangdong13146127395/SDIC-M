// 用于处理参数
import { stringify } from 'qs'
// 封装好的 axios，无需修改
import request from '@/plugin/axios'

// 获取列表数据
export function list (params) {
  return request({
    url: `/demo/list?${stringify(params)}`,
    method: 'get'
  })
}
