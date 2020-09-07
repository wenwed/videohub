<template>
  <div>
    <top-header></top-header>
    <div class="main-container">
      <div class="video">
        <div class="video-info">
          <span class="video-title">{{videoInfo.video_title}}</span><br />
          <span class="video-type">{{videoInfo.type_tag}}&nbsp;</span>
          <span class="video-date">{{videoInfo.video_date | Dayjs}}</span><br />
          <span class="video-num">{{videoInfo.video_num}}次播放</span>
        </div>
        <div class="video-play">
          <div class="mediaplayer">
            <div class="player">
              <video ref="player" :src="videosrc" :poster="postersrc"></video>
            </div>
            <div class="controls">
              <input type="button" :value="btnvalue" @click="changePlay">
              <span id="curtime">{{curtime}}</span>/<span id="duration">{{durationtime}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="about">
        <div class="user-info">
          <el-avatar :src="profilesrc"></el-avatar>
          <div class="user">
            <span class="user-name">{{userInfo.user_name}}</span><br />
            <span class="user-descripe">{{userInfo.user_descripe}}</span>
          </div>
        </div>
        <div class="about-info"></div>
      </div>
    </div>
  </div>
</template>

<script>
import topHeader from '../components/topHeader.vue'
export default {
  components: {
    topHeader
  },
  data(){
    return {
      videoInfo: null,
      userInfo: null,
      curtime: 0,
      durationtime: 0,
      btnvalue: "play"
    }
  },
  methods: {
    changePlay() {
      let player = this.$refs.player
      if(player.pasued){
        player.play()
        this.btnvalue = "pause"
      }else{
        player.pause()
        this.btnvalue = "play"
      }
    }
  },
  computed: {
    profilesrc() {
      let tem = this.userInfo != null?this.userInfo.user_poster : "default.jpg"
      return "http://127.0.0.1:8633/api/user/getposter?poster=" + tem
    },
    videosrc() {
      let tem = this.videoInfo != null?this.videoInfo.video_url : "default.mp4"
      return "http://127.0.0.1:8633/api/video/getvideo?video=" + tem
    },
    postersrc() {
      let tem = this.videoInfo != null?this.videoInfo.video_poster : "default.jpg"
      return "http://127.0.0.1:8633/api/video/getposter?poster=" + tem
    }
  },
  created() {
    this.$axios.get(`/video/videoinfo?vdid=${this.$route.params.vdid}`)
      .then(res => {
        this.videoInfo = res["data"]["videoinfo"][0]
        return this.$axios.get(`/user/userinfo?usid=${this.videoInfo.video_owner}`)
      })
      .then(res=> {
        this.userInfo = res["data"]["userinfo"][0]
        console.log(this.userInfo)
      })
      .catch(function(err) {
        console.log(err)
      })
  }
}
</script>

<style lang="scss" scoped>
.main-container{
  width: 80%;
  margin: 30px 10% 20px 10%;
  display: -webkit-flex; /* Safari */
  display: flex;

  .video{
    flex: 4;
    .video-info{
      height: 150px;
      
      .video-title{
        font-size: 25px;
      }
      .video-type, .video-date, .video-num{
        font-size: 8px;
      }
    }
  }

  .about{
    flex: 2;
    .user-info{
      height: 150px;
      display: flex;

      .user{
        margin-left: 7px;
        .user-name{
          font-size: 16px;
        }

        .user-descripe{
          font-size: 8px;
        }
      }
    }
  }
}
</style>