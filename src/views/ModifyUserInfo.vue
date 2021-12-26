<template>
  <top-nav/>
  <el-row justify="center" style="margin-top:20px">
    <el-col :span="13">
      <!-- 个人信息卡片-->
      <el-card style="margin-bottom:20px">
        <template #header>
          <div><b>基本信息</b></div>
        </template>
        <!-- 上传头像 -->
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
        <!-- 基本信息 -->
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

      <!-- 上传简历 -->
      <el-card style="margin-bottom:20px">
        <template #header>
          <div><b>上传简历</b></div>
        </template>
        <div v-for="(item, index) in resumeList" :key="index">
          <el-row>
            <el-col :offset="1" :span="1">
              <el-icon><document-add /></el-icon>
            </el-col>
            <el-col :span="17">
              <div style="font-size:14px">{{ item.resumeName }}</div>
            </el-col>
            <el-col :span="2">
              <el-button type="text" @click="openUrl(item.documentUrl)" >查看</el-button>
            </el-col>
            <el-col :span="3">
              <el-button type="text" @click="deleteResume(item.resumeId)">删除</el-button>
            </el-col>
          </el-row>
        </div>
        <el-upload
          action=""
          ref="picUploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="uploadResume"
        >
          <el-button style="margin-top:15px" type="primary" size="mini">点击上传</el-button>
        </el-upload>
      </el-card>

      <!-- 教育经历展示 -->
      <el-card style="margin-bottom:20px">
        <template #header>
          <div><b>教育经历</b></div>
        </template>
        <div v-for="(item,index) in educationExperienceList" :key="index">
          <el-row>
            <el-col :span="22">
              <education-experience v-bind="item" style="margin:10px"/> 
            </el-col>
            <el-col :span="2">
              <el-button type="text" @click="deleteEduExp(item.numId)">删除</el-button>
            </el-col>
          </el-row>
          <el-divider v-if="index!=educationExperienceList.length-1"/>
        </div>
        <el-button
          style="margin-top:15px"
          type="primary"
          size="mini"
          @click="educationDialogVisible=true"
        >
        点击添加
        </el-button>
      </el-card>

      <!-- 工作经历展示 -->
      <el-card>
        <template #header>
          <div><b>工作经历</b></div>
        </template>
        <div v-for="(item,index) in workExperienceList" :key="index">
          <el-row>
            <el-col :span="22">
              <work-experience v-bind="item" style="margin:10px"/>
            </el-col>
            <el-col :span="2">
              <el-button type="text" @click="deleteWorkExp(item.numId)">删除</el-button>
            </el-col>
          </el-row> 
          <el-divider v-if="index!=workExperienceList.length-1"/>
        </div> 
        <el-button
          style="margin-top:15px"
          type="primary"
          size="mini"
          @click="workDialogVisible=true"
        >
        点击添加
        </el-button>
      </el-card>

    </el-col>
  </el-row>

  <page-footer/>

  <!-- 选择意向职位对话框 -->
  <job-intention-dialog :visible="showJobIntentionDialog" @close="closeJobDialog" />

  <!--添加工作经历的对话框-->
  <el-dialog v-model="workDialogVisible" title="添加工作经历">
    <el-form ref="workForm" :model="workForm" label-width="100px" :rules="workFormRules">
      <el-form-item label="职位" prop="position" required>
        <el-input v-model="workForm.position" placeholder="前端开发工程师"></el-input>
      </el-form-item>
      
      <el-form-item label="公司" prop="enterprise" required>
        <el-input v-model="workForm.enterprise" placeholder="微软"></el-input>
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
    <el-form ref="educationForm" :model="educationForm" label-width="100px" :rules="educationFormRules">
      <el-form-item label="学校" prop="college" required>
        <el-input v-model="educationForm.college" placeholder="同济大学"></el-input>
      </el-form-item>
      
      <el-form-item label="专业" prop="major" required>
        <el-input v-model="educationForm.major" placeholder="软件工程"></el-input>
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

</template>

