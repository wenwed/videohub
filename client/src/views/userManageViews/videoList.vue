<template>
  <el-container>
    <el-main>
      <div class="video-box" v-for="item in videoList" :key="item.VDID">
        <div class="box-left">
          <div class="img-container">
            <img class="video-poster"
            :src="baseUrl + '/video/getposter?poster=' + item.video_poster">
          </div>
          <div class="video-info">
            <div>
              <div class="video-title">{{ item.video_title }}</div>
              <div class="video-descripe">{{ item.video_descripe }}</div>
            </div>
            <div>
              <div v-if="item.video_status===1" class="video-status">
                <i class="el-icon-view" style="color: rgb(57, 9, 170);"></i>
                <div style="margin-left: 5px; line-height: 12px;">视频审核中</div>
              </div>
              <div v-if="item.video_status===2" class="video-status">
                <i class="el-icon-circle-check" style="color: rgb(4, 184, 79);"></i>
                <div style="margin-left: 5px; line-height: 12px;">视频审核通过</div>
              </div>
              <div v-if="item.video_status===3" class="video-status">
                <i class="el-icon-circle-close" style="color: rgb(221, 6, 6);"></i>
                <div style="margin-left: 5px; line-height: 12px;">视频审核未通过</div>
              </div>
              <div style="display: flex; margin-top: 6px; width: 230px; justify-content: space-between;">
                <div class="video-num">{{ item.video_num }}次播放</div>
                <div class="video-date">{{ item.video_date | Dayjs("YYYY-MM-DD") }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="box-right">
          <div class="video-operation">
            <router-link :to="'updatevideo/'+item.VDID">
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
      baseUrl: "http://127.0.0.1:8633/api",
      videoList: [
        {
          VDID: 1,
          video_poster: '1145141.jpg',
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
  margin-bottom: 20px;
  width: 100%;
  height: 135px;
  display: flex;
  justify-content: space-between;
  .box-left{
    display: flex;
    .img-container {
      height: 135px;
      .video-poster{
        height: 100%;
      }
    }
    .video-info {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .video-status{
        font-size: 12px;
        height: 12px;
        color: dimgrey;
        display: flex;
      }
      .video-title{
        margin-bottom: 6px;
        height: 32px;
        line-height: 16px;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .video-descripe{
        margin-bottom: 6px;
        height: 56px;
        line-height: 14px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
      .video-num{
        font-size: 14px;
        vertical-align:middle;
        line-height: 21px;
      }
      .video-date{
        font-size: 14px;
        vertical-align:middle;
        line-height: 21px;
      }
    }
  }
  .box-right{
    margin-right: 70px;
  }
}
</style>