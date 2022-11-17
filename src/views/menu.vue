<template>
  <div>
    <router-link to="/">表格组件Demo</router-link>
    <router-link to="/demo">Demo2</router-link>
    <router-link />
  </div>
</template>

<script>
export default {
  name: 'Menu',
  components: {},
  props: {},
  data() {
    return {
      asasa: ''
    }
  },

  computed: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
  a {
    display: block;
    line-height: 30px;

  }

</style>
