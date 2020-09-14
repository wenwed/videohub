<template>
  <el-container>
    <!-- <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header> -->

    <el-main>
      <div>
        <p>输入原密码</p>
        <el-input v-model="form.old_password" placeholder="请输入内容"></el-input><br />
        <p>输入新密码</p>
        <el-input v-model="form.new_password" placeholder="请输入内容"></el-input><br />
        <el-button @click="cleanForm">清空</el-button>
        <el-button type="primary" @click="confirmForm">确定</el-button>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      form: {
        old_password: "",
        new_password: ""
      }
    }
  },
  methods: {
    cleanForm() {
      this.old_password = "",
      this.new_password = "";
    },
    confirmForm() {
      this.$axios.post('/user/updatepass', this.form)
        .then(res => {
          if(res.data.flag){
            this.old_password = "",
            this.new_password = "";
            alert("修改成功");
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>