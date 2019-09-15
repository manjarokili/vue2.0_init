import Router from 'vue-router';
//引入组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcartContainer from './components/tabbar/ShopcartContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import SongList from './components/song/SongList.vue'
import RiskingList from './components/risking/RiskingList.vue'
import RadioList from './components/radio/RadioList.vue'

Vue.use(Router);

var router = new Router({
  
  routes: [{path:'/',redirect:'/home'},
  {path:'/home',component:HomeContainer},
  {path:'/member',component:MemberContainer},
  {path:'/shopcart',component:ShopcartContainer},
  {path:'/search',component:SearchContainer},
  {path:'/home/newslist',component:NewsList},//path拼错 汗。。。
  {path:'/home/songlist',component:SongList},
  {path:'/home/riskinglist',component:RiskingList},
  {path:'/home/radiolist',component:RadioList},
  ],
  linkActiveClass: 'mui-active',
  //覆盖默认的router-link-active类，显示高亮
  //坑2:没有在App.vue中放入router-view之前，此高亮存在bug，只点一次就失效
});


//把路由对象暴露出去
 export default router
 