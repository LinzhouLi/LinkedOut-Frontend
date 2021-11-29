<template>
  <el-container direction="vertical">
    <!-- 用户发布动态区域 -->
    <post-tweet/>
    <!-- 关注者动态展示区域 -->
    <div v-for="(item,index) in tweetList" :key="index">
      <tweet-disp v-bind="item" /> 
    </div>
  </el-container>
</template>

<script>
import PostTweet from '@/components/PostTweet';
import TweetDisp from '@/components/TweetDisp';

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
    PostTweet
  },
  created() {
    this.loadMoreTweets();
  },
  mounted() {
    window.onscroll = () => {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 距离顶部的距离
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight; // 可视区的高度
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight; // 滚动条的总高度
      console.log( scrollTop, windowHeight, scrollHeight )
      if(scrollTop + windowHeight >= scrollHeight){ // 加载更多动态
        if(!this.loadingMoreTweets) {
          this.loadMoreTweets();
        }
      } 
    }
  },
  data() {
    return {
      loadingMoreTweets: true,
      tweetList: [],
    }
  },
  methods: {
    loadMoreTweets: function() { // 加载更多动态
      this.loadingMoreTweets = true; // 开始加载
      // TODO
      for(let i = 0; i < 6; i++) {
        let t = JSON.parse(JSON.stringify(tweet));
        t.tweetId = Math.floor(Math.random()*10000);
        this.tweetList.push(t);
      }
      this.loadingMoreTweets = false; // 加载结束
    }
  }
}
</script>

<style scoped>

</style>