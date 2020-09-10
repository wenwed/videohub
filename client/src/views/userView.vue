<template>
  <div>
    <h1>用户个人界面--{{$route.params.usid}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userinfo: {
        USID: this.$route.params.usid,
        user_name: "姓名",
        user_poster: "default.jpg",
        user_descripe: "个性签名",
        register_date: "2000-01-01 00:00:00"
      },
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
        console.log(res.data);
        this.userinfo = res.data.userinfo;
        return this.$axios.get(`/video/person/passed?id=${this.$route.params.usid}`);
      })
      .then(res => {
        console.log(res.data);
        this.videoList = res.data.videolist;
      })
      .catch(err => {
        console.log(err);
      })
  }
}
</script>

<style lang="scss" scoped>
</style>