<template>
  <div>
    <top-header></top-header>
    <carousel :videolist="allRank" class="carouselClass"></carousel>
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
</style>