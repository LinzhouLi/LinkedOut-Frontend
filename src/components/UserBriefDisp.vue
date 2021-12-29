<template>
  <el-container direction="horizontal" style="padding:5px">
    <div class="avatarContainer">
    <user-icon 
      :size="36" 
      :url="userIconUrl" 
      style="cursor:pointer"
      @click="checkUser"
    />
    </div>

    <el-container 
      direction="vertical" 
      style="padding-left:10px"
      @click="checkUser"
    >
      <div class="name"><b>{{ userName }}</b></div>
      <div class="brief-info">{{ userBriefInfo }}</div>
    </el-container>
  </el-container>
</template>

<script>
import UserIcon from './UserIcon.vue'



export default {
  components: { UserIcon },
  props: {
    unifiedId: { // 用户统一ID
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
      default: ''
    },
    userBriefInfo: {
      type: String,
      default: ''
    }
  },
  methods: {
    checkUser: function() {
      if (this.userType == 'user') {
        this.$router.push({ name: 'userinfo', params: { uid: this.unifiedId }});
      }
      else if (this.userType == 'company') {
        this.$router.push({ name: 'companyinfo', params: { cid: this.unifiedId }});
      }
      else if (this.userType == 'school') {
        this.$message.warning('暂无学校详细信息!');
      }
    }
  }
}
</script>

<style scoped>
.name {
  font-size: 16px;
  cursor: pointer;
}
.brief-info {
  font-size: 10px;
  color: rgb(122 122 122);
  cursor: pointer;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>