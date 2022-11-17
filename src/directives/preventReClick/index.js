
import Vue from 'vue'

const preventReClick = Vue.directive('preventReClick', {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 3000)
      }
    })
  }
})
export default preventReClick

// 默认3秒 v-preventReClick
// 设置2秒 v-preventReClick="20"

/* export default {}.install = (Vue, options = {}) => {
  Vue.directive('preventReClick', {
    inserted(el, binding) {
      el.addEventListener('click', e => {
        if (!el.disabled) {
          el.disabled = true
          setTimeout(() => {
            el.disabled = false
          }, 1000)
        }
      })
    }
  })
}
 */
