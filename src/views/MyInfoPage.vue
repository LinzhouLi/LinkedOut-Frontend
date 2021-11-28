<template>
  <h1>MyInfo</h1>
  <div id="text-area"/>
</template>

<script>
import '@/assets/vditor.css';
import Vditor from 'vditor';

export default {
   mounted() {
    console.log(this.$route.params.rid);
    this.editor = new Vditor('text-area', {
      width: 500,
      height: 500,
      toolbar: ['emoji', 'br', 'bold', '|', 'line'],
      cache: {
        enable: false,
      },
      blur: value => { console.log(value) },
      mode: "wysiwyg"
    })
  },
}
</script>

<style scoped>

</style>
