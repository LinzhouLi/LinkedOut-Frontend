<template>
  <el-container direction="vertical" style="padding:5px">
    <user-icon 
      :size="100" 
      :url="userIconUrl" 
      style="cursor:pointer"
    />
    <div id="userName">{{userName}}</div>
    <div id="briefInfo">{{briefInfo}}</div>
    <div id="livePlace">所在地：{{livePlace}}</div>
    <el-container direction="horizontal" id="buttons">
        <el-button>关注</el-button>
        
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
    userName: { // 真实企业名
      type: String,
      required: true,
    },
    userIconUrl: {
      type: String,
      default: ''
    },
    briefInfo: {
      type: String,
      default: ''
    },
    livePlace: {
      type: String,
      default: ''
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
#userName {
  font-size: 23px;
  font-weight: 650;
  margin: 5px 0px 10px;
}
#briefInfo {
  font-size: 15px;
  color: rgb(122 122 122);
  margin: 0px 0px 10px;
}
#livePlace{
  font-size: 15px;
}
#buttons{
  margin: 15px 0px 0px 0px;
}
</style>