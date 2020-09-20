<template>
  <div>
    <top-header></top-header>
    <div class="main-container">
      <div class="video">
        <div class="video-info">
          <span class="video-title">{{ videotitle }}</span><br />
          <span class="video-type">{{ typetag }}&nbsp;&nbsp;</span>
          <span class="video-date">{{ videodate | Dayjs }}</span><br />
          <span class="video-num">{{ videonum }}次播放</span>
        </div>
        <video-player :videoInfo="videoInfo"></video-player>
      </div>
      <div class="about">
        <div class="user-info">
          <router-link :to="'/user/' + userid">
            <el-avatar :src="profilesrc" class="profile"></el-avatar>
          </router-link>
          <div class="user">
            <router-link :to="'/user/' + userid">
              <span class="user-name">{{ username }}</span><br />
            </router-link>
            <span class="user-descripe">{{ userdescripe }}</span>
          </div>
        </div>
        <div class="correlate">
          <span class="correlate-title">相关推荐</span>
          <div class="list" v-for="(item, i) in videolist" :key="i">
            <router-link :to="'/video/'+item.VDID" @click.native="flushCom">
              <img class="poster" :src="'http://127.0.0.1:8633/api/video/getposter?poster='+item.video_poster">
            </router-link>
            <div class="info">
              <router-link :to="'/video/'+item.VDID" @click.native="flushCom">
                <span class="title">{{ item.video_title }}</span><br />
              </router-link>
              <div>
                <span class="owner">{{ item.user_name }}</span><br />
                <span class="num">{{ item.video_num }}次播放</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topHeader from '../components/topHeader.vue';
import videoPlayer from '../components/videoPlayer.vue';
export default {
  components: {
    topHeader,
    videoPlayer
  },
  data(){
    return {
      videoInfo: null,
      userInfo: null,
      videolist: [
        {
          "video_poster": "default.jpg",
          "video_title":"标题",
          "user_name": "作者",
          "video_num":0
        }
      ]
    }
  },
  methods: {
    flushCom() {
      this.$router.go(0);
    }
  },
  computed: {
    profilesrc() {
      let tem = this.userInfo != null?this.userInfo.user_poster : "default.jpg";
      return "http://127.0.0.1:8633/api/user/getposter?poster=" + tem;
    },
    username() {
      return this.userInfo != null?this.userInfo.user_name : "作者";
    },
    userid() {
      return this.userInfo != null?this.userInfo.user_USID : 0;
    },
    userdescripe() {
      return this.userInfo != null?this.userInfo.user_descripe : "签名";
    },
    videotitle() {
      return this.videoInfo != null?this.videoInfo.video_title: "标题";
    },
    typetag() {
      return this.videoInfo != null?this.videoInfo.type_tag: "分区";
    },
    videodate() {
      return this.videoInfo != null?this.videoInfo.video_date: "发表日期";
    },
    videonum() {
      return this.videoInfo != null?this.videoInfo.video_num: "播放次数";
    },
  },
  created() {
    this.$axios.get(`/video/videoinfo?vdid=${this.$route.params.vdid}`)
      .then(res => {
        this.videoInfo = res["data"]["videoinfo"][0];
        return this.$axios.get(`/user/userinfo?usid=${this.videoInfo.video_owner}`);
      })
      .then(res=> {
        this.userInfo = res["data"]["userinfo"][0];
        return this.$axios.get(`http://127.0.0.1:8633/api/video/rank/type?type=${this.videoInfo.video_type}
              &index=1&pnum=7&date=-1`);
      })
      .then(res => {
        this.videolist = res["data"]["videolist"];
      })
      .catch(err => {
        console.log(err);
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
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 20px;
      }
      .video-type, .video-date, .video-num{
        margin-top: 20px;
        margin-bottom: 20px;
        font-size: 8px;
        color: darkgrey;
      }
    }
  }

  .about{
    flex: 2;
    margin-left: 20px;
    .user-info{
      height: 100px;
      display: flex;
      display: -webkit-flex; /* Safari */
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
          color: dimgray;
        }
      }
    }

    .correlate{
      .correlate-title{
        font-size: 18px;
      }
      .list{
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        .poster{
          width: 120px;
        }
        .info{
          margin-left: 7px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .title{
            font-size: 18px;
          }
          .owner,.num{
            color: darkgrey;
            font-size: 8px;
          }
        }
      }
    }
  }
}
a, a:link, a:visited, a:hover, a:active {
    text-decoration: none;
    color: black;
}
</style>