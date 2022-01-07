<template>
  <el-row justify="center">
    <el-col :sm="20" :xs="24">
      <!-- 分割线 -->
      <el-row>
        <el-col :offset="1" :span="19">
          <el-divider style="margin: 18px 0px;"/>
        </el-col>
        <el-col :span="4">
          <div 
            class="refresh-div"
            @click="loadPostedRecruitments" 
            style="margin:8px 10px 0px; display: flex;"
          >
            <el-icon :size="20"><refresh-right /></el-icon>
            <div>刷新</div>
          </div>
        </el-col>
      </el-row>
      <el-skeleton :loading="loadingInitialRecruitments" animated :count="3">
        <!-- 加载状态骨架屏 -->
        <template #template>
          <el-card style="margin-bottom:20px">
            <el-skeleton-item variant="h3" style="width:20%" />
            <el-skeleton-item/>
            <el-skeleton-item/>
            <el-skeleton-item style="width:30%"/>
          </el-card>
        </template>
        <!-- 加载完成的招聘信息 -->
        <template #default>
          <div v-for="(item,index) in recruitmentList" :key="index">
            <recruitment-disp style="margin-bottom:20px" @update-after-del="loadPostedRecruitments" v-bind="item" />
          </div>
        </template>
      </el-skeleton>
    </el-col>
  </el-row>
</template>

<script>
import { getPostedRecruitments } from '@/apis/recruit.js';
import RecruitmentDisp from '@/components/RecruitmentDisp';
import { RefreshRight } from '@element-plus/icons';

export default {
  components: {
    RecruitmentDisp,
    RefreshRight
  },
  mounted() {
    this.loadPostedRecruitments();
  },
  data() {
    return {
      loadingInitialRecruitments: false,
      recruitmentList: [],
    }
  },
  methods: {
    loadPostedRecruitments: async function() { // 加载初始招聘信息
      this.recruitmentList = []; // 清空招聘列表
      this.loadingInitialRecruitments = true; // 开始加载

      const selfId = localStorage.getItem('unifiedId');
      if (selfId != this.$route.params['uid']) {
        this.loadingInitialRecruitments = false; // 加载结束
        return;
      }

      const params = { unifiedId: selfId };
      const resp = await getPostedRecruitments(params);
      console.log(resp)
      const recruitmentsData  = resp.data.data;
      for (let item of recruitmentsData) {
        this.recruitmentList.push({
          recruitmentId: item.jobId,
          unifiedId: item.unifiedId,
          userName: item.trueName,
          userType: item.userType,
          userIconUrl: item.pictureUrl,
          userBriefInfo: item.briefInfo,
          recruitmentTitle: item.jobName,
          recruitmentType: item.positionType,
          salary: item.reward,
          recordTime: item.recordTime
        });
      }
      this.loadingInitialRecruitments = false; // 加载结束
    },
  }
}
</script>

<style scoped>
.refresh-div {
  font-size: 14px;
  color: rgb(122 122 122);
  align-items: center;
  text-align: center;
  cursor: pointer;
}
.refresh-div:hover {
  color: #409eff;
}
</style>
