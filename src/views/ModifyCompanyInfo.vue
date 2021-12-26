<template>
  <top-nav/>
  <el-row justify="center" style="margin-top:20px">
    <el-col :span="13">
      <el-form ref="form" :model="userBasicData" label-width="90px" size="small">
        <!-- 公司信息卡片-->
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
            <el-form-item label="公司名称">
              <el-input style="width:150px" v-model="userBasicData.trueName"></el-input>
            </el-form-item>
            <el-form-item label="所属行业">
              <el-input style="width:300px" v-model="userBasicData.briefInfo"></el-input>
            </el-form-item>
            <el-form-item label="官方网站">
              <el-input style="width:200px" v-model="userBasicData.contactWay"></el-input>
            </el-form-item>
        </el-card>

        <!-- 公司介绍 -->
        <el-card style="margin-top: 20px">
          <template #header>
            <span><b>职位详情</b></span>
            <span style="margin-left:10px; font-size:10px; color: rgb(122 122 122);">
              (支持markdown语法编辑)
            </span>
          </template>
            <div id="vditor"/>
          <el-row justify="center" style="margin-top:20px">
            <el-button type="primary" @click="submitBasicInfo">保存</el-button>
          </el-row>
        </el-card>
      </el-form>
    </el-col>
  </el-row>

  <page-footer/>

</template>

<script>
import TopNav from '@/components/TopNav';
import UserIcon from '@/components/UserIcon';
import PageFooter from '@/components/PageFooter';
import Vditor from 'vditor';
import '@/assets/vditor.css';
import { 
  upLoadUserImage, 
  getEnterpriseInfo, updateEnterpriseInfo 
} from '@/apis/users.js';

export default {
  components: {
    TopNav,
    UserIcon,
    PageFooter
  },
  mounted: async function() {
    const uid = localStorage.getItem('unifiedId');

    // 用户基本信息
    const resp1 = await getEnterpriseInfo({ uid: uid, sid: uid });
    const data = resp1.data.data;
    this.userBasicData = {
      unifiedId: data.unifiedId,
      contactWay: data.contactWay,
      trueName: data.trueName,
      briefInfo: data.briefInfo,
      description: data.description
    }
    this.userIconUrl = data.pictureUrl;
    
    // 编辑器
    this.vditor = new Vditor('vditor', {
      mode: 'wysiwyg',
      placeholder: '请输入公司简介...',
      value: this.userBasicData.description,
      input: value => this.userBasicData.description = value,
      cache: { enable: false },
    });
  },
  data() {
    return{
      userBasicData: { }, // 用户基础信息form
      userIconUrl: '', // 用户头像
    }
  },
  methods: {
    uploadAvatar: async function(file) { // 上传头像
      let params = new FormData();
      params.append('unifiedId', this.userBasicData.unifiedId);
      params.append('file', file.raw, file.name);
      
      const resp1 = await upLoadUserImage(params);
      if (resp1.status == 200 && resp1.data.code == 'success') {
        this.$message.success('上传成功!');
        const uid = localStorage.getItem('unifiedId');
        const resp2 = await getEnterpriseInfo({ uid: uid, sid: uid }); // 得到新头像url
        this.userIconUrl = resp2.data.data.pictureUrl;
      }
      else this.$message.error('上传失败!');
    },
    submitBasicInfo: async function() { // 提交基本信息
      const resp = await updateEnterpriseInfo(this.userBasicData);
      if (resp.status == 200 && resp.data.code == 'success') this.$message.success('保存成功!');
      else this.$message.error('保存失败!');
    },
  }
}
</script>

<style scoped>

</style>