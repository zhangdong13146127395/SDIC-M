import axios from 'axios'
import { Toast } from 'vant'
// import util from '@/libs/util'

// 创建一个错误
function errorCreat (msg) {
  const err = new Error(msg)
  errorLog(err)
  throw err
}

// 记录和显示错误
function errorLog (err) {
  // 显示提示
  Toast(err.message.indexOf('timeout') > -1 ? '网络请求超时，请重试！' : err.message)
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 100000, // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    // const token = util.cookies.get('token')
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // config.headers['X-Token'] = token

    return config
  },
  error => {
    // 发送失败
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const { code } = dataAxios
    // 根据 code 进行判断
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
      return dataAxios
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        // 列表数据 code 全为 0
        case 0:
          // 返回数据
          return dataAxios.data
        // 保存、删除等 code 为 200
        case 200:
          // 操作结果
          return dataAxios
        case 500:
          // 报错
          errorCreat(dataAxios.msg)
          break
        case 'xxx':
          // [ 示例 ] 其它和后台约定的 code
          errorCreat(`[ code: xxx ] ${dataAxios.msg}`)
          break
        default:
          // 不是正确的 code
          errorCreat(`${dataAxios.msg}`)
          return dataAxios
      }
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 422: error.message = '表单验证错误'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default service
