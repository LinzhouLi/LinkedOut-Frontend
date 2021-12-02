<template>
  <top-nav/>
  <el-row style="margin-top:20px">
    <el-col :offset="3" :span="12" style="margin-right:20px">
      <!-- 公司信息卡片-->
      <el-card>
        <company-info-card v-bind="user"/>
      </el-card>

      <!-- 详情、动态、在招职位卡片 -->
     
        <el-affix offset="63">
          <el-menu 
            default-active="activeMenuIndex"
            :ellipsis="false"
            mode="horizontal"
            style="margin:0px 0px 20px"
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
          
        </el-affix>
      
        <router-view />
     
    </el-col>
    <!-- 页面左部 -->
    <el-col :span="5">
      <user-recommend-card/>
    </el-col>
  </el-row>
</template>

<script>
import TopNav from '@/components/TopNav';
import UserRecommendCard from '@/components/UserRecommendCard';
import CompanyInfoCard from '@/components/CompanyInfoCard'


export default {
  components: {
    TopNav,
    UserRecommendCard,
    CompanyInfoCard
  },
  created() {
    this.user = {
      userId: 101,
      userName: '字节跳动',
      userIconUrl: '',
      briefInfo: '互联网企业',
      contactWay: 'www.bytedance.com',
      email: 'zijietiaodong@email.com'
    },
    this.userId=101
  
  },
  data() {
    return{
      companyDescription:'',
      user: null,
      userId: 0,
      
    }
  },
  methods: {
   
  }
}
</script>

<style scoped>



</style>