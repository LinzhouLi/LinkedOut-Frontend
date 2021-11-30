<template>
  <el-container direction="vertical">
    <!-- 用户发布动态区域 -->
    <el-card>
      <!-- 输入发布动态的文字内容 -->
      <el-input
        id="tweet-input"
        v-model="tweetText"
        :autosize="{ minRows: 2, maxRows: 6 }"
        type="textarea"
        placeholder="发表动态"
      >
      </el-input>
      <!-- 图片预览区 -->
      <el-row>
        <el-col :span="6" v-for="(pic, index) in picList" :key="index">
          <el-container>
            <el-image class="img-preview" :src="pic.url" fit="contain"/>
            <el-icon class="img-cross" @click="removePicture(index)"><close-bold /></el-icon>
          </el-container>
        </el-col>
      </el-row>
      <!-- 发布动态卡片底部 选择图片/表情/发表按钮 -->
      <el-row style="margin-top:10px">
        <el-col :offset="1" :span="3">
          <el-popover placement="bottom" :width="288" trigger="click">
            <template #reference>
              <el-button :icon="Eleme" size="mini" @click="selectEmoji" circle></el-button>
            </template>
            <emoji-picker class="light" id="tweet-emoji-picker"></emoji-picker>
          </el-popover>
        </el-col>
        <el-col :span="3">
          <el-popover placement="bottom" :width="146" trigger="click">
            <template #reference>
              <el-button :icon="PictureFilled" size="mini" circle></el-button>
            </template>
            <el-upload
              action=""
              ref="picUploader"
              list-type="picture-card"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="Addpicture"
            >
              <el-icon><plus /></el-icon>
            </el-upload>
          </el-popover>
        </el-col>
        <el-col :offset="13" :span="4">
          <el-button size="mini" @click="uploadTweet">
            发布
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <div v-for="(item,index) in tweetList" :key="index">
      <tweet-disp v-bind="item" /> 
    </div>
  </el-container>
</template>

<script>
import 'emoji-picker-element';
import { Eleme, PictureFilled, Plus, CloseBold } from '@element-plus/icons';
import { ElMessage } from 'element-plus';
import TweetDisp from '@/components/TweetDisp';

export default {
  components: {
    Eleme,
    PictureFilled,
    Plus,
    CloseBold,
    ElMessage,
    TweetDisp
  },
  setup() {
    return {
      Eleme,
      PictureFilled,
      Plus
    }
  },
  mounted() {
    this.tweetInputDom = document.getElementById('tweet-input');
    document.getElementById('tweet-emoji-picker').addEventListener('emoji-click', event => {
      // 向文本中添加表情
      this.tweetInputDom.focus();
      let startPos = this.tweetInputDom.selectionStart;
      let endPos = this.tweetInputDom.selectionEnd;
      this.tweetText = this.tweetText.substring(0, startPos) + event.detail.unicode + this.tweetText.substring(endPos);
    });
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
      picList: [],
      tweetInputDom: null,
      showEmojiSelector: false,
      tweetText: '',
    }
  },
  methods: {
    selectEmoji: function() { // 选中动态内容输入区emoji
      this.tweetInputDom.focus();
    },
    Addpicture: function(file) { // 添加预览图片
      if(this.picList.length < 3) {
        this.picList.push(file);
      }
      else {
        ElMessage.error('最多上传3张图片!');
      }
      this.$refs.picUploader.clearFiles();
    },
    removePicture: function(index) { // 删除预览图片
      this.picList.splice(index, 1);
    },
    uploadTweet: function() { // 上传动态
      // TODO
      console.log('upload')
    },
    loadTweets: function() { // 加载关注者动态
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
emoji-picker {
  --emoji-size: 1rem;
}
.img-preview {
  margin: 10px 5px 10px 10px;
}
.img-cross {
  margin-top:10px;
}
.img-cross:hover {
  color: #409eff;
  margin-top:10px;
}
</style>