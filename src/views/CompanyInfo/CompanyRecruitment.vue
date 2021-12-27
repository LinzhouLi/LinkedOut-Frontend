<template>
  <el-row>
    <el-col :offset="2" :span="20">
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
            <recruitment-disp style="margin-bottom:20px" v-bind="item" />
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
    </el-col>
  </el-row>
</template>

<script>
import RecruitmentDisp from '@/components/RecruitmentDisp';
import { Loading, RefreshRight } from '@element-plus/icons';
import {getCompanyAllPosition} from '@/apis/recruit.js'

let recruitment = {
  recruitmentId: 0,
  userId: 123,
  userName: 'Ailibaba',
  userType: 'company',
  userIconUrl: '',
  userBriefInfo: '互联网公司',
  recruitmentTitle: 'xxx前端开发工程师',
  recruitmentType: '前端开发',
  salary: '18-20K',
};

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

      this.cid=this.$route.params.cid;
      
      const resp3=await getCompanyAllPosition({unifiedId:this.cid});
      const data3=resp3.data.data;
      this.recruitmentList=data3;
      this.loadingInitialRecruitments = false; // 开始加载

    },
    loadMoreRecruitments:async function() { // 加载更多招聘信息
      this.loadingMoreRecruitments = true; // 开始加载
      
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