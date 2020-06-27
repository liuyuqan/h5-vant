import request from '@/utils/request'

export const login = (data) => {
    return request({
      url: '/login/login',
      method: 'post',
      data: data
    })
}

export const upload_file = (data) => {
  return request({
    url: '/common/uploadFile',
    method: 'post',
    data: data
  })
}
export const get = (data) => {
  return request({
    url: '/',
    method: 'post',
    params: data
  })
}
