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
      <div class="controller-bar">
        <div class="load-bar">
          <div class="play-bar"></div>
        </div>
      </div>
      <br />
      <div class="controller-footer">
        <input type="button" :value="btnvalue" @click="changePlay">
        <span id="curtime">{{ curtime }}</span>/
        <span id="duration">{{ durationtime }}</span>
        <span><i class="el-icon-microphone"></i></span>
        <span><i class="el-icon-full-screen" @click="fullScreen"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "videoInfo" ],
  data(){
    return {
      curtime: "00:00",
      durationtime: "00:00",
      btnvalue: "play",
      timer: null
    }
  },
  methods: {
    changePlay() {
      let player = this.$refs.videoplayer;
      if(player.paused){
        player.play();
        this.durationtime = this.formatTime(player.duration);
        this.startMonitor();
        this.btnvalue = "pause";
      }else{
        player.pause();
        this.stopMonitor();
        this.btnvalue = "play";
      }
    },
    startMonitor() {
      this.timer = setInterval(() => {
        let player = this.$refs.videoplayer;
        this.curtime = this.formatTime(player.currentTime);
      },500)
    },
    stopMonitor() {
      clearInterval(this.timer);
      this.timer = null;
    },
    formatTime(time) {
      let res ="";
      //小时
      let h = Math.floor(time/3600);
      console.log(h);
      //分钟
      let m = Math.floor(time/60);
      //秒
      let s = Math.floor(time%60);
      if(h !== 0){
        res = h + ":";
      }
      if(m.toString().length === 1){
        res = res + "0" + m + ":";
      }else{
        res = res + m + ":";
      }
      if(s.toString().length === 1){
        res = res + "0" + s;
      }else{
        res = res + s;
      }
      return res;
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
    height: 50px;
    color: white;
    background-color: black;
    .controller-bar{
      height: 20px;
      width: 100%;
      background-color: rgb(236, 233, 233);
      .load-bar{
        width: 80%;
        text-align: right;
        line-height: 20px;
        background-color: rgb(189, 188, 188);
        .play-bar{
          width: 50%;
          text-align: right;
          line-height: 5px;
          background-color: rgb(238, 161, 208);
        }
      }
    }
    .controller-footer{
      display: flex;
    }
  }
}
</style>