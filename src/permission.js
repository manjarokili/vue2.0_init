import router from './router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
import { Message } from 'element-ui'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)

  if (store.getters.user && store.getters.user.userId) {
    next()
    return
  }
  store.dispatch('user/getInfo').then(data => {
    next()
  }).catch(() => {
    Message.warning('未获取到用户信息,请登录')
    setTimeout(() => {
      window.parent.postMessage({
        flag: 'closetag' // 调用对应方法标识，*必填
      }, '*')
    }, 1000)
  })
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
