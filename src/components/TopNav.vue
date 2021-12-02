<template>
  <el-affix>
    <el-card id="top-nav-card" shadow="always" style="border-radius: 0px;">
      <el-row>
        <el-col class="nav-text-area" :offset="2" :span="3">
          <el-space>
            <el-col :span="12">
              <el-image :src="logoUrl" style="width: 40px"></el-image>
            </el-col>
            <el-col :span="12">
              <div><b>LinkedOut</b></div>
            </el-col>
          </el-space>
        </el-col>
        <el-col class="nav-text-area" :offset="4" :span="6">
          <el-input
            ref="searchInput"
            v-model="searchKey"
            placeholder="搜索企业或用户"
            clearable
            @keyup.enter="searchUser"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><search /></el-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :offset="1" :span="5">
          <el-menu
            :default-active="currentMenu"
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
import { Star, Briefcase, Avatar, Search } from "@element-plus/icons";

export default {
  components: {
    Star,
    Briefcase,
    Avatar,
    Search
  },
  created() {
    this.currentMenu = this.$route.path;
  },
  data() {
    return {
      currentMenu: '',
      searchKey: '',
      logoUrl: require('@/assets/logo.png'),
    }
  },
  watch: {
    $route(e) {
      this.currentMenu = e.path;
    }
  },
  methods: {
    searchUser: function() {
      if(!!this.searchKey) {
        this.$router.push({
          name: 'search',
          query: {
            key: this.searchKey
          }
        });
        this.searchKey = '';
        this.$refs.searchInput.blur();
      }
    }
  }
}
</script>

<style scoped>
#top-nav-card :deep(.el-card__body) {
  padding: 0px;
}
.nav-text-area {
  padding-top: 10px;
}
</style>
