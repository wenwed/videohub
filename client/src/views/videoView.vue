<template>
    <div>
        <top-header></top-header>
        <div class="w">
            <div class="left">
                <div class="info">
                    <h3 class="title">{{ videotitle }}</h3>
                    <span class="type">{{ typetag }}&nbsp;&nbsp;</span>
                    <span class="date">{{ videodate | Dayjs }}</span
                    ><br />
                    <span class="num">{{ videonum }}次播放</span>
                </div>
                <div class="video-player"></div>
            </div>
            <div class="right"></div>
        </div>
    </div>
</template>

<script>
import topHeader from "../components/topHeader.vue";
// import videoPlayer from "../components/videoPlayer.vue";
export default {
    components: {
        topHeader,
        // videoPlayer,
    },
    data() {
        return {
            baseUrl: "http://127.0.0.1:8633/api",
            videoInfo: null,
            userInfo: null,
            videolist: [
                {
                    video_poster: "default.jpg",
                    video_title: "标题",
                    user_name: "作者",
                    video_num: 0,
                },
            ],
        };
    },
    methods: {
        //刷新界面，视频间跳转页面不会刷新
        flushCom() {
            this.$router.go(0);
        },
        // //调用子组件的进度条的鼠标抬起事件
        // mouseUp() {
        //     this.$refs.Player.mouseUp();
        // },
        // //调用子组件的鼠标移动事件
        // mouseMove() {
        //     this.$refs.Player.moveBarIcon();
        // },
        // //调用子组件的鼠标离开事件
        // mouseLeave() {
        //     this.$refs.Player.mouseLeave();
        // },
    },
    computed: {
        //默认值
        profilesrc() {
            let tem =
                this.userInfo != null
                    ? this.userInfo.user_poster
                    : "default.jpg";
            return "http://127.0.0.1:8633/api/user/getposter?poster=" + tem;
        },
        username() {
            return this.userInfo != null ? this.userInfo.user_name : "作者";
        },
        userid() {
            return this.userInfo != null ? this.userInfo.USID : 0;
        },
        userdescripe() {
            return this.userInfo != null ? this.userInfo.user_descripe : "签名";
        },
        videotitle() {
            return this.videoInfo != null ? this.videoInfo.video_title : "标题";
        },
        typetag() {
            return this.videoInfo != null ? this.videoInfo.type_tag : "分区";
        },
        videodate() {
            return this.videoInfo != null
                ? this.videoInfo.video_date
                : "发表日期";
        },
        videonum() {
            return this.videoInfo != null
                ? this.videoInfo.video_num
                : "播放次数";
        },
    },
    created() {
        this.$axios
            .get(`/video/videoinfo?vdid=${this.$route.params.vdid}`)
            .then((res) => {
                this.videoInfo = res["data"]["videoinfo"][0];
                return this.$axios.get(
                    `/user/userinfo?usid=${this.videoInfo.video_owner}`
                );
            })
            .then((res) => {
                this.userInfo = res["data"]["userinfo"][0];
                return this.$axios
                    .get(`http://127.0.0.1:8633/api/video/rank/type?type=${this.videoInfo.video_type}
              &index=1&pnum=7&date=-1`);
            })
            .then((res) => {
                this.videolist = res["data"]["videolist"];
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
</script>

<style lang="scss" scoped>
.w {
    width: 1200px;
    margin: 0 auto;
}

.left {
    float: left;
    width: 850px;
    height: 100px;
    background-color: aqua;

    .info {
        .title {
            font-size: 20px;
        }

        span {
            font-size: 12px;
        }
    }
}

.right {
    float: right;
    width: 350px;
    height: 100px;
    background-color: blueviolet;
}
</style>