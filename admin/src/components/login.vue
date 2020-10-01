<template>
  <div class="temLogin">
    <!-- 登录框 -->
    <el-dialog title="登录" :visible.sync="dialogFormVisible">
      <el-form :model="addform">
        <el-form-item label="管理员账号" :label-width="formLabelWidth">
          <el-input v-model="addform.ADID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="addform.admin_password" autocomplete="off"></el-input>
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
      addform: {
        ADID: null,
        admin_password: ""
      },
      dialogFormVisible: !this.$store.state.isLogin,
      formLabelWidth: '120px'
    }
  },
  methods: {
    //管理员登陆
    loginBtn(){
      this.$axios.post('/admin/login', this.addform)
        .then(res => {
          if(res.data.flag){
            localStorage.setItem("adminToken", res.data.token)
            this.$store.commit("setToken", res.data.token)
            this.$store.commit("setADID", res.data.admin.ADID)
            this.$store.commit("setName", res.data.admin.admin_name)
            this.$store.commit("setLogin", true)
          }
        })
    }
  },
  //computed属性监听对象时候，若对象的引导地址未改变，那么computed将不会检测到。
  //比如object中的某个key对应的value变化了，computed检测不出来。
  computed: {
    temFlag() {
      return !this.$store.state.isLogin
    }
  },
  watch: {
    temFlag(newval) {
      this.dialogFormVisible = newval
    }
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