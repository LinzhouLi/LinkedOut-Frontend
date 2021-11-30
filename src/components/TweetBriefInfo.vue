<template>
<!--显示动态的第一张图片（如果有）-->
  <el-container direction="horizontal" style="height:50px;" >
    <div v-if="havePicture">
      <el-image :src="tweetPics[0]" style="width:50px; height:50px;" fit="cover"/>
    </div>
    <el-container direction="vertical" style="margin:0px 0px 0px 5px">
    <span :id="`text-area-${tweetId}`" style="overflow:hidden" class="tweetText"/>
    <div class="small-text">
       点赞（{{likeNum}})·评论（{{commentNum}}）
    </div>
  
    </el-container>
  </el-container>


</template>

<script>
import VditorPreview from 'vditor/dist/method.min';
import '@/assets/vditor.css';

export default {
data(){
  return{
    havePicture: false  //是否有图片
  }
},
props: {
    tweetId: { 
      type: Number,
      required: true
    },
    tweetText: { 
      type: String,
      required: true
    },
    tweetPics: { 
      type: Array,
      default:[]
    },
    likeNum: {
      type: Number,
      required: true
    },
    commentNum: {
      type: Number,
      required: true
    }
  },
  created(){
    if(this.tweetPics.length>0){//检查是否有图片
      this.havePicture = true;
    }
  },
mounted() {
    VditorPreview.preview(document.getElementById(`text-area-${this.tweetId}`), this.tweetText);
 
  },
  
}

</script>

<style>
    .tweetText{
      word-break:normal; 
        width:auto; 
        display:block; 
        white-space:pre-wrap;
        word-wrap : break-word ;
        overflow: hidden ;
        line-break: auto;
    }
    .small-text{
      font-size: 13px;
      color: rgb(122 122 122);
    }

</style>