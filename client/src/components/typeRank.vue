<template>
  <div class="rank-container">
    <el-divider></el-divider>
    <div class="rank-head">
      {{ typeInfo[0].type_tag }}
    </div>
    <div class="rank-body">
      <div class="rank-box" v-for="item in videoRank" :key="item.VDID">
        <router-link :to="'/video/'+item.VDID">
          <img class="video-poster"
          :src="'http://127.0.0.1:8633/api/video/getposter?poster=' + item.video_poster">
          <div class="video-title">{{ item.video_title }}</div>
        </router-link>
        <div class="video-info">
          <router-link :to="'/user/'+item.video_owner">
            <div class="video-owner">
              <i class="el-icon-user"></i>
              {{ item.user_name }}
            </div>
          </router-link>
          <div class="info-footer">
            <div class="video-num">
              <i class="el-icon-video-play"></i>
              {{ item.video_num | ViewCounts }}
            </div>
            <div class="video-date">
              <i class="el-icon-timer"></i>
              {{ item.video_date | Dayjs("YYYY-MM-DD") }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "typetag" ],
  data() {
    return {
      typeInfo: [
        {
          VTID: null,
          type_tag: "分区",
          type_descripe: "分区描述"
        }
      ],
      videoRank: [
        {
          VDID: null,
          video_poster: "default.jpg",
          video_num: 0,
          video_title: "视频标题",
          video_owner: 0,
          user_name: "作者",
          video_date: "2020-08-19T04:39:40.000Z"
        }
      ]
    }
  },
  methods: {
  },
  created() {
    this.$axios.get(`/tyvideo/one?id=${this.typetag}`)
      .then(res => {
        this.typeInfo = res.data.videotype;
        return this.$axios.get(`/video/rank/type?type=${this.typetag}&index=1&pnum=8&date=-1`);
      })
      .then(res =>{
        this.videoRank = res.data.videolist;
      })
  }
}
</script>

<style lang="scss" scoped>
.rank-container{
  padding-left: 29px;
  padding-bottom: 10px;
  background-color: white;
  .rank-head{
    padding-left: 29px;
    padding-bottom: 20px;
    font-size: 25px;
  }
  .rank-body{
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    .rank-box{
      margin-left: 10px;
      margin-right: 10px;
      margin-bottom: 10px;
      width: 200px;
      height: 205px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .video-poster{
        width: 100%;
      }
      .video-title{
        font-size: 16px;
      }
      .video-info{
        color: rgb(121, 124, 126);
        font-size: 14px;
        .video-owner{
          color: rgb(121, 124, 126);
        }
        .info-footer{
          margin-top: 4px;
          display: flex;
          justify-content: space-between;
          .video-num{
            height: 21px;
          }
          .video-date{
            height: 21px;
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