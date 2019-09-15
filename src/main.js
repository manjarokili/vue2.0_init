// 入口文件
import Vue from 'vue';

// 导入路由的包
import VueRouter from 'vue-router';
// 导入路由router.js模块
import router from './router.js';

//导入样式表
import 'mint-ui/lib/style.css';
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';
//import 'vant/lib/index.css';

// 按需导入mint-ui中的组件
import { Header, Swipe, SwipeItem} from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//按需导入vant中的组件

import { Grid, GridItem, Icon } from 'vant';
Vue.use(Grid).use(GridItem);
Vue.use(Icon);

// 导入App根组件
import app from './App.vue';
// 安装路由模块
Vue.use(VueRouter);


new Vue({
  el: '#app',
  render: c => c(app),
  router, // 挂载路由对象到vm实例对象
});
