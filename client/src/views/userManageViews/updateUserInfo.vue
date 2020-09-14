<template>
  <el-container>
    <el-main>
      <el-avatar :size="50" :src="'http://127.0.0.1:8633/api/user/getposter?poster='+form.user_poster"></el-avatar>
      <div class="user-name">
        <el-input v-model="form.user_name"></el-input>
      </div>
      <div class="user-descripe">
        <el-input v-model="form.descripe"></el-input>
      </div>
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
            localStorage.setItem("user_name", res.data.userinfo.user_name);
            localStorage.setItem("user_poster", res.data.userinfo.user_poster);
            localStorage.setItem("user_descripe", res.data.userinfo.user_descripe);
            this.$store.commit("setName", res.data.userinfo.user_name);
            this.$store.commit("setPoster", res.data.userinfo.user_poster);
            this.$store.commit("setDescripe", res.data.userinfo.user_descripe);
            this.user_name = res.data.userinfo.user_name;
            this.user_poster = res.data.userinfo.user_poster;
            this.user_descripe = res.data.userinfo.user_descripe;
            alert("修改成功");
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>