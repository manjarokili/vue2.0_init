<template>
  <div>
    <van-tabs v-model="active">
      <van-tab title="私藏推荐"></van-tab>
      <van-tab title="最嗨电音"></van-tab>
      <van-tab title="我的音乐"></van-tab>
      <van-tab title="古典专区"></van-tab>
      <van-tab title="跑步FM"></van-tab>
      <van-tab title="爵士电台"></van-tab>
    </van-tabs>

    <van-cell-group>
      <van-cell icon="music-o" title="本地音乐" value="27 >" />
      <van-cell icon="bars" title="最近播放" value="200 >" />
      <van-cell icon="live" title="我的电台" value="0 >" />
      <van-cell icon="like-o" title="我的收藏" value="116 >" />
    </van-cell-group>

    <van-collapse v-model="activeNames">
  <van-collapse-item title="我创建的歌单" name="1">内容</van-collapse-item>
  <van-collapse-item title="我收藏的歌单" name="2">内容</van-collapse-item>
</van-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 2,
      activeNames: ['1']
    };
  }
};

</script>

<style lang="scss" scoped>
.van-cell-group {
  padding-top: 15px;
  .van-cell {
    padding: 15px 30px;
  }
}
</style>