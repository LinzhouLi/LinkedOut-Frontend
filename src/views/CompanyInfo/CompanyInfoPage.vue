<template>
  <top-nav/>
  <el-row style="margin-top:20px">
    <el-col :sm="{ offset: 3, span: 12 }" style="margin-right:20px">
      <!-- 公司信息卡片-->
      <el-card :body-style="{ padding: 0 }">

        <el-image :src="user.backgroundUrl" style="height:150px; width:100%; margin-bottom:-20px">
          <template #error>
            <img :src="defaultBackground" style="width:100%; height:150px" />
          </template>
        </el-image>

        <el-row style="padding:0px 20px 20px 20px">
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
              <el-col :span="19">

                <el-container direction="vertical" style="margin-left:20px">
                  <div id="userName">{{ user.userName }}</div>
                  <div id="briefInfo">{{ user.briefInfo }}</div>
                  <div style="display:flex">
                    <el-icon :size="16"><connection /></el-icon>
                    <div style="font-size: 13px">
                      官方网站:&nbsp;
                      <a :href="`https://${user.contactWay}`">{{ user.contactWay }}</a>
                    </div>
                  </div>
                </el-container>

              </el-col>
              <el-col :span="5">

                <el-button
                  v-show="!isSelf"
                  :type="buttonType(user.ifFollowing)"
                  @click="follow(index)"
                  style="width:76px; padding:0px"
                >
                  {{ buttonText(user.ifFollowing) }}
                </el-button>

                <div @click="showFans = true" class="fans-text">
                  关注者 &nbsp;
                  <b>{{ user.fansNum }}</b>
                </div>

                <div @click="showFollowing = true" class="fans-text">
                  关注了 &nbsp;
                  <b>{{ user.followingNum }}</b>
                </div>

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
          <el-menu-item :index="`/companyinfo/${userId}/home`">         
            首页
          </el-menu-item>
          <el-menu-item :index="`/companyinfo/${userId}/description`">
            关于
          </el-menu-item>
          <el-menu-item :index="`/companyinfo/${userId}/tweets`">
            动态
          </el-menu-item>
          <el-menu-item :index="`/companyinfo/${userId}/recruitments`">
            职位
          </el-menu-item>
        </el-menu>
      </el-card>

      <router-view />
    
    </el-col>
    <!-- 页面左部 -->
    <el-col :sm="5" :xs="0">
      <user-recommend-card :ifFooter="false" />
    </el-col>
  </el-row>
  <page-footer/>

  <fans-dialog :unifiedId="userId" :visible="showFans" @close="showFans=false" />
  <following-dialog :unifiedId="userId" :visible="showFollowing" @close="showFollowing=false" />
</template>

<script>
import TopNav from '@/components/TopNav';
import UserRecommendCard from '@/components/UserRecommendCard';
import CompanyInfoCard from '@/components/CompanyInfoCard';
import UserIcon from '@/components/UserIcon.vue';
import { Connection } from '@element-plus/icons';
import PageFooter from '@/components/PageFooter.vue';
import { getEnterpriseInfo } from '@/apis/users.js'
import { updateFollow, deleteFollow } from '@/apis/tweet.js';
import FansDialog from '@/components/FansDialog.vue';
import FollowingDialog from '@/components/FollowingDialog.vue';


export default {
  components: {
    UserIcon,
    Connection,
    TopNav,
    UserRecommendCard,
    CompanyInfoCard,
    PageFooter,
    FollowingDialog,
    FansDialog
  },
  created() {
    this.currentMenu = this.$route.path;
    this.userId = Number(this.$route.params['cid']); // 获取页面参数
    this.isSelf = localStorage.getItem('unifiedId') == this.userId;
  },
  mounted: async function(){
    const params = {
      uid: localStorage.getItem('unifiedId'),
      sid: this.userId,
    }
    const resp = await getEnterpriseInfo(params);

    const companyData = resp.data.data;
    
    this.user = {
      unifiedId: companyData.unifiedId,
      userName: companyData.trueName || '匿名用户',
      briefInfo: companyData.briefInfo || '',
      userIconUrl: companyData.pictureUrl,
      contactWay: companyData.contactWay,
      ifFollowing: companyData.isSubscribed,
      backgroundUrl: companyData.background,
      fansNum: companyData.fansNum,
      followingNum: companyData.followNum
    }
  },
  data() {
    return{
      showFans: false,
      showFollowing: false,
      currentMenu: '',
      user: { },
      userId: '',
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
.el-menu--horizontal>.el-menu-item {
  height: 45px;
}
.icon-area {
  width:120px; 
  padding:5px; 
  border-radius:5px; 
  background:#ffffff;
}
.fans-text {
  margin: 5px 0px 5px 5px;
  cursor: pointer;
  font-size: 14px;
  color: rgb(122, 122, 122);
}
.fans-text:hover {
  color: #409eff;
}
</style>