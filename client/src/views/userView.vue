<template>
  <div class="container">
    <top-header></top-header>
    <div class="main-container">
      <div class="user-work">
        <div class="video-box" v-for="item in videoList" :key="item.VDID">
          <div>
            <router-link :to="'/video/'+item.VDID">
              <img class="video-poster"
              :src="baseUrl + '/video/getposter?poster=' + item.video_poster">
            </router-link>
            <router-link :to="'/video/'+item.VDID">
              <div class="video-title">{{ item.video_title }}</div>
            </router-link>
          </div>
          <div class="video-info">
            <span>{{ item.video_num | ViewCounts }}</span>
            <span>{{ item.video_date | Dayjs("YYYY-MM-DD") }}</span>
          </div>
        </div>
      </div>
      <div class="info-container">
        <div class="user-info">
          <div class="top-info">
            <div class="user-profile">
              <el-avatar :src="profile" :size="40"></el-avatar>
            </div>
            <div class="user-name">
              {{ username }}
            </div>
          </div>
          <div class="user-descripe">
            {{ userdescripe }}
          </div>
          <div class="person-center" v-if="isMyself">
            <router-link to="/account">
              <p class="center-text">个人中心</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topHeader from '../components/topHeader.vue';
export default {
  components: {
    topHeader
  },
  data() {
    return {
      baseUrl: "http://127.0.0.1:8633/api",
      isMyself: false,
      userInfo: [
        {
          USID: this.$route.params.usid,
          user_name: "姓名",
          user_poster: "default.jpg",
          user_descripe: "个性签名",
          register_date: "2000-01-01 00:00:00"
        }
      ],
      videoList: [
        {
          VDID: 1,
          video_poster: '114514.jpg',
          video_num: 1919810,
          video_title: '视频',
          video_descripe: '第一个视频',
          video_owner: 1,
          video_date: "2000-01-01 00:00:00",
          user_name: 'wenwd'
        }
      ]
    }
  },
  created() {
    if(this.$route.params.usid === this.$store.state.USID){
      this.isMyself = true;
    }else{
      this.isMyself = false;
    }
    this.axios.get(`/user/userinfo?usid=${this.$route.params.usid}`)
      .then(res => {
        this.userInfo = res.data.userinfo;
        return this.$axios.get(`/video/person/passed?id=${this.$route.params.usid}`);
      })
      .then(res => {
        this.videoList = res.data.videolist;
      })
      .catch(err => {
        console.log(err);
      })
  },
  computed: {
    profile() {
      return "http://127.0.0.1:8633/api/user/getposter?poster=" + this.userInfo[0].user_poster;
    },
    username() {
      return this.userInfo[0].user_name;
    },
    userdescripe() {
      return this.userInfo[0].user_descripe ? this.userInfo[0].user_descripe : "这个人很懒，什么都没有写";
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: rgb(240, 240, 240);
  height: 100%;
  .main-container {
    width: 70%;
    height: 100%;
    display: flex;
    margin:0 15% 15px 15%;
    .user-work {
      border-radius: 10px;
      padding-top: 10px;
      margin-top: 10px;
      width: 700px;
      height: 100%;
      background-color: white;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      .video-box {
        margin-left: 8px;
        margin-right: 6px;
        margin-bottom: 17px;
        width: 160px;
        height: 155px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .video-poster {
          border-radius: 5px;
          width: 100%;
        }
        .video-title {
          font-size: 15px;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .video-title:hover {
          color: #409EFF;
        }
        .video-info {
          font-size: 14px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .info-container {
      width: 220px;
      margin-top: 10px;
      margin-left: 10px;
      .user-info{
        padding-top: 10px;
        padding-left: 10px;
        padding-right: 10px;
        width: 90%;
        background-color: white;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        .top-info {
          display: flex;
          .user-profile {}
          .user-name {
            margin-left: 8px;
          }
        }
        .user-descripe {
          margin-top: 5px;
          margin-bottom: 5px;
        }
        .person-center {
          display: block;
          margin-top: 20px;
          margin-bottom: 20px;
          .center-text {
            color: rgb(11, 147, 201);
            margin: 0px auto;
            width: 70px;
          }
          .center-text:hover {
            color: rgb(6, 179, 248);
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