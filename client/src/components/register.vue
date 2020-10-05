<template>
  <div class="register-container">
    <el-dialog title="注册" :visible.sync="dialogVisible" :before-close="handleDialogClose">
      <el-form 
        :model="form" 
        close-on-click-modal="false" 
        class="form" 
        :rules="formRule" 
        ref="form" >
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
      this.$axios.get(`/user/nameuse?name=${this.form.user_name}`)
        .then(res => {
          if(res.data.flag) {
            return callback(new Error("该名称已被占用"));
          } else {
            callback();
          }
        })
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
      // element的默认关闭事件会改变visible的值，而子组件不能修改props的值，在data中创建一个新值
      dialogVisible: this.registervisible,
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
      this.$refs.form.validate((valid) => {
        if(valid){
          this.$axios.post('/user/register', this.form)
          .then(res => {
            if(res.data.code === 200){
              console.log(res.data)
              alert("注册成功");
              this.changeVisible();
            } else {
              return false;
            }
          });
        }
      })
    },
    handleDialogClose(done) {
      this.changeVisible();
      done();
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
    }
  }
}
</style>