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
                style="width:65px; padding:0px"
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
    <page-footer v-if="ifFooter" />
  </el-affix>
</template>

<script>
import UserBriefDisp from '@/components/UserBriefDisp.vue';
import PageFooter from './PageFooter.vue';
import { ElNotification } from 'element-plus';

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
        ElNotification({
          title: '取关成功',
          type: 'success',
        });
        this.userRecommendList[index].ifFollowing = false;
      }
      else { // 未关注
        ElNotification({
          title: '关注成功',
          type: 'success',
        });
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
