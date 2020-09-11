<template>
  <div class="container">
    <top-header></top-header>
    <div class="main-container">
      <div class="user-work"></div>
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
      userinfo: [
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
        this.userinfo = res.data.userinfo;
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
      return "http://127.0.0.1:8633/api/user/getposter?poster=" + this.userinfo[0].user_poster;
    },
    username() {
      return this.userinfo[0].user_name;
    },
    userdescripe() {
      return this.userinfo[0].user_descripe ? this.userinfo[0].user_descripe : "这个人很懒，什么都没有写";
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  background-color: rgb(240, 240, 240);
  .body-container{
    margin:10px 124.5px 15px 124.5px;
    .user-work{}
    .user-info{
      display: flex;
      flex-direction: column;
      align-content: space-around;
      .user-profile{}
      .user-name{}
      .user-descripe{}
    }
  }
}
</style>