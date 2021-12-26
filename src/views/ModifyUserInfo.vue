<template>
  <top-nav/>
  <el-row style="margin-top:20px">
    <el-col :offset="3" :span="12" style="margin-right:20px">
      <!-- 个人信息卡片-->
      <el-card style="margin-bottom:20px">
        <template #header>
          <div><b>基本信息</b></div>
        </template>

        <el-upload
          action=""
          ref="picUploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="uploadAvatar"
        >
          <user-icon 
            :size="100" 
            :url="userIconUrl" 
            style="margin-left:30px; cursor:pointer"
          />
        </el-upload>

        <el-divider/>
        <el-form ref="form" :model="userBasicData" label-width="90px" size="small">
          <el-form-item label="姓名">
            <el-input style="width:150px" v-model="userBasicData.trueName"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input style="width:100px" v-model="userBasicData.age"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="userBasicData.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
              <el-radio label="保密"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="身份描述">
            <el-input style="width:300px" v-model="userBasicData.briefInfo"></el-input>
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input style="width:200px" v-model="userBasicData.phoneNum"></el-input>
          </el-form-item>
          <el-form-item label="意向职位">
            <div>{{ userBasicData.prePosition }}</div>
            <el-button type="text" @click="setJobIntention">点击选择</el-button>
          </el-form-item>
          <el-form-item label="我的位置">
            <el-input style="width:200px" v-model="userBasicData.livePlace"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitBasicInfo">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card>
        <el-row>
          <el-col :span="22">
            <h1 style="font-size:20px" id="work">工作经历</h1>
          </el-col>
           <el-button @click="workDialogVisible=true" circle style="font-size:20px">+</el-button>
        </el-row>
        <div v-for="(workExperience,index) in workExperienceList" :key="index">
          <work-experience v-bind="workExperience" @modify="modifyWorkExperience" style="margin: 10px 10px 10px 10px"/> 
          <el-divider/>
        </div> 
        <el-row >
          <el-col :span="22">
            <h1 style="font-size:20px" id="education">教育经历</h1>
          </el-col>
          <el-button @click="educationDialogVisible=true" circle style="font-size:20px">+</el-button>
        </el-row>
         <!--添加工作经历的对话框-->
          <el-dialog v-model="workDialogVisible" title="添加工作经历">
            <el-form ref="workForm" :model="workForm" label-width="200px" :rules="workFormRules">
              <el-form-item label="职位" prop="position" required>
               <el-input v-model="workForm.position" placeholder="例如:前端开发工程师"></el-input>
              </el-form-item>
             
              <el-form-item label="公司" prop="enterprise" required>
                <el-input v-model="workForm.enterprise" placeholder="例如:微软"></el-input>
              </el-form-item>
              
              <el-form-item label="开始时间" prop="startTime" required>
               <el-date-picker
                v-model="workForm.startTime"
                type="month"
                placeholder="请选择开始时间"
               >
               </el-date-picker>
              </el-form-item>
              
              <el-form-item label="结束时间" prop="endTime" required>
               <el-date-picker
                v-model="workForm.endTime"
                type="month"
                placeholder="请选择结束时间"
               >
               </el-date-picker>
              </el-form-item>
               
              <el-form-item label="描述" prop="description">
                <el-input v-model="workForm.description" type="textarea"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitWorkForm('workForm')">确认</el-button>
                <el-button @click="resetForm('workForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        <!--添加教育经历的对话框-->
          <el-dialog v-model="educationDialogVisible" title="添加教育经历">
            <el-form ref="educationForm" :model="educationForm" label-width="200px" :rules="educationFormRules">
              <el-form-item label="学校" prop="college" required>
               <el-input v-model="educationForm.college" placeholder="例如:清华大学"></el-input>
              </el-form-item>
             
              <el-form-item label="专业" prop="major" required>
                <el-input v-model="educationForm.major" placeholder="例如:软件工程"></el-input>
              </el-form-item>

              <el-form-item label="学位" prop="degree" required>
               <el-select v-model="educationForm.degree" placeholder="请选择学位">
                <el-option label="专科" value="专科"></el-option>
                <el-option label="本科" value="本科"></el-option>
                <el-option label="硕士" value="硕士"></el-option>
                <el-option label="博士" value="博士"></el-option>
               </el-select>
              </el-form-item>
              
              <el-form-item label="开始时间" prop="startTime" required>
               <el-date-picker
                v-model="educationForm.startTime"
                type="month"
                placeholder="请选择开始时间"
               >
               </el-date-picker>
              </el-form-item>
              
              <el-form-item label="结束时间" prop="endTime" required>
               <el-date-picker
                v-model="educationForm.endTime"
                type="month"
                placeholder="请选择结束时间"
               >
               </el-date-picker>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitEducationForm('educationForm')">提交</el-button>
                <el-button @click="resetForm('educationForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        <div v-for="(educationExperience,index) in educationExperienceList" :key="index">
          <education-experience v-bind="educationExperience" @modify="modifyEducationExperience" style="margin: 10px 10px 10px 10px"/> 
          <el-divider/>
        </div>
      </el-card>
    </el-col>

    <el-col :span="5">
      <user-recommend-card/>
    </el-col>
  </el-row>

  <job-intention-dialog :visible="showDialog" @close="showDialog=false" />
