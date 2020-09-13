<template>
  <div class="rank-container">
    <div class="rank-title">
      {{ typeInfo[0].type_tag }}
    </div>
    <div class="rank-body">
      <div class="rank-box" v-for="item in videoRank" :key="item.VDID">
        <router-link :to="'/video/'+item.VDID">
          <img class="video-poster"
          :src="'http://127.0.0.1:8633/api/video/getposter?poster=' + item.video_poster">
          <div class="video-title">{{ item.video_title }}</div>
        </router-link>
        <router-link :to="'/user/'+item.video_owner">
          <div class="video-owner">{{ item.user_name }}</div>
        </router-link>
        <div class="video-info">
          <div class="video-num">{{ item.video_num }}</div>
          <div class="video-date">{{ item.video_date }}</div>
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
    console.log(this.typetag);
    this.$axios.get(`/tyvideo/one?id=${this.typetag}`)
      .then(res => {
        this.typeInfo = res.data.videotype;
        return this.$axios.get(`/video/rank/type?type=${this.typetag}&index=1&pnum=10&date=-1`);
      })
      .then(res =>{
        this.videoRank = res.data.videolist;
      })
  }
}
</script>

<style lang="scss" scoped>
.rank-container{
  background-color: white;
  .rank-title{
    font-size: 25px;
  }
  .rank-body{
    display: flex;
    flex-wrap: wrap;
    .rank-box{
      width: 200px;
      .video-poster{
        width: 100%;
      }
    }
  }
}
a, a:link, a:visited, a:hover, a:active {
    text-decoration: none;
    color: black;
}
</style>