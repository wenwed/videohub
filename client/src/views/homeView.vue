<template>
  <div class="home-page">
    <top-header></top-header>
    <div class="home-body">
      <carousel :videolist="allRank" class="carouselClass"></carousel>
    </div>
  </div>
</template>

<script>
import topHeader from '../components/topHeader.vue'
import carousel from '../components/carousel.vue'
export default {
  components: {
    carousel,
    topHeader
  },
  data() {
    return {
      allRank: []
    }
  },
  methods: {
    async getAllRank() {
      await this.$axios.get('/video/rank/all?index=1&pnum=3&date=-1')
        .then(res => {
          this.allRank = res.data.videolist
        })
    }
  },
  created() {
    this.getAllRank()
  },
}
</script>

<style lang="scss" scoped>
.home-page{
  .home-body{
    background-color: rgb(231, 243, 243);
    width: 90%;
    margin: 15px 5% 15px 5%;
  }
}
</style>