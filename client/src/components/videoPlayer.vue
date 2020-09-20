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
    <!-- 进度条 -->
    <div class="controller">
      <div class="controller-bar">
        <div class="load-bar" :style="{ width: loadPerecent + '%' }"></div>
        <div class="play-bar" :style="{ width: playPerecent + '%' }">
          <i class="el-icon-apple bar-header"></i>
        </div>
      </div>
      <div class="controller-footer">
        <i v-if="videoIsPlay" class="el-icon-video-pause" @click="changePlay"></i>
        <i v-if="!videoIsPlay" class="el-icon-video-play" @click="changePlay"></i>
        <span id="curtime">{{ curtime }}</span>/
        <span id="duration">{{ durationtime }}</span>
        <!-- 音量 -->
        <span>
          <div
           :style="{ left: volumeInfo.xAxis + 'px', top: volumeInfo.yAxis + 'px' }"
           class="volume-box"
           v-show="volumeInfo.volumeVisible"
           @mouseleave="closeVolume">
            <div class="box-arrow"></div>
            <div class="box-shadow"></div>
            <div class="box-slider">
              <div class="volume-data">{{ volumeInfo.volume }}</div>
              <el-slider
                @change="changeData"
                v-model="volumeInfo.volume"
                vertical
                :show-tooltip="false"
                input-size="mini"
                tooltip-class="tooltip-class"
                height="50px">
              </el-slider>
            </div>
          </div>
          <i v-show="!volumeInfo.isMute"
           class="el-icon-microphone volume-btn"
           @mouseover="showVolume"
           @click="changeMute">
          </i>
          <i v-show="volumeInfo.isMute"
           class="el-icon-turn-off-microphone volume-btn"
           @mouseover="showVolume"
           @click="changeMute">
          </i>
        </span>
        <span><i class="el-icon-full-screen full-screen-btn" @click="fullScreen"></i></span>
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
        isMute: false,
        volume: 100,
        volumeVisible: false,
        xAxis: 0,
        yAxis: 0
      }
    }
  },
  methods: {
    //开始或停止播放
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
    //开始监听播放进度
    startMonitor() {
      this.timer = setInterval(() => {
        let player = this.$refs.videoplayer;
        this.curtime = this.formatTime(player.currentTime);
        this.loadPerecent = ( player.buffered.end(0) / player.duration ) * 100;
        this.playPerecent = ( player.currentTime / player.duration ) * 100;
      },500)
    },
    //停止监听播放进度
    stopMonitor() {
      clearInterval(this.timer);
      this.timer = null;
    },
    //格式化时长
    formatTime(time) {
      let res ="";
      //小时
      let h = Math.floor(time/3600);
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
    //显示音量栏
    showVolume() {
      let domI =  event.toElement.getBoundingClientRect();
      this.volumeInfo.xAxis = domI.left + 16/2 - 50/2 - 1;
      this.volumeInfo.yAxis = domI.top + document.documentElement.scrollTop - 100 - 13;
      this.volumeInfo.volumeVisible = true;
    },
    //关闭音量栏
    closeVolume() {
      this.volumeInfo.volumeVisible = false;
    },
    //slider的值改变
    changeData() {
      this.volumeInfo.isMute = false;
      this.changeVolume();
    },
    //静音或取消静音
    changeMute() {
      this.volumeInfo.isMute = !this.volumeInfo.isMute;
      this.changeVolume();
    },
    //改变播放器的音量
    changeVolume() {
      let player = this.$refs.videoplayer;
      if(this.volumeInfo.isMute){
        player.volume = 0;
      }else{
        player.volume = this.volumeInfo.volume / 100;
      }
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
    padding-top: 2%;
    padding-bottom: 1%;
    padding-left: 1%;
    padding-right: 1%;
    width: 98%;
    height: 35px;
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
      }
      .play-bar{
        width: 50%;
        text-align: right;
        height: 3px;
        color: white;
        position: relative;
        top: -3px;
        background-color: rgb(238, 161, 208);
        .bar-header{
          position: relative;
          top: -8px;
          // right: -8px;
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
        // opacity会被子元素继承，改用rgba
        // rgba不兼容IE7,IE8
        // background-color: black;
        // opacity: 0.5;
        background-color: rgba(0, 0, 0, 0.5);
        .box-arrow{
          width: 0;
          height: 0;
          border: 10px solid transparent;
          border-top-color: rgba(0, 0, 0, 0.5);
          position: relative;
          top: 100%;
          left: 15px;
        }
        .box-shadow{
          width: 0;
          height: 0;
          border: 10px solid transparent;
          background-color: transparent;
          border-top-color: rgba(0, 0, 0, 0.5);
          position: relative;
          top: 79%;
          left: 15px;
        }
        .box-slider{
          opacity: 2;
          position: relative;
          top: -35px;
          left: 5px;
          .volume-data{
            text-align: center;
            width: 76%;
            margin-bottom: 10px;
          }
        }
      }
      .volume-btn{
        cursor: pointer;
      }
      .full-screen-btn{
        cursor: pointer; 
      }
    }
  }
}
</style>