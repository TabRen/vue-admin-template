import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/crm/user/login',
    method: 'post',
    params: {
      username: data.username,
      password: data.password
    }
  })
}

export function refreshToken(refreshToken) {
  return request({
    url: '/crm/user/refreshToken',
    method: 'post',
    params: { refreshToken }
  })
}

export function getInfo(token) {
  return request({
    url: '/crm/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
