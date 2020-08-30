<template>
  <div>
    <h1>首页</h1>
    <div class="carouselContainer">
      <carousel :videolist="allRank" class="carouselClass"></carousel>
    </div>
  </div>
</template>

<script>
import carousel from '../components/carousel.vue'
export default {
  components: {
    carousel
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
</style>