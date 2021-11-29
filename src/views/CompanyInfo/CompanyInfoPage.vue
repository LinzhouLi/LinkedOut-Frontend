<template>
  <top-nav/>
  <el-row style="margin-top:20px">
    <el-col :offset="3" :span="12" style="margin-right:20px">
      <!-- 公司信息卡片-->
      <el-card>
        <company-info-card v-bind="user"/>
      </el-card>

      <!-- 详情、动态、在招职位卡片 -->
     
     
          <el-menu 
            default-active="activeMenuIndex"
            :ellipsis="false"
            mode="horizontal"
            router
          >
            <el-menu-item :index=this.companyHomeUrl>         
              首页
            </el-menu-item>
            <el-menu-item :index=this.companyDescriptionUrl>
              关于
            </el-menu-item>
            <el-menu-item :index=this.companyTweetUrl>
              动态
            </el-menu-item>
            <el-menu-item :index=this.companyRecruitmentUrl>
              在招职位
            </el-menu-item>
          </el-menu>
          
   
      
        <router-view/>
     
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
    this.companyHomeUrl='/companyInfo/'+this.userId.toString()+'/companyHome'
    this.companyDescriptionUrl='/companyInfo/'+this.userId.toString()+'/companyDescription'
    this.companyTweetUrl='/companyInfo/'+this.userId.toString()+'/companyTweet'
    this.companyRecruitmentUrl='/companyInfo/'+this.userId.toString()+'/companyRecruitment'
  },
  data() {
    return{
      companyDescription:'',
      user: null,
      userId: 0,
      companyHomeUrl: '',
      companyDescriptionUrl: '',
      companyTweetUrl:'',
      companyRecruitmentUrl: ''
    }
  },
  methods: {
    loadTweets: function() {
      console.log(1)
    }
  }
}
</script>

<style scoped>

#logo-area {
  padding-top: 10px;
}
#menu-area {
  padding-top: 0px;
}


</style>