<template>
  <top-nav/>
  <el-row style="margin-top:20px">
    <el-col :offset="3" :span="12" style="margin-right:20px">
      <!-- 个人信息卡片-->
      <el-card :body-style="{ padding: 0 }">
        <el-row style="padding:20px">
          <el-col :span="21">
            <el-row>
              <el-col>
                <user-icon 
                  :size="100" 
                  :url="user.userIconUrl" 
                  style="cursor:pointer"
                />
                </el-col>
              <el-container direction="vertical" style="margin-left:5px">
              <div id="userName">{{ user.userName }}</div>
              <div id="briefInfo">{{ user.briefInfo }}</div>
              <div id="livePlace">位置:&nbsp;{{ user.livePlace }}</div>
              </el-container>
            </el-row>
          </el-col>
          <el-col :span="3">
            <el-button 
               v-show="!isSelf"
              :type="buttonType(user.ifFollowing)"
              @click="follow(index)"
              style="width:76px; padding:0px"
            >
              {{ buttonText(user.ifFollowing) }}
            </el-button>
          </el-col>
        </el-row>
        <el-divider style="margin:0px"/>

        <!-- 详情、动态、在招职位菜单 -->
        <el-menu 
          :default-active="currentMenu"
          :ellipsis="false"
          mode="horizontal"
          router
        >
          <el-menu-item :index="`/userinfo/${userId}/home`">         
            个人信息
          </el-menu-item>
          <el-menu-item :index="`/userinfo/${userId}/tweets`">
            动态
          </el-menu-item>
        </el-menu>
      </el-card>
      <!-- <el-card style="margin-bottom:20px">
       <el-container direction="horizontal"  style="padding:5px">
         <el-col :span="18">
           <user-icon 
             :size="100" 
             :url="user.userIconUrl" 
             style="cursor:pointer"
           />
           <div id="userName">{{user.userName}}</div>
           <div id="briefInfo">{{user.briefInfo}}</div>
           <div id="livePlace">所在地：{{user.livePlace}}</div>
           <el-container direction="horizontal" id="buttons">
             <el-button>关注</el-button>
           </el-container>
         </el-col>
         <el-col style="margin-top:100px">
           <el-container direction="horizontal" style="cursor:pointer" @click="toEducation">
             <user-icon :size="50"/>
             <h2 style="font-size:18px; margin-left:10px">{{workExperienceList[0].enterprise}}</h2>
           </el-container>
           <el-container direction="horizontal" style="margin-top: 10px; cursor:pointer" @click="toWork">
             <user-icon :size="50"/>
             <h2 style="font-size:18px; margin-left:10px">{{educationExperienceList[0].college}}</h2>
           </el-container>
         </el-col>
       </el-container>
      </el-card> -->
      
      <router-view />
    </el-col>

    <el-col :span="5">
      <user-recommend-card :ifFooter="false" />
    </el-col>
  </el-row>
  <page-footer />
</template>

<script>
import TopNav from '@/components/TopNav';
import UserIcon from '@/components/UserIcon';
import UserRecommendCard from '@/components/UserRecommendCard';
import PageFooter from '../../components/PageFooter.vue';
import { ElNotification } from 'element-plus';
import {getUserInfo} from '@/apis/users.js';
import {updateFollow,deleteFollow} from '@/apis/tweet.js';

export default {
  components: {
    TopNav,
    UserIcon,
    UserRecommendCard,
    PageFooter
  },
  created:async function(){
    this.user = {
      userId: 102,
      userName: '张三',
      userIconUrl: '',
      briefInfo: '同济大学学生',
      livePlace: '上海',
      ifFollowing: false
    };
    this.currentMenu = this.$route.path;
    this.userId = this.$route.params['uid']; // 获取页面参数
  },
  mounted:async function(){
    const params={
      uid:localStorage.getItem('unifiedId'),
      sid:this.userId,
    }
    this.isSelf=localStorage.getItem('unifiedId')===this.userId;
    const resp=await getUserInfo(params);
    const datas=resp.data.data;
    this.user={
      userId:datas.unifiedId,
      userName:datas.trueName,
      briefInfo:datas.briefInfo,
      livePlace:datas.livePlace,
      ifFollowing:datas.isSubscribed,
      userIconUrl:datas.pictureUrl
    }
    //todo 拿到数据之后进行修改
  },
  data() {
    return{
      currentMenu: '',
      user: null,
      userId: 0,
      tweetList:[],
      workExperienceList:[],
      educationExperienceList:[],
      isSelf:false,
    }
  },
  watch: {
    $route(e) {
      this.currentMenu = e.path;
    }
  },
  methods: {
    toWork: function(){
      document.getElementById("work").scrollIntoView()
    },
    toEducation: function(){
      document.getElementById("education").scrollIntoView()
    },
    buttonType: (flag) => {
      return flag ? 'primary' : '';
    },
    buttonText: (flag) => {
      return flag ? '已关注' : '关注';
    },
    follow: async function() {
      // TODO
      const params={
        unifiedId:localStorage.getItem('unifiedId'),
        subscribeId:this.userId,
      }
      if(this.user.ifFollowing) { // 已关注
        const resp=await deleteFollow(params);
        ElNotification({
          title: '取关成功',
          type: 'success',
        });
        this.user.ifFollowing = false;
      }
      else { // 未关注
        const resp=await updateFollow(params);
        ElNotification({
          title: '关注成功',
          type: 'success',
        });
        this.user.ifFollowing = true;
      }
    },
  },
}
</script>

<style scoped>
#userName {
  font-size: 23px;
  font-weight: 650;
  margin: 5px 0px 10px;
}
#briefInfo {
  font-size: 15px;
  color: rgb(122 122 122);
  margin: 0px 0px 10px;
}
#livePlace {
  font-size: 15px;
}
#buttons {
  margin: 15px 0px 0px 0px;
}
.el-menu--horizontal>.el-menu-item {
  height: 45px;
}
.el-divider {
  margin: 10px;
}
</style>