<template>
    <!-- 进度条鼠标抬起和拖动事件，在播放器中抬起就有效 -->
    <div @mouseup="mouseUp" @mousemove="moveBarIcon" class="video-player">
        <div class="player-top"></div>
        <video
            muted
            class="player"
            ref="videoplayer"
            :src="videosrc"
            :poster="postersrc"
            autoplay="autoplay"
            @click="changePlay"
        ></video>
        <!-- 进度条 -->
        <div class="controller">
            <div
                ref="processBar"
                @mousedown="mouseDown"
                draggable="false"
                class="controller-bar"
            >
                <div
                    class="load-bar"
                    :style="{ width: loadPerecent + '%' }"
                    draggable="false"
                ></div>
                <div
                    class="play-bar"
                    :style="{ width: playPerecent + '%' }"
                    draggable="false"
                ></div>
                <i
                    draggable="false"
                    :style="{ transform: 'translateX(' + barHeadX + 'px)' }"
                    class="el-icon-apple bar-header"
                ></i>
            </div>
            <div class="controller-footer">
                <div class="footer-left">
                    <i
                        v-if="videoIsPlay"
                        class="el-icon-video-pause play-icon"
                        @click="changePlay"
                    ></i>
                    <i
                        v-if="!videoIsPlay"
                        class="el-icon-video-play play-icon"
                        @click="changePlay"
                    ></i>
                    <span draggable="false" id="curtime">{{ curtime }}</span
                    >/
                    <span draggable="false" id="duration">{{
                        durationtime
                    }}</span>
                </div>
                <div class="footer-right">
                    <div>
                        <!-- 音量控件 -->
                        <div
                            :style="{
                                left: volumeInfo.xAxis + 'px',
                                top: volumeInfo.yAxis + 'px',
                            }"
                            class="volume-box"
                            v-show="volumeInfo.volumeVisible"
                            @mouseover="overVolumeBox"
                            @mouseleave="leaveVolumeBox"
                        >
                            <div class="box-arrow"></div>
                            <div class="box-shadow"></div>
                            <div class="box-slider">
                                <div class="volume-data">
                                    {{ volumeInfo.volume }}
                                </div>
                                <el-slider
                                    @change="changeData"
                                    v-model="volumeInfo.volume"
                                    vertical
                                    :show-tooltip="false"
                                    tooltip-class="tooltip-class"
                                    height="50px"
                                >
                                </el-slider>
                            </div>
                        </div>
                        <!-- 音量icon -->
                        <i
                            v-show="!volumeInfo.isMute"
                            class="el-icon-microphone volume-btn"
                            @mouseover="overVolumeIcon"
                            @mouseleave="leaveVolumeIcon"
                            @click="changeMute"
                        >
                        </i>
                        <i
                            v-show="volumeInfo.isMute"
                            class="el-icon-turn-off-microphone volume-btn"
                            @mouseover="overVolumeIcon"
                            @mouseleave="leaveVolumeIcon"
                            @click="changeMute"
                        >
                        </i>
                    </div>
                    <div>
                        <i
                            class="el-icon-full-screen full-screen-btn"
                            @click="fullScreen"
                        ></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["videoInfo"],
    data() {
        return {
            curtime: "00:00",
            durationtime: "00:00",
            loadPerecent: 0,
            playPerecent: 0,
            isDown: false, //鼠标是否按下
            videoIsPlay: false,
            timer: null,
            volumeInfo: {
                mouseIn: false, //鼠标是否进入音量栏
                isMute: false, //是否静音
                volume: 100,
                volumeVisible: false,
                xAxis: 0,
                yAxis: 0,
            },
        };
    },
    methods: {
        //开始或停止播放
        changePlay() {
            let player = this.$refs.videoplayer;
            if (player.paused) {
                player.play();
                this.durationtime = this.formatTime(player.duration);
                this.startMonitor();
                this.videoIsPlay = true;
            } else {
                player.pause();
                this.stopMonitor();
                this.videoIsPlay = false;
            }
        },
        //开始监听播放进度
        startMonitor() {
            this.timer = setInterval(() => {
                let player = this.$refs.videoplayer;
                if (!this.isDown) {
                    this.curtime = this.formatTime(player.currentTime);
                    this.loadPerecent =
                        (player.buffered.end(0) / player.duration) * 100;
                    this.playPerecent =
                        (player.currentTime / player.duration) * 100;
                }
                if (player.currentTime === player.duration) {
                    this.stopMonitor();
                }
            }, 500);
        },
        //停止监听播放进度
        stopMonitor() {
            clearInterval(this.timer);
            this.timer = null;
        },
        //鼠标按下移动播放icon
        mouseDown(e) {
            this.isDown = true;
            let mouseX = e.screenX;
            let bar = this.$refs.processBar.getBoundingClientRect();
            let barX = bar.left;
            this.playPerecent = ((mouseX - barX) / 614) * 100;
        },
        //鼠标移动移动播放icon
        moveBarIcon(e) {
            if (!this.isDown || !e) {
                return;
            }
            this.isDown = true;
            let mouseX = e.screenX;
            let bar = this.$refs.processBar.getBoundingClientRect();
            let barX = bar.left;
            if (mouseX < barX) {
                this.playPerecent = 0;
            } else if (mouseX - barX > 614) {
                this.playPerecent = 100;
            } else {
                this.playPerecent = ((mouseX - barX) / 614) * 100;
            }
        },
        //鼠标抬起移动播放icon
        mouseUp() {
            if (!this.isDown) return;
            this.isDown = false;
            let player = this.$refs.videoplayer;
            let playTime = (player.duration * this.playPerecent) / 100;
            player.currentTime = playTime;
            this.durationtime = this.formatTime(player.duration);
            this.curtime = this.formatTime(playTime);
        },
        //鼠标离开时间
        mouseLeave() {
            this.isDown = false;
        },
        //格式化时长
        formatTime(time) {
            let res = "";
            //小时
            let h = Math.floor(time / 3600);
            //分钟
            let m = Math.floor(time / 60);
            //秒
            let s = Math.floor(time % 60);
            if (h !== 0) {
                res = h + ":";
            }
            if (m.toString().length === 1) {
                res = res + "0" + m + ":";
            } else {
                res = res + m + ":";
            }
            if (s.toString().length === 1) {
                res = res + "0" + s;
            } else {
                res = res + s;
            }
            return res;
        },
        //全屏
        fullScreen() {
            let player = this.$refs.videoplayer;
            player.webkitRequestFullScreen();
        },
        //显示音量栏
        overVolumeIcon() {
            let domI = event.toElement.getBoundingClientRect();
            this.volumeInfo.xAxis = domI.left + 16 / 2 - 50 / 2 - 1;
            this.volumeInfo.yAxis =
                domI.top + document.documentElement.scrollTop - 100 - 13;
            this.volumeInfo.volumeVisible = true;
        },
        //判断鼠标是否移动到音量栏上
        leaveVolumeIcon() {
            setTimeout(() => {
                if (!this.volumeInfo.mouseIn) {
                    this.volumeInfo.volumeVisible = false;
                }
            }, 500);
        },
        //关闭音量栏
        leaveVolumeBox() {
            this.volumeInfo.volumeVisible = false;
            this.volumeInfo.mouseIn = false;
        },
        //鼠标进入音量栏
        overVolumeBox() {
            this.volumeInfo.mouseIn = true;
        },
        //slider的值改变
        changeData() {
            this.volumeInfo.isMute = false;
            this.changeVolume();
        },
        //静音或取消静音
        changeMute() {
            this.volumeInfo.isMute = !this.volumeInfo.isMute;
            this.changeVolume();
        },
        //改变播放器的音量
        changeVolume() {
            let player = this.$refs.videoplayer;
            if (this.volumeInfo.isMute) {
                player.volume = 0;
            } else {
                player.volume = this.volumeInfo.volume / 100;
            }
        },
    },
    computed: {
        videosrc() {
            let tem =
                this.videoInfo != null
                    ? this.videoInfo.video_url
                    : "default.mp4";
            return "http://127.0.0.1:8633/api/video/getvideo?video=" + tem;
        },
        postersrc() {
            let tem =
                this.videoInfo != null
                    ? this.videoInfo.video_poster
                    : "default.jpg";
            return "http://127.0.0.1:8633/api/video/getposter?poster=" + tem;
        },
        barHeadX() {
            return (this.playPerecent / 100) * 614;
        },
    },
    mounted() {
        // let player = this.$refs.videoplayer;
        // player.play();
        // player.muted = false;
    },
};
</script>

