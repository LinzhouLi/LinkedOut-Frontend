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
      <user-recommend-card/>
    </el-col>
  </el-row>
</template>

<script>
import TopNav from '@/components/TopNav';
import UserInfoCard from '@/components/UserInfoCard';
import UserRecommendCard from '@/components/UserRecommendCard';
import PageFooter from '@/components/PageFooter.vue';

export default {
  components: {
    TopNav,
    UserInfoCard,
    UserRecommendCard,
    PageFooter
  },
  data() {
    return{
      defaultUser: {
        userName: '李林洲',
        userBriefInfo: '同济大学学生',
        userIconUrl: ''
      }
    }
  },
  methods: {
    loadTweets: function() {
      console.log(1)
    }
  }
}
</script>

<style scoped>

</style>