<template>
  <el-row>
    <el-col :offset="2" :span="20">
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
      <!-- 动态展示区域 -->
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
          <div v-for="(item,index) in tweetList" :key="index">
            <tweet-disp style="margin-top:20px" v-bind="item" /> 
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
    </el-col>
  </el-row>
</template>

<script>
import TweetDisp from '@/components/TweetDisp';
import { Loading, RefreshRight } from '@element-plus/icons';
import PostTweet from '@/components/PostTweet';
import {getSelfTweet} from '@/apis/tweet.js'

let url = require('@/assets/ADimg.jpg');
let tweet = {
  tweetId: 0,
  userId: 123,
  userName: '张三',
  userType: 'user',
  userIconUrl: '',
  userBriefInfo: '腾讯员工',
  tweetText: `# s
🥶sdas
123123
**asdva**
### s`,
  tweetPics: [
    url, url, url
  ],
  likeNum: 10,
  isLiked: false,
  commentNum: 20,
};

export default {
  components: {
    TweetDisp,
    PostTweet,
    Loading,
    RefreshRight
  },
  created() {
    this.reloadInitialTweets();
  },
  mounted() {
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
      picList: [],
      tweetInputDom: null,
      showEmojiSelector: false,
      tweetText: '',
      cid:'',
    }
  },
  methods: {
    reloadInitialTweets:async function() { // 加载初始动态
      this.tweetList = []; // 清空动态列表
      // this.loadAll = false;
      this.loadingInitialTweets = true; // 开始加载

    this.cid=this.$route.params.cid;
      
    const resp2=await getSelfTweet({
      visitorId:localStorage.getItem('unifiedId'),
      intervieweeId:this.cid,
      momentId:0,
    })

    const datas2=resp2.data.data;
    this.tweetList=datas2;
    this.loadingInitialTweets=false;
    console.log(this.tweetList,'12321321321')
    
// commentNum: 9
// contents: "测试"
// like_state: 0
// praiseNum: 2
// recordTime: "2019-09-09T03:20:20.000+0000"
// state: 1
// tweetId: 4
// unifiedId: 1
    },

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