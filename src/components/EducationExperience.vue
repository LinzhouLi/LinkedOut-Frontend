<template>
   <el-container direction="horizontal" style="margin-bottom:0px">
       <el-col :span="2">
    <user-icon/>
    </el-col>
    <el-container direction="vertical" style="margin:0px 0px 0px 20px">
      <el-row>
      <el-col :span="20">
        <h1 style="font-size:16px; margin:0px 0px 5px 0px">{{college}}</h1>
      </el-col>
      <el-col :span="4">
        <el-button @click="dialogVisible=true" type="mini" v-if="modifiable">修改</el-button>
      </el-col>
      </el-row>
      <p style="font-size:15px; margin:0px 0px 5px 0px">{{major}}·{{degree}}</p>
      <p style="font-size:12px; color:rgb(122,122,122); margin:0px 0px 5px 0px">{{startTime}}-{{endTime}}</p>
    
    
  
    </el-container>
  </el-container>
  <el-dialog v-model="dialogVisible" title="修改教育经历">
    <el-form ref="form" :model="form" label-width="200px" :rules="rules">
      <el-form-item label="学校" prop="college" required>
        <el-input v-model="form.college" placeholder="例如:清华大学"></el-input>
      </el-form-item>
             
      <el-form-item label="专业" prop="major" required>
        <el-input v-model="form.major" placeholder="例如:软件工程"></el-input>
      </el-form-item>

      <el-form-item label="学位" prop="degree" required>
        <el-select v-model="form.degree" placeholder="请选择学位">
          <el-option label="专科" value="专科"></el-option>
          <el-option label="本科" value="本科"></el-option>
          <el-option label="硕士" value="硕士"></el-option>
          <el-option label="博士" value="博士"></el-option>
        </el-select>
      </el-form-item>
              
      <el-form-item label="起止时间" prop="times" required>
        <el-date-picker
        v-model="form.times"
        type="monthrange"
        range-separator="至"
        start-placeholder="请选择开始时间"
        end-placeholder="请选择结束时间"
        value-format="YYYY年DD月">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import UserIcon from '@/components/UserIcon'

export default {
   data(){
     return{
       dialogVisible: false,
       form:{
         educationExperienceId: 0,
         college: '同济大学',
         major: '软件工程',
         degree: '本科',
         startTime: '2019年9月',
         endTime: '2023年7月',
         times:[]
       },
       rules: {
        college: [
          {
            required: true,
            message: '请输入学校',
            trigger: 'change',
          },
        ],
        major: [
          {
            required: true,
            message: '请输入专业',
            trigger: 'change',
          },
        ],
        degree: [
          {
            required: true,
            message: '请选择学位',
            trigger: 'change',
          },
        ],
        times: [
           {
             type: 'array',
             fields: {
               0: {type: 'string', required: true, message: '请选择起止时间'},
               1: {type: 'string', required: true, message: '请选择起止时间'}
             }
           }
        ],
      },
     }
   },
   components:{
      UserIcon
   },
   created(){
      this.form.educationExperienceId=this.educationExperienceId
      this.form.college=this.college
      this.form.major=this.major
      this.form.degree=this.degree
      this.form.startTime=this.startTime
      this.form.endTime=this.endTime
    },
   props: {
    modifiable: {
      type: Boolean,
      required: true
    },
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
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.startTime=this.form.times[0]
          this.form.endTime=this.form.times[1]
          alert('教育经历修改成功!')
          this.$emit('modify',this.form)
          this.dialogVisible=false
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  }
}
</script>

<style>

</style>