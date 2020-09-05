<template>
  <div class="headerContainer">
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
      <el-avatar :src="profile"></el-avatar>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    profile(){
      let tem = this.$store.state.poster?this.$store.state.poster : "default.jpg"
      console.log(tem)
      return "http://127.0.0.1:8633/api/user/getposter?poster=" + tem
    }
  }
}
</script>

<style lang="scss" scoped>
.headerContainer{
  height: 45px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 15px 15px 15px 15px;

  .header-left{
    width: 600px;
    display: flex;
    justify-content: space-between;

    .content{
      padding: 0 5px 0 5px;
      width: 70px;
      line-height: 36px;
    }
  }

  .header-right{
    width: 100px;
  }
}
</style>