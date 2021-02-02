<template>
  <div id="app">
    <div class="app-header">
      <span class="app-title">后台管理系统</span>
      <div class="header-right">
        <span class="app-time">{{ nowTime | Dayjs }}</span>
        <span class="app-name">{{ adminname }}</span>
      </div>
    </div>

    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu>
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>视频分区管理</template
            >
            <el-menu-item-group>
              <template slot="title">视频分区</template>
              <router-link to="/videotype">
                <el-menu-item index="1-1"> 视频分区 </el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-menu"></i>视频管理</template
            >
            <el-menu-item-group>
              <template slot="title">视频</template>
              <router-link to="/video">
                <el-menu-item index="2-1"> 视频审核 </el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-setting"></i>用户管理</template
            >
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <router-link to="/user">
                <el-menu-item index="3-1"> 用户管理 </el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <router-view></router-view>
      </el-container>
    </el-container>

    <login></login>
  </div>
</template>

<script>
import login from "./components/login.vue";
export default {
  data() {
    return {
      nowTime: new Date(),
    };
  },
  methods: {
    currentTime() {
      setInterval(() => {
        this.nowTime = new Date();
      }, 1000);
    },
  },
  components: {
    login,
  },
  computed: {
    adminid() {
      return this.$store.state.ADID;
    },
    adminname() {
      return this.$store.state.name;
    },
  },
  created() {
    this.currentTime();
  },
  name: "App",
};
</script>
<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 99%;
  padding-left: 0.5%;
  padding-right: 0.5%;
  color: #2c3e50;

  .app-header {
    display: flex;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;

    .app-title {
      font-size: 20px;
    }

    .header-right {
      width: 230px;
      display: flex;
      justify-content: space-between;
    }
  }

  .el-aside {
    color: #333;
    a {
      text-decoration: none;
      color: black;
    }

    .router-link-active {
      text-decoration: none;
    }
  }
}
</style>