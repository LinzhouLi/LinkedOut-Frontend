<template>
  <el-container direction="horizontal" style="padding:5px">
    <user-icon 
      :size="36" 
      :url="userIconUrl" 
      style="cursor:pointer"
      @click="checkUser"
    />
    <el-container 
      direction="vertical" 
      style="padding-left:10px"
      @click="checkUser"
    >
      <span class="name"><b>{{ userName }}</b></span>
      <span class="brief-info">{{ userBriefInfo }}</span>
    </el-container>
  </el-container>
</template>

<script>
import UserIcon from './UserIcon.vue'

export default {
  components: { UserIcon },
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
        this.$router.push({ name: 'userinfo', params: { uid: this.userId }});
      }
      else if(this.userType == 'company') {
        this.$router.push({ name: 'companyinfo', params: { cid: this.userId }});
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
  font-size: 12px;
  color: rgb(122 122 122);
  cursor: pointer;
}
</style>