
import request from '@/utils/request'
const domainCode = 'marketing'
const appCode = 'order-center'

/**
 * 查询本地存储的数据字典数据
 * @param {string} dictTypeCode 数据字典编码
 * @param {string} appCode 应用编码
 * @param {string} domainCode 业务域编码
 * @returns {Array} 数据字典值列表
 * */
export function getLocalDictList({ dictTypeCode, appCode, domainCode }) {
  return getStore({ name: `${domainCode}_${appCode}_${dictTypeCode}` })
}

/**
 * 查询本地存储的数据字典数据
 * @param {string} dictTypeCode 数据字典编码
 * @returns {Array} 数据字典值列表
 * */
export function getLocalDictByType(dictTypeCode) {
  return getStore({ name: `${domainCode}_${appCode}_${dictTypeCode}` })
}

/**
 * 根据字典类型查询字典
 * @param {string} dictTypeCode 数据字典编码
 * @param {string} appCode 应用编码
 * @param {string} domainCode 业务域编码
 * @returns {Array} 数据字典值列表
 * */
export function getDictList({ dictTypeCode, appCode, domainCode }) {
  return request({
    url: `/data-dict/api/v2/dictionary/${dictTypeCode}`,
    method: 'get',
    params: { appCode, domainCode }
  })
}

/**
 * 根据字典类型查询字典值
 * @param {string} dictTypeCode 数据字典编码
 * @returns {Array} 数据字典值列表
 * */
export const getDictByType = async(dictTypeCode) => {
  const res = await request({
    url: `/data-dict/api/v2/dictionary/${dictTypeCode}`,
    method: 'get',
    params: { appCode, domainCode }
  })
  return res && res.data
}

/**
 * 根据字典父Id查询
 * @param {String} parentDictId 父Id
 * @returns {Array} 数据字典值列表
 * */
export const getDictChild = async(parentDictId) => {
  const res = await request({
    url: `/data-dict/api/v2/dictionary/child`,
    method: 'get',
    params: { parentDictId }
  })
  return res && res.data
}

/**
 * 根据字典类型批量查询字典值列表
 * @param {Array} dictTypeCodes 数据字典编码
 * @returns {Array} 数据字典值列表
 * */
export const getDictByPatchType = async(dictTypeCodes) => {
  const res = await request({
    url: `/data-dict/api/v2/dictionary/patch/dictTypeCode`,
    method: 'post',
    params: { appCode, domainCode },
    data: dictTypeCodes
  })
  return res && res.data
}

// 获取省列表
export function getProvinces() {
  return request({
    url: '/select-service/api/v1/administrativeDivisions/provinces',
    method: 'get'
  })
}

// 获取市列表
export function getCities(parentId) {
  return request({
    url: '/select-service/api/v1/administrativeDivisions',
    method: 'get',
    params: { parentId }
  })
}

// 获取区列表
export function getCounties(parentId) {
  return request({
    url: '/select-service/api/v1/administrativeDivisions',
    method: 'get',
    params: { parentId }
  })
}

// 获取街道列表
export function getStreets(parentId) {
  return request({
    url: '/select-service/api/v1/administrativeDivisions',
    method: 'get',
    params: { parentId }
  })
}

/**
 * 获取物流方式
 * */
export const getTransportMode = async() => {
  const res = await request({
    url: `/select-service/api/v1/transportMode/`,
    method: 'get'
  })
  return res && res.data
}
