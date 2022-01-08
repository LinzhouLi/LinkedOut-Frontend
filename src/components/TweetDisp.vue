<template>
  <el-card>
    <!-- 动态卡片头部 -->
    <template #header>
      <div style="padding:10px;">
        <el-row>
          <el-col :span="22">
            <user-brief-disp v-bind="user" />
          </el-col>
          <el-col :span="2">
            <el-button v-if="ifSelf" type="text" @click="deleteThisTweet">删除</el-button>
          </el-col>
        </el-row>
      </div>
    </template>
    <!-- 动态文字与照片 -->
    <div>
      <div style="padding:5px 15px;"><span :id="`text-area-${tweetId}`"/></div>
      <el-carousel :autoplay="false" v-if="pictureList.length != 0" height="auto">
        <div v-for="(item,index) in pictureList" :key="index" >
          <el-carousel-item >
            <el-image :src="item.pictureUrl" style="width:100%;" fit="cover" />
          </el-carousel-item>
          <img :src="item.pictureUrl" style="width:100%; opacity:0;"/>
        </div>
      </el-carousel>
    </div>
    <div class="tweet-time">
      发表于{{getProperTimeString(recordTime)}}
    </div>
    <el-divider style="margin: 0px;" />
    <!-- 卡片底部 点赞/评论/分享 -->
    <el-row style="margin:5px">
      <el-col :span="8">
        <div class="tweet-icon" :id="`like-icon-${tweetId}`" @click="likeTweet" >
          <el-icon :size="20">
            <svg t="1641100739092" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2263" width="200" height="200"><path d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z" p-id="2264"></path></svg>
          </el-icon>
          <span class="icon-text">{{ _likeNum }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="tweet-icon" :id="`comment-icon-${tweetId}`" @click="foldCommentList">
          <el-icon :size="20"><chat-line-square /></el-icon>
          <span class="icon-text">{{ _commentNum }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="tweet-icon" @click="shareTweet">
          <el-icon :size="20"><share /></el-icon>
          <span class="icon-text">分享</span>
        </div>
      </el-col>
    </el-row>
    <!-- 动态评论 -->
    <div v-if="commentState">
      <div v-for="(item, index) in commentList" :key="`${tweetId}-${index}`">
        <el-divider style="margin: 0px;" />
        <div style="margin:10px 0px">
          <div class="comment-area">
            <user-brief-disp v-bind="item.user"/>
            <el-button size="mini" type="text" 
              v-show="item.ifSelf" 
              class="comment-delete-button"
              @click="deleteComment(item)"
            >
              删除
            </el-button>
          </div>
        <div style="padding-left:30px">{{ item.contents }}</div>
        <div class="comment-time-container">
        <div class="comment-time">发表于{{ getProperTimeString(item.recordTime) }}</div>
        </div>
        </div>
      
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
import { addLikes, deleteLikes, getAllComments, addComment, deleteComment, addTweet, deleteTweet } from '@/apis/tweet.js';
import { getProperTimeString } from '@/utils/utils.js';
import { ElMessageBox } from 'element-plus';

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
    unifiedId: { // 用户统一ID
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
    praiseNum: { // 点赞数量
      type: Number,
      required: true,
    },
    likeState: { // 用户是否点赞此条动态
      type: Boolean,
      required: true
    },
    commentNum: { // 评论数量
      type: Number,
      required: true,
    },
    contents: { // 动态内容
      type: String,
      required: true,
    },
    pictureList: { // 图片url数组
      type: Array,
      default: [],
    },
    recordTime: {
      type: String,
      dafault:''
    }
  },
  created() {
    this._likeNum = this.praiseNum;
    this._commentNum = this.commentNum;
    this._likeState = this.likeState;
    this.Eleme = Eleme;
  },
  mounted() {
    this.ifSelf = this.unifiedId == localStorage.getItem('unifiedId');
    VditorPreview.preview(document.getElementById(`text-area-${this.tweetId}`), this.contents);
    this.likeDom = document.getElementById(`like-icon-${this.tweetId}`);
    if (this.likeState == true) this.likeDom.style.color = '#409eff'; // 已经点赞
    this.commentDom = document.getElementById(`comment-icon-${this.tweetId}`);
  },
  computed: {
    user() {
      return {
        unifiedId: this.$props.unifiedId,
        userName: this.$props.userName,
        userType: this.$props.userType,
        userIconUrl: this.$props.userIconUrl,
        userBriefInfo: this.$props.userBriefInfo
      }
    },
  },
  data() {
    return {
      likeDom: null,
      _likeState: false,
      _likeNum: 0,
      _commentNum: 0,
      commentDom: null,
      commentState: false,
      commentList: [],
      myCommentText: '',
      myCommentInputDom: null,
      Eleme: null,
      ifSelf: false
    }
  },
  methods: {
    selectCommentEmoji: function() { // 选中评论输入区emoji
      this.myCommentInputDom.focus();
    },
    uploadMyComment: async function() { // 发表评论
      if (this.myCommentText.match(/^\s*$/)) { // 匹配空格/空/换行
        this.$message.warning('评论内容为空!');
        return;
      }

      const params = {
        unifiedId: localStorage.getItem('unifiedId'),
        tweetId: this.tweetId,
        contents: this.myCommentText,
      }

      const resp1 = await addComment(params);
      if(resp1.status == 200 && resp1.data.code == 'success') {
        this.myCommentText = '';
        this._commentNum++;
        this.getCommentList();
        this.$message.success('发表成功!');
      }
    },
    likeTweet: async function() { // 点赞动态
      const params = { 
        unifiedId: localStorage.getItem('unifiedId'),
        tweetId: this.tweetId
      };
      if(this._likeState == false) { // 点赞
        this.likeDom.style.color = '#409eff';
        this._likeState = true;
        const resp = await addLikes(params);
        this._likeNum = resp.data.data;
      }
      else { // 取赞
        this.likeDom.style.color = '';
        this._likeState = false;
        const resp = await deleteLikes(params);
        this._likeNum = resp.data.data;
      }
    },
    getCommentList: async function(){
      this.commentList = [];
      const myUnifiedId = localStorage.getItem('unifiedId');
      const resp = await getAllComments({tweetId:this.tweetId});
      const commentData = resp.data.data;

      for (let item of commentData) {
        this.commentList.push({
          user: {
            unifiedId: item.simpleUserInfo.unifiedId,
            userName: item.simpleUserInfo.trueName,
            userType: item.simpleUserInfo.userType,
            userBriefInfo: item.simpleUserInfo.briefInfo,
            userIconUrl: item.simpleUserInfo.pictureUrl
          },
          contents: item.contents,
          recordTime: item.recordTime,
          floor: item.floor,
          ifSelf: item.simpleUserInfo.unifiedId == myUnifiedId
        })
      }
    },
    foldCommentList: async function() { 
      if(this.commentState === false) {
        this.commentState = true;
        this.getCommentList();
        this.commentDom.style.color = '#409eff';
        this.$nextTick(() => { // 确保document刷新后再获取表情选择器
          this.myCommentInputDom = document.getElementById(`my-comment-input-${this.tweetId}`)
          document.getElementById(`comment-emoji-picker-${this.tweetId}`).addEventListener('emoji-click', event => {
            // 向文本中添加表情
            this.myCommentInputDom.focus();
            let startPos = this.myCommentInputDom.selectionStart;
            let endPos = this.myCommentInputDom.selectionEnd;
            this.myCommentText = this.myCommentText.substring(0, startPos) + event.detail.unicode + this.myCommentText.substring(endPos);
          });
        })
      }
      else {
        this.commentDom.style.color = '';
        this.commentState = false;
        this.commentList = [];
      }
    },
    getProperTimeString: getProperTimeString,
    deleteComment: async function(item) {
      const resp = await deleteComment({
        unifiedId: localStorage.getItem('unifiedId'),
        tweetId: this.tweetId,
        floor: item.floor
      });
      if(resp.status == 200 && resp.data.code == 'success'){
        this._commentNum--;
        this.getCommentList();
        this.$message.success('删除成功');
      }
    },
    shareTweet: async function() {
      let date = new Date();
      const trueDate = date.toJSON().split('T')[0]+' '+date.toJSON().split('T')[1].split('Z')[0];

      let params = new FormData();
      params.append('unifiedId', localStorage.getItem("unifiedId"));
      params.append('content', `> 转载于: ${this.userName}  \n${this.contents}`);
      params.append('recordTime', trueDate);

      const resq = await addTweet(params);
      if (resq.status == 200 && resq.data.code == 'success') {
        this.$message.success('分享成功!');
        this.$emit('updateTweets');
      }
      else this.$message.error('分享失败!');
    },
    deleteThisTweet: async function() {
      ElMessageBox.confirm(
        '确认删除?',
        'Warning',
        {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(async () => {
        const resp = await deleteTweet(this.tweetId);
        if (resp.status == 200 && resp.data.code == 'success') {
          this.$message.success('删除成功!');
          this.$emit('updateTweets');
        }
        else this.$message.error('删除失败!');
      });
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
  /* padding-top: 23px; */
  font-size: 12px;
  color: rgba(0,0,0,0.4);
  margin-bottom: -8px;
  margin-right:10px;
}

.comment-time-container {
  /* padding-top: 23px; */
  display: flex;
  flex-direction: row-reverse;
}
.comment-area {
  padding: 5px 15px;
  display: flex;
}
</style>