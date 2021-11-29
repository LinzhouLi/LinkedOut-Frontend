<template>
  {{ searchKey }}
</template>

<script>
export default {
  created() {
    this.searchKey = this.$route.query.key;
  },
  data() {
    return {
      searchKey: ''
    }
  }
}
</script>

<style scoped>

</style>
