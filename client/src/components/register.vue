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
        <el-button @click="loginvisible = false">取 消</el-button>
        <el-button type="primary" @click="loginvisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: [ "registervisible" ],
  data() {
    return {
      confirm_password: "",
      form: {
        user_name: "",
        user_password: "",
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>