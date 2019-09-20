import Cookies from 'js-cookie'

const TokenKey = 'cfgdc_crm_token'

const RefreshTokenKey = 'cfgdc_crm_refresh_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setRefreshToken(refreshToken) {
  return Cookies.set(RefreshTokenKey, refreshToken)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
