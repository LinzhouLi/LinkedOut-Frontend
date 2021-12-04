<template>
   <el-container direction="horizontal">
       <el-col span="5">
    <user-icon/>
    </el-col>
    <el-container direction="vertical" style="margin:0px 0px 0px 20px">
    <h1 style="font-size:16px; margin:0px 0px 5px 0px">{{position}}</h1>
    <p style="font-size:15px; margin:0px 0px 5px 0px">{{enterprise}}</p>
    <p style="font-size:12px; color:rgb(122,122,122); margin:0px 0px 5px 0px">{{startTime}}-{{endTime}}</p>
   
    <div style="15px">{{description}}</div>
    
  
    </el-container>
  </el-container>
</template>

<script>
import UserIcon from '@/components/UserIcon'

export default {
    components:{
        UserIcon
    },
   props: {
    workExperienceId: { 
      type: Number,
      required: true
    },
    position: { 
      type: String,
      required: true
    },
    enterprise: { 
      type: String,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    }
  },
}
</script>

<style>

</style>