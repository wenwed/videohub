<template>
  <div class="video-player">
    <div class="player-top"></div>
    <video
      class="player"
      ref="videoplayer" 
      :src="videosrc"
      :poster="postersrc"
      @click="changePlay">
    </video>
    <div class="controller">
      <input type="button" :value="btnvalue" @click="changePlay">
      <span id="curtime">{{ curtime }}</span>/
      <span id="duration">{{ durationtime }}</span>
      <span><i class="el-icon-microphone"></i></span>
      <span><i class="el-icon-full-screen" @click="fullScreen"></i></span>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "videoInfo" ],
  data(){
    return {
      curtime: 0,
      durationtime: 0,
      btnvalue: "play",
    }
  },
  methods: {
    changePlay() {
      let player = this.$refs.videoplayer;
      if(player.paused){
        player.play();
        this.durationtime = player.duration;
        this.btnvalue = "pause";
      }else{
        player.pause();
        this.btnvalue = "play";
      }
    },
    fullScreen() {
      let player = this.$refs.videoplayer;
      player.webkitRequestFullScreen();
    }
  },
  computed: {
    videosrc() {
      let tem = this.videoInfo != null?this.videoInfo.video_url : "default.mp4";
      return "http://127.0.0.1:8633/api/video/getvideo?video=" + tem;
    },
    postersrc() {
      let tem = this.videoInfo != null?this.videoInfo.video_poster : "default.jpg";
      return "http://127.0.0.1:8633/api/video/getposter?poster=" + tem;
    },
  }
}
</script>

<style lang="scss">
.video-player{
  .player-top{
    width: 100%;
    height: 20px;
    background-color: black;
  }
  .player{
    width: 100%;
  }
  .controller{
    width: 100%;
    height: 20px;
    color: white;
    background-color: black;
  }
}
</style>