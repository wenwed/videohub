<template>
  <div>
    <h1>视频界面---{{$route.params.vdid}}</h1>
  </div>
</template>

<script>
export default {
  data(){
    return {
      videoInfo: null,
      userInfo: null
    }
  },
  methods: {
  },
  created() {
    this.$axios.get(`/video/videoinfo?vdid=${this.$route.params.vdid}`)
      .then(res => {
        console.log(res["data"]["videoinfo"][0])
        this.videoInfo = res["data"]["videoinfo"][0]
        console.log(this.videoInfo.video_owner)
        return this.$axios.get(`/user/userinfo?usid=${this.videoInfo.video_owner}`)
      })
      .then(res=> {
        this.userInfo = res["data"]["userinfo"][0]
        console.log(this.userInfo)
      })
      .catch(function(err) {
        console.log(err)
      })
  }
}
</script>

<style lang="scss" scoped>
</style>