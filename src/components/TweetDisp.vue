<template>
  <el-card>
    <template #header>
      <div style="padding:10px;">
        <user-brief-disp v-bind="user" />
      </div>
    </template>
    <div>
      <div style="padding:20px;"><span v-html="tweetText"/></div>
      <el-carousel :autoplay="false">
        <el-carousel-item v-for="(picUrl,index) in tweetPics" :key="index">
          <el-image :src="picUrl" style="width:100%;" fit="cover" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
    </div>
    <div>
    </div>
  </el-card>
</template>

<script>
import UserBriefDisp from './UserBriefDisp';

export default {
  components: { UserBriefDisp },
  computed: {
    user() {
      return {
        userId: this.userId,
        userName: this.userName,
        userType: this.userType,
        userIconUrl: this.userIconUrl,
        userBriefInfo: this.userBriefInfo
      }
    }
  },
  props: {
    userId: { // 用户统一ID
      type: Number,
      required: true,
    },
    userName: { // 真实姓名
      type: String,
      required: true,
    },
    userType: { // 用户类型
      type: String,
      required: true,
    },
    userIconUrl: {
      type: String,
      default: '',
    },
    userBriefInfo: {
      type: String,
      default: '',
    },
    tweetText: {
      type: String,
      required: true,
    },
    tweetPics: {
      type: Array,
      default: [],
    }
  }
}
</script>

<style scoped>
.el-card {
  --el-card-padding: 0px;
}
</style>