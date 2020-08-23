<template>
  <div id="app">

    <div class="app-header">
      <span class="app-title">后台管理系统</span>
      <span class="app-time">{{nowTime}}</span>
      <span class="app-name">{{adminname}}</span>
    </div>

    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>视频分区管理</template>
            <el-menu-item-group>
              <template slot="title">视频分区</template>
              <el-menu-item index="1-1">
                <router-link to="/videotype">视频分区</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>视频管理</template>
            <el-menu-item-group>
              <template slot="title">视频</template>
              <el-menu-item index="2-1">
                <router-link to="/video">视频审核</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>用户管理</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">
                <router-link to="/user">用户管理</router-link>
              </el-menu-item>
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
import login from "./components/login.vue"
export default {
  data() {
    return {
      nowTime: new Date()
    }
  },
  methods: {
    currentTime(){
      setInterval(() => {
        this.nowTime = new Date()
      }, 1000)
    },
  },
  components: {
    login
  },
  computed: {
    adminid() {
      return this.$store.state.ADID
    },
    adminname() {
      return this.$store.state.name
    }
  },
  created() {
    this.currentTime()
  },
  name: 'App'
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .el-aside {
    color: #333;
  }
}
</style>