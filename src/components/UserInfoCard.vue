<template>
  <el-affix :offset="80">
    <el-card>
      <div id="icon-area">
        <user-icon :size="70" :url="userIconUrl" class="pointer-area" @click="checkUserInfo"/>
      </div>
      <div id="name" @click="checkUserInfo"><b>{{ userName }}</b></div>
      <div id="brief-info" @click="checkUserInfo">{{ userBriefInfo }}</div>
      <el-divider/>
      <el-row class="pointer-area" @click="setJobIntention">
        <el-col :offset="2" :span="10">
          <div class="text">求职意向</div>
        </el-col>
        <el-col :offset="10" :span="2">
          <el-icon class="arrow-icon" :size="20"><arrow-right /></el-icon>
        </el-col>
      </el-row>
      <el-divider/>
      <el-row class="pointer-area" @click="postTweet">
        <el-col :offset="2" :span="10">
          <div class="text">发布动态</div>
        </el-col>
        <el-col :offset="10" :span="2">
          <el-icon class="arrow-icon" :size="20"><arrow-right /></el-icon>
        </el-col>
      </el-row>
    </el-card>
  </el-affix>
</template>

<script>
import UserIcon from './UserIcon.vue';
import { ArrowRight } from '@element-plus/icons';

export default {
  components: { 
    UserIcon,
    ArrowRight
  },
  props: {
    userName: {
      type: String,
      required: true,
    },
    userIconUrl: {
      type: String,
      default: ''
    },
    userBriefInfo: {
      type: String,
      required: true
    }
  },
  methods: {
    checkUserInfo: () => {
      //TODO
      console.log("checkUserInfo");
    },
    setJobIntention: () => {
      //TODO
      console.log("setJobIntention");
    },
    postTweet: () => {
      //TODO
      console.log("postTweet");
    }
  }
}
</script>

<style scoped>
#icon-area {
  text-align: center;
  padding: 10px;
}
#name {
  padding-top: 10px;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
}
#brief-info {
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: rgb(122 122 122);
  text-align: center;
  cursor: pointer;
}
.el-divider {
  margin: 10px;
}
.pointer-area {
  cursor: pointer;
}
.text {
  font-size: 15px;
}
.arrow-icon {
  float: right;
  padding: auto;
}
</style>