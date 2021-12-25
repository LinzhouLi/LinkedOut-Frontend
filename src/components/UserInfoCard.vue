<template>
  <el-affix :offset="80">
    <el-card>
      <div id="icon-area">
        <user-icon :size="70" :url="userIconUrl" class="pointer-area" @click="checkUserInfo"/>
      </div>
      <div id="name" @click="checkUserInfo"><b>{{ userName }}</b></div>
      <div id="brief-info" @click="checkUserInfo">{{ userBriefInfo }}</div>
      <el-divider/>
      <el-row v-if="userType=='user'" class="pointer-area" @click="setJobIntention">
        <el-col :offset="2" :span="10">
          <div class="text">求职意向</div>
        </el-col>
        <el-col :offset="10" :span="2">
          <el-icon class="arrow-icon" :size="20"><arrow-right /></el-icon>
        </el-col>
      </el-row>
      <el-row v-if="userType=='company'" class="pointer-area" @click="postRecruitmentInfo">
        <el-col :offset="2" :span="10">
          <div class="text">发布职位</div>
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

  <job-intention-dialog :visible="showDialog" @close="showDialog=false" />
</template>

<script>
import UserIcon from './UserIcon.vue';
import { ArrowRight } from '@element-plus/icons';
import JobIntentionDialog from './JobIntentionDialog.vue';

export default {
  components: { 
    UserIcon,
    ArrowRight,
    JobIntentionDialog
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
    userType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showDialog: false
    }
  },
  methods: {
    checkUserInfo: function() {
      this.$router.push({ path: '/myinfo' });
    },
    setJobIntention: function() {
      this.showDialog = true;
    },
    postRecruitmentInfo: function() {
      this.$router.push({ path: '/postRecruitment' });
    },
    postTweet: function() {
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
.pointer-area:hover {
  color: #409eff;
}
.text {
  font-size: 15px;
}
.arrow-icon {
  float: right;
  padding: auto;
}
</style>