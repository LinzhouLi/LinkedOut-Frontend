<template>
  <el-container direction="vertical">
    <el-card>
      <el-input
        id="tweet-input"
        v-model="tweetText"
        :autosize="{ minRows: 2, maxRows: 6 }"
        type="textarea"
        placeholder="发表动态"
      >
      </el-input>
      <el-row>
        <el-col :span="6" v-for="(pic, index) in picList" :key="index">
          <el-container>
            <el-image class="img-preview" :src="pic.url" fit="contain"/>
            <el-icon class="img-cross" @click="removePicture(index)"><close-bold /></el-icon>
          </el-container>
        </el-col>
      </el-row>
      <el-row style="margin-top:10px">
        <el-col :offset="1" :span="3">
          <el-popover placement="bottom" :width="288" trigger="click">
            <template #reference>
              <el-button :icon="Eleme" size="mini" @click="selectEmoji" circle></el-button>
            </template>
            <emoji-picker class="light"></emoji-picker>
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
          <el-button size="mini" @click="uploadTweet">发布</el-button>
        </el-col>
      </el-row>
    </el-card>
    <div v-for="(item,index) in tweetList" :key="index">
      <tweet-disp v-bind="item" style="margin-top:20px" /> 
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
  created() {
    setTimeout(() => {
      this.tweetInput = document.getElementById('tweet-input');
      document.querySelector('emoji-picker').addEventListener('emoji-click', event => {
        // 向文本中添加表情
        let startPos = this.tweetInput.selectionStart;
        let endPos = this.tweetInput.selectionEnd;
        this.tweetText = this.tweetText.substring(0, startPos) + event.detail.unicode + this.tweetText.substring(endPos);
      });
    },50);
    let url = require('@/assets/ADimg.jpg');
    let tweet = {
      userId: 123,
      userName: '张三',
      userType: 'user',
      userIconUrl: '',
      userBriefInfo: '腾讯员工',
      tweetText: '1231231231231212312123123123123',
      tweetPics: [
        url, url, url
      ]
    };
    for(let i = 0; i < 20; i++) {
      this.tweetList.push(tweet);
    }
  },
  data() {
    return {
      tweetList: [],
      picList: [],
      tweetInput: null,
      showEmojiSelector: false,
      tweetText: ''
    }
  },
  methods: {
    selectEmoji: function() {
      this.tweetInput.focus();
    },
    Addpicture: function(file) {
      if(this.picList.length < 3) {
        this.picList.push(file);
      }
      else {
        ElMessage.error('最多上传3张图片!');
      }
      this.$refs.picUploader.clearFiles();
    },
    removePicture: function(index) {
      this.picList.splice(index, 1);
    },
    uploadTweet: function() {
      // TODO
      console.log('upload')
    },
    loadTweets: function() {
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