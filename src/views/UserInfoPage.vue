<template>
  <top-nav/>
  <el-row style="margin-top:20px">
    <el-col :offset="3" :span="12" style="margin-right:20px">
      <!-- 个人信息卡片-->
      <el-card style="margin-bottom:20px">
        <user-detailed-card v-bind="user"/>
      </el-card>
      <el-card style="margin-bottom: 20px">
        <h1 style="font-size:20px">动态</h1>
        <el-row>
          <el-col :span="12" v-for="(tweet,index) in tweetList" :key="index" style="width:50%"> 
           <tweet-brief-info v-bind="tweet" style="margin: 10px 10px 10px 10px"/>
          </el-col>
        </el-row>
        <el-button @click="toTweet">
           查看全部动态
        </el-button>
      </el-card>
      <el-card>
        <h1 style="font-size:20px">工作经历</h1>
        <div v-for="(workExperience,index) in workExperienceList" :key="index">
          <work-experience v-bind="workExperience" style="margin: 10px 10px 10px 10px"/> 
          <el-divider/>
        </div> 
        <h1 style="font-size:20px">教育经历</h1>
        <div v-for="(educationExperience,index) in educationExperienceList" :key="index">
          <education-experience v-bind="educationExperience" style="margin: 10px 10px 10px 10px"/> 
          <el-divider/>
        </div>
      </el-card>
    </el-col>

    <el-col :span="5">
      <user-recommend-card/>
    </el-col>
  </el-row>
</template>

<script>
import TopNav from '@/components/TopNav';
import UserRecommendCard from '@/components/UserRecommendCard';
import UserDetailedCard from '@/components/UserDetailedCard'
import TweetBriefInfo from '@/components/TweetBriefInfo'
import WorkExperience from '@/components/WorkExperience'
import EducationExperience from '@/components/EducationExperience'


export default {
  components: {
    TopNav,
    UserRecommendCard,
    UserDetailedCard,
    TweetBriefInfo,
    WorkExperience,
    EducationExperience
  },
  created() {
    this.user = {
      userId: 102,
      userName: '张三',
      userIconUrl: '',
      briefInfo: '同济大学学生',
      livePlace: '上海'
    };
    let url = require('@/assets/ADimg.jpg');
    let tweet = {
      tweetId: 0,   
      tweetText: `# 一级标题一级标题一级标题一级标题
## 二级标题
正文
三四十岁
ssss`,
      tweetPics: [
        url, url, url
      ],
      likeNum: 10,
      commentNum: 20,
    };
    for(let i = 0; i < 6; i++) {
      let t = JSON.parse(JSON.stringify(tweet));
      t.tweetId = Math.floor(Math.random()*10000);
      this.tweetList.push(t);
    }
    let workExperience = {
      workExperienceId: 0,
      position: 'Java开发工程师',
      enterprise: '字节跳动',
      startTime: '2019年7月',
      endTime: '2021年7月',
      description: '负责字节跳动商业变现业务相关后台研发，构建对全客户结构、全流程的管理系统；负责高质量的设计和编码，承担重点、难点的技术攻坚；参与产品讨论和开发实现。'
    };
    for(let i = 0; i < 3; i++) {
      let w = JSON.parse(JSON.stringify(workExperience));
      w.workExperienceId = Math.floor(Math.random()*10000);
      this.workExperienceList.push(w);
    }
    let educationExperience = {
      educationExperienceId: 0,
      college: '同济大学',
      major: '软件工程',
      degree: '本科',
      startTime: '2019年9月',
      endTime: '2023年7月'
    };
    for(let i = 0; i < 3; i++) {
      let e = JSON.parse(JSON.stringify(educationExperience));
      e.educationExperienceId = Math.floor(Math.random()*10000);
      this.educationExperienceList.push(e);
    }
    
  },
  data() {
    return{
      user: null,
      tweetList:[],
      workExperienceList:[],
      educationExperienceList:[]
    }
  },
  methods: {
   
  }
}
</script>

<style scoped>



</style>