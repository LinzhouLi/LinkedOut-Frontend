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
import {getUserInfo} from '@/apis/users.js';
import {getRecommentList} from '@/apis/tweet.js';


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
  },
  mounted:async function(){
    const uid=localStorage.getItem("unifiedId");
    const resp=await getUserInfo({uid,sid:uid})
    const params=resp.data;
    this.defaultUser.userName=params.trueName||"匿名用户",
    this.defaultUser.userIconUrl=params.userIconUrl,
    this.defaultUser.userBriefInfo=params.userBriefInfo

    try{
      const resp2=await getRecommentList({unifiedId:uid});
      console.log(resp2);
    }catch(e){
      console.log(e);
    }
    
  }
}
</script>

<style scoped>

</style>