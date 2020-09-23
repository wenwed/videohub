<template>
  <el-carousel trigger="click">
    <el-carousel-item v-for="item in videolist" :key="item.VDID" height="200px">
      <router-link :to="'/video/'+item.VDID">
        <el-tooltip :content="item.video_descripe" placement="top">
          <img class="img"
            :src="'http://127.0.0.1:8633/api/video/getposter?poster='+item.video_poster">
        </el-tooltip>
      </router-link>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  props: [ "videolist" ],
}
</script>

<style lang="scss">
.img{
  width: 100%;
}
.el-carousel__indicators{
  top: 150px;
}
.el-carousel__container{
  height: 100%!important;
}
</style>