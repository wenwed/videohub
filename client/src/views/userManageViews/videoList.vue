<template>
  <el-container>
    <el-main>
      <div class="video-box" v-for="item in videoList" :key="item.VDID">
        <div class="box-left">
            <div class="img-container">
            <img class="video-poster"
            :src="'http://127.0.0.1:8633/api/video/getposter?poster=' + item.video_poster">
          </div>
          <div class="video-info">
            <div class="viodeo-title">{{ item.video_title }}</div>
            <div class="viodeo-descripe">{{ item.video_descripe }}</div>
            <div class="viodeo-descripe">{{ item.video_num }}次播放</div>
            <div class="viodeo-descripe">{{ item.video_date }}</div>
          </div>
        </div>
        <div class="box-right">
          <div class="video-operation">
            <router-link to="'updatevideo/:'+item.VDID">
              <el-button type="primary">编辑</el-button>
            </router-link>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      videoList: [
        {
          VDID: 1,
          video_poster: '114514.jpg',
          video_url: '1919810.mp4',
          video_num: 1919810,
          video_title: '视频',
          video_descripe: '第一个视频',
          video_type: 2,
          video_status: 1,
          video_owner: 1,
          video_date: "2020-08-19T04:39:40.000Z",
          user_name: 'wenwd'
        }
      ]
    }
  },
  methods: {
    getUserList() {
      this.$axios.get(`/video/person/all?id=${this.$store.state.USID}`)
        .then(res => {
          this.videoList = res.data.videolist;
        })
    }
  },
  created() {
    this.getUserList();
  }
}
</script>

<style lang="scss" scoped>
.video-box {
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: space-between;
  .box-left{
    display: flex;
    .img-container {
      width: 240px;
      .video-poster{
        width: 100%;
      }
    }
    .video-info {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
    }
  }
  .box-right{
    margin-right: 70px;
  }
}
</style>