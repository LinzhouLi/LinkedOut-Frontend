<template>
  <top-nav/>
  <div class="login">
    <el-card>
      <h2>欢迎登陆 LinkedOut</h2>
      <el-form
        class="login-form"
        :model="model"
        :rules="rules"
        ref="form"
        @submit.prevent="login"
      >
        <el-form-item prop="username">
          <el-input v-model="model.username" placeholder="Username" ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="model.password"
            placeholder="Password"
            type="password"
          ></el-input>
        </el-form-item>


        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            block
          >登陆</el-button>
        </el-form-item>
        <router-link to="register">还没有账号？ 点击注册</router-link>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav';
import { userLogin, getBasicInfo } from '@/apis/users.js';
import { LoginRules as Rules } from '@/utils/loginPage';

// import { Search } from '@element/icons-vue'
export default {
  name: 'login',
  data() {
    return {
      model: {
        username: '',
        password: '',
      },
      loading: false,
      rules: Rules,
    };
  },
  methods: {
    async login() {
      
      this.loading = true;
      const params={
        userName:this.model.username,
        password:this.model.password,
      }
      const resp1=await userLogin(params);
      // console.log(resp1)
      if (resp1.status == 200 && resp1.data.code == 'success') {
        this.$message.success('登陆成功!');
        const { unifiedId, userType } = resp1.data.data;
        localStorage.setItem("unifiedId",unifiedId);
        localStorage.setItem("userType",userType);

        const resp2 = await getBasicInfo(unifiedId);
        if (!resp2.data.data.trueName) { // 用户信息不完善, 跳转页面完善信息
          this.$message.info('请完善用户信息');
          if (userType == 'user') this.$router.push({ name: 'modifyUserInfo' });
          else if (userType == 'company') this.$router.push({ name: 'modifyCompanyInfo' });
        }
        else this.$router.push('/home');
      }
      else {
        const reason = resp1.data.message || '登陆失败'; // 登录失败原因
        this.$message.error(reason + ', 请重新登录');
        this.loading=false;
      }

    },
  },
  components: {
    TopNav,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height:calc(100vh - 100px);
  box-shadow:rgba(0,0,0,0.3) 0px 4px 12px 0px
}

.login-button {
  width: 100%;
  margin-top: 40px;
}
.login-form {
  width: 290px;
}
.forgot-password {
  margin-top: 10px;
}
</style>
<style lang="scss">
$teal: #409eff; //主题色
.el-button--primary {
  background: $teal;
  border-color: $teal;

  &:hover,
  &.active,
  &:focus {
    background: lighten($teal, 7);
    border-color: lighten($teal, 7);
  }
}
.login .el-input__inner:hover {
  border-color: $teal;
}
.login .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
  .el-input__icon {
    width: 30px;
  }
}
.login .el-input input {
  padding-left: 35px;
}
.login .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}
h2 {
  font-family: "Open Sans";
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}
a {
  color: $teal;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    color: lighten($teal, 7);
  }
}
.login .el-card {
  width: 340px;
  display: flex;
  justify-content: center;
}
</style>
