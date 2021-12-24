<template>
  <top-nav/>
  <el-row style="margin-top:20px">
    <el-col :offset="3" :span="12" style="margin-right:20px">
      <!-- 公司信息卡片-->
      <el-card style="margin-bottom:20px">
         <user-icon 
             :size="100" 
             :url="user.userIconUrl" 
             style="cursor:pointer"
           />
         <el-divider/>
         <el-row>
           <div id="userName">公司名</div> 
           <div style="margin-top: 10px; margin-left:140px; margin-right:20px" v-if="!modifyUserName">{{user.userName}}</div>
           <div style="margin-top: 10px; margin-left:140px" v-if="modifyUserName">
             <el-input v-model="userNameInput" placeholder="请输入新公司名"/>
             <el-row style="margin-top: 30px">
               <el-button @click="saveUserName" type="primary" :disabled="userNameInput==''" size="mini">
                 保存
               </el-button>
               <el-button @click="modifyUserName=false; userNameInput=''" size="mini">
                 取消
               </el-button>
             </el-row>
           </div>
           <el-button @click="modifyUserName=true;" v-if="!modifyUserName" size="mini">
               修改
           </el-button>
         </el-row>
           
         <el-divider/>
          <el-row>
            <div id="briefInfo">简介</div>
            <div style="margin-top: 10px; margin-left:160px; margin-right:20px" v-if="!modifyBriefInfo">{{user.briefInfo}}</div>
            <div style="margin-top: 10px; margin-left:160px" v-if="modifyBriefInfo">
             <el-input v-model="briefInfoInput" placeholder="请输入新简介"/>
             <el-row style="margin-top: 30px">
               <el-button @click="saveBriefInfo" type="primary" :disabled="briefInfoInput==''" size="mini">
                 保存
               </el-button>
               <el-button @click="modifyBriefInfo=false; briefInfoInput=''" size="mini">
                 取消
               </el-button>
             </el-row>
           </div>
           <el-button @click="modifyBriefInfo=true" v-if="!modifyBriefInfo" size="mini">
               修改
           </el-button>
          </el-row>
         <el-divider/>

          <el-row>
           <div id="contactWay">联系方式</div>
           <div style="margin-top: 10px; margin-left:120px; margin-right:20px" v-if="!modifyContactWay">{{user.contactWay}}</div>
           <div style="margin-top: 10px; margin-left:120px" v-if="modifyContactWay">
              <el-input v-model="contactWayInput" placeholder="请输入新联系方式(网址)"/>
             <el-row style="margin-top: 30px">
               <el-button @click="saveContactWay" type="primary" :disabled="contactWayInput==''" size="mini">
                 保存
               </el-button>
               <el-button @click="modifyContactWay=false; contactWayInput=''" size="mini">
                 取消
               </el-button>
             </el-row>
           </div>
           <el-button @click="modifyContactWay=true" v-if="!modifyContactWay" size="mini">
               修改
           </el-button>
          </el-row>
          <el-divider/>

          <el-row>
           <div id="email">邮箱</div>
           <div style="margin-top: 10px; margin-left:160px; margin-right:20px" v-if="!modifyEmail">{{user.email}}</div>
           <div style="margin-top: 10px; margin-left:160px" v-if="modifyEmail">
              <el-input v-model="emailInput" placeholder="请输入新邮箱"/>
             <el-row style="margin-top: 30px">
               <el-button @click="saveEmail" type="primary" :disabled="emailInput==''" size="mini">
                 保存
               </el-button>
               <el-button @click="modifyEmail=false; emailInput=''" size="mini">
                 取消
               </el-button>
             </el-row>
           </div>
           <el-button @click="modifyEmail=true" v-if="!modifyEmail" size="mini">
               修改
           </el-button>
          </el-row>
      </el-card>
    </el-col>

    <el-col :span="5">
      <user-recommend-card/>
    </el-col>
  </el-row>
</template>

<script>
import TopNav from '@/components/TopNav'
import UserIcon from '@/components/UserIcon'
import UserRecommendCard from '@/components/UserRecommendCard'


export default {
  components: {
    TopNav,
    UserIcon,
    UserRecommendCard
  },
  created() {
    this.user = {
      userId: 101,
      userName: '字节跳动',
      userIconUrl: '',
      briefInfo: '互联网企业',
      contactWay: 'www.bytedance.com',
      email: 'zijietiaodong@email.com'
    };
    
  },
  data() {
    return{
      user: null,
      userNameInput:'',
      briefInfoInput:'',
      contactWayInput:'',
      emailInput:'',
      modifyUserName: false,
      modifyBriefInfo: false,
      modifyContactWay: false,
      modifyEmail: false
    }
  },
  methods: {
   saveUserName: function(){//保存公司名
     this.user.userName=this.userNameInput
     this.userNameInput=''
     this.modifyUserName=false
   },
   saveBriefInfo: function(){//保存公司简介
     this.user.briefInfo=this.briefInfoInput
     this.briefInfoInput=''
     this.modifyBriefInfo=false
   },
   saveContactWay: function(){//保存联系方式
     this.user.contactWay=this.contactWayInput
     this.contactWayInput=''
     this.modifyContactWay=false
   },
   saveEmail: function(){//保存邮箱
     this.user.email=this.emailInput
     this.emailInput=''
     this.modifyEmail=false
   },
   
  }
}
</script>

<style scoped>
#userName,#briefInfo,#contactWay,#email{
  font-size: 20px;
  font-weight: 650;
  margin: 5px 0px 10px;
}


#buttons{
  margin: 15px 0px 0px 0px;
}


</style>