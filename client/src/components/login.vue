<template>
  <div class="login-container">
    <el-dialog title="登录" :visible.sync="loginvisible">
      <el-form :model="form" class="form" prop="userName">
        <el-form-item label="名称" class="form-item">
          <el-input v-model="form.user_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" class="form-item" prop="userName">
          <el-input v-model="form.user_password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="验证码" class="form-item">
          <div>
            <el-input v-model="form.captcha" autocomplete="off" class="form-input"></el-input>
            <img 
              :src="baseUrl+'/getsafecode'+captchaSrc" 
              style="vertical-align: middle; cursor: pointer;" 
              @click="changeCaptcha">
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="loginvisible = false">取 消</el-button>
          <el-button type="primary" @click="sendLoginForm">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: [ "loginvisible", "changeVisible" ],
  data() {
    return {
      baseUrl: "http://127.0.0.1:8633/api",
      formLabelWidth: "400px",
      captchaSrc: "?query=0",
      form: {
        user_name: "",
        user_password: ""
      }
    }
  },
  methods: {
    sendLoginForm() {
      this.$axios.post('/user/login', this.form)
        .then(res => {
          if(res.data.flag){
            localStorage.setItem("userToken", res.data.token);
            localStorage.setItem("USID", res.data.user.USID);
            localStorage.setItem("user_name", res.data.user.user_name);
            localStorage.setItem("user_poster", res.data.user.user_poster);
            localStorage.setItem("register_date", res.data.user.register_date);
            localStorage.setItem("user_descripe", res.data.user.user_descripe);
            localStorage.setItem("isLogin", res.data.flag);
            this.$store.commit("setToken", res.data.token);
            this.$store.commit("setUSID", res.data.user.USID);
            this.$store.commit("setName", res.data.user.user_name);
            this.$store.commit("setPoster", res.data.user.user_poster);
            this.$store.commit("setDate", res.data.user.register_date);
            this.$store.commit("setDescripe", res.data.user.user_descripe);
            this.$store.commit("setLogin", res.data.flag);
            alert("登录成功");
            this.changeVisible();
          }
        })
    },
    //更新验证码图片
    changeCaptcha() {
      this.captchaSrc = "?query=" + Math.random();
    }
  }
}
</script>

<style lang="scss">
.login-container {
  text-align: center;
  .el-dialog__wrapper {
    .el-dialog {
      width: 450px !important;

      .form {
        .form-item {
          text-align: right;
        }
        .el-form-item {
          text-align: right;
        }
        .el-input {
          width: 300px;
        }
        .form-input{
          margin-right: 10px;
          width: 210px;
          vertical-align: middle;
        }
      }
      .dialog-footer {
        text-align: center;
      }
    }
  }
}
</style>