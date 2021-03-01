<template >
    <div class="content" @mouseenter="stopTimer()" @mouseleave="startTimer()">
        <!-- 图片 -->
        <ul ref="pics">
            <li v-for="(item, index) of lists" :key="index" class="pic">
                <router-link :to="'/video/' + item.VDID">
                    <!-- item.video_descripe -->
                    <img
                        :src="
                            'http://127.0.0.1:8633/api/video/getposter?poster=' +
                            item.video_poster
                        "
                        alt="轮播图片"
                    />
                </router-link>
            </li>
        </ul>
        <!-- 下方点 -->
        <ul class="dot">
            <li
                v-for="(item, index) in videolist"
                :key="index"
                :class="{ current: index === carousel.index }"
                @click="switchPic(index)"
            ></li>
        </ul>
        <!-- 上一张按钮 -->
        <div
            class="before"
            :class="{ mouseHover: !mouseHoverFlag }"
            @click="last()"
        >
            <span></span>
        </div>
        <!-- 下一张按钮 -->
        <div
            class="after"
            :class="{ mouseHover: !mouseHoverFlag }"
            @click="next()"
        >
            <span></span>
        </div>
    </div>
</template>

<script>
export default {
    props: ["videolist"],
    data() {
        return {
            carousel: {
                // 当前播放的图片
                index: 0,
                // 一张图片的宽度
                picWidth: 480,
                // 是否播放
                animateTimerFlag: true,
            },
            mouseHoverFlag: false,
            // 轮播栏自动播放定时器
            timer: null,
            // 有修改视频列表的需求，prop修改不了
            lists: null,
        };
    },
    methods: {
        // 开始运行轮播栏定时器
        startTimer() {
            this.timer = setInterval(this.next, 5000);
            this.mouseHoverFlag = true;
        },
        // 停止运行轮播栏定时器
        stopTimer() {
            clearInterval(this.timer);
            this.timer = null;
            this.mouseHoverFlag = false;
        },
        // 动画函数
        animate(obj, target) {
            return new Promise((resolve) => {
                let used = obj.offsetLeft;
                let animateTimer = null;
                // 大于0向左移动
                if (target > 0) {
                    animateTimer = setInterval(() => {
                        if (obj.offsetLeft <= used - this.carousel.picWidth) {
                            clearInterval(animateTimer);
                            this.carousel.animateTimerFlag = true;
                            resolve();
                        } else {
                            obj.style.left = obj.offsetLeft - 5 + "px";
                        }
                    }, 1);
                    // 小于0向右移动
                } else if (target < 0) {
                    animateTimer = setInterval(() => {
                        if (obj.offsetLeft >= used + this.carousel.picWidth) {
                            clearInterval(animateTimer);
                            this.carousel.animateTimerFlag = true;
                            resolve();
                        } else {
                            obj.style.left = obj.offsetLeft + 5 + "px";
                        }
                    }, 1);
                }
            });
        },
        // 上一张图片
        last() {
            // 是否有正在运行的动画函数
            if (!this.carousel.animateTimerFlag) return;
            this.carousel.animateTimerFlag = false;

            if (this.carousel.index !== 0) {
                this.carousel.index--;
                this.animate(this.$refs.pics, -1);
            } else {
                this.$refs.pics.style.left =
                    -(this.lists.length - 1) * this.carousel.picWidth + "px";
                this.carousel.index = this.lists.length - 2;
                this.animate(this.$refs.pics, -1);
            }
        },
        // 下一张图片
        next() {
            // 是否有正在运行的动画函数
            if (!this.carousel.animateTimerFlag) return;
            this.carousel.animateTimerFlag = false;

            // 最后一张图分开判断
            if (this.carousel.index !== this.lists.length - 2) {
                this.carousel.index++;
                this.animate(this.$refs.pics, 1);
                // 最后一张图片移动后将从重复的那张移动到第一张
            } else if (this.carousel.index === this.lists.length - 2) {
                this.carousel.index = 0;
                this.animate(this.$refs.pics, 1).then(() => {
                    this.$refs.pics.style.left = 0;
                    this.carousel.index = 0;
                });
            }
        },
        // 下面小点点击事件
        switchPic(i) {
            // 是否有正在运行的动画函数
            if (!this.carousel.animateTimerFlag) return;
            this.carousel.animateTimerFlag = false;

            if (i === this.carousel.index) return;
            let tem = null;
            // 点击的点在当前位置的左边
            if (i < this.carousel.index) {
                // 将当前位置的图片暂时移动到将要切换的图片的旁边
                // 在切换位置后将其转换回来即可
                tem = this.lists[i + 1];
                this.lists[i + 1] = this.lists[this.carousel.index];
                this.$refs.pics.style.left =
                    -(i + 1) * this.carousel.picWidth + "px";
                this.carousel.index = i;
                this.animate(this.$refs.pics, -1).then(() => {
                    this.lists[i + 1] = tem;
                });
            } else {
                // 点击的点在当前位置的右边
                tem = this.lists[i - 1];
                this.lists[i - 1] = this.lists[this.carousel.index];
                this.$refs.pics.style.left =
                    -(i - 1) * this.carousel.picWidth + "px";
                this.carousel.index = i;
                this.animate(this.$refs.pics, 1).then(() => {
                    this.lists[i - 1] = tem;
                });
            }
        },
    },
    mounted() {
        // 需要深拷贝
        if (this.videolist.length !== 0) {
            this.lists = JSON.parse(JSON.stringify(this.videolist));
            this.lists.push(this.lists[0]);
        }
        this.startTimer();
    },
    destroyed() {
        this.stopTimer();
    },
    watch: {
        videolist(newVal) {
            // 需要深拷贝
            this.lists = JSON.parse(JSON.stringify(newVal));
            this.lists.push(this.lists[0]);
        },
    },
};
</script>

<style lang="scss" scoped>
// 一张图片的宽度
$picWidth: 480px;
$picNum: 6;

ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

.content {
    overflow: hidden;
    position: relative;

    // 轮播图片
    ul {
        position: relative;
        left: 0;
        width: $picWidth * ($picNum + 1);
        height: 100%;

        .pic {
            float: left;
            width: $picWidth;
            height: 100%;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    // 下方小点
    .dot {
        position: absolute;
        left: 240px;
        top: 247px;
        width: $picNum * 16px;
        height: 16px;
        border-radius: 8px;
        background-color: rgba(255, 255, 255, 0.4);
        transform: translateX(-50%);

        li {
            float: left;
            width: 10px;
            height: 10px;
            margin: 3px 3px 0;
            border-radius: 5px;
            background-color: rgba(0, 0, 0, 0.6);
            cursor: pointer;
        }

        .current {
            background-color: rgb(9, 198, 245);
        }
    }

    // 前后按钮
    div {
        position: absolute;
        top: 140px;
        width: 25px;
        display: none;
        height: 30px;
        background: rgba(0, 0, 0, 0.4);
        overflow: hidden;
        cursor: pointer;

        span {
            position: absolute;
            width: 10px;
            height: 10px;
            border-top: 2px solid #fff;
            border-right: 2px solid #fff;
        }
    }

    .before {
        left: 10px;
        border-radius: 15px 0 0 15px;

        span {
            top: 9px;
            left: 11px;
            transform: rotateZ(-135deg);
        }
    }

    .after {
        right: 10px;
        border-radius: 0 15px 15px 0;

        span {
            top: 9px;
            right: 11px;
            transform: rotateZ(45deg);
        }
    }

    .mouseHover {
        display: block;
    }
}
</style>