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
        <!-- 未登录显示的内容 -->
        <div v-if="!isLogin" class="notLogin">
          <el-avatar @click="changeLogin"  :src="profile" :size="36"></el-avatar>
          <el-button @click="changeLogin">登录</el-button>
          <el-button @click="changeRegister" type="primary">注册</el-button>
        </div>
        <!-- 登陆后显示的内容 -->
        <router-link v-if="isLogin" class="isLogion" :to="'/user/' + $store.state.USID">
          <el-avatar :src="profile" :size="36"></el-avatar>
          <div class="content">{{ username }}</div>
        </router-link>
      </div>
    </div>

    <login :changeVisible="changeLogin" :loginvisible="loginVisible" v-if="loginVisible"></login>
    <register :changeVisible="changeRegister" :registervisible="registerVisible" v-if="registerVisible"></register>
  </div>
</template>

<script>
import login from './login.vue'
import register from './register.vue'
export default {
  components: {
    login,
    register
  },
  data() {
    return {
      loginVisible: false,
      registerVisible: false
    }
  },
  methods: {
    changeLogin() {
      this.loginVisible = !this.loginVisible;
    },
    changeRegister() {
      this.registerVisible = ! this.registerVisible;
    }
  },
  computed: {
    profile(){
      let tem = this.$store.state.poster?this.$store.state.poster : "default.jpg";
      return "http://127.0.0.1:8633/api/user/getposter?poster=" + tem;
    },
    username(){
      return this.$store.state.name;
    },
    isLogin(){
      return this.$store.state.isLogin;
    }
  }
}
</script>

<style lang="scss">
.headerContainer{
  background-color: white;
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
      .notLogin{
        display: flex;
        .el-avatar{
          margin-right: 8px;
        }
      }
      .isLogion{
        display: flex;
        .el-avatar{
          margin-right: 8px;
        }
        .content{
          padding: 0 5px 0 5px;
          width: 70px;
          line-height: 36px;
        }
      }
    }
  }
}
a, a:link, a:visited, a:hover, a:active {
    text-decoration: none;
    color: black;
}
</style>