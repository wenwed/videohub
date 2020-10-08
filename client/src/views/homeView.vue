<template>
  <div class="home-page">
    <top-header></top-header>
    <div class="home-body">
      <div class="body-top">
        <carousel :videolist="allRank" class="carousel-class"></carousel>
        <div class="carouse-card">
          <div class="carouse-box" v-for="item in lastAllRank" :key="item.VDID">
            <router-link :to="'/video/' + item.VDID">
              <img
                class="box-img"
                :src="baseUrl + '/video/getposter?poster=' + item.video_poster"
              />
            </router-link>
          </div>
        </div>
      </div>
      <div class="type-body">
        <type-rank
          class="type-rank"
          v-for="item in allTypes"
          :typetag="item.VTID"
          :key="item.VTID"
        ></type-rank>
      </div>
    </div>
  </div>
</template>

<script>
import topHeader from "../components/topHeader.vue";
import carousel from "../components/carousel.vue";
import typeRank from "../components/typeRank.vue";
export default {
  components: {
    carousel,
    topHeader,
    typeRank,
  },
  data() {
    return {
      baseUrl: "http://127.0.0.1:8633/api",
      allRank: [],
      allTypes: [],
    };
  },
  methods: {
    getAllRank() {
      this.$axios.get("/video/rank/all?index=1&pnum=5&date=-1").then((res) => {
        this.allRank = res.data.videolist;
      });
    },
    getVideoTypeRank() {
      this.$axios.get("/tyvideo/all").then((res) => {
        this.allTypes = res.data.videotypes;
      });
    },
  },
  created() {
    this.getAllRank();
    this.getVideoTypeRank();
  },
  computed: {
    lastAllRank() {
      return this.allRank.slice(-6);
    },
  },
};
</script>

<style lang="scss" scoped>
.home-page {
  background-color: rgb(231, 243, 243);
  .home-body {
    background-color: white;
    width: 70%;
    padding: 10px;
    margin: 0 15% 0 15%;

    .body-top {
      padding-top: 15px;
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      .carousel-class {
        width: 448px;
        height: 215px;
        // width: 600px;
        // height: 288px;
        margin-left: 39px;
      }
      .carouse-card {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        .carouse-box {
          padding-left: 20px;
          padding-bottom: 18px;
          width: 144px;
          height: 81px;
          .box-img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>