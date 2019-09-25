
<template>
  <div>
    <!-- 轮播图区域 -->

    <van-swipe :autoplay="3000" indicator-color="white" class="vant-swipe">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>

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
    <ul id="tag">
      <li id="item">
        <h3>推荐歌单</h3>
      </li>
      <li id="item">
        <button>歌单广场</button>
      </li>
    </ul>

    <ul id="box">
      <li id="boxItem">
        <img
          id="listImg"
          src="https://ae01.alicdn.com/kf/Ha4ea88e1005d47e48eff1fb86e892eb3R.jpg"
          alt="0"
        />
        <p>dddddddd</p>
      </li>
      <li id="boxItem">
        <img
          id="listImg"
          src="https://ae01.alicdn.com/kf/H3aa7d861305a475fb3477b06cca25557m.jpg"
          alt="1"
        />
        <p>dddddddcn</p>
      </li>
      <li id="boxItem">
        <img src="https://ae01.alicdn.com/kf/H957ce765d5364147a02be4a2629b2fb5C.jpg" alt="2" />
        <p>xscienv</p>
      </li>
      <li id="boxItem">
        <img
          id="listImg"
          src="https://ae01.alicdn.com/kf/H4a528a97d769430293545d0490b04959T.jpg"
          alt="3"
        />
      </li>
      <li id="boxItem">
        <img
          id="listImg"
          src="https://ae01.alicdn.com/kf/Hafba663c58c642048802d504302e3939U.jpg"
          alt="4"
        />
      </li>
      <li id="boxItem">
        <img
          id="listImg"
          src="https://ae01.alicdn.com/kf/H3aa7d861305a475fb3477b06cca25557m.jpg"
          alt="5"
        />
      </li>
    </ul>

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.vant-swipe {
  height: 200px;
  .van-swipe-item{
    background-color: lightblue;
  }
}

img {
  width: 100%;
}
#tag {
  display: flex;
  justify-content: space-between;
  color: rgb(71, 68, 68);
  background-color: none;
  margin: 8px;
  button {
    border-radius: 20%;
  }
}
div {
  background-color: #fff;
}
#box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  #boxItem {
    width: 100px;
    //padding-top: 20px;
    #listImg {
      border-radius: 5%;
    }
  }
}
</style>