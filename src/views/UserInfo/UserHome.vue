<template>
  <!-- 动态 -->
  <el-card style="margin-top:20px">
    <template #header>
      <span style="font-size:18px"><b>动态</b></span>
    </template>
    <el-row>
      <el-col :span="12" v-for="(tweet,index) in tweetList" :key="index" style="width:50%"> 
        <tweet-brief-info v-bind="tweet" style="margin: 10px 10px 10px 10px"/>
      </el-col>
    </el-row>
    <el-button type="text" @click="$router.push({ path:'tweets' })">
        查看全部动态
    </el-button>
  </el-card>

  <!-- 工作经历 -->
  <el-card style="margin-top:20px">
    <template #header>
      <span style="font-size:18px"><b>工作经历</b></span>
    </template>
    <div v-for="(workExperience,index) in workExperienceList" :key="index">
      <work-experience v-bind="workExperience" style="margin: 10px"/> 
      <el-divider v-if="index!=workExperienceList.length-1" />
    </div>
  </el-card>

  <!-- 教育经历 -->
  <el-card style="margin-top:20px">
    <template #header>
      <span style="font-size:18px"><b>教育经历</b></span>
    </template>
    <div v-for="(educationExperience,index) in educationExperienceList" :key="index">
      <education-experience v-bind="educationExperience" style="margin: 10px"/> 
      <el-divider v-if="index!=educationExperienceList.length-1" />
    </div>
  </el-card>
</template>

<script>
import TweetBriefInfo from '@/components/TweetBriefInfo';
import WorkExperience from '@/components/WorkExperience';
import EducationExperience from '@/components/EducationExperience';
import {getSelfTweet} from '@/apis/tweet.js';
import {getUserJobBackground,getUserEduBackground} from '@/apis/users.js';
export default {
  components: {
    TweetBriefInfo,
    WorkExperience,
    EducationExperience
  },
  created() {
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
    this.userId = this.$route.params['uid']; // 获取页面参数
  },
  data() {
    return {
      uid: 0,
      tweetList:[],
      workExperienceList:[],
      educationExperienceList:[]
    }
  },
  mounted:async function(){

    this.uid=this.$route.params.uid;
    this.tweetList=[];
    const params={
      visitorId:localStorage.getItem('unifiedId'),
      intervieweeId:this.$route.params.uid,
    }
    const resp=await getSelfTweet(params);
    this.tweetList=resp.data.data.slice(0,6);

    const resp2=await getUserJobBackground({unifiedId:this.uid});
    const resp3=await getUserEduBackground({unifiedId:this.uid});

    this.workExperienceList=resp2.data.data;

    this.educationExperienceList=resp3.data.data;
    console.log(resp,'13213902103?')
  }
}
</script>

<style scoped>

</style>
