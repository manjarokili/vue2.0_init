<!--
 @description 内页组件
 @fileName index.vue
 @author zengqiongying
 @created 2021/03/17 17:05:20
-->
<template>
  <div class="qup-page-container">
    <div class="qup-page-header bread-box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <template v-for="(item,index) in titles">
          <el-breadcrumb-item v-if="index===0" :key="index" @click.native="goBack"><span class="btn-green">{{ item }}</span></el-breadcrumb-item>
          <el-breadcrumb-item v-else :key="index">{{ item }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
      <div>
        <el-button size="mini" @click.native="goBack">{{ cancelTitle || '返回' }}</el-button>
        <slot name="button" />
      </div>
    </div>
    <div class="qup-page-content">
      <el-scrollbar class="qup-page-scrollbar">
        <slot />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InsidePage',
  props: {
    titles: {
      type: Array,
      default: () => []
    },
    cancelTitle: {
      type: String,
      default: '返回'
    }
  },
  data() {
    return {

    }
  },
  created() {},
  methods: {
    goBack() {
      this.$emit('go-back')
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
