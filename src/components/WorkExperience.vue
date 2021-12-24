<template>
   <el-container direction="horizontal">
       <el-col span="5">
    <user-icon/>
    </el-col>
    <el-container direction="vertical" style="margin:0px 0px 0px 20px">
      <el-row>
      <el-col :span="20">
        <h1 style="font-size:16px; margin:0px 0px 5px 0px">{{position}}</h1>
      </el-col>
      <el-col :span="4">
        <el-button @click="dialogVisible=true" type="mini" v-if="modifiable">修改</el-button>
      </el-col>
      </el-row>
    
    <p style="font-size:15px; margin:0px 0px 5px 0px">{{enterprise}}</p>
    <p style="font-size:12px; color:rgb(122,122,122); margin:0px 0px 5px 0px">{{startTime}}-{{endTime}}</p>
   
    <div style="15px">{{description}}</div>
    
    </el-container>
  </el-container>
   <el-dialog v-model="dialogVisible" title="修改工作经历">
      <el-form ref="form" :model="form" label-width="200px" :rules="rules">
        <el-form-item label="职位" prop="position" required>
          <el-input v-model="form.position" placeholder="例如:前端开发工程师"></el-input>
        </el-form-item>
             
        <el-form-item label="公司" prop="enterprise" required>
          <el-input v-model="form.enterprise" placeholder="例如:微软"></el-input>
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

        <el-form-item label="描述" prop="description">
           <el-input v-model="form.description" type="textarea"></el-input>
           </el-form-item>

        <el-form-item>
              <el-button type="primary" @click="submitForm('form')">确认</el-button>
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
        form: {
          workExperienceId: 0,
          position: '',
          enterprise: '',
          startTime: '',
          endTime: '',
          times:[],
          description: ''
        },
        rules: {
        position: [
          {
            required: true,
            message: '请输入职位',
            trigger: 'change',
          },
        ],
        enterprise: [
          {
            required: true,
            message: '请输入公司名',
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
      this.form.workExperienceId=this.workExperienceId
      this.form.position=this.position
      this.form.enterprise=this.enterprise
      this.form.startTime=this.startTime
      this.form.endTime=this.endTime
      this.form.description=this.description
    },
   props: {
    modifiable: {
      type: Boolean,
      required: true
    },
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
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.startTime=this.form.times[0]
          this.form.endTime=this.form.times[1]
          alert('工作经历修改成功!')
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