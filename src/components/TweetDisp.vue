<template>
  <el-card style="margin-top:20px">
    <!-- 动态卡片头部 -->
    <template #header>
      <div style="padding:10px;">
        <user-brief-disp v-bind="user" />
      </div>
    </template>
    <!-- 动态文字与照片 -->
    <div>
      <div style="padding:5px 15px;"><span :id="`text-area-${tweetId}`"/></div>
      <el-carousel :autoplay="false">
        <el-carousel-item v-for="(picUrl,index) in tweetPics" :key="index">
          <el-image :src="picUrl" style="width:100%;" fit="cover" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="tweet-time">
      发表于{{  }}
    </div>
    <el-divider style="margin: 0px;" />
    <!-- 卡片底部 点赞/评论/分享 -->
    <el-row style="margin:5px">
      <el-col :span="8">
        <div class="tweet-icon" :id="`like-icon-${tweetId}`" @click="likeTweet" >
          <el-icon :size="20"><star /></el-icon>
          <span class="icon-text">{{ _likeNum }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="tweet-icon" :id="`comment-icon-${tweetId}`" @click="getComments">
          <el-icon :size="20"><chat-line-square /></el-icon>
          <span class="icon-text">{{ _commentNum }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="tweet-icon">
          <el-icon :size="20"><share /></el-icon>
          <span class="icon-text">分享</span>
        </div>
      </el-col>
    </el-row>
    <!-- 动态评论 -->
    <div v-if="commentState">
      <el-divider style="margin: 0px;" />
      <div v-for="(item, index) in commentList" :key="`${tweetId}-${index}`">
        <div style="margin:10px 0px">
          <div class="comment-area">
            <user-brief-disp v-bind="item.user"/>
            <div class="comment-time">发表于{{ item.commentTime }}</div>
          </div>
          <div style="padding-left:66px">{{ item.commentText }}</div>
        </div>
        <el-divider v-if="index!=commentList.length-1" style="margin: 0px 10px 0px 66px;" />
      </div>
      <el-divider style="margin: 0px;" />
      <!-- 用户评论输入区 -->
      <div style="padding:10px 20px; 0px">
        <el-input
          :id="`my-comment-input-${tweetId}`"
          v-model="myCommentText"
          :autosize="{ minRows: 1, maxRows: 4 }"
          type="textarea"
          placeholder="说点什么吧..."
        >
        </el-input>
      </div>
      <el-row style="margin:0px 20px 10px;">
        <el-col :offset="1" :span="3">
          <el-popover placement="bottom" :width="288" trigger="click">
            <template #reference>
              <el-button :icon="Eleme" size="mini" @click="selectCommentEmoji" circle></el-button>
            </template>
            <emoji-picker class="light" :id="`comment-emoji-picker-${tweetId}`"></emoji-picker>
          </el-popover>
        </el-col>
        <el-col :offset="16" :span="4">
          <el-button size="mini" @click="uploadMyComment">
            发布
          </el-button>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import 'emoji-picker-element';
import UserBriefDisp from './UserBriefDisp';
import VditorPreview from 'vditor/dist/method.min';
import { Share, ChatLineSquare, Star, Eleme } from '@element-plus/icons';

export default {
  components: { 
    UserBriefDisp,
    Share,
    ChatLineSquare,
    Star,
    Eleme
  },
  props: {
    tweetId: { // 动态ID
      type: Number,
      required: true,
    },
    userId: { // 用户统一ID
      type: Number,
      required: true,
    },
    userName: { // 动态发布者真实姓名
      type: String,
      required: true,
    },
    userType: { // 动态发布者用户类型
      type: String,
      required: true,
    },
    userIconUrl: { // 动态发布者头像
      type: String,
      default: '',
    },
    userBriefInfo: { // 动态发布者简短介绍
      type: String,
      default: '',
    },
    likeNum: { // 点赞数量
      type: Number,
      required: true,
    },
    isLiked: { // 用户是否点赞此条动态
      type: Boolean,
      required: true
    },
    commentNum: { // 评论数量
      type: Number,
      required: true,
    },
    tweetText: { // 动态内容
      type: String,
      required: true,
    },
    tweetPics: { // 图片url数组
      type: Array,
      default: [],
    }
  },
  created() {
    this._likeNum = this.likeNum;
    this._commentNum = this.commentNum;
    this.likeState = this.isLiked;
    this.Eleme = Eleme;
  },
  mounted() {
    VditorPreview.preview(document.getElementById(`text-area-${this.tweetId}`), this.tweetText);
    this.likeDom = document.getElementById(`like-icon-${this.tweetId}`);
    this.commentDom = document.getElementById(`comment-icon-${this.tweetId}`);
  },
  computed: {
    user() {
      return {
        userId: this.userId,
        userName: this.userName,
        userType: this.userType,
        userIconUrl: this.userIconUrl,
        userBriefInfo: this.userBriefInfo
      }
    }
  },
  data() {
    return {
      likeDom: null,
      likeState: false,
      _likeNum: 0,
      _commentNum: 0,
      commentDom: null,
      commentState: false,
      commentList: [],
      myCommentText: '',
      myCommentInputDom: null,
      Eleme: null,
    }
  },
  methods: {
    selectCommentEmoji: function() { // 选中评论输入区emoji
      this.myCommentInputDom.focus();
    },
    uploadMyComment: function() { // 发表评论
      // TODO
    },
    likeTweet: function() { // 点赞动态
      if(this.likeState == false) {
        // TODO 点赞
        this.likeDom.style.color = '#409eff';
        this.likeState = true;
      }
      else {
        // TODO 取赞
        this.likeDom.style.color = '';
        this.likeState = false
      }
    },
    getComments: function() { // 用户点击评论图标, 展示所有评论
      if(this.commentState == false) {
        // TODO 打开评论
        let comment = {
          user: {
            tweetId: 0,
            userId: 123,
            userName: '张三',
            userType: 'user',
            userIconUrl: '',
            userBriefInfo: '腾讯员工',
          },
          commentText: '21342134😀😀😀',
          commentTime: '2021-11-23 17:10'
        }
        for(let i = 0; i < 8; i++) {
          this.commentList.push(comment);
        }
        this.commentState = true;
        this.commentDom.style.color = '#409eff';
        setTimeout(() => {
          this.myCommentInputDom = document.getElementById(`my-comment-input-${this.tweetId}`)
          document.getElementById(`comment-emoji-picker-${this.tweetId}`).addEventListener('emoji-click', event => {
            // 向文本中添加表情
            this.myCommentInputDom.focus();
            let startPos = this.myCommentInputDom.selectionStart;
            let endPos = this.myCommentInputDom.selectionEnd;
            this.myCommentText = this.myCommentText.substring(0, startPos) + event.detail.unicode + this.myCommentText.substring(endPos);
          });
        }, 10)
      }
      else {
        // TODO 收起评论
        this.commentDom.style.color = '';
        this.commentState = false
        this.commentList = []
      }
    }
  }
}
</script>

<style scoped>
.el-card {
  --el-card-padding: 0px;
}
.tweet-icon {
  height: 35px;
  justify-content: center;
  align-items: center;
  display: flex;
}
.tweet-icon:hover {
  border-radius: 3px;
  background-color: rgba(0,0,0,0.12);
  cursor: pointer;
  height: 35px;
  justify-content: center;
  align-items: center;
  display: flex;
}
.icon-text {
  margin-left: 5px;
}
.tweet-time {
  margin: 5px 10px;
  font-size: 12px;
  color: rgba(0,0,0,0.4);
}
.comment-time {
  padding-top: 23px;
  font-size: 12px;
  color: rgba(0,0,0,0.4);
}
.comment-area {
  padding: 5px 15px;
  display: flex;
}
</style>