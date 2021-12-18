<template>
  <el-row>
    <el-col :span="21">
      <el-row>
        <el-col>
          <user-icon 
            :size="100" 
            :url="userIconUrl" 
            style="cursor:pointer"
          />
          </el-col>
        <el-container direction="vertical" style="margin-left:5px">
        <div id="userName">{{userName}}</div>
        <div id="briefInfo">{{briefInfo}}</div>
        <div style="display:flex">
          <el-icon :size="16"><connection /></el-icon>
          <div style="font-size: 13px">
            官方网站:&nbsp;
            <a :href="`https://${contactWay}`">{{ contactWay }}</a>
          </div>
        </div>
        </el-container>
      </el-row>
    </el-col>
    <el-col :span="3">
      <el-button>关注</el-button>
    </el-col>
  </el-row>
</template>

<script>
import UserIcon from './UserIcon.vue';
import { Connection } from '@element-plus/icons';

export default {
  components: { 
    UserIcon,
    Connection
  },
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
    contactWay: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    }
  },
  methods: {
    jump(){
        let url = 'http://'+this.contactWay;
        window.open(url);
    }
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
#email{
  font-size: 15px;
}
#buttons{
  margin: 15px 0px 0px 0px;
}
</style>