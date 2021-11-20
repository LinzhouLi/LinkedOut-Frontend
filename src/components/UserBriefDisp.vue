<template>
  <el-container direction="horizontal" @click="checkUser" style="padding:5px">
    <user-icon :size="36" :url="userIconUrl" style="cursor:pointer" />
    <el-container direction="vertical" style="padding-left:10px">
      <div id="name"><b>{{ userName }}</b></div>
      <div id="brief-info">{{ userBriefInfo }}</div>
    </el-container>
  </el-container>
</template>

<script>
import UserIcon from './UserIcon.vue'

export default {
  components: { UserIcon },
  props: {
    userId: {
      type: Number,
      required: true,
    },
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
      default: ''
    }
  },
  methods: {
    checkUser: function() {
      // TODO
      console.log("checkUser", this.userId);
    }
  }
}
</script>

<style scoped>
#name {
  font-size: 16px;
  cursor: pointer;
}
#brief-info {
  font-size: 12px;
  color: rgb(122 122 122);
  cursor: pointer;
}
</style>