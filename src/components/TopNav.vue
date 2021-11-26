<template>
  <el-affix>
    <el-card id="top-nav-card" shadow="always" style="border-radius: 0px;">
      <el-row>
        <el-col id="logo-area" :offset="2" :span="3">
          <el-space>
            <el-col :span="12">
              <el-image :src="logoUrl" style="width: 40px"></el-image>
            </el-col>
            <el-col :span="12">
              <div><b>LinkedOut</b></div>
            </el-col>
          </el-space>
        </el-col>
        <el-col id="menu-area" :offset="10" :span="6">
          <el-menu
            default-active="activeMenuIndex"
            :ellipsis="false"
            mode="horizontal"
            router
          >
            <el-menu-item index="/home/tweets">
              <el-icon><star /></el-icon>
              动态
            </el-menu-item>
            <el-menu-item index="/home/recruitments">
              <el-icon><briefcase /></el-icon>
              职位
            </el-menu-item>
            <el-menu-item index="/myinfo">
              <el-icon><avatar /></el-icon>
              个人信息
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="2">
        </el-col>
      </el-row>
    </el-card>
  </el-affix>
</template>

<script>
import { Star, Briefcase, Avatar } from "@element-plus/icons";

export default {
  components: {
    Star,
    Briefcase,
    Avatar
  },
  data() {
    return {
      logoUrl: require('@/assets/logo.png'),
    }
  },
}
</script>

<style scoped>
#top-nav-card :deep(.el-card__body) {
  padding: 0px;
}
#logo-area {
  padding-top: 10px;
}
#menu-area {
  padding-top: 0px;
}
</style>
