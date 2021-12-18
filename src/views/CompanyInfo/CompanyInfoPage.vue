<template>
  <top-nav/>
  <el-row style="margin-top:20px">
    <el-col :offset="3" :span="12" style="margin-right:20px">
      <!-- 公司信息卡片-->
      <el-card :body-style="{ padding: 0 }" style="margin-bottom:20px">
        <el-row style="padding:20px">
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
            </el-row>
          </el-col>
          <el-col :span="3">
            <el-button>关注</el-button>
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
          <el-menu-item :index="`/companyInfo/${userId}/companyHome`">         
            首页
          </el-menu-item>
          <el-menu-item :index="`/companyInfo/${userId}/companyDescription`">
            关于
          </el-menu-item>
          <el-menu-item :index="`/companyInfo/${userId}/companyTweet`">
            动态
          </el-menu-item>
          <el-menu-item :index="`/companyInfo/${userId}/companyRecruitment`">
            在招职位
          </el-menu-item>
        </el-menu>
      </el-card>

      <router-view />
    
    </el-col>
    <!-- 页面左部 -->
    <el-col :span="5">
      <user-recommend-card :ifFooter="false" />
    </el-col>
  </el-row>
  <page-footer/>
</template>

<script>
import TopNav from '@/components/TopNav';
import UserRecommendCard from '@/components/UserRecommendCard';
import CompanyInfoCard from '@/components/CompanyInfoCard';
import UserIcon from '@/components/UserIcon.vue';
import { Connection } from '@element-plus/icons';
import PageFooter from '@/components/PageFooter.vue';


export default {
  components: {
    UserIcon,
    Connection,
    TopNav,
    UserRecommendCard,
    CompanyInfoCard,
    PageFooter
  },
  created() {
    this.user = {
      userId: 101,
      userName: '字节跳动',
      userIconUrl: '',
      briefInfo: '互联网企业',
      contactWay: 'www.bytedance.com',
      email: 'zijietiaodong@email.com',
      ifFollow: false
    },
    this.currentMenu = this.$route.path;
    this.userId = this.$route.params['cid']; // 获取页面参数
  },
  data() {
    return{
      currentMenu: '',
      companyDescription:'',
      user: null,
      userId: 0,
    }
  },
  watch: {
    $route(e) {
      this.currentMenu = e.path;
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
.el-menu--horizontal>.el-menu-item {
  height: 45px;
}
</style>