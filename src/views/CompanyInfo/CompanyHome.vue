<template>
  <el-card style="margin-top:20px">
    <template #header>
      <span style="font-size:18px"><b>关于</b></span>
    </template>
    <div style="margin-top:5px"><span id="text-area"/></div>
    <el-row justify="start">
      <el-button type="text" class="button" @click="toDescription">查看全部信息</el-button>
    </el-row>
  </el-card>
  <el-card style="margin-top:20px">
    <template #header>
      <span style="font-size:18px"><b>动态</b></span>
    </template>
    <el-row>
      <el-col :span="12" v-for="(tweet,index) in tweetList" :key="index" style="width:50%"> 
        <tweet-brief-info v-bind="tweet"/>
      </el-col>
    </el-row>
    <el-row justify="start">
      <el-button type="text" class="button" @click="toTweet">查看全部动态</el-button>
    </el-row>
  </el-card>  
   <el-card style="margin-top:20px">
    <template #header>
      <span style="font-size:18px"><b>职位</b></span>
    </template>
    <el-row>
      <el-col :span="12" v-for="(recruitment,index) in recruitmentList" :key="index" style="width:50%">
        <div style="padding:5px">
          <recruitment-brief-info v-bind="recruitment"/>
        </div>
      </el-col>
    </el-row>
    <el-row justify="start">
      <el-button type="text" class="button" @click="toRecruitment">查看全部职位</el-button>
    </el-row>
  </el-card>
</template>

<script>
import VditorPreview from 'vditor/dist/method.min';
import '@/assets/vditor.css';
import TweetBriefInfo from '@/components/TweetBriefInfo'
import RecruitmentBriefInfo from '@/components/RecruitmentBriefInfo'
import { getEnterpriseInfo } from '@/apis/users.js'
import { getSelfTweet } from '@/apis/tweet.js'
import { getCompanyAllPosition } from '@/apis/recruit.js'


export default {
  components:{
    TweetBriefInfo,
    RecruitmentBriefInfo
  },
  mounted:async function() {
    this.tweetList = [];
    const cid = this.$route.params.cid;

    const resp = await getEnterpriseInfo({ // 得到企业详情
      uid: localStorage.getItem('unifiedId'),
      sid: cid
    });
    const companyDescription = resp.data.data.description;
    const textDom = document.getElementById('text-area')
    VditorPreview.preview(textDom, companyDescription, {
      after: () => { // 限制信息区域高度
        if (textDom.clientHeight > 210) textDom.style.height = '210px';
      }
    });

    const resp2 = await getSelfTweet({ // 得到企业个人动态
      visitorId: localStorage.getItem('unifiedId'),
      intervieweeId: cid
    });
    const tweetData = resp2.data.data.slice(0,6);
    for (let item of tweetData) {
      this.tweetList.push({
        tweetId: item.tweetId,
        contents: item.contents,
        tweetPics: item.pictureList,
        praiseNum: item.praiseNum,
        commentNum: item.commentNum
      })
    }

    const resp3 = await getCompanyAllPosition({ unifiedId: cid }); // 得到企业岗位
    const recruitmentData = resp3.data.data.slice(0,6);
    for (let item of recruitmentData) {
      this.recruitmentList.push({
        recruitmentId: item.jobId,
        userId: item.unifiedId,
        userIconUrl: item.pictureUrl,
        recruitmentTitle: item.jobName,
        recruitmentType: item.positionType
      })
    }
  },
  data(){
    return{
      tweetList: [],
      recruitmentList: []
    }
  },
  methods:{
    toDescription:function(){
      this.$router.push({ path:'description' })
    },
    toTweet: function(){
      this.$router.push({ path:'tweets' })
    },
    toRecruitment: function(){
      this.$router.push({ path:'recruitments' })
    }
  }
}
</script>

<style>
#text-area{
  word-break:normal; 
  width:auto; 
  display:block; 
  white-space:pre-wrap;
  word-wrap : break-word ;
  overflow: hidden ;
  text-overflow: ellipsis;
  line-break: auto;
}
.button {
  padding-left: 5px;
  padding-bottom: 0px;
}
</style>