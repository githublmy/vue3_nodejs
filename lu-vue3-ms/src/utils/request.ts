/*
 * @Description: 请求封装
 */
import axios from 'axios'
import baseURL from './config'

const instance = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 1000
})

// 是否显示重新登录
export let isRelogin = false

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    // console.log(config);
    return config
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error)
  }
)
// 响应拦截
instance.interceptors.response.use(
  (response) => {
    // console.log(response);
    if (!response.data) {
      ElMessage({
        message: '请求错误，请联系管理员！',
        type: 'error'
      })
      return Promise.reject()
    }
    // 状态码
    const code = response.data.code || 200
    // 返回的信息
    const { msg } = response.data
    // 二进制数据则直接返回
    if (
      response.request.responseType === 'blob' ||
      response.request.responseType === 'arraybuffer'
    ) {
      return response
    }
    if (code === 200) {
      return response.data
    } else if (code >= 32000 && code < 33000) {
      if (!isRelogin) {
        isRelogin = true
        ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            isRelogin = false
            // try {
            //   await useUserStore().frontLogOut();
            //   location.href = "/";
            // } catch (error) {
            //   location.href = "/";
            // }
          })
          .catch(() => {
            isRelogin = false
          })
      }
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else {
      ElMessage({
        message: msg,
        type: 'error'
      })
      return Promise.reject(response.data)
    }
  },
  (error) => {
    console.log('err' + error)
    let { message } = error
    if (message == 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substring(message.length - 3) + '异常'
    }
    ElMessage({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default instance
