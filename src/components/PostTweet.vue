<template>
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
          <el-image class="img-preview" :src="pic" fit="contain"/>
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
      <!-- 选择图片 -->
      <el-col :span="3">
        <el-upload
          action=""
          ref="picUploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="Addpicture"
        >
          <el-button :icon="PictureFilled" size="mini" circle></el-button>
        </el-upload>
      </el-col>
      <el-col :offset="13" :span="4">
        <el-button size="mini" @click="uploadTweet">
          发布
        </el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import 'emoji-picker-element';
import { Eleme, PictureFilled, Plus, CloseBold } from '@element-plus/icons';
import { ElMessage } from 'element-plus';
import { addTweet } from '@/apis/tweet.js';

export default {
  components: {
    Eleme,
    PictureFilled,
    Plus,
    CloseBold,
    ElMessage
  },
  setup () {
    return {
      Eleme,
      PictureFilled
    }
  },
  created() {
    this.imgReader = new FileReader();
    this.imgReader.onload = (event) => {
      this.picList.push(event.target.result);
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
  data() {
    return {
      imgReader: null,
      imgPopoverVisible: true,
      tweetInputDom: null,
      showEmojiSelector: false,
      tweetText: '',
      picList: [], // 用于展示图片
      fileList: [], // 用于上传文件
    }
  },
  methods: {
    selectEmoji: function() { // 选中动态内容输入区emoji
      this.tweetInputDom.focus();
    },
    Addpicture: function(file) { // 添加预览图片
      if(this.picList.length < 3) {
        this.imgPopoverVisible = false;
        this.imgReader.readAsDataURL(file.raw);
        URL.revokeObjectURL(file.url);
        this.fileList.push(file.raw);
      }
      else {
        ElMessage.error('最多上传3张图片!');
      }
      this.$refs.picUploader.clearFiles();
    },
    removePicture: function(index) { // 删除预览图片
      this.picList.splice(index, 1);
      this.fileList.splice(index, 1);
    },
    uploadTweet:async function() { // 上传动态
      // TODO 发布动态文件传输的问题
      let date = new Date();
      const trueDate = date.toJSON().split('T')[0]+' '+date.toJSON().split('T')[1].split('Z')[0];

      let params = new FormData();
      params.append('unifiedId', localStorage.getItem("unifiedId"));
      params.append('content', this.tweetText);
      params.append('recordTime', trueDate);
      for (let file in this.fileList) {
        params.append('files', file);
      }

      const resq = await addTweet(params);
      if (resq.status == 200 && resq.data.code == 'success') this.$message.success('发布成功!');
      else this.$message.error('发布失败!');
    },
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