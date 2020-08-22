<template>
  <div id="app">

    <div class="app-header">
      <span class="app-header">后台管理系统</span>
      <span class="app-time"></span>
      <span class="app-name">{{adminInfo.name}}</span>
    </div>

    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <!-- <el-aside width="200px" style="background-color: white"> -->
        <el-menu :default-openeds="['1', '1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>视频分区管理</template>
            <el-menu-item-group>
              <template slot="title">视频分区</template>
              <el-menu-item index="1-1">视频分区</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>视频管理</template>
            <el-menu-item-group>
              <template slot="title">视频</template>
              <el-menu-item index="2-1">视频审核</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>用户管理</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- <router-view></router-view> -->
    </el-container>

  <login></login>
  </div>
</template>

<script>
import login from "./components/login.vue"
export default {
  data() {
    return {
      adminInfo: {
        id: this.$store.state.ADID,
        name: this.$store.state.name,
      }
    }
  },
  components: {
    login
  },
  name: 'App'
}
//  margin-top: 60px;
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