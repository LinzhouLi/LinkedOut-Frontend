<template>
  <el-affix :offset="80">
    <el-card>
      <div><b>推荐关注</b></div>
        <div v-for="(user, index) in userRecommendList" :key="index">
          <el-divider/>
          <el-container>
            <user-brief-disp v-bind="user"/>
            <div style="padding:3.5% 0;">
              <el-button
                size="mini"
                :type="buttonType(user.ifFollowing)"
                style="width:65px"
                @click="follow(index)"
              >
                {{ buttonText(user.ifFollowing) }}
              </el-button>
            </div>
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
    <div style="margin-top:20px;">
      <el-container style="margin:0px 26%">
        <el-image :src="logoUrl" style="width: 21px"></el-image>
        <div style="font-size:10px">LinkedOut © 2021</div>
      </el-container>
    </div>
    <div id="text-div">同济大学软件工程课程项目</div>
  </el-affix>
</template>

<script>
import UserBriefDisp from '@/components/UserBriefDisp.vue';

export default {
  components: { UserBriefDisp },
  data() {
    return {
      ADimgUrl: require('@/assets/ADimg.jpg'),
      logoUrl: require('@/assets/logo.png'),
      userRecommendList: [
        {
          userId: 101,
          userName: '字节跳动',
          userBriefInfo: '互联网企业',
          userType: 'company',
          ifFollowing: false
        },
        {
          userId: 102,
          userName: '张三',
          userBriefInfo: '同济大学学生',
          userType: 'user',
          ifFollowing: false
        },
        {
          userId: 103,
          userName: '李四',
          userBriefInfo: '腾讯公司员工',
          userType: 'user',
          ifFollowing: false
        },
      ]
    }
  },
  methods: {
    buttonType: (flag) => {
      return flag ? 'primary' : '';
    },
    buttonText: (flag) => {
      return flag ? '已关注' : '关注';
    },
    follow: function(index) {
      // TODO
      const user = this.userRecommendList[index];
      if(user.ifFollowing) { // 已关注
        console.log(user.userId, '已关注, 将此用户取关');
        this.userRecommendList[index].ifFollowing = false;
      }
      else { // 未关注
        console.log(user.userId, '未关注, 关注此用户');
        this.userRecommendList[index].ifFollowing = true;
      }
    },
    toRecruitmentPage: function() {
      // this.$router.push('/home/recruitments');
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
