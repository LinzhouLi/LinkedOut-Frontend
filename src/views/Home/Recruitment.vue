<template>
  <el-container direction="vertical">
    <!-- 分割线 -->
    <el-row>
      <el-col :offset="1" :span="19">
        <el-divider style="margin: 18px 0px;"/>
      </el-col>
      <el-col :span="4">
        <div 
          class="refresh-div"
          @click="reloadInitialRecruitments" 
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
          <recruitment-disp @update-after-del="reloadInitialRecruitments" style="margin-bottom:20px" v-bind="item" />
        </div>
      </template>
    </el-skeleton>
    <!-- 没有招聘信息时的页面底部 -->
    <div v-if="loadAll">
      <el-divider style="margin: -5px 0px;" />
      <div 
        class="refresh-div" 
        @click="reloadInitialRecruitments"
        style="margin: 20px 0px"
      >
      没有更多招聘信息了, 点击刷新 :)
      </div>
    </div>
    <!-- 正在加载更多招聘信息时的页面底部 -->
    <div v-if="loadingMoreRecruitments">
      <el-row justify="center" style="margin: -5px 0px 20px;">
        <el-icon :size="20" class="is-loading"><loading /></el-icon>
      </el-row>
    </div>
  </el-container>
</template>

<script>
import RecruitmentDisp from '@/components/RecruitmentDisp';
import { Loading, RefreshRight } from '@element-plus/icons';
import { getRecommendPositions } from '@/apis/recruit.js';

export default {
  components: {
    RecruitmentDisp,
    Loading,
    RefreshRight
  },
  created() {
    this.reloadInitialRecruitments();
  },
  mounted() {
    window.onscroll = () => {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 距离顶部的距离
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight; // 可视区的高度
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight; // 滚动条的总高度
      if(scrollTop + windowHeight >= scrollHeight){ // 加载更多招聘信息
        if(!this.loadingInitialRecruitments && !this.loadingMoreRecruitments && !this.loadAll) {
          this.loadMoreRecruitments();
        }
      } 
    }
  },
  data() {
    return {
      loadingInitialRecruitments: true, // 是否正在加载初始招聘信息
      loadingMoreRecruitments: false, // 是否正在加载更多招聘信息
      recruitmentList: [], // 是否加载结束
      loadAll: false
    }
  },
  methods: {
    reloadInitialRecruitments: async function() { // 加载初始招聘信息
      this.recruitmentList = []; // 清空招聘列表
      this.loadAll = false;
      this.loadingInitialRecruitments = true; // 开始加载

      const params = { unifiedId: localStorage.getItem('unifiedId') };
      const resp = await getRecommendPositions(params);
      
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
      if (this.recruitmentList.length == 0) this.loadAll == true; // 相当于加载结束
      this.loadingInitialRecruitments = false; // 加载结束
    },
    loadMoreRecruitments: async function() { // 加载更多招聘信息
      this.loadingMoreRecruitments = true; // 开始加载
      
      const params = {
        unifiedId: localStorage.getItem("unifiedId"),
        momentId: this.recruitmentList[this.recruitmentList.length-1].recruitmentId
      }
      const resp = await getRecommendPositions(params);
      const recruitmentData = resp.data.data;

      if (recruitmentData.length === 0) { // 没有更多职位则加载完毕
        this.loadAll = true;
        this.loadingMoreRecruitments = false;
        return;
      }

      for (let item of recruitmentData) {
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
        })
      }

      this.loadingMoreRecruitments = false;
    }
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