<template>
  <top-nav/>
  <el-row style="margin-top:20px">
    <!-- 页面右部主体部分 -->
    <el-col :offset="3" :span="12" style="margin-right:20px">
      <!-- 招聘名称卡片 -->
      <el-card>
        <user-brief-disp v-bind="companyUser" />
        <el-divider/>
        <div class="mini-text">招聘中</div>
        <h1 id="title">{{ recruitmentTitle }}</h1>
        <el-row>
          <el-col :span="19">
            <div id="salary">{{ salary }}</div>
            <div class="medium-text">{{ limit }}</div>
          </el-col>
          <el-col :span="5">
            <div v-if="userType == 'user'">
              <el-select 
                @change="postResume"
                :placeholder="ifApplied ? '简历已投递' : '投递简历'"
                :disabled="ifApplied"
              >
              <!-- 普通且有简历用户且未申请过该岗位, 才可投递简历 -->
                <el-option
                  v-for="item in myResumeList"
                  :key="item.resumeName"
                  :label="item.resumeName"
                  :value="item.resumeId"
                >
                </el-option>
              </el-select>
            </div>
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
      <!-- 职位申请人卡片 -->
      <el-card v-if="ifSelf" style="margin-top:20px" :body-style="{ padding: '0px' }">
        <template #header>
          <div><b>职位申请人</b></div>
        </template>
        <el-row>
          <el-col :span=12 v-for="(user, index) in candidates" :key="index">
            <el-container style="padding:5px 10px">
              <user-brief-disp v-bind="user"/>
              <el-button 
                type="text" 
                size="mini"
                style="padding-right:10px"
                @click="openUrl(user.resume)"
              >
                查看简历
              </el-button>
            </el-container>
          </el-col>
        </el-row>
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
import { getPositionDetails, getAllApplicants, postPositionApplication } from '@/apis/recruit.js';
import { getBasicInfo, getResume } from '@/apis/users.js';
import { ElMessageBox } from 'element-plus';

export default {
  components: {
    TopNav,
    UserRecommendCard,
    UserBriefDisp,
    LocationInformation,
    PageFooter
  },
  mounted: async function () {
    this.rid = this.$route.params['rid']; // 获取页面参数
    const uid = localStorage.getItem('unifiedId');
    this.userType = localStorage.getItem('userType');

    // 得到职位详情
    const resp1 = await getPositionDetails({ unifiedId: uid, jobId: this.rid});
    if(resp1.status != 200 || resp1.data.code != 'success') {
      this.$message.error('招聘职位不存在!');
      this.$router.go(-1);
      return;
    }
    const recruitment = resp1.data.data;
    // 设置职位详情信息
    this.recruitmentTitle = recruitment.jobName;
    this.salary = recruitment.reward;
    this.limit = recruitment.limitation;
    this.jobType = recruitment.positionType;
    this.location = recruitment.workPlace;
    this.detailedInfo = recruitment.description;

    // 得到职位发布者基础信息
    const resp2 = await getBasicInfo(recruitment.unifiedId);
    const companyData = resp2.data.data;
    // 设置职位发布者信息
    this.companyUser = {
      unifiedId: companyData.unifiedId,
      userName: companyData.trueName || "匿名用户",
      userType: companyData.userType,
      userIconUrl: companyData.pictureUrl,
      userBriefInfo: companyData.briefInfo
    }

    // 普通用户查看招聘信息, 得到其简历供其选择
    if (this.userType == 'user') {
      const resp2 = await getResume({ unifiedId: uid });
      this.myResumeList = resp2.data.data;
      this.ifApplied = recruitment.ifApplied; // 是否申请过该岗位
    }

    // 查看招聘详情的用户是其发布公司
    if (recruitment.unifiedId == uid) {
      this.ifSelf = true;
      // 调用查看申请者接口
      const params = {
        unifiedId: recruitment.unifiedId,
        jobId: this.rid
      }
      const resp4 = await getAllApplicants(params);
      const candidatesData = resp4.data.data;
      // 设置申请人信息
      for (let item of candidatesData) {
        this.candidates.push({
          unifiedId: item.unifiedId,
          userName: item.trueName,
          userType: item.userType,
          userIconUrl: item.pictureUrl,
          userBriefInfo: item.briefInfo,
          resume: item.resumeUrl
        });
      }
    }
    else this.ifSelf = false;

    // markdown 渲染器
    VditorPreview.preview(document.getElementById('text-area'), this.detailedInfo);

    // 高德地图
    const AMap = await AMapLoader.load({ // 地图加载器
      key: '7b0368f9798bd0bfe3d901a47f90f8f6',
      plugins: ['AMap.PlaceSearch']
    });
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
    });

  },
  beforeDestroy() {
    this.map.destroy(); // 销毁地图
  },
  data() {
    return {
      rid: null,
      candidates: [],
      ifSelf: false,
      ifApplied: false,
      userType: '',
      recruitmentTitle: '',
      salary: '',
      limit: '',
      detailedInfo: '',
      jobType: '',
      companyUser: null,
      location: '',
      myResumeList: [],

      map: null,
      ifShowFullMap: false,
      fullMap: null,
      pos: null,
    }
  },
  methods: {
    openUrl: function(url) {
      window.open(url, "_blank");
    },
    postResume: async function(resumeId) {
      // TODO
      ElMessageBox.confirm(
        '确定投递该岗位?',
        this.recruitmentTitle,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(async () => {
        const params = {
          userId: localStorage.getItem('unifiedId'),
          enterpriseId: this.companyUser.unifiedId,
          jobId: this.rid,
          resumeId: resumeId
        };
        const resp = await postPositionApplication(params);
        if (resp.status == 200 && resp.data.code == 'success') {
          this.$message.success('投递成功!');
          this.ifApplied = true;
        }
        else this.$message.error('投递失败!');
      });
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