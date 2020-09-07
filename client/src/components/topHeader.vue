<template>
  <div class="headerContainer">
    <div class="header">
      <div class="header-left">
        <div class="content">logo</div>
        <div class="content">首页</div>
        <div class="content">排行</div>
        <el-input
        type="text"
        placeholder="关键词"
        suffix-icon="el-icon-search">
        </el-input>
      </div>
      <div class="header-right">
        <el-avatar :src="profile" :size="36"></el-avatar>
        <div v-if="!isLogin">
          <el-button>登录</el-button>
          <el-button type="primary">注册</el-button>
        </div>
        <div class="content" v-if="isLogin">{{ username }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    profile(){
      let tem = this.$store.state.poster?this.$store.state.poster : "default.jpg"
      return "http://127.0.0.1:8633/api/user/getposter?poster=" + tem
    },
    username(){
      return this.$store.state.name
    },
    isLogin(){
      return this.$store.state.isLogin
    }
  }
}
</script>

<style lang="scss" scoped>
.headerContainer{
  height: 45px;
  width: 100%;
  box-shadow: rgb(228, 224, 224) 0 1px;

  .header{
    height: 100%;
    width: 90%;
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: space-between;
    margin: 10px 5% 15px 5%;

    .header-left{
      width: 600px;
      display: -webkit-flex; /* Safari */
      display: flex;
      justify-content: space-between;

      .content{
        padding: 0 5px 0 5px;
        width: 70px;
        line-height: 36px;
      }
    }

    .header-right{
      width: 250px;
      display: -webkit-flex; /* Safari */
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>