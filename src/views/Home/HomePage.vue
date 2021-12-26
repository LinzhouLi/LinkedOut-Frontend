<template>
  <top-nav/>
  <el-row style="margin-top:20px">
    <el-col :offset="3" :span="4">
      <user-info-card v-bind="user"/>
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
import PageFooter from '@/components/PageFooter';
import { getBasicInfo } from '@/apis/users.js';

export default {
  components: {
    TopNav,
    UserInfoCard,
    UserRecommendCard,
    PageFooter
  },
  data() {
    return{
      footerDisp: false,
      user: {
        userName: '',
        userBriefInfo: '',
        userIconUrl: '',
        userType: 0
      }
    }
  },
  mounted:async function(){
    const uid = localStorage.getItem('unifiedId');
    const userType = localStorage.getItem('userType');
    const resp = await getBasicInfo(uid);
    const userData = resp.data.data;

    this.user = {
      userName: userData.trueName || "匿名用户",
      userBriefInfo: userData.briefInfo,
      userType: userData.userType,
      userIconUrl: userData.pictureUrl
    }
  }
}
</script>

<style scoped>

</style>