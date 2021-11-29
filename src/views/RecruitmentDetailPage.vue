<template>
  <top-nav/>
  <el-row style="margin-top:20px">
    <!-- 页面右部主体部分 -->
    <el-col :offset="3" :span="12" style="margin-right:20px">
      <!-- 招聘名称卡片 -->
      <el-card>
        <user-brief-disp v-bind="user" />
        <el-divider/>
        <div class="mini-text">招聘中</div>
        <h1 id="title">{{ recruitmentTitle }}</h1>
        <el-row>
          <el-col :span="18">
            <div id="salary">{{ salary }}</div>
            <div class="medium-text">{{ limit }}</div>
          </el-col>
          <el-col :span="6">
            <el-button style="margin-top:10px;float:right;" @click="postResume">投递简历</el-button>
          </el-col>
        </el-row>
      </el-card>
      <!-- 招聘详情卡片 -->
      <el-card style="margin-top:20px">
        <!-- <div class="medium-text">职位详情</div>
        <el-divider/> -->
        <div style="margin-top:5px"><span id="text-area"/></div>
      </el-card>
      <!-- 公司位置卡片 -->
      <el-card style="margin-top:20px">
      </el-card>
    </el-col>
    <!-- 页面左部 -->
    <el-col :span="5">
      <user-recommend-card/>
    </el-col>
  </el-row>
</template>

<script>
import TopNav from '@/components/TopNav';
import UserBriefDisp from '@/components/UserBriefDisp';
import UserRecommendCard from '@/components/UserRecommendCard';
import VditorPreview from 'vditor/dist/method.min';
import '@/assets/vditor.css';
// import Vditor from 'vditor';

export default {
  // mounted() {
  //   console.log(this.$route.params.rid);
  //   this.editor = new Vditor('text-area', {
  //     width: 500,
  //     height: 500,
  //     toolbar: ['emoji', 'br', 'bold', '|', 'line'],
  //     cache: {
  //       enable: false,
  //     },
  //     blur: value => { console.log(value) },
  //     mode: "wysiwyg"
  //   })
  // },
  components: {
    TopNav,
    UserRecommendCard,
    UserBriefDisp
  },
  created() {
    this.recruitmentTitle = '资深前端研发-到综商家';
    this.salary = '20-40K·15薪';
    this.limit = '上海 · 1-3年 · 本科';
    this.user = {
      userId: 123,
      userName: '美团',
      userType: 'company',
      userIconUrl: '',
      userBriefInfo: '互联网公司',
    }
    this.detailedInfo = `# 职位描述
## 招聘方向
前端、安卓、IOS
## 岗位职责
- 业务需求：负责到综以及到店B端系统的前端技术方案设计、需求把控、核心功能开发，将业务需求拆解细化并实施；
- 质量保障： 保障业务的技术质量，负责日常Case跟进，对问题进行原因分析，找到RootCause；
- 终端平台化建设：配合终端平台化建设落地，基于业务实际情况反馈问题；
- 业务技术建设：参与或主导团队内部重要技术项目的规划及落地；
## 岗位基本要求：
+ 研发经验： 2年以上互联网研发工作经验；
+ 技术栈：对React/Vue、Webpack、组件库、动静分离，ESLint有深入的理解；
+ 实战：对于业务需求有一定抽象能力，并且定期对自己工作进行复盘总结；
# 公司介绍
美团的使命是“帮大家吃得更好，生活更好”。作为一家生活服务电子商务平台，公司聚焦“Food +Platform”战略，以“吃”为核心，通过科技创新，和广大商户与各类合作伙伴一起，努力为消费者提供品质生活，推动生活服务业需求侧和供给侧数字化升级。
2018年9月20日，美团正式在港交所挂牌上市。美团将始终坚持以客户为中心，不断加大在科技研发方面的投入，更好承担社会责任，更多创造社会价值，与广大合作伙伴一起发展共赢。`
  },
  mounted() {
    VditorPreview.preview(document.getElementById('text-area'), this.detailedInfo);
  },
  data() {
    return {
      recruitmentTitle: '',
      salary: '',
      limit: '',
      detailedInfo: '',
      type: '',
      user: null,
    }
  },
  methods: {
    postResume: function() {
      // TODO
    }
  }
}
</script>

<style scoped>
.el-divider {
  margin: 5px 0px;
}
.mini-text {
  font-size: 10px;
  color: rgb(122 122 122);
}
#title {
  font-weight: 500;
  margin: 5px 0px 10px;
}
#salary {
  font-size: 20px;
}
.medium-text {
  margin-top: 5px;
  font-size: 13px;
  color: rgb(122 122 122);
}
</style>