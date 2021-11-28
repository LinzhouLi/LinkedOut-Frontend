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

export default {
  components: {
    TweetDisp,
    PostTweet
  },
  created() {
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
    for(let i = 0; i < 20; i++) {
      let t = JSON.parse(JSON.stringify(tweet));
      t.tweetId = Math.floor(Math.random()*10000);
      this.tweetList.push(t);
    }
  },
  data() {
    return {
      tweetList: [],
    }
  },
  methods: {
    loadTweets: function() { // 加载更多动态
      // TODO
      console.log(1)
      // let url = require('@/assets/ADimg.jpg');
      // let tweet = {
      //   userId: 123,
      //   userName: '张三',
      //   userType: 'user',
      //   userIconUrl: '',
      //   userBriefInfo: '腾讯员工',
      //   tweetText: '1231231231231212312123123123123',
      //   tweetPics: [
      //     url, url, url
      //   ]
      // };
      // for(let i = 0; i < 5; i++) {
      //   this.tweetList.push(tweet);
      // }
    }
  }
}
</script>

<style scoped>

</style>