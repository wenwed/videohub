<template>
  <div>
    <top-header></top-header>
    <div class="main-container">
      <div class="video">
        <div class="video-info">
          <span class="video-title">{{ videotitle }}</span><br />
          <span class="video-type">{{ typetag }}&nbsp;</span>
          <span class="video-date">{{ videodate | Dayjs }}</span><br />
          <span class="video-num">{{ videonum }}次播放</span>
        </div>
        <div class="video-player">
          <div class="player-top"></div>
          <video class="player" ref="videoplayer" :src="videosrc"
                :poster="postersrc" @click="changePlay"></video>
          <div class="controller">
            <input type="button" :value="btnvalue" @click="changePlay">
            <span id="curtime">{{ curtime }}</span>/<span id="duration">{{ durationtime }}</span>
          </div>
        </div>
      </div>
      <div class="about">
        <div class="user-info">
          <el-avatar :src="profilesrc" class="profile"></el-avatar>
          <div class="user">
            <span class="user-name">{{ username }}</span><br />
            <span class="user-descripe">{{ userdescripe }}</span>
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
      let player = this.$refs.videoplayer
      if(player.paused){
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
    username() {
      return this.userInfo != null?this.userInfo.user_name : "作者"
    },
    userdescripe() {
      return this.userInfo != null?this.userInfo.user_descripe : "签名"
    },
    videosrc() {
      let tem = this.videoInfo != null?this.videoInfo.video_url : "default.mp4"
      return "http://127.0.0.1:8633/api/video/getvideo?video=" + tem
    },
    postersrc() {
      let tem = this.videoInfo != null?this.videoInfo.video_poster : "default.jpg"
      return "http://127.0.0.1:8633/api/video/getposter?poster=" + tem
    },
    videotitle() {
      return this.videoInfo != null?this.videoInfo.video_title: "标题"
    },
    typetag() {
      return this.videoInfo != null?this.videoInfo.type_tag: "分区"
    },
    videodate() {
      return this.videoInfo != null?this.videoInfo.video_date: "发表日期"
    },
    videonum() {
      return this.videoInfo != null?this.videoInfo.video_num: "播放次数"
    },
  },
  created() {
    this.$axios.get(`/video/videoinfo?vdid=${this.$route.params.vdid}`)
      .then(res => {
        this.videoInfo = res["data"]["videoinfo"][0]
        return this.$axios.get(`/user/userinfo?usid=${this.videoInfo.video_owner}`)
      })
      .then(res=> {
        this.userInfo = res["data"]["userinfo"][0]
      })
      .catch(function(err) {
        console.log(err)
      })
  }
}
</script>

<style lang="scss" scoped>
.main-container{
  width: 70%;
  margin: 20px 15% 20px 15%;
  display: -webkit-flex; /* Safari */
  display: flex;

  .video{
    flex: 5;
    .video-info{
      height: 100px;
      
      .video-title{
        font-size: 25px;
      }
      .video-type, .video-date, .video-num{
        font-size: 8px;
      }
    }

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
        padding: 0;
        width: 100%;
        height: 20px;
        background-color: black;
      }
    }
  }

  .about{
    flex: 2;
    .user-info{
      height: 150px;
      display: flex;

      .profile{
        width: 40px;
      }

      .user{
        margin-left: 7px;
        width: 250px;
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