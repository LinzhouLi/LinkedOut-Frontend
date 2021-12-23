<template>
  <!-- 分割线 -->
  <el-row>
    <el-col :offset="1" :span="19">
      <el-divider style="margin: 18px 0px;"/>
    </el-col>
    <el-col :span="4">
      <div 
        class="refresh-div"
        @click="search" 
        style="margin:8px 10px 0px; display: flex;"
      >
        <el-icon :size="20"><refresh-right /></el-icon>
        <div>刷新</div>
      </div>
    </el-col>
  </el-row>
  <el-skeleton :loading="searching" animated :count="3">
    <!-- 加载状态骨架屏 -->
    <template #template>
      <el-card style="margin-bottom:20px">
        <el-row>
          <el-col :span="3">
            <el-skeleton-item variant="image" style="width:100%; height:100%" />
          </el-col>
          <el-col :offset="1" :span="10">
            <el-skeleton-item variant="h3" style="width:20%" />
            <el-skeleton-item/>
            <!-- <el-skeleton-item style="width:30%"/> -->
          </el-col>
        </el-row>
      </el-card>
    </template>
    <!-- 加载完成的招聘信息 -->
    <template #default>
      <div v-for="(item,index) in resultList" :key="index">
        <el-card style="margin-bottom:20px" :body-style="{ padding: '10px' }">
          <user-brief-disp v-bind="item" />
        </el-card>
      </div>
    </template>
  </el-skeleton>
</template>

<script>
import UserBriefDisp from '../../components/UserBriefDisp.vue';
import { RefreshRight } from '@element-plus/icons';
import {userSearch} from '@/apis/users.js'

let user = {
  userId: 123,
  userName: 'Ailibaba',
  userType: 'company',
  userIconUrl: '',
  userBriefInfo: '互联网公司',
};

export default {
  components: { 
    UserBriefDisp,
    RefreshRight
  },
  created() {
    this.searchKey = this.$route.query.key;
    this.search();
  },
  data() {
    return {
      searchKey: '',
      searching: true,
      resultList: []
    }
  },
  methods: {
    search:async function(){
      this.resultList = [];
      this.searching = true;
      const resp=await userSearch({str:this.searchKey});
      console.log(resp,'123123123')
      this.resultList=resp.data.data;
      this.searching=false;
      // setTimeout(() => {
      //   for(let i = 0; i < 8; i++) {
      //     let t = JSON.parse(JSON.stringify(user));
      //     t.userId = Math.floor(Math.random()*10000);
      //     this.resultList.push(t);
      //   }
      //   this.searching = false;
      // }, 2000);
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
