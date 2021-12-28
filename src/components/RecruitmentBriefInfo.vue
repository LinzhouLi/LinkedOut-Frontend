<template>
  <el-container direction="horizontal" style="height:50px; cursor:pointer;" @click="checkRecruitment">
      <!--用户头像-->
    <div v-if="havePicture">
      <el-image :src="userIconUrl" style="width:50px; height:50px; border-radius:50% " fit="cover"/>
    </div>
    <!-- <user-icon v-bind="userIconUrl"/> -->
    <el-container direction="vertical" style="margin:0px 0px 0px 5px" >
    <h1 class="recruitmentTitle">{{recruitmentTitle}}</h1>
    <a class="small-text">{{limit}}</a>
    
    
    </el-container>
  </el-container>


</template>

<script>
import UserIcon from '@/components/UserIcon'


export default {
  data(){
  return{
    havePicture: false  //是否有图片
  }
},
  components: { UserIcon },
  props: {
    recruitmentId: { 
      type: String,
      required: true
    },
    userId: { 
      type: String,
      required: true
    },
    userIconUrl: { 
      type: String,
      required: true
    },
    recruitmentTitle: {
      type: String,
      required: true
    },
    limit: {
      type: String,
      required: true
    }
  },
 methods:{
     checkRecruitment: function(){
         this.$router.push({ name: 'recruitment', params: { rid: this.recruitmentId }});
     }
 },
created(){
    if(this.userIconUrl!==" "){//检查是否有图片
      this.havePicture = true;
    }
  },
 mounted:function(){
   console.log(this.userId,'123123123')
 }
  
}

</script>

<style>
    .recruitmentTitle{
      font-size:13px;
      margin:0px 0px 9px 0px;
      word-break:normal; 

        width:auto; 
        display:block; 
        white-space:pre-wrap;
        word-wrap : break-word ;
        line-break: auto;
    }
    .small-text{
      font-size: 13px;
      color: rgb(122 122 122);
    }

</style>