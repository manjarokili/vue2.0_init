import request from '@/utils/request'

// 删除
export function removeItem(params) {
  return request({
    url: '/api/ConfigAttribute/DelConfigPartTypeAttributes',
    method: 'get',
    params
  })
}

// 保存
export function saveItem(data) {
  return request({
    url: '/api/ConfigAttribute/SaveConfigPartTypeAttributes',
    method: 'post',
    data
  })
}

/**
 * 保存
 * @param {data} 参数说明{name,id,code}
*/
export function saveDemo(data) {
  return request({
    url: '/api/ConfigAttribute/SaveConfigPartTypeAttributes',
    method: 'post',
    data
  })
}

/**
 * 删除数据
 * @param {string} id 数据ID
 */
export function deletDemoData(id) {
  return request({
    url: `/api/v1/demo/delete`,
    method: 'delete',
    data: id
  })
}

/**
 * 导出数据
 * @param {Object} data 参数
 */
export function exportDemoData(data) {
  return request({
    url: `/api/v1/demo/outExcel`,
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
