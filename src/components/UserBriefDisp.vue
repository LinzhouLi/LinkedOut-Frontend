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

    <div v-if="ifShowFollow" style="padding:8px 0;">
      <el-button
        size="mini"
        :type="buttonType(_ifFollowing)"
        style="width:65px; padding:0px"
        @click="follow"
      >
        {{ buttonText(_ifFollowing) }}
      </el-button>
    </div>
  </el-container>
</template>

<script>
import UserIcon from './UserIcon.vue';
import { updateFollow, deleteFollow } from '@/apis/tweet.js';


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
    },
    ifShowFollow: {
      type: Boolean,
      default: false
    },
    ifFollowing: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this._ifFollowing = this.ifFollowing
  },
  data() {
    return {
      _ifFollowing: false,
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
    },
    buttonType: (flag) => {
      return flag ? 'primary' : '';
    },
    buttonText: (flag) => {
      return flag ? '已关注' : '关注';
    },
    follow: async function() {
      const myUnifiedId = localStorage.getItem("unifiedId");
      if(this._ifFollowing) { // 已关注
        const params = { unifiedId: myUnifiedId, subscribeId: this.unifiedId }
        const resp = await deleteFollow(params);

        if(resp.status === 200 && resp.data.code == 'success'){
          this.$message.success('取关成功!');
          this._ifFollowing = false;
        }
        else this.$message.error('取关失败!');
      }
      else { // 未关注
        const params = { unifiedId: myUnifiedId, subscribeId: this.unifiedId }
        const resp = await updateFollow(params);

        if(resp.status === 200 && resp.data.code == 'success'){
          this.$message.success('关注成功!');
          this._ifFollowing = true;
        }
        else this.$message.error('关注失败!');
      }
    },
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