<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>我的投稿</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">全部视频</el-menu-item>
              <el-menu-item index="1-2">未通过视频</el-menu-item>
              <el-menu-item index="1-2">投稿</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>我的资料</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">修改资料</el-menu-item>
              <el-menu-item index="2-2">修改密码</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    </el-container>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
a, a:link, a:visited, a:hover, a:active {
    text-decoration: none;
    color: black;
}
</style>