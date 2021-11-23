<template>
  <top-nav/>
  <el-container direction="horizontal">
    <div id="left-aside" >
      <user-info-card v-bind="defaultUser"/>
    </div>
    <div id="main-part">
      <router-view/>
    </div>
    <div id="right-aside">
      <user-recommend-card/>
    </div>
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
#left-aside {
  width: 23%;
  padding-left: 11%;
  padding-top: 20px;
}
#right-aside {
  width: 32%;
  padding-right: 13%;
  padding-top: 20px;
}
#main-part {
  width: 45%;
  padding: 20px;
}
</style>