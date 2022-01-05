<template>
  <top-nav/>
  <div class="login">
    <el-card>
      <h2>欢迎注册 LinkedOut</h2>
      <el-form
        class="login-form"
        :model="model"
        :rules="rules"
        ref="form"
        @submit.prevent="register"
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

        <el-form-item prop="email">
          <el-input v-model="model.email" placeholder="Email" :disabled="loadingCode">
              <template #append >
                  <el-button @click="sendCode">验证</el-button>
              </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="validateCode">
          <el-input v-model="model.validateCode" placeholder="Validation Code">
          </el-input>
        </el-form-item>

        <!-- <el-form-item prop="validateCode"> -->
          <el-radio v-model="model.userType" label="user">个人</el-radio>
          <el-radio v-model="model.userType" label="company">企业</el-radio>
        <!-- </el-form-item> -->

        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            block
          >注册</el-button>
        </el-form-item>
        <router-link to="login">回到登陆界面</router-link>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav';
import { getEmailCode, userRegister } from '@/apis/users.js';
import { RegisterRules as Rules } from '@/utils/loginPage';

// import { Search } from '@element/icons-vue'
export default {
  name: 'login',
  data() {
    return {
      model: {
        username: '',
        password: '',
        email: '',
        validateCode: '',
        userType: 'user',
      },
      loading: false,
      rules: Rules,
      loadingCode: false,
      validateCode:'',
      haveSentCode: false,
      storedEmail: '' // 防止用户获取验证码后更改Email
    };
  },
  methods: {
    async register() {
      const reg = /(^\s+)|(\s+$)|\s+/g;
      if (reg.test(this.model.username)) {
        this.$message.warning('用户名不能包含空格，请重新输入'); //验证码错误
        return;
      }

      if (
        this.validateCode !== this.model.validateCode ||
        this.storedEmail !== this.model.email
      ){
        this.$message.warning('验证码错误，请重新输入'); //验证码错误
        return;
      }
      
      this.loading = true;
      const params = {
        userName: this.model.username,
        password: this.model.password,
        email: this.model.email,
        userType: this.model.userType
      }
      
      try {
        const resp = await userRegister(params);
        if (resp.status == 200 && resp.data.code == 'success') {
          this.$message.success('注册成功!');
          this.$router.push('/login');
        }
        else throw new Error(resp.data.message);
      } catch(e) {
        const reason = e.message || '验证码发送失败!';
        this.$message.error(reason);
      } finally {
        this.loading = false;
      }

    },
    async sendCode() {  // 拿到code
      if (this.haveSentCode == true) {
        this.$message.warning('验证码已发送, 请稍等!');
        return;
      }
      this.storedEmail = this.model.email;
      this.haveSentCode = true;
      setTimeout(() => {
        this.haveSentCode = false;
      }, 30000);

      this.loadingCode = true;

      try {
        const resp = await getEmailCode({ mail: this.model.email });
        if (resp.status == 200 && resp.data.code == 'success') {
          this.validateCode = resp.data.data;
          this.$message.success('成功发送验证码!');
        }
        else throw new Error(resp.data.message);
      } catch(e) {
        const reason = e.message || '验证码发送失败!';
        this.$message.error(reason);
        this.haveSentCode = false;
      }
      this.loadingCode = false;
    },
  },
  components: {
    TopNav,
  },
};
</script>

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
