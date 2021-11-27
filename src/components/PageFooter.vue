<template>
  <el-divider/>
  <el-row justify="center">
    <el-image :src="logoUrl" style="width: 21px"></el-image>
    <div style="font-size:10px">LinkedOut © 2021</div>
  </el-row>
  <el-row justify="center" style="margin-bottom:20px;">
    <div id="text-div">同济大学软件工程课程项目</div>
  </el-row>
</template>

<script>
export default {
  setup() {
    const logoUrl= require('@/assets/logo.png');
    return {
      logoUrl
    }
  }
}
</script>

<style scoped>
.el-divider {
  margin: 15px 0px 10px;
}
#text-div {
  margin-top: 3px;
  text-align: center;
  font-size: 10px;
  color: rgb(122 122 122);
}
</style>
