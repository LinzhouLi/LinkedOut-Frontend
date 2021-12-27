<template>
  <el-card style="margin-top:20px">
    <template #header>
      <span style="font-size:18px"><b>关于</b></span>
    </template>
    <div style="margin-top:5px"><span id="text-area" style="height:210px"/></div>
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
        <tweet-brief-info v-bind="tweet" style="margin:10px"/>
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
        <recruitment-brief-info v-bind="recruitment" style="margin:10px"/>
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
import {getEnterpriseInfo} from '@/apis/users.js'
import {getSelfTweet} from '@/apis/tweet.js'
import {getCompanyAllPosition} from '@/apis/recruit.js'


export default {
  components:{
    TweetBriefInfo,
    RecruitmentBriefInfo
  },
  created:async function(){
    this.companyDescription = `
## 概览
Inspire creativity, enrich life.

ByteDance is a technology company operating a range of content platforms that inform, educate, entertain and inspire people across languages, cultures, and geographies.

Dedicated to building global platforms of creation and interaction, ByteDance now has a portfolio of applications available in over 150 markets and 75 languages. For example, TikTok, Helo, Vigo Video, Douyin, and Huoshan.

ByteDance's platforms aim to help users explore and discover the world's creativity, knowledge and moments that matter in everyday life while empowering everyone to be a creator directly from their smartphones. We are committed to building a safe, healthy and positive online environment for all our users.

We welcome people from all backgrounds to join us. If tackling challenges in a fast-changing industry does not scare you, work with us and challenge yourself to move the world!
## 公司网站
https://job.bytedance.com/en/#/
## 公司规模
10001+人
## 公司总部
China,China
## 创立时间
2012
`
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
    let recruitment = {
      recruitmentId: 3491,
      userId: 123,
      userIconUrl: '',
      recruitmentTitle: 'xxx前端开发工程师',
      limit:'上海·1~3年·本科'
    };
    for(let i= 0; i < 6;i++) {
      let r =JSON.parse(JSON.stringify(recruitment));
      this.recruitmentList.push(r);
    }
  },
  mounted:async function() {
    this.tweetList=[];
    this.cid=this.$route.params.cid;
    const params={
      uid:localStorage.getItem('unifiedId'),
      sid:this.cid,
    }
    const resp=await getEnterpriseInfo(params);
    const datas=resp.data.data;

    const resp2=await getSelfTweet({
      visitorId:localStorage.getItem('unifiedId'),
      intervieweeId:this.cid,
      momentId:0,
    })

    const datas2=resp2.data.data;

    const resp3=await getCompanyAllPosition({unifiedId:this.cid});
    const data3=resp3.data.data;

    this.companyDescription=datas.description;
    this.tweetList=datas2.slice(0,6);
    this.recruitmentList=data3;

    VditorPreview.preview(document.getElementById('text-area'), this.companyDescription);
  },
  data(){
    return{
      companyDescription: '',
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