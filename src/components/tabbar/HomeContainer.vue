<template>
  <div>
    <!-- 轮播图区域 -->

    <mt-swipe :auto="4000">
      <h1>这是轮播图区域</h1>
      <!-- <mt-swipe-item>1111</mt-swipe-item>
      <mt-swipe-item>2222</mt-swipe-item>
      <mt-swipe-item>3333</mt-swipe-item>-->
    </mt-swipe>
    

    <!-- grid -->
    <ul class="row">
      
    <van-grid>
      <li class="col-xs-3">
      <router-link to="/home/newslist">
        <van-grid-item icon="underway-o" text="每日推荐" />
      </router-link>
      </li>
      
      <li class="col-xs-3">
      <router-link to="/home/songlist">
      <van-grid-item icon="music-o" text="歌单" />
      </router-link>
      </li>

      <li class="col-xs-3">
      <router-link to="/home/riskinglist">
      <van-grid-item icon="hot-o" text="排行榜" />
      </router-link>
      </li>

      <li class="col-xs-3">
      <router-link to="/home/radiolist">
      <van-grid-item icon="video-o" text="电台" />
      </router-link>
      </li>
    </van-grid>
    
    </ul>

    <!-- mui九宫格改造成五宫格 -->
    <!-- <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
        <router-link to="/home/newslist">
          <span class="mui-icon mui-icon-extra mui-icon-extra-calendar"></span>
          <div class="mui-media-body">每日推荐</div>
        </router-link>
      </li>

      <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
        <router-link to="/home/songlist">
          <span class="mui-icon mui-icon-email"></span>
          <div class="mui-media-body">歌单</div>
        </router-link>
      </li>

      <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
        <router-link to="/home/riskinglist">
          <span class="mui-icon mui-icon-chatbubble"></span>
          <div class="mui-media-body">排行榜</div>
        </router-link>
      </li>

      <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-search"></span>
          <div class="mui-media-body">电台</div>
        </a>
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true
    };
  }
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  background-color: #fff;
}
.row{
  background-color: #fff;
}
// .mui-grid-view.mui-grid-9 {
//   border: none;
// }
// .mui-grid-view.mui-grid-9 .mui-table-view-cell {
//   border: 0;
//   border-right: none;
//   border-bottom: none;
// }
</style>