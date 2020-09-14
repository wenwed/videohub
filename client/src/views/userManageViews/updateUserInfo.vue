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
      <el-avatar :size="50" :src="circleUrl"></el-avatar>
      <div class="user-name"></div>
      <div class="user-descripe"></div>
      <el-button type="primary" @click="confirmForm">确定</el-button>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      form: {
        user_name: this.$store.state.name,
        user_poster: this.$store.state.poster,
        user_descripe: this.$store.state.descripe
      }
    }
  },
  methods: {
    confirmForm() {
      this.$axios.post('/user/updateinfo', this.form)
        .then(res => {
          if(res.data.flag === true){
            localStorage.setItem("user_name", res.data.user.user_name);
            localStorage.setItem("user_poster", res.data.user.user_poster);
            localStorage.setItem("user_descripe", res.data.user.user_descripe);
            this.$store.commit("setName", res.data.user.user_name);
            this.$store.commit("setPoster", res.data.user.user_poster);
            this.$store.commit("setDescripe", res.data.user.user_descripe);
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>