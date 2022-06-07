<template>
  <el-divider/>
  <el-row justify="center">
    <el-image :src="AppLogo" style="width: 21px"></el-image>
    <div style="font-size:10px">{{ AppTitle }} © 2022</div>
  </el-row>
  <el-row justify="center" style="margin-bottom:20px;">
    <div id="text-div">{{ AppBriefInfo }}</div>
  </el-row>
</template>

<script>
import { AppTitle, AppBriefInfo, AppLogo } from '@/config.js';

export default {
  setup() {
    return {
      AppLogo, AppTitle, AppBriefInfo
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