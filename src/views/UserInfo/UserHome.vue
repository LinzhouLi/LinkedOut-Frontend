<template>
  <!-- 动态 -->
  <el-card style="margin-top:20px">
    <template #header>
      <span style="font-size:18px"><b>动态</b></span>
    </template>
    <el-row>
      <el-col :span="12" v-for="(tweet,index) in tweetList" :key="index" style="width:50%"> 
        <tweet-brief-info v-bind="tweet"/>
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
      <work-experience v-bind="workExperience"/> 
      <el-divider v-if="index!=workExperienceList.length-1" />
    </div>
  </el-card>

  <!-- 教育经历 -->
  <el-card style="margin-top:20px">
    <template #header>
      <span style="font-size:18px"><b>教育经历</b></span>
    </template>
    <div v-for="(educationExperience,index) in educationExperienceList" :key="index">
      <education-experience v-bind="educationExperience"/> 
      <el-divider v-if="index!=educationExperienceList.length-1" />
    </div>
  </el-card>
</template>

<script>
import TweetBriefInfo from '@/components/TweetBriefInfo';
import WorkExperience from '@/components/WorkExperience';
import EducationExperience from '@/components/EducationExperience';
import { getSelfTweet } from '@/apis/tweet.js';
import { getUserJobBackground, getUserEduBackground } from '@/apis/users.js';

export default {
  components: {
    TweetBriefInfo,
    WorkExperience,
    EducationExperience
  },
  data() {
    return {
      tweetList:[],
      workExperienceList:[],
      educationExperienceList:[]
    }
  },
  mounted: async function(){
    const uid = this.$route.params.uid;

    const resp = await getSelfTweet({ // 得到用户动态
      visitorId: localStorage.getItem('unifiedId'),
      intervieweeId: uid
    });
    const tweetData = resp.data.data.slice(0,6);
    for (let item of tweetData) {
      this.tweetList.push({
        tweetId: item.tweetId,
        contents: item.contents,
        tweetPics: item.pictureList,
        praiseNum: item.praiseNum,
        commentNum: item.commentNum
      });
    }

    const resp2 = await getUserJobBackground({ unifiedId: uid });
    const workExpData = resp2.data.data;
    for (let item of workExpData) {
      this.workExperienceList.push({
        workExperienceId: item.numId,
        position: item.positionType,
        startTime: item.startTime,
        endTime: item.endTime,
        description: item.description,
        enterprise: item.enterpriseName,
        picUrl: item.pictureUrl
      });
    }
    
    const resp3 = await getUserEduBackground({ unifiedId: uid });
    const eduExpData = resp3.data.data;
    for (let item of eduExpData) {
      this.educationExperienceList.push({
        educationExperienceId: item.numId,
        college: item.collegeName,
        major: item.major,
        degree: item.degree,
        startTime: item.startTime,
        endTime: item.endTime,
        picUrl: item.pictureUrl
      });
    }
  }
}
</script>

<style scoped>

</style>
