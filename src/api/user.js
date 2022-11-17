import request from '@/utils/request'

// 获取登录用户信息
export function getPortalUserInfo() {
  return request({
    url: '/ucenter/api/v2/user/current',
    method: 'get'
  })
}

/**
 * 根据关键字(用户名称)模糊查询用户列表
 * @param {string} keyWord 查询关键字
 * */
export function queryUserList(keyWord) {
  return request({
    url: '/api/v1/user/keyWord',
    method: 'get',
    params: { keyWord }
  })
}
