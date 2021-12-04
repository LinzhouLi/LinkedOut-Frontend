<template>
   <el-container direction="horizontal" style="margin-bottom:0px">
       <el-col span="5">
    <user-icon/>
    </el-col>
    <el-container direction="vertical" style="margin:0px 0px 0px 20px">
    <h1 style="font-size:16px; margin:0px 0px 5px 0px">{{college}}</h1>
    <p style="font-size:15px; margin:0px 0px 5px 0px">{{major}}·{{degree}}</p>
    <p style="font-size:12px; color:rgb(122,122,122); margin:0px 0px 5px 0px">{{startTime}}-{{endTime}}</p>
    
  
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
    educationExperienceId: { 
      type: Number,
      required: true
    },
    college: { 
      type: String,
      required: true
    },
    major: { 
      type: String,
      required: true
    },
    degree: {
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
    }
  },
}
</script>

<style>

</style>