<template>
  <top-nav/>
  <el-row style="margin-top:20px">
    <el-col :offset="3" :span="12" style="margin-right:20px">
      <!-- 个人信息卡片-->
      <el-card style="margin-bottom:20px">
       <el-container direction="horizontal"  style="padding:5px">
         <el-col :span="18">
           <user-icon 
             :size="100" 
             :url="user.userIconUrl" 
             style="cursor:pointer"
           />
           <div id="userName">{{user.userName||"未命名"}}</div>
           <!-- <div id="briefInfo">{{user.briefInfo}}</div> -->
           <!-- <div id="livePlace">所在地：{{user.livePlace}}</div> -->
           <div id="phoneNum">电话：{{user.phoneNum}}</div>
           <div id="age">年龄：{{user.age}}</div>


           <el-container direction="horizontal" id="buttons">
             <el-button v-if="this.user.isSubscribed!==0" @click="deleteFollow">已经关注</el-button>
             <el-button v-else @click="updateFollow">关注</el-button>

           </el-container>
         </el-col>
         <el-col style="margin-top:100px">
           <el-container direction="horizontal" style="cursor:pointer" @click="toEducation">
             <user-icon :size="50"/>
             <h2 style="font-size:18px; margin-left:10px">{{workExperienceList[0].enterprise}}</h2>
           </el-container>
           <el-container direction="horizontal" style="margin-top: 10px; cursor:pointer" @click="toWork">
             <user-icon :size="50"/>
             <h2 style="font-size:18px; margin-left:10px">{{educationExperienceList[0].college}}</h2>
           </el-container>
         </el-col>
       </el-container>
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
        <h1 style="font-size:20px" id="work">工作经历</h1>
        <div v-for="(workExperience,index) in workExperienceList" :key="index">
          <work-experience v-bind="workExperience" style="margin: 10px 10px 10px 10px"/> 
          <el-divider/>
        </div> 
        <h1 style="font-size:20px" id="education">教育经历</h1>
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
import TopNav from '@/components/TopNav'
import UserIcon from '@/components/UserIcon'
import UserRecommendCard from '@/components/UserRecommendCard'
import TweetBriefInfo from '@/components/TweetBriefInfo'
import WorkExperience from '@/components/WorkExperience'
import EducationExperience from '@/components/EducationExperience'
import {getUserInfo,getUserJobBackground,getUserEduBackground} from '@/apis/users.js'
import {updateFollow,deleteFollow,getSelfTweet} from '@/apis/tweet.js'


export default {
  components: {
    TopNav,
    UserIcon,
    UserRecommendCard,
    TweetBriefInfo,
    WorkExperience,
    EducationExperience
  },
  created:async function(){

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
      pageOwnerId:'',
      user: null,
      tweetList:[],
      workExperienceList:[],
      educationExperienceList:[]
    }
  },
  methods: {
   toWork: function(){
     document.getElementById("work").scrollIntoView()
   },
   toEducation: function(){
     document.getElementById("education").scrollIntoView()
   },
   updateFollow:async function(){
     console.log(this.pageOwnerId)
     const resp=await updateFollow({unifiedId:localStorage.getItem('unifiedId')
     ,subscribeId:this.pageOwnerId})
     this.user.isSubscribed=1;
   },
   deleteFollow:async function(){
      console.log(this.pageOwnerId)
     const resp=await deleteFollow({unifiedId:localStorage.getItem('unifiedId')
     ,subscribeId:this.pageOwnerId})
     this.user.isSubscribed=0;
   }
  },
  mounted:async function(){
    this.pageOwnerId=this.$route.params.uid;
    const unifiedId=localStorage.getItem('unifiedId');
    const params={uid:localStorage.getItem('unifiedId'),sid:this.pageOwnerId}
    const resp=await getUserInfo(params);
    this.user=resp.data.data;


    //获取工作经历
    const resp2= await getUserJobBackground({unifiedId});

    this.workExperienceList=resp2.data.data; 

    //获取教育经历
    const resp3=await getUserEduBackground({unifiedId});

    this.EducationExperienceList=resp3.data.data; //教育经历

    //获取动态
    const resp4=await getSelfTweet({visitorId:unifiedId,intervieweeId:this.pageOwnerId,momentId:0});
    console.log(resp4,'resp4=============')
    this.tweetList=resp4.data.data.slice(0,6);
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