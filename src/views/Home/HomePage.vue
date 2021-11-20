<template>
  <top-nav/>
  <el-container direction="horizontal">
    <el-aside id="left-aside" width="29%">
      <user-info-card v-bind="defaultUser"/>
    </el-aside>
    <el-main width="35%">
      main
      <router-view/>
    </el-main>
    <el-aside id="right-aside" width="36%">
      <user-recommend-card/>
    </el-aside>
  </el-container>
  
</template>

<script>
import TopNav from '@/components/TopNav';
import UserInfoCard from '@/components/UserInfoCard';
import UserRecommendCard from '@/components/UserRecommendCard';

export default {
  components: {
    TopNav,
    UserInfoCard,
    UserRecommendCard
  },
  data() {
    return{
      defaultUser: {
        userName: '李林洲',
        userBriefInfo: '同济大学学生'
      }
    }
  }
}
</script>

<style scoped>
#left-aside {
  padding-left: 13%;
  padding-top: 20px;
}
#right-aside {
  padding-right: 13%;
  padding-top: 20px;
}
</style>