<style lang="scss">
.video-player {
    width: 627px;
    .player-top {
        width: 100%;
        height: 35px;
        background-color: black;
    }
    .player {
        cursor: pointer;
        width: 100%;
        display: block;
    }
    .controller {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        padding-top: 2%;
        padding-bottom: 1%;
        padding-left: 1%;
        padding-right: 1%;
        width: 614px;
        height: 35px;
        color: white;
        background-color: black;
        .controller-bar {
            cursor: pointer;
            height: 3px;
            width: 100%;
            background-color: rgb(236, 233, 233);
            .load-bar {
                width: 80%;
                text-align: right;
                height: 3px;
                background-color: rgb(189, 188, 188);
            }
            .play-bar {
                width: 50%;
                text-align: right;
                height: 3px;
                color: white;
                position: relative;
                top: -3px;
                background-color: rgb(238, 161, 208);
            }
            .bar-header {
                position: relative;
                top: -14px;
            }
        }
        .controller-footer {
            margin-top: 10px;
            height: 20px;
            display: flex;
            justify-content: space-between;
            .footer-left {
                width: 200px;
                display: flex;
                .play-icon {
                    margin-right: 10px;
                }
            }
            .footer-right {
                width: 40px;
                display: flex;
                justify-content: space-between;
                .volume-btn {
                    cursor: pointer;
                }
                .full-screen-btn {
                    cursor: pointer;
                }
                .volume-box {
                    width: 50px;
                    height: 100px;
                    position: absolute;
                    // opacity会被子元素继承，改用rgba
                    // rgba不兼容IE7,IE8
                    // background-color: black;
                    // opacity: 0.5;
                    background-color: rgba(0, 0, 0, 0.5);
                    .box-arrow {
                        width: 0;
                        height: 0;
                        border: 10px solid transparent;
                        border-top-color: rgba(0, 0, 0, 0.5);
                        position: relative;
                        top: 100%;
                        left: 15px;
                    }
                    .box-shadow {
                        width: 0;
                        height: 0;
                        border: 10px solid transparent;
                        background-color: transparent;
                        border-top-color: rgba(0, 0, 0, 0.5);
                        position: relative;
                        top: 79%;
                        left: 15px;
                    }
                    .box-slider {
                        opacity: 2;
                        position: relative;
                        top: -35px;
                        left: 5px;
                        .volume-data {
                            text-align: center;
                            width: 76%;
                            margin-bottom: 10px;
                        }
                    }
                }
            }
        }
    }
}
</style>