<template>
  <div class="temLogin">
    <!-- 登录框 -->
    <el-dialog title="登录" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="管理员账号" type="number" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" type="password" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="loginBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: null,
        password: ""
      },
      dialogFormVisible: !this.$store.state.isLogin
    }
  },
  methods: {
    loginBtn(){}
  }
}
</script>

<style lang="scss" scoped>
.temLogin{
  .el-input{
      width: 300px;
  }
}
</style>