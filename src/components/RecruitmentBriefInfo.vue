<template>
  <el-container direction="horizontal" style="height:50px; cursor:pointer;" @click="checkRecruitment">
      <!--用户头像-->
    <user-icon v-bind="userIconUrl"/>
    <el-container direction="vertical" style="margin:0px 0px 0px 5px" >
    <h1 class="recruitmentTitle">{{recruitmentTitle}}</h1>
    <a class="small-text">{{limit}}</a>
    
    
    </el-container>
  </el-container>


</template>

<script>
import UserIcon from '@/components/UserIcon'


export default {
  components: { UserIcon },
props: {
    recruitmentId: { 
      type: Number,
      required: true
    },
    userId: { 
      type: Number,
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
 }
  
}

</script>

<style>
    .recruitmentTitle{
      margin:0px 0px 9px 0px;
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