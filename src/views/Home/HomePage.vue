<template>
  <top-nav/>
  <el-row style="margin-top:20px">
    <el-col :sm="{ offset: 3, span: 4 }" :xs="{ span: 0 }">
      <user-info-card v-bind="user"/>
    </el-col>
    <el-col :sm="{ span: 9 }" :xs="{ span: 24 }" style="margin:0px 20px">
      <router-view :key="$route.query" />
    </el-col>
    <el-col :sm="{ span: 5 }" :xs="{ span: 0 }">
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
        userType: 'user'
      }
    }
  },
  mounted: async function(){
    const uid = localStorage.getItem('unifiedId');
    const resp = await getBasicInfo(uid);
    const userData = resp.data.data;
    
    this.user = {
      userName: userData.trueName,
      userBriefInfo: userData.briefInfo,
      userIconUrl: userData.pictureUrl,
      userType: userData.userType
    }
  }
}
</script>

<style scoped>

</style>