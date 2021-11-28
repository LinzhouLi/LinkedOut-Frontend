<template>
  <el-affix :offset="80">
    <el-card>
      <div id="icon-area">
        <user-icon :size="70" :url="userIconUrl" class="pointer-area" @click="checkUserInfo"/>
      </div>
      <div id="name" @click="checkUserInfo"><b>{{ userName }}</b></div>
      <div id="brief-info" @click="checkUserInfo">{{ userBriefInfo }}</div>
      <div v-if="!onlyInfo">
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
      </div>
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
    },
    onlyInfo: { // 信息卡片是否有下面两个选择("求职意向","发布动态"), 默认为false
      type: Boolean, // 如果要展示其他用户信息, 就设置true
      default: false
    }
  },
  methods: {
    checkUserInfo: function() {
      this.$router.push({ path: '/myinfo' });
    },
    setJobIntention: function() {
      //TODO
      console.log("setJobIntention");
    },
    postTweet: function() {
      this.$router.push('/home/tweets');
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
  margin: 10px 0px;
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