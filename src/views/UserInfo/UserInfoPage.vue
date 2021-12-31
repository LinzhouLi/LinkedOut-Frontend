<template>
  <top-nav/>
  <el-row style="margin-top:20px">
    <el-col :offset="3" :span="12" style="margin-right:20px">
      <!-- 个人信息卡片-->
      <el-card :body-style="{ padding: 0 }">

        <el-image :src="user.backgroundUrl" style="height:150px; width:100%; margin-bottom:-20px">
          <template #error>
            <img src="defaultBackground" style="width:100%; height:150px" />
          </template>
        </el-image>

        <el-row style="padding:0px 20px 20px">
          <el-col :span="5">
            <div class="icon-area">
              <user-icon 
                :size="120" 
                :url="user.userIconUrl" 
              />
            </div>
          </el-col>
          <el-col :span="19">
            <el-row style="margin-top:30px">
              <el-col :span="20">

                <el-container direction="vertical" style="margin-left:20px">
                  <div id="userName">{{ user.userName }}</div>
                  <div id="briefInfo">{{ user.briefInfo }}</div>
                  <div id="livePlace">位置:&nbsp;{{ user.livePlace }}</div>
                </el-container>

              </el-col>
              <el-col :span="3">

                <el-button
                  v-show="!isSelf"
                  :type="buttonType(user.ifFollowing)"
                  @click="follow(index)"
                  style="width:76px; padding:0px"
                >
                  {{ buttonText(user.ifFollowing) }}
                </el-button>

              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-divider style="margin:0px"/>

        <!-- 详情、动态、在招职位菜单 -->
        <el-menu 
          :default-active="currentMenu"
          :ellipsis="false"
          mode="horizontal"
          router
        >
          <el-menu-item :index="`/userinfo/${userId}/home`">         
            个人信息
          </el-menu-item>
          <el-menu-item :index="`/userinfo/${userId}/tweets`">
            动态
          </el-menu-item>
        </el-menu>
      </el-card>
      
      <router-view />
    </el-col>

    <el-col :span="5">
      <user-recommend-card :ifFooter="false" />
    </el-col>
  </el-row>
  <page-footer />
</template>

<script>
import TopNav from '@/components/TopNav';
import UserIcon from '@/components/UserIcon';
import UserRecommendCard from '@/components/UserRecommendCard';
import PageFooter from '../../components/PageFooter.vue';
import {getUserInfo} from '@/apis/users.js';
import {updateFollow,deleteFollow} from '@/apis/tweet.js';

export default {
  components: {
    TopNav,
    UserIcon,
    UserRecommendCard,
    PageFooter
  },
  created: async function() {
    this.currentMenu = this.$route.path;
    this.userId = this.$route.params['uid']; // 获取页面参数
    this.isSelf = localStorage.getItem('unifiedId') === this.userId;
  },
  mounted: async function() {
    const params = {
      uid: localStorage.getItem('unifiedId'),
      sid: this.userId,
    }
    
    const resp = await getUserInfo(params);
    const userData = resp.data.data;
    
    this.user = {
      unifiedId: userData.unifiedId,
      userName: userData.trueName,
      briefInfo: userData.briefInfo,
      livePlace: userData.livePlace,
      ifFollowing: userData.isSubscribed,
      userIconUrl: userData.pictureUrl,
      backgroundUrl: userData.background
    }
  },
  data() {
    return{
      currentMenu: '',
      user: { },
      userId: 0,
      isSelf: false,
      defaultBackground: require('@/assets/background.png')
    }
  },
  watch: {
    $route(e) {
      this.currentMenu = e.path;
    }
  },
  methods: {
    buttonType: (flag) => {
      return flag ? 'primary' : '';
    },
    buttonText: (flag) => {
      return flag ? '已关注' : '关注';
    },
    follow: async function() {
      const params = {
        unifiedId: localStorage.getItem('unifiedId'),
        subscribeId: this.userId,
      }
      if(this.user.ifFollowing) { // 已关注
        const resp = await deleteFollow(params);
        if (resp.status == 200 && resp.data.code == 'success') {
          this.$message.success('取关成功!');
          this.user.ifFollowing = false;
        }
        else this.$message.error('取关失败!');
      }
      else { // 未关注
        const resp = await updateFollow(params);
        if (resp.status == 200 && resp.data.code == 'success') {
          this.$message.success('关注成功!');
          this.user.ifFollowing = true;
        }
        else this.$message.error('关注失败!');
      }
    },
  },
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
#livePlace {
  font-size: 15px;
}
#buttons {
  margin: 15px 0px 0px 0px;
}
.el-menu--horizontal>.el-menu-item {
  height: 45px;
}
.el-divider {
  margin: 10px;
}
.icon-area {
  width:120px; 
  padding:5px; 
  border-radius:5px; 
  background:#ffffff;
}
</style>