<template>
  <div class="slide-show" @mouseenter="stopPlay" @mouseleave="startPlay">
    <div class="slide-img">
      <router-link :to="'/video/'+videoID">
        <img class="img" v-if="isShow"
          :src="'http://127.0.0.1:8633/api/video/getposter?poster='+videoPoster">
      </router-link>
    </div>
    <div class="slide-footer">
      <h2>{{ videoTitle }}</h2>
      <ul class="slide-pages">
        <li v-for="i in listLength" :key="i" @click="changeTo(i)">
          <div :class="{ active: i===index+1 }"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "videolist" ],
  data() {
    return {
      timer: null,
      isShow: true,
      index: 0
    }
  },
  methods: {
    startPlay() {
      if(this.timer)
        return
      this.timer = setInterval(() => {
        this.nextChangeTo((this.index+1)%this.listLength)
      }, 5000)
    },
    stopPlay() {
      clearInterval(this.timer);
      this.timer = null
    },
    nextChangeTo(i){
      this.index = i;
    },
    preChangeTo(i){
      console.log(i)
    }
  },
  created() {
    this.startPlay()
  },
  computed: {
    listLength() {
      return this.videolist.length
    },
    videoID() {
      if(this.videolist.length)
        return this.videolist[this.index].VDID
      else
        return -1
    },
    videoPoster() {
      if(this.videolist.length)
        return this.videolist[this.index].video_poster
      else
        return "default.jpg"
    },
    videoTitle() {
      if(this.videolist.length)
        return this.videolist[this.index].video_title
      else
        return "null"
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-show{
  background-color: white;
  width: 600px;
  height: 288px;
  overflow: hidden;
  position: relative;

  .slide-img{
    .img{
      width: 100%;
    }
  }

  .slide-footer{
    position: relative;
    top: -50px;
    display: inline;

    .slide-pages li{
      list-style: none;

      width: 7px;
      height: 7px;
      background-color: black;
      border-radius: 50%;

      .active{
        width: 10px;
        height: 10px;
        background-color: red;
      }
    }
  }
}
</style>