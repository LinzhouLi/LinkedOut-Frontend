<template>
  <top-nav/>
  <el-row style="margin-top:20px">
    <el-col :offset="3" :span="4">
      <user-info-card v-bind="defaultUser"/>
    </el-col>
    <el-col :span="9" style="margin:0px 20px">
      <router-view :key="$route.query" />
    </el-col>
    <el-col :span="5">
      <user-recommend-card :ifFooter="!footerDisp" />
    </el-col>
  </el-row>
  <page-footer v-if="footerDisp"/>
  <el-backtop />
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
      footerDisp: false,
      defaultUser: {
        userName: '李林洲',
        userBriefInfo: '同济大学学生',
        userIconUrl: '',
        userType: 'company'
      }
    }
  }
}
</script>

<style scoped>

</style>