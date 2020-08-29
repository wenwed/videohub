<template>
  <div>
    <h1>首页</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allRank: []
    }
  },
  methods: {
    async getAllRank() {
      await this.$axios.get('/video/rank/all?index=1&pnum=5&date=14')
        .then(res => {
          this.allRank = res.data.videolist
          console.log(this.allRank)
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