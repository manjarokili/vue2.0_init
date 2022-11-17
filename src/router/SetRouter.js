/** 路由配置 */
const setRouter = [
  {
    path: '/demo', // 路由地址
    name: 'demo', // 路由名称
    component: () => import('@/views/demo'), // vue文件路径地址
    meta: { title: '初始化Demo' }
  }
]
export default setRouter
