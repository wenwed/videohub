<template>
  <div class="container"
    @mouseenter="stopPlay"
    @mouseleave="startPlay">
    <transition class="imgContainer">
        <router-link :to="'/video/'+videoID">
          <img class="imageClass"
            :src="'http://127.0.0.1:8633/api/video/getposter?poster='+videoPoster">
        </router-link>
    </transition>
    <ul class="dots">
      <li
        v-for="i in listLength"
        :class="{ active: i===index+1 }"
        :key="i"
        @click="changeOne(i)"></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: [ "videolist" ],
  data() {
    return {
      listlength: this.listLength,
      timer: null,
      index: 0
    }
  },
  methods: {
    startPlay() {
      if(this.timer)
        return
      this.timer = setInterval(() => {
        this.index = (this.index + 1) % this.listLength
      }, 5000)
    },
    stopPlay() {
      clearInterval(this.timer);
      this.timer = null
    },
    changeOne(i){
      this.index = i - 1
    }
  },
  created() {
    this.startPlay()
  },
  computed: {
    listLength() {
      return this.videolist.length
    },
    videoID() {
      if(this.videolist.length)
        return this.videolist[this.index].VDID
      else
        return -1
    },
    videoPoster() {
      if(this.videolist.length)
        return this.videolist[this.index].video_poster
      else
        return "default.jpg"
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 256px;
  height: 144px;
  overflow: hidden;

  .imageClass{
    width: 100%;
  }

  .dots li{
    display: flex;
    position: relative;
    top: -30px;
    list-style: none;
    width: 7px;
    height: 7px;
    background-color: black;
    border-radius: 50%;

    .active{
      width: 10px;
      height: 10px;
    }
  }
}
.v-enter{
  opacity: 0;
  transform: translateX(100%);
  position: absolute;
}
.v-leave-to{
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active{
  transition: all 1s ease;
}
</style>