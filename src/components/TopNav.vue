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
            :default-active="activeMenuIndex"
            :ellipsis="false"
            mode="horizontal"
            @select="handleMenuSelect"
          >
            <el-menu-item index="1">
              <el-icon><star /></el-icon>
              动态
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon><briefcase /></el-icon>
              职位
            </el-menu-item>
            <el-menu-item index="3">
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
  setup() {
    const activeMenuIndex = "1";
    return {
      activeMenuIndex
    }
  },
  data() {
    return {
      logoUrl: require('@/assets/logo.png'),
    }
  },
  methods: {
    handleMenuSelect: function(key) {
      switch(key) {
        case "1": this.$router.push('/home/tweets');break;
        case "2": this.$router.push('/home/recruitments');break;
        case "3": this.$router.push('');break; // TODO
      }
    }
  }
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
