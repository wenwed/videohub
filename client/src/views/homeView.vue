<template>
  <div>
    <h1>首页</h1>
    <carousel :videolist="allRank"></carousel>
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
      await this.$axios.get('/video/rank/all?index=1&pnum=4&date=-1')
        .then(res => {
          this.allRank = res.data.videolist
          // console.log(this.allRank)
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