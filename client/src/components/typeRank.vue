<template>
  <div></div>
</template>

<script>
export default {
  props: [ "typetag" ],
  data() {
    return {
      typeInfo: [],
      videoRank: []
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
        console.log(this.typeInfo);
        console.log(this.videoRank);
      })
  }
}
</script>

<style lang="scss" scoped>
</style>