<script>
import TopNav from '@/components/TopNav';
import UserIcon from '@/components/UserIcon';
import WorkExperience from '@/components/WorkExperience';
import EducationExperience from '@/components/EducationExperience';
import { 
  getUserInfo, updateUserInfo, upLoadUserImage,
  postResume, deleteResume, getResume,
  postEduBackground, deleteUserEduBackground, getUserEduBackground,
  postUserJobBackground, deleteUserJobBackground, getUserJobBackground
} from '@/apis/users.js';
import JobIntentionDialog from '@/components/JobIntentionDialog';
import { DocumentAdd } from '@element-plus/icons';
import PageFooter from '@/components/PageFooter';


export default {
  components: {
    TopNav,
    UserIcon,
    WorkExperience,
    EducationExperience,
    JobIntentionDialog,
    DocumentAdd,
    PageFooter
  },
  created: async function() {
    const uid = localStorage.getItem('unifiedId');

    // 用户基本信息
    const resp1 = await getUserInfo({ uid: uid, sid: uid });
    const data = resp1.data.data;
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
    this.userIconUrl = data.pictureUrl;

    // 简历
    const resp2 = await getResume({ unifiedId: uid });
    this.resumeList = resp2.data.data || [];

    // 教育经历
    this.updateEduExp();

    // 工作经历
    this.updateWorkExp();

  },
  data() {
    return{
      showJobIntentionDialog: false, // 是否展示选择求职意向dialog
      userBasicData: { }, // 用户基础信息form
      userIconUrl: '', // 用户头像
      resumeList: [], // 简历列表

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
        position: {
          required: true,
          message: '请输入职位',
        },
        enterprise: {
          required: true,
          message: '请输入公司名',
        },
        startTime: {
          type: 'date',
          required: true,
          message: '请选择开始时间',
        },
        endTime: {
          type: 'date',
          required: true,
          message: '请选择结束时间',
        },
      },
      educationFormRules: {
        college: {
          required: true,
          message: '请输入学校',
        },
        major: {
          required: true,
          message: '请输入专业',
        },
        degree: {
          required: true,
          message: '请选择学位',
        },
        startTime: {
          type: 'date',
          required: true,
          message: '请选择开始时间',
        },
        endTime: {
          type: 'date',
          required: true,
          message: '请选择结束时间',
        },
      },
    }
  },
  methods: {
    openUrl: function(url) {
      window.open(url);
    },

    uploadAvatar: async function(file) { // 上传头像
      let params = new FormData();
      params.append('unifiedId', this.userBasicData.unifiedId);
      params.append('file', file.raw, file.name);
      
      const resp1 = await upLoadUserImage(params);
      if (resp1.status == 200 && resp1.data.code == 'success') {
        this.$message.success('上传成功!');
        const uid = localStorage.getItem('unifiedId');
        const resp2 = await getUserInfo({ uid: uid, sid: uid }); // 得到新头像url
        this.userIconUrl = resp2.data.data.pictureUrl;
      }
      else this.$message.error('上传失败!');
    },
    submitBasicInfo: async function() { // 提交基本信息
      const resp = await updateUserInfo(this.userBasicData);
      if (resp.status == 200 && resp.data.code == 'success') this.$message.success('保存成功!');
      else this.$message.error('保存失败!');
    },

    setJobIntention: function() { // 打开职位选择dialog
      this.showJobIntentionDialog = true;
    },
    closeJobDialog: async function() { // 关闭职位选择dialog
      this.showJobIntentionDialog = false;
      const uid = localStorage.getItem('unifiedId');
      const resp = await getUserInfo({ uid: uid, sid: uid }); // 得到新JobIntention
      this.userBasicData.prePosition = resp.data.data.prePosition;
    },

    uploadResume: async function(file) { // 上传简历文件
      if (this.resumeList.length >= 3) { // 限制简历数量
        this.$message.warning('最多上传3份简历!');
        return;
      }
      let params = new FormData();
      params.append('unifiedId', this.userBasicData.unifiedId);
      params.append('file', file.raw, file.name);

      const resp1 = await postResume(params);
      if (resp1.status == 200 && resp1.data.code == 'success') {
        this.$message.success('上传成功!');
        const uid = localStorage.getItem('unifiedId');
        const resp2 = await getResume({ unifiedId: uid }); // 更新简历列表
        this.resumeList = resp2.data.data || [];
      }
      else this.$message.error('上传失败!');
    },
    deleteResume: async function(rId) {
      const uid = localStorage.getItem('unifiedId');
      const resp1 = await deleteResume({ unifiedId: uid, resumeId: rId});
      if (resp1.status == 200 && resp1.data.code == 'success') {
        this.$message.success('删除成功!');
        const uid = localStorage.getItem('unifiedId');
        const resp2 = await getResume({ unifiedId: uid }); // 更新简历列表
        this.resumeList = resp2.data.data || [];
      }
      else this.$message.error('删除失败!');
    },

    updateEduExp: async function() { // 更新教育经历
      const uid = localStorage.getItem('unifiedId');
      const resp = await getUserEduBackground({ unifiedId: uid });
      const eduExplist = resp.data.data;
      this.educationExperienceList = [];
      for (let item of eduExplist) {
        this.educationExperienceList.push({
          numId : item.numId,
          college: item.collegeName,
          major: item.major,
          degree: item.degree,
          startTime: item.startTime,
          endTime: item.endTime
        });
      }
    },
    deleteEduExp: async function(nid) { // 删除教育经历
      const uid = localStorage.getItem('unifiedId');
      const resp1 = await deleteUserEduBackground({ unifiedId: uid, numId: nid });
      if (resp1.status == 200 && resp1.data.code == 'success') {
        this.$message.success('删除成功!');
        this.updateEduExp();
      }
      else this.$message.error('删除失败!');
    },
    submitEducationForm: async function(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.educationDialogVisible = false;
          const params = {
            unifiedId: localStorage.getItem('unifiedId'),
            startTime: this.educationForm.startTime,
            endTime: this.educationForm.endTime,
            collegeName: this.educationForm.college,
            degree: this.educationForm.degree,
            major: this.educationForm.major
          };
          const resp = await postEduBackground(params);
          if (resp.status == 200 && resp.data.code == 'success') {
            this.$message.success('添加成功!');
            this.updateEduExp();
          }
          else this.$message.error('添加失败!');
          this.$refs[formName].resetFields();
        } else {
          return false
        }
      })
    },

    updateWorkExp: async function() { // 更新工作经历
      const uid = localStorage.getItem('unifiedId');
      const resp = await getUserJobBackground({ unifiedId: uid });
      const workExplist = resp.data.data;
      this.workExperienceList = [];
      for (let item of workExplist) {
        this.workExperienceList.push({
          numId : item.numId,
          position: item.positionType,
          enterprise: item.enterpriseName,
          description: item.description,
          startTime: item.startTime,
          endTime: item.endTime
        });
      }
    },
    deleteWorkExp: async function(nid) { // 删除工作经历
      const uid = localStorage.getItem('unifiedId');
      const resp = await deleteUserJobBackground({ unifiedId: uid, numId: nid });
      if (resp.status == 200 && resp.data.code == 'success') {
        this.$message.success('删除成功!');
        this.updateWorkExp();
      }
      else this.$message.error('删除失败!');
    },
    submitWorkForm: async function(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.workDialogVisible = false;
          const params = {
            unifiedId: localStorage.getItem('unifiedId'),
            startTime: this.workForm.startTime,
            endTime: this.workForm.endTime,
            enterpriseName: this.workForm.enterprise,
            positionType: this.workForm.position,
            description: this.workForm.description
          };
          const resp = await postUserJobBackground(params);
          if (resp.status == 200 && resp.data.code == 'success') {
            this.$message.success('添加成功!');
            this.updateWorkExp();
          }
          else this.$message.error('添加失败!');
          this.$refs[formName].resetFields();
        } else {
          return false
        }
      })
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  
  }
}
</script>

<style scoped>

</style>