import Vue from 'vue'
import inputFilter from './filter'

const install = function(Vue) {
  Vue.directive('input-filter', inputFilter)
}

if (window.Vue) {
  window['input-filter'] = inputFilter
  Vue.use(install)
}

inputFilter.install = install
export default inputFilter

// 使用demo: v-input-filter:int

