<template>
  <el-card>
    <template #header>
      <div style="padding:10px;">
        <user-brief-disp v-bind="user" />
      </div>
    </template>
    <div>
      <div style="padding:20px;"><span :id="`text-area-${tweetId}`"/></div>
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
import VditorPreview from 'vditor/dist/method.min';

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
  mounted() {
    VditorPreview.preview(document.getElementById(`text-area-${this.tweetId}`), this.tweetText);
  },
  props: {
    tweetId: { // 动态ID
      type: Number,
      required: true,
    },
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