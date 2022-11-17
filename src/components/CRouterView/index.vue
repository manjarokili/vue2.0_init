<template>
  <div style="padding: 12px 12px 0">
    <div v-show="list.length>1" class="c-header-crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(l,i) in list" :key="i" :to="l">{{ l.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button @click="goBack">返回</el-button>
    </div>
    <keep-alive :include="$store.state.views.keepAliveList">
      <router-view :key="$route.fullPath" :name="name" />
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'CRouterViewBreadcrumd',
  components: {
  },
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    list() {
      return this.$store.state.views.queueList
    }
  },
  methods: {
    goBack() {
      this.$router.push(this.list[this.list.length - 2])
    }
  }
}
</script>
<style lang="scss">
.c-header-crumbs{
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-breadcrumb__inner{
    color: #3dc094;
    font-size: 12px;
  }
}
</style>
