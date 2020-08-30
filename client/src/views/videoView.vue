<template>
  <div>
    <h1>视频界面---{{$route.params.vdid}}</h1>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route.params.vdid)
  }
}
</script>

<style lang="scss" scoped>
</style>