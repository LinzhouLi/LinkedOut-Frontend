<template>
  <top-nav/>
  <el-row justify="center" style="margin-top:20px">
    <el-col :sm="13" :xs="24">
      <el-form ref="form" :model="userBasicData" label-width="90px" size="small">
        <!-- 公司信息卡片-->
        <el-card style="margin-bottom:20px" :body-style="{ padding: 0 }">
          <!-- 上传背景图 -->
            <el-upload
              style="width:100%;"
              class="background"
              action=""
              ref="backgroundUploader"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="uploadBackground"
            >
              <el-image :src="backgroundUrl" style="height:150px; width:100%; margin-bottom:-50px;">
                <template #error>
                  <img :src="defaultBackground" style="width:100%; height:150px" />
                </template>
              </el-image>
            </el-upload>
            <!-- 上传头像 -->
            <el-upload
              action=""
              ref="picUploader"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="uploadAvatar"
            >
              <div class="icon-area">
                <user-icon :size="120" :url="userIconUrl" />
              </div>
            </el-upload>
          <!-- 基本信息 -->
          <el-divider/>
          <div style="margin-left: 170px; padding: 20px">
            <el-form-item label="公司名称">
              <el-input style="width:150px" v-model="userBasicData.trueName"></el-input>
            </el-form-item>
            <el-form-item label="所属行业">
              <el-input style="width:300px" v-model="userBasicData.briefInfo"></el-input>
            </el-form-item>
            <el-form-item label="官方网站">
              <el-input style="width:200px" v-model="userBasicData.contactWay"></el-input>
            </el-form-item>
          </div>
        </el-card>

        <!-- 公司介绍 -->
        <el-card style="margin-top: 20px">
          <template #header>
            <span><b>公司介绍</b></span>
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
  upLoadUserImage, upLoadUserBackground,
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
    this.backgroundUrl = data.background;
    
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
      backgroundUrl: '', // 用户背景图片
      defaultBackground: require('@/assets/background.png')
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
    uploadBackground: async function(file) { // 上传背景图
      let params = new FormData();
      params.append('unifiedId', this.userBasicData.unifiedId);
      params.append('file', file.raw, file.name);
      
      const resp1 = await upLoadUserBackground(params);
      if (resp1.status == 200 && resp1.data.code == 'success') {
        this.$message.success('上传成功!');
        const uid = localStorage.getItem('unifiedId');
        const resp2 = await getUserInfo({ uid: uid, sid: uid }); // 得到新背景图url
        this.backgroundUrl = resp2.data.data.background;
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
.background :deep(.el-upload) {
  width: 100%;
}
.icon-area {
  margin-left: 30px;
  width: 120px; 
  padding: 5px; 
  border-radius: 5px; 
  background:#ffffff;
  position: absolute;
  z-index: 10;
}
</style>
