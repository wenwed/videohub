<template>
  <el-carousel trigger="click" height="288px">
    <el-carousel-item v-for="item in videolist" :key="item.VDID">
      <router-link :to="'/video/'+item.VDID">
        <img class="img"
          :src="'http://127.0.0.1:8633/api/video/getposter?poster='+item.video_poster">
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
  top: 200px;
}
</style>