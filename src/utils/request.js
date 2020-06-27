import  axios from 'axios'
import { Notify, Toast } from 'vant'
import  qs from 'qs'
import store  from '@/store'
const success_codes = [100, 200]
const fail_codes = [500]
const token_code =  1000

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000
})
service.interceptors.request.use(
  config => {
    // post 序列化
    config.data = config.data || {}
    config.data.token = store.getters.token
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it atccording to the actual situation
    // config.headers['Authorization'] = 'Bearer ' + store.getters.token
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    if (config.method === 'post') {
      // 上传文件测试
      if (Object.prototype.toString.call(config.data) == '[object FormData]') {
        config.headers['Content-Type'] = 'multipart/form-data'
      } else {
        config.data = qs.stringify(config.data)
      }
    }
    console.log(config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const { data } = response
    const msg = data.msg || data.message
    const code = data.code
    console.log('msg, code', msg, code)
    console.log(success_codes.indexOf(code))
    // success
    if (success_codes.includes(code)) {
      if (msg) { Toast.success(msg) }
    } else if (fail_codes.includes(code)) {
      Toast.fail(msg || '操作失败')
      // fail
    } else if (token_code == code) {
      Notify({
        type: 'warning',
        message: '登录信息失效~'
      })
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })      // others
    } else {
      Toast.fail(msg || '参数错误~')
    }
    return response.data
  },
  error => {
    Toast.fail('http请求异常~')
    return Promise.reject(error)
  }
)
export default service
