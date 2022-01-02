<template>
  <el-affix :offset="80">
    <el-card>
      <div><b>推荐关注</b></div>
        <div v-for="(user, index) in userRecommendList" :key="index">
          <el-divider/>
          <el-container>
            <user-brief-disp v-bind="user"/>
          </el-container>
        </div>
    </el-card>
    <el-card 
      :body-style="{ padding: '0px', height: '180px' }" 
      style="margin-top:15px; cursor:pointer"
      @click="toRecruitmentPage"
    >
      <el-image :src="ADimgUrl" fit="cover"/>
    </el-card>
    <page-footer v-if="ifFooter" />
  </el-affix>
</template>

<script>
import UserBriefDisp from '@/components/UserBriefDisp.vue';
import PageFooter from './PageFooter.vue';
import { getRecommentList } from '@/apis/tweet.js';

export default {
  components: { 
    UserBriefDisp,
    PageFooter
  },
  props: {
    ifFooter: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      ADimgUrl: require('@/assets/ADimg.jpg'),
      logoUrl: require('@/assets/logo.png'),
      userRecommendList: [ ]
    }
  },
  methods: {
    toRecruitmentPage: function() {
      // this.$router.push('/home/recruitments');
    }
  },
  created: async function(){
    const unifiedId = localStorage.getItem("unifiedId");
    try{
      this.userRecommendList = [];
      const resp = await getRecommentList(unifiedId);
      const recommendList = resp.data.data;
      
      for(let item of recommendList) {
        this.userRecommendList.push({
          unifiedId: item.unifiedId,
          userName: item.trueName || '匿名用户',
          userBriefInfo: item.briefInfo || '',
          userType: item.userType,
          userIconUrl: item.pictureUrl,
          ifFollowing: false,
          ifShowFollow: true
        });
      }
    }catch(e){
      console.log(e)
    }finally{
      
    }
  }
}
</script>

<style scoped>
.el-divider {
  margin: 5px;
  margin: 5px 0px;
}
#text-div {
  margin-top: 3px;
  text-align: center;
  font-size: 10px;
  color: rgb(122 122 122);
}
</style>
