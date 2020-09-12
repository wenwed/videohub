<template>
  <div class="container">
    <top-header></top-header>
    <div class="main-container">
      <div class="user-work">
        <div class="box" v-for="item in videoList" :key="item.VDID">
          <router-link :to="'/video/'+item.VDID">
            <img class="video-poster"
             :src="'http://127.0.0.1:8633/api/video/getposter?poster=' + item.video_poster">
          </router-link>
          <router-link :to="'/video/'+item.VDID">
            <div class="video-title">{{ item.video_title }}</div>
          </router-link>
          <div class="video-info">
            <span>{{ item.video_num }}</span>
            <span>{{ item.video_date }}</span>
          </div>
        </div>
      </div>
      <div class="user-info">
        <div class="user-profile">
          <el-avatar :src="profile" :size="40"></el-avatar>
        </div>
        <div class="user-name">
          {{ username }}
        </div>
        <div class="user-descripe">
          {{ userdescripe }}
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
  .main-container {
    width: 70%;
    display: flex;
    margin:10px 15% 15px 15%;
    .user-work {
      width: 700px;
      background-color: white;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .box {
        width: 160px;
        height: 250px;
        .video-poster {
          width: 100%;
        }
      }
    }
    .user-info {
      background-color: white;
      width: 150px;
      height: 300px;
      display: flex;
      flex-direction: column;
      align-content: space-around;
      .user-profile {}
      .user-name {}
      .user-descripe {}
    }
  }
}
a, a:link, a:visited, a:hover, a:active {
    text-decoration: none;
    color: black;
}
</style>