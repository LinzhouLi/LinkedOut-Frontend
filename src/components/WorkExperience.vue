<template>
  <el-container direction="horizontal">
    <user-icon :url="picUrl" :size="50" />
    <el-container direction="vertical" style="margin:0px 0px 20px 10px">
      <el-row>
        <el-col :span="20">
          <div style="font-size:16px; margin-bottom:5px"><b>{{ enterprise }}</b></div>
        </el-col>
        <el-col :span="4">
          <el-button @click="dialogVisible=true" type="mini" v-if="modifiable">修改</el-button>
        </el-col>
      </el-row>
  
      <div style="font-size:15px; margin-bottom:5px">{{ position }}</div>
      <div style="font-size:12px; color:rgb(122,122,122); margin-bottom:5px">{{startTime}}-{{endTime}}</div>
  
      <div style="font-size:13px;">{{ description }}</div>
    
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
            
      <el-form-item label="开始时间" prop="startTime" required>
        <el-date-picker
        v-model="form.startTime"
        type="month"
        placeholder="请选择开始时间"
        >
        </el-date-picker>
      </el-form-item>
            
      <el-form-item label="结束时间" prop="endTime" required>
        <el-date-picker
        v-model="form.endTime"
        type="month"
        placeholder="请选择结束时间"
        >
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
        startTime: [
          {
            type: 'date',
            required: true,
            message: '请选择开始时间',
            trigger: 'change',
          },
        ],
        endTime: [
          {
            type: 'date',
            required: true,
            message: '请选择结束时间',
            trigger: 'change',
          },
        ]
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
      default: false
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
    },
    picUrl: {
      type: String,
      default: ''
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
.el-divider {
  margin: 10px 0px;
}
</style>