</template>

<script>
import TopNav from '@/components/TopNav';
import UserIcon from '@/components/UserIcon';
import UserRecommendCard from '@/components/UserRecommendCard';
import WorkExperience from '@/components/WorkExperience';
import EducationExperience from '@/components/EducationExperience';
import { getUserInfo, updateUserInfo, upLoadUserImage } from '@/apis/users.js';
import JobIntentionDialog from '@/components/JobIntentionDialog';


export default {
  components: {
    TopNav,
    UserIcon,
    UserRecommendCard,
    WorkExperience,
    EducationExperience,
    JobIntentionDialog
  },
  created: async function() {
    const uid = localStorage.getItem('unifiedId');
    const resp = await getUserInfo({ uid: uid, sid: uid });
    const data = resp.data.data;
    console.log(data)
    this.userBasicData = {
      unifiedId: data.unifiedId,
      age: data.age,
      gender: data.gender,
      livePlace: data.livePlace,
      phoneNum: data.phoneNum,
      prePosition: data.prePosition,
      trueName: data.trueName,
      briefInfo: data.briefInfo
    }

    this.user = {
      userId: 102,
      userName: '张三',
      userIconUrl: '',
      briefInfo: '同济大学学生',
      livePlace: '上海'
    };
    let workExperience = {
      modifiable: true,
      workExperienceId: 0,
      position: 'Java开发工程师',
      enterprise: '字节跳动',
      startTime: '2019年7月',
      endTime: '2021年7月',
      description: '负责字节跳动商业变现业务相关后台研发，构建对全客户结构、全流程的管理系统；负责高质量的设计和编码，承担重点、难点的技术攻坚；参与产品讨论和开发实现。'
    };
    // for(let i = 0; i < 3; i++) {
    //   let w = JSON.parse(JSON.stringify(workExperience));
    //   w.workExperienceId = Math.floor(Math.random()*10000);
    //   this.workExperienceList.push(w);
    // }
    let educationExperience = {
      modifiable: true,
      educationExperienceId: 0,
      college: '同济大学',
      major: '软件工程',
      degree: '本科',
      startTime: '2019年9月',
      endTime: '2023年7月'
    };
    // for(let i = 0; i < 3; i++) {
    //   let e = JSON.parse(JSON.stringify(educationExperience));
    //   e.educationExperienceId = Math.floor(Math.random()*10000);
    //   this.educationExperienceList.push(e);
    // }
    
  },
  mounted(){

  },
  data() {
    return{
      showDialog: false,
      userBasicData: { },
      userIconUrl: '',
      user: null,
      workDialogVisible: false,
      educationDialogVisible: false,
      workExperienceList:[],
      educationExperienceList:[],
      workForm: {
        position: '',
        enterprise: '',
        startTime: '',
        endTime: '',
        description: ''
      },
      educationForm: {
        college: '',
        major: '',
        degree: '',
        startTime: '',
        endTime: ''
      },
      workFormRules: {
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
      educationFormRules: {
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
        ],
      },
    }
  },
  methods: {
    submitBasicInfo: async function() {
      const resp = updateUserInfo(this.userBasicData);
      if (resp.status == 200 && resp.data.code == 'success') this.$message.success('保存成功!');
      else this.$message.error('保存失败!');
    },
    setJobIntention: function() {
      this.showDialog = true;
    },
    uploadAvatar: async function(file) {
      console.log(file);
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file.raw);
      fileReader.onload = (event) => {
        this.userIconUrl = event.target.result;
      }
      let params = new FormData();
      params.append('unifiedId', this.userBasicData.unifiedId);
      params.append('file', file.raw, file.name);
      console.log(params.get('file'))
      const resp = upLoadUserImage(params);
      console.log(resp)
      if (resp.status == 200 && resp.data.code == 'success') this.$message.success('上传成功!');
      else this.$message.error('上传失败!');
    },
    submitWorkForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('工作经历添加成功!')
          this.workExperienceList.push(this.workForm)
          this.workDialogVisible=false
        } else {
          return false
        }
      })
    },
    submitEducationForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('教育经历添加成功!')
          this.educationExperienceList.push(this.educationForm)
          this.educationDialogVisible=false
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    modifyWorkExperience(form){
      for(let j=0;j<this.workExperienceList.length;j++){
        if(this.workExperienceList[j].workExperienceId==form.workExperienceId){
          this.workExperienceList[j]=form
          this.workExperienceList[j].modifiable=true
          break
          //this.axios.post.......(写在这里还是写在子组件里？)
        }
      }
    },
    modifyEducationExperience(form){
      for(let j=0;j<this.educationExperienceList.length;j++){
        if(this.educationExperienceList[j].educationExperienceId==form.educationExperienceId){
          this.educationExperienceList[j]=form
          this.educationExperienceList[j].modifiable=true
          break
        }
      }
    },
   
  }
}
</script>

<style scoped>
#userName,#briefInfo,#livePlace{
  font-size: 20px;
  font-weight: 650;
  margin: 5px 0px 10px;
}


#buttons{
  margin: 15px 0px 0px 0px;
}


</style>