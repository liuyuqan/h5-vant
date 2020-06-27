import Cookies from 'js-cookie'

const TokenKey = 'token'
const RolesKey = 'roles'
const UserInfoKey = 'info'

export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getRoles() {
  return  JSON.parse(Cookies.get(RolesKey) || '[]')
}
export function setRoles(roles) {
  return Cookies.set(RolesKey, JSON.stringify(roles))
}
export function removeRoles() {
  return Cookies.remove(RolesKey)
}

export function getUserInfo() {
  return JSON.parse(Cookies.get(UserInfoKey))
}
export function setUserInfo(userInfo) {
  return Cookies.set(UserInfoKey, JSON.stringify(userInfo))
}
export function removeUserInfo() {
  return Cookies.remove(UserInfoKey)
}
