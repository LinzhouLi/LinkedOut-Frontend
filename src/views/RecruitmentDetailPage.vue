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
      <el-card style="margin-top:20px" :body-style="{ padding: '0px' }">
        <div style="margin: 15px 20px; display:flex;">
          <el-icon :size="18"><location-information /></el-icon>
          <div style="font-size:15px;">{{ location }}</div>
        </div>
        <div id="map-container" @click="showFullMap" />
      </el-card>
    </el-col>
    <!-- 页面左部 -->
    <el-col :span="5">
      <user-recommend-card :ifFooter="false" />
    </el-col>
  </el-row>
  <page-footer/>

  <!-- fullMap弹出窗口 -->
  <el-dialog
    v-model="ifShowFullMap"
    width="60%"
    custom-class="map-dialog"
    :before-close="fullMapClose"
    destroy-on-close
    center
  >
    <template #title>
      <div class="dialog-map-title">
        <el-icon :size="18"><location-information /></el-icon>
        <div style="font-size:15px;">{{ location }}</div>
      </div>
    </template>
    <div id="full-map-container" />
  </el-dialog>
</template>

<script>
import TopNav from '@/components/TopNav';
import UserBriefDisp from '@/components/UserBriefDisp';
import UserRecommendCard from '@/components/UserRecommendCard';
import VditorPreview from 'vditor/dist/method.min';
import '@/assets/vditor.css';
import AMapLoader from '@amap/amap-jsapi-loader';
import { LocationInformation } from '@element-plus/icons';
import PageFooter from '@/components/PageFooter';

export default {
  components: {
    TopNav,
    UserRecommendCard,
    UserBriefDisp,
    LocationInformation,
    PageFooter
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
    this.location = '同济大学嘉定校区20号楼'
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
    // markdown 渲染器
    VditorPreview.preview(document.getElementById('text-area'), this.detailedInfo);
    // 高德地图
    AMapLoader.load({ // 地图加载器
      key: '7b0368f9798bd0bfe3d901a47f90f8f6',
      plugins: ['AMap.PlaceSearch']
    }).then((AMap) => {
      let placeSearch = new AMap.PlaceSearch(); // 创建位置搜索类
      placeSearch.search(this.location, (status, result) => {
        if(status == 'complete') {
          this.pos = result.poiList.pois[0].location; // 搜索结果的第一个
          this.map = new AMap.Map(document.getElementById('map-container'), { // 创建地图
            zoom: 17,
            center: [this.pos.lng, this.pos.lat],
            zoomEnable: false,
            dragEnable: false
          });
          let marker = new AMap.Marker({ // 创建标点
            position: [this.pos.lng, this.pos.lat],
            clickable: false,
            title: result.poiList.pois[0].name
          });
          this.map.add(marker);
        }
      })
    })
  },
  beforeDestroy() {
    this.map.destroy(); // 销毁地图
  },
  data() {
    return {
      recruitmentTitle: '',
      salary: '',
      limit: '',
      detailedInfo: '',
      type: '',
      user: null,
      location: '',
      map: null,
      ifShowFullMap: false,
      fullMap: null,
      pos: null,
    }
  },
  methods: {
    postResume: function() {
      // TODO
    },
    showFullMap: function() {
      this.ifShowFullMap = true;
      AMapLoader.load({ 
        key: '7b0368f9798bd0bfe3d901a47f90f8f6'
      }).then((AMap) => {
        this.fullMap = new AMap.Map(document.getElementById('full-map-container'), {
          zoom: 17,
          center: [this.pos.lng, this.pos.lat],
        })
        let marker = new AMap.Marker({ // 创建标点
          position: [this.pos.lng, this.pos.lat]
        });
        this.fullMap.add(marker);
      })
    },
    fullMapClose: function(done) {
      this.fullMap.destroy();
      done();
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
#map-container {
  height: 150px;
  cursor: pointer;
}
#full-map-container {
  height: 500px;
}
</style>

<style>
.map-dialog {
  --el-dialog-padding-primary: 0px;
}
.map-dialog .el-dialog__body {
  padding: 0px;
}
.map-dialog .el-dialog__header {
  padding-bottom: 0px;
}
.map-dialog .el-dialog__headerbtn {
  top: 15px;
  right: 15px;
}
.dialog-map-title {
  padding: 15px 20px 10px;
  display:flex;
}
</style>