<template>
  <el-container direction="vertical">
    <!-- 用户发布动态区域 -->
    <post-tweet @update-tweets="reloadInitialTweets"/>
    <!-- 分割线 -->
    <el-row style="margin-bottom: -20px;">
      <el-col :offset="1" :span="19">
        <el-divider style="margin: 18px 0px;"/>
      </el-col>
      <el-col :span="4">
        <div 
          class="refresh-div"
          @click="reloadInitialTweets" 
          style="margin:8px 10px 0px; display: flex;"
        >
          <el-icon :size="20"><refresh-right /></el-icon>
          <div>刷新</div>
        </div>
      </el-col>
    </el-row>
    <!-- 关注者动态展示区域 -->
    <el-skeleton :loading="loadingInitialTweets" animated :count="1">
      <!-- 加载状态骨架屏 -->
      <template #template>
        <el-card style="margin-top: 20px">
          <el-skeleton-item style="width:60%" />
          <el-skeleton-item/>
          <el-skeleton-item/>
          <el-skeleton-item style="width:30%"/>
          <el-skeleton-item variant="image" style="height:300px; margin-top:15px;" />
        </el-card>
      </template>
      <!-- 加载完成的动态 -->
      <template #default>
        <div v-for="(item,index) in tweetList" :key="index" style="margin-top:20px" >
          <tweet-disp 
            v-if="item.type=='tweet'"
            @update-tweets="reloadInitialTweets" 
            v-bind="item" 
          /> 
          <recruitment-disp 
            v-if="item.type=='position'" 
            @update-after-del="reloadInitialTweets"
            v-bind="item" 
          />
        </div>
      </template>
    </el-skeleton>
    <!-- 没有动态时的页面底部 -->
    <div v-if="loadAll">
      <el-divider style="margin: 15px 0px;" />
      <div 
        class="refresh-div" 
        @click="reloadInitialTweets"
        style="margin: 20px 0px"
      >
      没有更多动态了, 点击刷新 :)
      </div>
    </div>
    <!-- 正在加载更多动态时的页面底部 -->
    <div v-if="loadingMoreTweets">
      <el-row justify="center" style="margin: 20px 0px;">
        <el-icon :size="20" class="is-loading"><loading /></el-icon>
      </el-row>
    </div>
  </el-container>
</template>

<script>
import 'emoji-picker-element';
import TweetDisp from '@/components/TweetDisp';
import { Loading, RefreshRight } from '@element-plus/icons';
import PostTweet from '@/components/PostTweet';
import { getOtherTweet } from '@/apis/tweet.js';
import RecruitmentDisp from '@/components/RecruitmentDisp';

export default {
  components: {
    TweetDisp,
    PostTweet,
    Loading,
    RefreshRight,
    RecruitmentDisp
  },
  created() {
    this.reloadInitialTweets();
  },
  mounted:async function(){
    window.onscroll = () => {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 距离顶部的距离
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight; // 可视区的高度
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight; // 滚动条的总高度
      if(scrollTop + windowHeight >= scrollHeight){ // 滚动条滚动至底部
        if(!this.loadingInitialTweets && !this.loadingMoreTweets && !this.loadAll) { // 不能正在加载或已加载结束
          this.loadMoreTweets();
        }
      } 
    }
  },
  data() {
    return {
      loadingInitialTweets: true, // 是否正在加载初始动态
      loadingMoreTweets: false, // 是否正在加载更多动态
      loadAll: false, // 是否加载结束
      tweetList: [],
    }
  },
  methods: {
    reloadInitialTweets:async function() { // 加载初始动态
      this.tweetList = []; // 清空动态列表
      this.loadAll = false;
      this.loadingInitialTweets = true; // 开始加载

      const params= { unifiedId: localStorage.getItem("unifiedId")}
      const resp = await getOtherTweet(params);

      const tweetData = resp.data.data;
      if (tweetData.length == 0) { // 没有动态则加载完毕
        this.loadAll = true;
        this.loadingInitialTweets = false;
        return;
      }
      for (let item of tweetData) {
        if (item.type == 'tweet') {
          this.tweetList.push({
            type: 'tweet',
            tweetId: item.tweetId,
            unifiedId: item.simpleUserInfo.unifiedId,
            userName: item.simpleUserInfo.trueName,
            userType: item.simpleUserInfo.userType,
            userIconUrl: item.simpleUserInfo.pictureUrl,
            userBriefInfo: item.simpleUserInfo.briefInfo,
            praiseNum: item.praiseNum,
            likeState: item.likeState == 0 ? false : true,
            commentNum: item.commentNum,
            contents: item.contents,
            pictureList: item.pictureList,
            recordTime: item.recordTime
          });
        }
        else if (item.type == 'position') {
          this.tweetList.push({
            type: 'position',
            recruitmentId: item.jobId,
            unifiedId: item.simpleUserInfo.unifiedId,
            userName: item.simpleUserInfo.trueName,
            userType: item.simpleUserInfo.userType,
            userIconUrl: item.simpleUserInfo.pictureUrl,
            userBriefInfo: item.simpleUserInfo.briefInfo,
            recruitmentTitle: item.jobName,
            recruitmentType: item.positionType,
            salary: item.reward,
            recordTime: item.recordTime
          });
        }
      }

      this.loadingInitialTweets = false;
    },
    loadMoreTweets:async function() { // 加载更多动态
      this.loadingMoreTweets = true; // 开始加载

      const params = { 
        unifiedId: localStorage.getItem("unifiedId"),
        momentId: this.tweetList[this.tweetList.length-1].tweetId,
        type: this.tweetList[this.tweetList.length-1].type
      }
      const resp = await getOtherTweet(params);
      const tweetData = resp.data.data;

      if (tweetData.length === 0) { // 没有动态则加载完毕
        this.loadAll = true;
        this.loadingMoreTweets = false;
        return;
      }

      if (tweetData.length > 0) {
        for (let item of tweetData) {
          if (item.type == 'tweet') {
            this.tweetList.push({
              type: 'tweet',
              tweetId: item.tweetId,
              unifiedId: item.simpleUserInfo.unifiedId,
              userName: item.simpleUserInfo.trueName,
              userType: item.simpleUserInfo.userType,
              userIconUrl: item.simpleUserInfo.pictureUrl,
              userBriefInfo: item.simpleUserInfo.briefInfo,
              praiseNum: item.praiseNum,
              likeState: item.likeState == 0 ? false : true,
              commentNum: item.commentNum,
              contents: item.contents,
              pictureList: item.pictureList,
              recordTime: item.recordTime
            });
          }
          else if (item.type == 'position') {
            this.tweetList.push({
              type: 'position',
              recruitmentId: item.jobId,
              unifiedId: item.simpleUserInfo.unifiedId,
              userName: item.simpleUserInfo.trueName,
              userType: item.simpleUserInfo.userType,
              userIconUrl: item.simpleUserInfo.pictureUrl,
              userBriefInfo: item.simpleUserInfo.briefInfo,
              recruitmentTitle: item.jobName,
              recruitmentType: item.positionType,
              salary: item.reward,
              recordTime: item.recordTime
            });
          }
        }
      }
      
      this.loadingMoreTweets = false;
    }
  }
}
</script>

<style scoped>
.refresh-div {
  font-size: 14px;
  color: rgb(122 122 122);
  align-items: center;
  text-align: center;
  cursor: pointer;
}
.refresh-div:hover {
  color: #409eff;
}
</style>