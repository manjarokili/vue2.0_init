export default {
  props: {
    pageShow: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  computed: {
    nowPageShow: {
      get() {
        return this.pageShow
      },
      set(val) {
        this.$emit('update:pageShow', val)
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    goBack() {
      this.nowPageShow = false
    }
  }
}
