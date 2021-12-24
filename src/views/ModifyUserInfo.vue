<template>
  <top-nav/>
  <el-row style="margin-top:20px">
    <el-col :offset="3" :span="12" style="margin-right:20px">
      <!-- 个人信息卡片-->
      <el-card style="margin-bottom:20px">
         <user-icon 
             :size="100" 
             :url="user.userIconUrl" 
             style="cursor:pointer"
           />
         <el-divider/>
         <el-row>
           <div id="userName">姓名</div> 
           <div style="margin-top: 10px; margin-left:140px; margin-right:20px" v-if="!modifyUserName">{{user.userName}}</div>
           <div style="margin-top: 10px; margin-left:140px" v-if="modifyUserName">
             <el-input v-model="userNameInput" placeholder="请输入新姓名"/>
             <el-row style="margin-top: 30px">
               <el-button @click="saveUserName" type="primary" :disabled="userNameInput==''" size="mini">
                 保存
               </el-button>
               <el-button @click="modifyUserName=false; userNameInput=''" size="mini">
                 取消
               </el-button>
             </el-row>
           </div>
           <el-button @click="modifyUserName=true;" v-if="!modifyUserName" size="mini">
               修改
           </el-button>
         </el-row>
           
         <el-divider/>
          <el-row>
            <div id="briefInfo">简介</div>
            <div style="margin-top: 10px; margin-left:140px; margin-right:20px" v-if="!modifyBriefInfo">{{user.briefInfo}}</div>
            <div style="margin-top: 10px; margin-left:140px" v-if="modifyBriefInfo">
             <el-input v-model="briefInfoInput" placeholder="请输入新简介"/>
             <el-row style="margin-top: 30px">
               <el-button @click="saveBriefInfo" type="primary" :disabled="briefInfo==''" size="mini">
                 保存
               </el-button>
               <el-button @click="modifyBriefInfo=false; briefInfoInput=''" size="mini">
                 取消
               </el-button>
             </el-row>
           </div>
           <el-button @click="modifyBriefInfo=true" v-if="!modifyBriefInfo" size="mini">
               修改
           </el-button>
          </el-row>
         <el-divider/>

          <el-row>
           <div id="livePlace">所在地</div>
           <div style="margin-top: 10px; margin-left:118px; margin-right:20px" v-if="!modifyLivePlace">{{user.livePlace}}</div>
           <div style="margin-top: 10px; margin-left:118px" v-if="modifyLivePlace">
              <el-input v-model="livePlaceInput" placeholder="请输入新所在地"/>
             <el-row style="margin-top: 30px">
               <el-button @click="saveLivePlace" type="primary" :disabled="livePlaceInput==''" size="mini">
                 保存
               </el-button>
               <el-button @click="modifyLivePlace=false; livePlaceInput=''" size="mini">
                 取消
               </el-button>
             </el-row>
           </div>
           <el-button @click="modifyLivePlace=true" v-if="!modifyLivePlace" size="mini">
               修改
           </el-button>
          </el-row>
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

              <el-form-item label="起止时间" prop="times" required>
               <el-date-picker
              v-model="workForm.times"
              type="monthrange"
              range-separator="至"
               start-placeholder="请选择开始时间"
                end-placeholder="请选择结束时间"
                value-format="YYYY年DD月">
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
              
               <el-form-item label="起止时间" prop="times" required>
               <el-date-picker
              v-model="educationForm.times"
              type="monthrange"
              range-separator="至"
               start-placeholder="请选择开始时间"
                end-placeholder="请选择结束时间"
                value-format="YYYY年DD月">
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
</template>

<script>
import TopNav from '@/components/TopNav'
import UserIcon from '@/components/UserIcon'
import UserRecommendCard from '@/components/UserRecommendCard'
import WorkExperience from '@/components/WorkExperience'
import EducationExperience from '@/components/EducationExperience'


export default {
  components: {
    TopNav,
    UserIcon,
    UserRecommendCard,
    WorkExperience,
    EducationExperience
  },
  created() {
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
    for(let i = 0; i < 3; i++) {
      let w = JSON.parse(JSON.stringify(workExperience));
      w.workExperienceId = Math.floor(Math.random()*10000);
      this.workExperienceList.push(w);
    }
    let educationExperience = {
      modifiable: true,
      educationExperienceId: 0,
      college: '同济大学',
      major: '软件工程',
      degree: '本科',
      startTime: '2019年9月',
      endTime: '2023年7月'
    };
    for(let i = 0; i < 3; i++) {
      let e = JSON.parse(JSON.stringify(educationExperience));
      e.educationExperienceId = Math.floor(Math.random()*10000);
      this.educationExperienceList.push(e);
    }
    
  },
  mounted(){
    this.axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response))
  },
  data() {
    return{
      user: null,
      userNameInput:'',
      briefInfoInput:'',
      livePlaceInput:'',
      modifyUserName: false,
      modifyBriefInfo: false,
      modifyLivePlace: false,
      workDialogVisible: false,
      educationDialogVisible: false,
      workExperienceList:[],
      educationExperienceList:[],
      workForm: {
        position: '',
        enterprise: '',
        times:[],
        startTime: '',
        endTime: '',
        description: ''
      },
      educationForm: {
        college: '',
        major: '',
        degree: '',
        startTime: '',
        endTime: '',
        times:[]
      },
      workFormRules: {
        position: [
          {
            required: true,
            message: '请输入职位',
            trigger: 'change',
          }
        ],
        enterprise: [
          {
            required: true,
            message: '请输入公司名',
            trigger: 'change',
          }
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
  methods: {
   saveUserName: function(){//保存用户名字
     this.user.userName=this.userNameInput
     this.userNameInput=''
     this.modifyUserName=false
   },
   saveBriefInfo: function(){//保存用户简介
     this.user.briefInfo=this.briefInfoInput
     this.briefInfoInput=''
     this.modifyBriefInfo=false
   },
   saveLivePlace: function(){//保存所在地
     this.user.livePlace=this.livePlaceInput
     this.livePlaceInput=''
     this.modifyLivePlace=false
   },
   submitWorkForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.workForm.startTime=this.workForm.times[0]
          this.workForm.endTime=this.workForm.times[1]
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
          this.educationForm.startTime=this.educationForm.times[0]
          this.educationForm.endTime=this.educationForm.times[1]
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