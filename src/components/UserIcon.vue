<template>
  <el-avatar :size="size" :src="iconUrl"></el-avatar>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ""
    },
    size: {
      type: Number,
      default: 50
    }
  },
  computed: {
    iconUrl() {
      return !!this.url ? this.url : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
    }
  }
}
</script>
