<template>
  <div class="login-container">
    <el-dialog title="登录" :visible.sync="loginvisible">
      <el-form :model="form" class="form">
        <el-form-item label="名称" class="form-item">
          <el-input v-model="form.user_name" autocomplete="off" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="密码" class="form-item">
          <el-input v-model="form.user_password" autocomplete="off" class="form-input"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="loginvisible = false">取 消</el-button>
        <el-button type="primary" @click="loginvisible = false">登 录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: [ "loginvisible" ],
  data() {
    return {
      formLabelWidth: "400px",
      form: {
        user_name: "",
        user_password: ""
      }
    }
  }
}
</script>

<style lang="scss">
.login-container {
  text-align: center;
  .el-dialog__wrapper {
    .el-dialog {
      width: 400px!important;

      .form {
        .form-item {
          text-align: left;
        }
        .el-form-item {
          text-align: left;
        }
        .el-input {
          width: 300px;
        }
      }
      .dialog-footer {
        text-align: center;
      }
    }
  }
}
</style>