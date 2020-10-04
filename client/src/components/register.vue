<template>
  <div class="register-container">
    <el-dialog title="注册" :visible.sync="registervisible">
      <el-form :model="form" class="form" :rules="formRule">
        <el-form-item label="名称" class="form-item" prop="userName">
          <el-input
            v-model="form.user_name"
            autocomplete="off"
            maxlength="10"
            show-word-limit
            class="form-input">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" class="form-item" prop="userPass">
          <el-input 
            v-model="form.user_password" 
            autocomplete="off" 
            class="form-input" 
            show-password>
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" class="form-item" prop="userCheckPass">
          <el-input 
            v-model="confirm_password" 
            autocomplete="off" 
            class="form-input" 
            show-password>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button>取 消</el-button>
          <el-button type="primary" @click="sendRegisterForm">确 定</el-button>
        </el-form-item>
      </el-form>     
      <!-- <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="sendRegisterForm">确 定</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: [ "registervisible", "changeVisible" ],
  data() {
    let checkName = (rule, value, callback) => {
      if(!this.form.user_name) {
        return callback(new Error("请输入名称"));
      }
      if(!this.isUsedName(this.form.user_name)) {
        return callback(new Error("该名称已被占用"));
      }
      callback();
    };
    let checkPass = (rule, value, callback) => {
      if(!this.form.user_password) {
        return callback(new Error("请输入密码"));
      }
      callback();
    };
    let confirmPass = (rule, value, callback) => {
      if(!this.confirm_password) {
        return callback(new Error("请输入确认密码"));
      }
      if(this.form.user_password !== this.confirm_password) {
        return callback(new Error("两次输入的密码不同"));
      }
      callback();
    };
    return {
      confirm_password: "",
      form: {
        user_name: "",
        user_password: "",
      },
      formRule: {
        userName: [
          { validator: checkName, trigger: "blur" }
        ],
        userPass: [
          { validator: checkPass, trigger: "blur" }
        ],
        userCheckPass: [
          { validator: confirmPass, trigger: "blur" }
        ]
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
    },
    isUsedName(userName) {
      this.$axios.get(`/user/nameuse?name=${userName}`)
        .then(res => {
          return res.data.flag;
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
      // .dialog-footer {
      //   text-align: center;
      // }
    }
  }
}
</style>