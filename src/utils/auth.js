import Cookies from 'js-cookie'
import { getStore, setStore, removeStore } from '@/utils/store'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 存储登录用户信息
const userKey = 'qy_user'
export function getUserInfo() {
  return getStore({ name: userKey }) || ''
}

export function setUserInfo(content) {
  setStore({
    name: userKey,
    content
  })
}

export function removeUserInfo() {
  removeStore({ name: userKey }) || ''
}
