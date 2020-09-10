<template>
  <div class="register-container">
    <el-dialog title="注册" :visible.sync="registervisible">
      <el-form :model="form" class="form">
        <el-form-item label="名称" class="form-item">
          <el-input v-model="form.user_name" autocomplete="off" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="密码" class="form-item">
          <el-input v-model="form.user_password" autocomplete="off" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" class="form-item">
          <el-input v-model="confirm_password" autocomplete="off" class="form-input"></el-input>
        </el-form-item>
      </el-form>     
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="sendRegisterForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: [ "registervisible", "changeVisible" ],
  data() {
    return {
      confirm_password: "",
      form: {
        user_name: "",
        user_password: "",
      }
    }
  },
  methods: {
    sendRegisterForm() {
      this.$axios.post('/user/register', this.form)
        .then(res => {
          if(res.data.code === 200){
            console.log(res.data)
            alert("注册成功");
            this.changeVisible();
          }
        });
    }
  }
}
</script>

<style lang="scss">
.register-container {
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
      }
      .dialog-footer {
        text-align: center;
      }
    }
  }
}
</style>