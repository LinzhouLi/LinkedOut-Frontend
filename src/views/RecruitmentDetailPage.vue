<template>
  <h1>Recruitment</h1>
  <el-container>
    <div id="text-area"></div>
  </el-container>
</template>

<script>
import Vditor from 'vditor';
import '@/assets/vditor.css';

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
  data() {
    return {
      editor: null
    }
  }
}
</script>

<style scoped>

</style>