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
           <div class="play-bar">
             <i class="el-icon-apple bar-header"></i>
           </div>
        </div>
      </div>
      <div class="controller-footer">
        <i v-if="videoIsPlay" class="el-icon-video-pause" @click="changePlay"></i>
        <i v-if="!videoIsPlay" class="el-icon-video-play" @click="changePlay"></i>
        <span id="curtime">{{ curtime }}</span>/
        <span id="duration">{{ durationtime }}</span>
        <span>
          <div
            :style="{left: volumeInfo.xAxis + 'px', top: volumeInfo.yAxis + 'px'}"
            class="volume-box"
            v-show="volumeInfo.volumeVisible">
              <div class="box-arrow"></div>
              <div class="box-shadow"></div>
            </div>
          <i class="el-icon-microphone volume-btn" @mouseover="showVolume"></i>
        </span>
        <!-- <el-popover
          popper-class="volume-popover"
          placement="top-start"
          width="10"
          trigger="hover">
          <el-slider
            class="volume-slider"
            v-model="volume"
            vertical
            tooltip-class="volume-slider"
            height="50px">
          </el-slider>
          <i class="el-icon-microphone" slot="reference"></i>
        </el-popover> -->
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
      loadPerecent: 0,
      playPerecent: 0,
      videoIsPlay: false,
      timer: null,
      volumeInfo: {
        volume: 100,
        volumeVisible: false,
        xAxis: 0,
        yAxis: 0
      }
    }
  },
  methods: {
    changePlay() {
      let player = this.$refs.videoplayer;
      if(player.paused){
        player.play();
        this.durationtime = this.formatTime(player.duration);
        this.startMonitor();
        this.videoIsPlay = true;
      }else{
        player.pause();
        this.stopMonitor();
        this.videoIsPlay = false;
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
    },
    showVolume() {
      let domI =  event.toElement.getBoundingClientRect();
      this.volumeInfo.xAxis = domI.x + 16/2 - 50/2 - 1.5;
      this.volumeInfo.yAxis = domI.y + document.documentElement.scrollTop - 100 - 13;
      this.volumeInfo.volumeVisible = true;
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
    display: block;
  }
  .controller{
    padding-top: 7px;
    padding-bottom: 5px;
    padding-left: 5px;
    padding-right: 5px;
    width: 100%;
    height: 40px;
    color: white;
    background-color: black;
    .controller-bar{
      height: 3px;
      width: 100%;
      background-color: rgb(236, 233, 233);
      .load-bar{
        width: 80%;
        text-align: right;
        height: 3px;
        background-color: rgb(189, 188, 188);
        .play-bar{
          width: 50%;
          text-align: right;
          // padding-right: 20px;
          height: 3px;
          color: white;
          background-color: rgb(238, 161, 208);
          .bar-header{
            position: relative;
            top: -8px;
            right: -8px;
          }
        }
      }
    }
    .controller-footer{
      margin-top: 10px;
      height: 20px;
      .volume-box{
        width: 50px;
        height: 100px;
        position: absolute;
        background-color: black;
        opacity: 0.5;
        .box-arrow{
          width: 0;
          height: 0;
          border: 10px solid transparent;
          opacity: 0.5;
          border-top-color: black;
          position: relative;
          top: 100%;
          left: 15px;
        }
        .box-shadow{
          width: 0;
          height: 0;
          border: 10px solid transparent;
          background-color: transparent;
          border-top-color: black;
          position: relative;
          top: 79%;
          left: 15px;
        }
      }
      .volume-btn{
        color: white;
      }
    }
  }
}
</style>