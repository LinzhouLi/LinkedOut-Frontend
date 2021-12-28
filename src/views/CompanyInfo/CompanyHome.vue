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
    })

    const datas2=resp2.data.data;

    const resp3=await getCompanyAllPosition({unifiedId:this.cid});
    const data3=resp3.data.data;

    this.companyDescription=datas.description;
    this.tweetList=datas2.slice(0,6);
    // this.recruitmentList=data3;
    this.recruitmentList=[];
    let newList=[];
    console.log(data3,'12321312')
    data3.forEach((item)=>{
      // newList.push({
      //     recruitmentId: item.jobId,
      //     userId: item.unifiedId,
      //     userIconUrl: item.pictureUrl,
      //     recruitmentTitle: item.jobName,
      //     limited:20,
      //   })
      item.recruitmentId=item.jobId;
      item.userId=item.unifiedId;
      item.userIconUrl=item.pictureUrl;
      item.recruitmentTitle=item.jobName;
      item.limit=item.positionType;
    })

    this.recruitmentList=data3.slice(0,6);

    // this.recruitmentList=newList;

      //     const recruitmentsData  = resp.data.data;
      // for (let item of recruitmentsData) {

      // }
    console.log(this.recruitmentList,this.tweetList,'21312312312321')

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